import os
import io
import time
import base64
import json
from collections import defaultdict
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from PIL import Image

from backend.config import ALLOWED_ORIGINS, SAFE_APR_MAX, RISKY_APR_MAX
from backend.schemas import (
    VerifyRequest, VerifyResponse, MatchResult,
    ExtractTextRequest, ExtractedLoanTerms,
    AprCalculationRequest, AprCalculationResponse, ComparisonItem,
    ThreatAnalysisRequest, ThreatAnalysisResponse,
    ComplaintCreateRequest, ComplaintResponse,
    FamilyGuideRequest, FamilyGuideResponse,
)
from backend.rbi_match import RBIDirectory
from backend.permission_risk import risk_score, explain_risk_factors
from backend.apr_engine import LoanTerms, compute_apr, verdict, derive_disbursed
from backend.extractor import extract_from_text, extract_from_image
from backend.threat import classify_threat_messages
from backend.complaint_builder import build_complaint_draft, get_filing_guide
from backend.complaint_pdf import generate_complaint_pdf, get_pdf_bytes
from backend.family_guide import generate_family_response
from backend.llm import ask, FALLBACKS

app = FastAPI(
    title="Sahukar Shield API",
    description="Consumer Protection & Predatory Loan App Defense API",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if ALLOWED_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory Rate Limiter: 60 requests per minute per IP
rate_limit_records = defaultdict(list)
RATE_LIMIT_MAX = 60
RATE_LIMIT_WINDOW = 60  # seconds

@app.middleware("http")
async def rate_limiting_middleware(request: Request, call_next):
    # Skip rate limiting for static / health check
    if request.url.path in ["/api/health", "/docs", "/openapi.json"]:
        return await call_next(request)
        
    client_ip = request.client.host if request.client else "unknown"
    current_time = time.time()
    
    # Filter out requests older than window
    requests_history = [t for t in rate_limit_records[client_ip] if current_time - t < RATE_LIMIT_WINDOW]
    if len(requests_history) >= RATE_LIMIT_MAX:
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Please slow down. (Rate limit: 60 req/min)"}
        )
    
    requests_history.append(current_time)
    rate_limit_records[client_ip] = requests_history
    return await call_next(request)

# Load Directory instance once at startup
rbi_dir = RBIDirectory()

# Load Dashboard stats
dashboard_stats = {}
stats_path = Path(__file__).parent / "data" / "dashboard_stats.json"
if stats_path.exists():
    try:
        with open(stats_path, encoding="utf-8") as f:
            dashboard_stats = json.load(f)
    except Exception as e:
        print(f"Failed to load dashboard_stats: {e}")

@app.get("/api/health")
def health_check():
    return {"ok": True, "service": "Sahukar Shield API", "status": "operational"}

# ==========================================
# MODULE 1: APP VERIFIER
# ==========================================
@app.post("/api/verify", response_model=VerifyResponse)
def verify_app(payload: VerifyRequest):
    query = payload.query.strip()
    if not query and payload.play_url:
        query = payload.play_url.strip()
        
    if not query:
        raise HTTPException(status_code=400, detail="Query or Play Store URL is required")

    # 1. RBI Match & Flagged Match
    match_data = rbi_dir.match(query)
    
    # 2. Permission Risk Score (0-100)
    p_risk = risk_score(payload.permissions, payload.flags)
    red_flag_reasons = explain_risk_factors(payload.permissions, payload.flags)
    
    if match_data.get("known_flagged"):
        red_flag_reasons.insert(0, f"Previously Reported Predatory App: {match_data.get('flagged_pattern')}")

    # 3. Final Verifier Verdict
    # Verified (RBI match >=90 AND risk score < 40) -> GREEN
    # Unverified OR risk 40-69 -> AMBER
    # Not found AND risk >= 70 OR advance fee flag -> RED
    is_rbi_verified = match_data.get("found", False) and match_data.get("score", 0) >= 90
    has_advance_fee = "advance_fee" in payload.flags
    is_known_flagged = match_data.get("known_flagged", False)

    if is_known_flagged or has_advance_fee or (not is_rbi_verified and p_risk >= 70):
        final_verdict = "RED"
        explanation = (
            f"YE APP KHATARNAK HAI! Ye app RBI ki kisi bhi bank/NBFC directory me verified nahi hai "
            f"aur iska risk score {p_risk}/100 hai. Is app ko install na karein aur na hi koi documents dein."
        )
    elif is_rbi_verified and p_risk < 40:
        final_verdict = "GREEN"
        explanation = (
            f"App Verified: Ye app RBI directory me registered entity '{match_data.get('lender')}' se match karti hai. "
            f"Permissions ka risk score sirf {p_risk}/100 hai."
        )
    else:
        final_verdict = "AMBER"
        explanation = (
            f"Savdhan rahein (Unverified/Medium Risk): Is app ka RBI register se pakka match nahi mila "
            f"(Score: {match_data.get('score')}%), aur iska permission risk {p_risk}/100 hai. Loan lene se pehle lender ka naam zarur confirm karein."
        )

    return VerifyResponse(
        query=query,
        match=MatchResult(
            found=match_data.get("found", False),
            possible=match_data.get("possible", False),
            score=match_data.get("score", 0.0),
            best_match=match_data.get("best_match"),
            lender=match_data.get("lender"),
            status=match_data.get("status", "NOT_LISTED"),
            entity_type=match_data.get("entity_type"),
            known_flagged=match_data.get("known_flagged", False),
            flagged_pattern=match_data.get("flagged_pattern"),
            reports_count=match_data.get("reports_count"),
            matched_by=match_data.get("matched_by"),
        ),
        permission_risk=p_risk,
        red_flags=red_flag_reasons,
        verdict=final_verdict,
        explanation_hinglish=explanation,
    )

# ==========================================
# MODULE 2: TRUE COST X-RAY
# ==========================================
@app.post("/api/extract", response_model=ExtractedLoanTerms)
async def extract_terms(
    request: Request,
    image: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None)
):
    # Support JSON body if sent as application/json
    if image is None and text is None:
        try:
            body = await request.json()
            text = body.get("text")
        except Exception:
            pass

    if image:
        # Validate file size < 5MB
        contents = await image.read()
        if len(contents) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Image file exceeds 5MB limit")
        
        # Strip EXIF and re-encode to PNG
        try:
            img = Image.open(io.BytesIO(contents))
            # Convert to RGB (stripping EXIF metadata)
            clean_io = io.BytesIO()
            img.convert("RGB").save(clean_io, format="PNG")
            b64_data = base64.b64encode(clean_io.getvalue()).decode("utf-8")
            extracted = extract_from_image(b64_data, media_type="image/png")
            return ExtractedLoanTerms(**extracted)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid image format: {e}")

    elif text:
        extracted = extract_from_text(text)
        return ExtractedLoanTerms(**extracted)
    
    else:
        raise HTTPException(status_code=400, detail="Either an image file or text is required")

@app.post("/api/apr", response_model=AprCalculationResponse)
def calculate_apr(payload: AprCalculationRequest):
    # Derive disbursed amount if not explicitly passed
    disbursed = payload.disbursed_amount
    if disbursed is None or disbursed <= 0:
        disbursed = derive_disbursed(
            payload.principal,
            payload.processing_fee,
            payload.gst_on_fee,
            payload.other_deductions,
            payload.insurance_fee,
        )

    terms = LoanTerms(
        principal=payload.principal,
        disbursed_amount=disbursed,
        repayment_amount=payload.repayment_amount,
        tenure_days=payload.tenure_days,
    )

    try:
        apr_res = compute_apr(terms)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

    cost_pct = apr_res["cost_pct_of_received"]
    calc_verdict = verdict(
        apr_res["simple_apr_pct"],
        payload.tenure_days,
        cost_pct,
        safe_max=SAFE_APR_MAX,
        risky_max=RISKY_APR_MAX,
    )

    # Step 3: KFS Checker
    kfs_flags = []
    checks = payload.kfs_checks or {}
    if not checks.get("apr_shown", False):
        kfs_flags.append("APR (Annual Percentage Rate) upfront nahi dikhaya gaya")
    if not checks.get("fees_itemised", True):
        kfs_flags.append("Charges and fees transparently itemised nahi hain")
    if not checks.get("cooling_off_period", False):
        kfs_flags.append("Cooling-off / Look-up period (loan cancel karne ka adhikar) nahi diya")
    if not checks.get("grievance_officer", False):
        kfs_flags.append("Lender aur Grievance Redressal Officer ka naam/contact gayab hai")

    # Comparisons for UI bar chart
    comparisons = [
        ComparisonItem(name="Bank Personal Loan", apr_pct=14.0, type="Standard"),
        ComparisonItem(name="Gold Loan", apr_pct=11.5, type="Standard"),
        ComparisonItem(name="Credit Card Revolving", apr_pct=42.0, type="High"),
        ComparisonItem(name="This Loan (Sahukar Shield)", apr_pct=min(apr_res["simple_apr_pct"], 3500.0), type="Current"),
    ]

    # Generate Hinglish explanation via LLM with numbers passed in
    expl_system = (
        "You explain loan costs to a first-time borrower in simple Hinglish (Roman Hindi+English), "
        "max 120 words, friendly, no jargon. You are GIVEN computed numbers. You MUST NOT recalculate or change any number; "
        "quote them exactly. End with one clear action line. Do not give legal or investment advice."
    )
    expl_prompt = (
        f"Numbers: {json.dumps(apr_res)}. Verdict: {calc_verdict}. KFS Missing Flags: {kfs_flags}. "
        f"Explain in {payload.language}."
    )
    fallback_key = f"explain_{calc_verdict.lower()}"
    explanation = ask(expl_system, expl_prompt, key=fallback_key, max_tokens=300)

    return AprCalculationResponse(
        disbursed=apr_res["disbursed"],
        repayment=apr_res["repayment"],
        total_cost=apr_res["total_cost"],
        cost_pct_of_received=apr_res["cost_pct_of_received"],
        simple_apr_pct=apr_res["simple_apr_pct"],
        compounded_apr_pct=apr_res["compounded_apr_pct"],
        tenure_days=apr_res["tenure_days"],
        verdict=calc_verdict,
        kfs_flags=kfs_flags,
        comparisons=comparisons,
        explanation=explanation,
    )

# ==========================================
# MODULE 3: THREAT SHIELD
# ==========================================
@app.post("/api/threat", response_model=ThreatAnalysisResponse)
def analyze_threats(payload: ThreatAnalysisRequest):
    msgs = [{"text": m.text, "timestamp": m.timestamp} for m in payload.messages]
    result = classify_threat_messages(msgs, language=payload.language)
    return ThreatAnalysisResponse(**result)

# ==========================================
# MODULE 4: COMPLAINT BUILDER
# ==========================================
@app.post("/api/complaint", response_model=ComplaintResponse)
def create_complaint(payload: ComplaintCreateRequest):
    complainant_dict = payload.complainant.model_dump()
    loan_dict = payload.loan.model_dump()
    timeline_dict = [t.model_dump() for t in payload.timeline]
    
    # 1. Generate factual draft text
    draft = build_complaint_draft(
        complainant=complainant_dict,
        loan=loan_dict,
        timeline=timeline_dict,
        evidence=payload.evidence,
        language=payload.language,
    )

    # 2. Generate PDF in memory
    pdf_id = generate_complaint_pdf(
        complainant=complainant_dict,
        loan=loan_dict,
        timeline=timeline_dict,
        evidence=payload.evidence,
        draft_text=draft,
    )

    filing_guide = get_filing_guide()

    return ComplaintResponse(
        complaint_id=pdf_id,
        draft_text=draft,
        pdf_url=f"/api/complaint/pdf/{pdf_id}",
        filing_guide=filing_guide,
    )

@app.get("/api/complaint/pdf/{pdf_id}")
def download_complaint_pdf(pdf_id: str):
    pdf_bytes = get_pdf_bytes(pdf_id)
    if not pdf_bytes:
        raise HTTPException(status_code=404, detail="Complaint PDF not found or expired")
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=Sahukar_Shield_Complaint_{pdf_id[:8]}.pdf"
        }
    )

# ==========================================
# MODULE 5: FAMILY ALERT
# ==========================================
@app.post("/api/family", response_model=FamilyGuideResponse)
def get_family_advisory(payload: FamilyGuideRequest):
    res = generate_family_response(payload.message, language=payload.language)
    return FamilyGuideResponse(
        headline=res.get("headline", "Ghabraiye mat: Aap zimmedar nahi hain"),
        core_message=res.get("core_message", ""),
        key_points=res.get("key_points", []),
        what_to_say=res.get("what_to_say", ""),
        helpline_info=res.get("helpline_info", "National Cyber Crime Helpline: 1930"),
        share_text=res.get("share_text", ""),
    )

# ==========================================
# MODULE 6: SCAM DASHBOARD
# ==========================================
@app.get("/api/dashboard")
def get_dashboard_data():
    return dashboard_stats
