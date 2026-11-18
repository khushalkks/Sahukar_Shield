from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# --- Verify Schemas ---
class VerifyRequest(BaseModel):
    query: str
    play_url: Optional[str] = None
    permissions: List[str] = Field(default_factory=list)
    flags: List[str] = Field(default_factory=list)

class MatchResult(BaseModel):
    found: bool
    possible: bool = False
    score: float
    best_match: Optional[str] = None
    lender: Optional[str] = None
    status: str
    entity_type: Optional[str] = None
    known_flagged: bool = False
    flagged_pattern: Optional[str] = None
    reports_count: Optional[int] = None
    matched_by: Optional[str] = None

class VerifyResponse(BaseModel):
    query: str
    match: MatchResult
    permission_risk: int
    red_flags: List[str]
    verdict: str  # "GREEN", "AMBER", "RED"
    explanation_hinglish: str

# --- Extract Schemas ---
class ExtractTextRequest(BaseModel):
    text: str

class ExtractedLoanTerms(BaseModel):
    principal: Optional[float] = None
    processing_fee: Optional[float] = None
    gst_on_fee: Optional[float] = None
    other_deductions: Optional[float] = None
    insurance_fee: Optional[float] = None
    disbursed_amount: Optional[float] = None
    repayment_amount: Optional[float] = None
    tenure_days: Optional[int] = None
    stated_interest_text: Optional[str] = None
    stated_apr_shown: Optional[str] = None
    kfs_shown: Optional[bool] = False
    grievance_officer_shown: Optional[bool] = False
    cooling_off_mentioned: Optional[bool] = False
    lender_name: Optional[str] = None
    app_name: Optional[str] = None
    confidence: float = 0.5

# --- APR Schemas ---
class AprCalculationRequest(BaseModel):
    principal: float
    processing_fee: float = 0.0
    gst_on_fee: float = 0.0
    other_deductions: float = 0.0
    insurance_fee: float = 0.0
    disbursed_amount: Optional[float] = None
    repayment_amount: float
    tenure_days: int
    kfs_checks: Dict[str, bool] = Field(default_factory=dict)
    language: str = "hinglish"

class ComparisonItem(BaseModel):
    name: str
    apr_pct: float
    type: str

class AprCalculationResponse(BaseModel):
    disbursed: float
    repayment: float
    total_cost: float
    cost_pct_of_received: float
    simple_apr_pct: float
    compounded_apr_pct: Optional[float] = None
    tenure_days: int
    verdict: str  # "SAFE", "RISKY", "PREDATORY"
    kfs_flags: List[str]
    comparisons: List[ComparisonItem]
    explanation: str

# --- Threat Schemas ---
class ThreatMessageInput(BaseModel):
    text: str
    timestamp: Optional[str] = None

class ThreatAnalysisRequest(BaseModel):
    messages: List[ThreatMessageInput]
    language: str = "hinglish"

class ClassifiedMessage(BaseModel):
    text: str
    labels: List[str]
    severity: int  # 1 to 5
    language: str = "hinglish"
    key_phrases: List[str] = Field(default_factory=list)
    why: str = ""

class LegalInfoItem(BaseModel):
    label: str
    title: str
    bns_sections: str
    it_act: str
    description: str
    rbi_directive: str

class ThreatAnalysisResponse(BaseModel):
    messages: List[ClassifiedMessage]
    overall_severity: int
    severity_level: str  # "LOW", "MEDIUM", "HIGH", "CRITICAL"
    message_count: int
    summary: str
    legal_info: List[LegalInfoItem]
    safe_steps: List[str]

# --- Complaint Schemas ---
class ComplainantDetails(BaseModel):
    name: Optional[str] = None
    state: str = "Maharashtra"
    phone: Optional[str] = None
    email: Optional[str] = None

class LoanDetails(BaseModel):
    app_name: str
    lender_name: Optional[str] = None
    principal: Optional[float] = None
    disbursed_amount: Optional[float] = None
    repayment_demanded: Optional[float] = None
    date_taken: Optional[str] = None
    amount_paid: Optional[float] = 0.0
    extra_demands: Optional[str] = None

class TimelineEvent(BaseModel):
    date: str
    time: Optional[str] = None
    channel: str  # "WhatsApp", "Phone Call", "SMS", "App Notification"
    summary: str
    evidence_file: Optional[str] = None

class ComplaintCreateRequest(BaseModel):
    complainant: ComplainantDetails
    loan: LoanDetails
    timeline: List[TimelineEvent] = Field(default_factory=list)
    evidence: List[str] = Field(default_factory=list)
    language: str = "english"

class FilingGuide(BaseModel):
    cybercrime_steps: List[str]
    call_script_1930: str
    rbi_sachet_steps: List[str]

class ComplaintResponse(BaseModel):
    complaint_id: str
    draft_text: str
    pdf_url: str
    filing_guide: FilingGuide

# --- Family Schemas ---
class FamilyGuideRequest(BaseModel):
    message: str
    language: str = "hinglish"

class FamilyGuideResponse(BaseModel):
    headline: str
    core_message: str
    key_points: List[str]
    what_to_say: str
    helpline_info: str
    share_text: str
