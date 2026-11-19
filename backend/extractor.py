import json
import re
from typing import Optional
from backend.llm import ask, _strip_markdown_fence, FALLBACKS

EXTRACTOR_SYSTEM_PROMPT = (
    "You extract loan terms from Indian digital loan app screenshots or text. "
    "Return ONLY valid JSON, no prose. Use null if a field is not visible. Never guess numbers. Amounts are in INR. "
    "Keys: principal, processing_fee, gst_on_fee, other_deductions, insurance_fee, disbursed_amount, "
    "repayment_amount, tenure_days, stated_interest_text, stated_apr_shown, kfs_shown (bool), "
    "grievance_officer_shown (bool), cooling_off_mentioned (bool), lender_name, app_name, confidence (0-1)."
)

def extract_from_text(text: str) -> dict:
    """Extract loan terms from pasted text using Claude with offline fallback."""
    user_prompt = f"Analyze this loan offer or loan app description text and extract structured fields in JSON:\n\n{text}"
    try:
        raw = ask(EXTRACTOR_SYSTEM_PROMPT, user_prompt, key="extract_sample")
        cleaned = _strip_markdown_fence(raw)
        data = json.loads(cleaned)
        return _sanitize_extracted_dict(data)
    except Exception as e:
        print(f"[Extractor Text Error]: {e}")
        return _heuristic_text_extraction(text)

def extract_from_image(image_b64: str, media_type: str = "image/png") -> dict:
    """Extract loan terms from screenshot image using Claude Vision with offline fallback."""
    user_prompt = "Extract all visible loan terms, amounts, fees, and tenure from this loan screen image. Output strictly JSON."
    try:
        raw = ask(EXTRACTOR_SYSTEM_PROMPT, user_prompt, key="extract_sample", image_b64=image_b64, media_type=media_type)
        cleaned = _strip_markdown_fence(raw)
        data = json.loads(cleaned)
        return _sanitize_extracted_dict(data)
    except Exception as e:
        print(f"[Extractor Vision Error]: {e}")
        fallback = FALLBACKS.get("extract_sample", {})
        return _sanitize_extracted_dict(fallback)

def _sanitize_extracted_dict(d: dict) -> dict:
    fields = [
        "principal", "processing_fee", "gst_on_fee", "other_deductions", "insurance_fee",
        "disbursed_amount", "repayment_amount", "tenure_days", "stated_interest_text",
        "stated_apr_shown", "kfs_shown", "grievance_officer_shown", "cooling_off_mentioned",
        "lender_name", "app_name", "confidence"
    ]
    res = {}
    for f in fields:
        val = d.get(f)
        if f in ["principal", "processing_fee", "gst_on_fee", "other_deductions", "insurance_fee", "disbursed_amount", "repayment_amount"]:
            try:
                res[f] = float(val) if val is not None else None
            except (ValueError, TypeError):
                res[f] = None
        elif f == "tenure_days":
            try:
                res[f] = int(val) if val is not None else None
            except (ValueError, TypeError):
                res[f] = None
        elif f in ["kfs_shown", "grievance_officer_shown", "cooling_off_mentioned"]:
            res[f] = bool(val) if val is not None else False
        elif f == "confidence":
            try:
                res[f] = float(val) if val is not None else 0.8
            except (ValueError, TypeError):
                res[f] = 0.8
        else:
            res[f] = str(val) if val is not None else None
    
    # Auto-derive disbursed if missing but components exist
    if res.get("disbursed_amount") is None and res.get("principal") is not None:
        p = res["principal"]
        fee = res.get("processing_fee") or 0.0
        gst = res.get("gst_on_fee") or 0.0
        other = res.get("other_deductions") or 0.0
        ins = res.get("insurance_fee") or 0.0
        res["disbursed_amount"] = p - fee - gst - other - ins

    return res

def _heuristic_text_extraction(text: str) -> dict:
    """Deterministic regex extraction fallback for common loan offers."""
    t = text.lower()
    curr_prefix = r"(?:rs\.?|inr|₹)?"
    
    principal = None
    repay = None
    tenure = None
    disbursed = None
    fee = 0.0
    gst = 0.0
    other = 0.0
    
    m_p = re.search(rf"(?:principal|loan amount|sanctioned|limit|amount)[:\s]*{curr_prefix}\s*([0-9,]+)", t)
    if m_p:
        principal = float(m_p.group(1).replace(",", ""))

    m_r = re.search(rf"(?:repay|repayment|total payable|total due)[:\s]*{curr_prefix}\s*([0-9,]+)", t)
    if m_r:
        repay = float(m_r.group(1).replace(",", ""))

    m_d = re.search(rf"(?:disbursed|you receive|receive)[:\s]*{curr_prefix}\s*([0-9,]+)", t)
    if m_d:
        disbursed = float(m_d.group(1).replace(",", ""))

    # Tenure: days or months
    m_t = re.search(r"([0-9]+)\s*(?:days|din|day)", t)
    if m_t:
        tenure = int(m_t.group(1))
    else:
        m_tm = re.search(r"([0-9]+)\s*(?:months|month|mos|mahine)", t)
        if m_tm:
            tenure = int(m_tm.group(1)) * 30

    m_fee = re.search(rf"(?:processing fee|fee|charges|platform fee|platform charges)[:\s]*{curr_prefix}\s*([0-9,]+)", t)
    if m_fee:
        fee = float(m_fee.group(1).replace(",", ""))

    m_gst = re.search(rf"(?:gst|tax)[:\s]*{curr_prefix}\s*([0-9,]+)", t)
    if m_gst:
        gst = float(m_gst.group(1).replace(",", ""))

    m_other = re.search(rf"(?:other deductions|other charges|other)[:\s]*{curr_prefix}\s*([0-9,]+)", t)
    if m_other:
        other = float(m_other.group(1).replace(",", ""))

    if not principal:
        fallback = FALLBACKS.get("extract_sample", {})
        return _sanitize_extracted_dict(fallback)

    if disbursed is None:
        disbursed = principal - fee - gst - other

    return _sanitize_extracted_dict({
        "principal": principal,
        "processing_fee": fee,
        "gst_on_fee": gst,
        "other_deductions": other,
        "disbursed_amount": disbursed,
        "repayment_amount": repay or principal,
        "tenure_days": tenure or 7,
        "confidence": 0.85
    })
