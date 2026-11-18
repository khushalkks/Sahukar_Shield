import json
from datetime import datetime
from backend.llm import ask, FALLBACKS

COMPLAINT_SYSTEM_PROMPT = (
    "You draft a factual complaint for the Indian cybercrime portal / RBI Sachet on behalf of a borrower. "
    "Use ONLY facts supplied. Do not invent dates, names, amounts or sections. Put [TO BE FILLED] for missing info. "
    "Tone: formal, calm, chronological. Structure: Subject, Complainant details, Brief summary, "
    "Chronology, Evidence available, Harm caused, Relief requested, Declaration. "
    "Mention that statutory references are for the authority to determine."
)

def build_complaint_draft(complainant: dict, loan: dict, timeline: list, evidence: list, language: str = "english") -> str:
    """Generate formal legal complaint text using Claude or deterministic factual template."""
    user_payload = {
        "complainant": complainant,
        "loan": loan,
        "timeline": timeline,
        "evidence": evidence,
        "language": language
    }
    
    user_prompt = f"Draft a formal complaint using exclusively these details:\n{json.dumps(user_payload, indent=2)}"
    
    try:
        draft = ask(COMPLAINT_SYSTEM_PROMPT, user_prompt, key="complaint_sample")
        if draft and len(draft) > 150:
            return draft
    except Exception as e:
        print(f"[Complaint Builder LLM Error]: {e}")

    # Deterministic factual fallback generator
    return _generate_factual_template(complainant, loan, timeline, evidence)

def _generate_factual_template(complainant: dict, loan: dict, timeline: list, evidence: list) -> str:
    name = complainant.get("name") or "[TO BE FILLED]"
    state = complainant.get("state") or "India"
    phone = complainant.get("phone") or "[TO BE FILLED]"
    email = complainant.get("email") or "[TO BE FILLED]"

    app_name = loan.get("app_name") or "[UNSPECIFIED LOAN APP]"
    lender_name = loan.get("lender_name") or "Unknown / Unverified Entity"
    principal = f"₹{loan.get('principal', 0):,.2f}" if loan.get('principal') else "[AMOUNT NOT SPECIFIED]"
    disbursed = f"₹{loan.get('disbursed_amount', 0):,.2f}" if loan.get('disbursed_amount') else "[TO BE FILLED]"
    repayment = f"₹{loan.get('repayment_demanded', 0):,.2f}" if loan.get('repayment_demanded') else "[TO BE FILLED]"
    date_taken = loan.get("date_taken") or "[DATE OF DISBURSAL]"
    amount_paid = f"₹{loan.get('amount_paid', 0):,.2f}" if loan.get('amount_paid') else "₹0.00"

    timeline_lines = []
    if timeline:
        for idx, ev in enumerate(timeline, 1):
            dt = ev.get("date", "N/A")
            tm = ev.get("time", "")
            time_str = f" at {tm}" if tm else ""
            chan = ev.get("channel", "Message/Call")
            summ = ev.get("summary", "")
            ev_f = f" [Evidence file: {ev.get('evidence_file')}]" if ev.get("evidence_file") else ""
            timeline_lines.append(f"  {idx}. {dt}{time_str} via {chan}: {summ}{ev_f}")
    else:
        timeline_lines.append("  1. Multiple continuous threatening calls and abusive WhatsApp messages received from recovery agents.")

    evidence_lines = []
    if evidence:
        for ev_item in evidence:
            evidence_lines.append(f"  - {ev_item}")
    else:
        evidence_lines.append("  - Screenshots of threatening messages and transaction records (Preserved on device)")

    now_date = datetime.now().strftime("%d-%m-%Y")

    return f"""FORMAL COMPLAINT REGARDING UNLAWFUL DIGITAL LENDING HARASSMENT, EXTORTION, AND INTIMIDATION

TO:
The Officer-in-Charge / Cyber Crime Redressal Authority
National Cyber Crime Reporting Portal (cybercrime.gov.in) / Reserve Bank of India Sachet Portal

SUBJECT: Complaint against digital lending application '{app_name}' and associated recovery personnel for criminal harassment, unauthorized contact data access, and extortion.

1. COMPLAINANT DETAILS:
   - Full Name: {name}
   - State / UT: {state}
   - Contact Number: {phone}
   - Email ID: {email}

2. LENDING APPLICATION DETAILS:
   - Name of Application: {app_name}
   - Purported Lender / NBFC: {lender_name}
   - Date Loan Taken / Disbursed: {date_taken}
   - Stated Loan Amount: {principal}
   - Money Actually Disbursed: {disbursed}
   - Repayment Demanded: {repayment}
   - Amount Already Paid: {amount_paid}
   - Extra Unlawful Demands: {loan.get('extra_demands') or 'Exorbitant penalty fees and recurring extortion payments'}

3. SUMMARY OF GRIEVANCE:
   The complainant accessed the mobile application '{app_name}'. Contrary to Reserve Bank of India (RBI) Digital Lending Guidelines (2022), the application failed to furnish a mandatory standardized Key Fact Statement (KFS) detailing all-inclusive APR, deducted excessive upfront deductions, and disbursed only {disbursed}.
   Shortly upon disbursal, recovery agents unlawfully extracted private device records, contact lists, and multimedia from the complainant's device, and initiated systematic criminal intimidation, abusive messages, and extortion demands.

4. CHRONOLOGY OF INCIDENTS:
{chr(10).join(timeline_lines)}

5. PRESERVED DIGITAL EVIDENCE:
{chr(10).join(evidence_lines)}

6. HARM CAUSED:
   Severe emotional distress, defamation among friends and family, mental harassment, and unlawful financial extortion.

7. RELIEF REQUESTED:
   (a) Immediate registration of an official complaint/FIR and investigation into the syndicate operating '{app_name}'.
   (b) Freezing of intermediary UPI IDs, beneficiary bank accounts, and mobile numbers used for sending threats.
   (c) Notice to Google Play Store and application hosts to delist the illegal application to prevent further victims.
   (d) Legal protection against further intimidation of complainant and family contacts.

DECLARATION:
I hereby solemnly affirm that the facts stated above are true and complete to the best of my knowledge and documentation. I have retained all original mobile files, screenshots, and logs for verification.

Date: {now_date}
Place: {state}
Signature / Complainant: {name}"""

def get_filing_guide() -> dict:
    return {
        "cybercrime_steps": [
            "Open cybercrime.gov.in on your phone or computer.",
            "Click on 'Report Other Cyber Crime' (or 'Report Women/Children related crime' if morphed photos are involved).",
            "Register or login with your mobile number using OTP.",
            "Under 'Incident Details', select Category: 'Cyber Crime against Person' > Sub-category: 'Cyber Harassment / Defamation' or 'Online Financial Fraud'.",
            "Copy & paste the generated Complaint Draft into the incident description box.",
            "Upload screenshots of threatening messages, call logs, and bank statement proofs.",
            "Submit and save the Acknowledgement Number (15-digit number) for future reference."
        ],
        "call_script_1930": (
            "\"Namaste sir/madam, mera naam [Aapka Naam] hai. Ek unauthorized digital loan app '[App Name]' ke recovery agents "
            "mere phone contacts ko chori karke dhamki bhare messages aur calls bhej rahe hain aur extortion kar rahe hain. "
            "Maine unhe koi extra payment nahi ki hai. Mere paas saare screenshots aur transaction records hain. "
            "Kripya meri complaint register karke immediate incident reference number provide karein.\""
        ),
        "rbi_sachet_steps": [
            "Visit sachet.rbi.org.in (RBI's portal for unapproved financial entities).",
            "Click on 'Help' or 'File a Complaint / Report Unregistered Entity'.",
            "Enter the name of the app and any developer details or UPI handles provided.",
            "Upload the generated Sahukar Shield PDF complaint copy.",
            "Submit to ensure the entity is flagged in the RBI national repository."
        ]
    }
