import json
from backend.llm import ask, FALLBACKS

FAMILY_SYSTEM_PROMPT = (
    "You calm a family member who received threatening messages about someone else's loan app debt. "
    "Simple Hinglish, short sentences, reassuring but practical. "
    "Cover: what is happening, you are not liable just for being a contact, what to do, what not to do, "
    "how to support the borrower, helplines. No legal advice."
)

def generate_family_response(message: str, language: str = "hinglish") -> dict:
    """Generate family advisory guide using Claude or deterministic fallback."""
    user_prompt = f"A relative or contact received this message regarding someone's loan: '{message}'. Generate reassuring guidance and actionable instructions."
    
    try:
        raw = ask(FAMILY_SYSTEM_PROMPT, user_prompt, key="family_sample")
        # If response returned text or json
        if "{" in raw and "headline" in raw:
            data = json.loads(raw[raw.find("{"):raw.rfind("}")+1])
            if "share_text" not in data:
                data["share_text"] = _build_whatsapp_share_text()
            return data
    except Exception as e:
        print(f"[Family Guide LLM Error]: {e}")

    # Use comprehensive fallback
    data = dict(FALLBACKS.get("family_sample", {}))
    data["share_text"] = _build_whatsapp_share_text()
    return data

def _build_whatsapp_share_text() -> str:
    return (
        "⚠️ *ZAROORI SUCHNA / ALERT: Fraud Loan App Harassment* ⚠️\n\n"
        "Agar aapko mere naam par kisi unknown loan app se call ya dhamki aayi hai, to kripya dhyan dein:\n"
        "1. *Aap Guarantor nahi hain:* Kisi ke phone contact list me hone se koi kanooni zimmedari nahi banti.\n"
        "2. *Paise bilkul na bhejein:* Ye illegal recovery syndicate ka blackmail hai.\n"
        "3. *Call/Number block karein:* Screenshot lene ke baad number block karein.\n"
        "4. Humne National Cyber Crime Portal (1930) par official FIR/Complaint darj kar di hai.\n\n"
        "Madad aur jaankari ke liye visit karein: Sahukar Shield (Consumer Protection)"
    )
