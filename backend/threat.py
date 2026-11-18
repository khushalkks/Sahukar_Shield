import json
import re
from pathlib import Path
from backend.llm import ask, _strip_markdown_fence, FALLBACKS

THREAT_SYSTEM_PROMPT = (
    "You classify messages sent by digital loan app recovery agents in India. "
    "Messages may be Hindi, English or Hinglish. "
    "For EACH message return JSON: [{\"text\": \"...\", \"labels\": [from allowed list], \"severity\": 1-5, \"language\": \"...\", \"key_phrases\": [...], \"why\": \"short explanation\"}]. "
    "Allowed labels: blackmail, morphed_photo_threat, contact_threat, abusive_language, fake_legal_threat, impersonation_of_authority, payment_pressure, neutral_reminder. "
    "Return ONLY a JSON array. Do not provide legal advice."
)

# Load legal sections
LEGAL_SECTIONS = {}
legal_path = Path(__file__).parent / "data" / "legal_sections.json"
if legal_path.exists():
    try:
        with open(legal_path, encoding="utf-8") as f:
            LEGAL_SECTIONS = json.load(f).get("labels", {})
    except Exception as e:
        print(f"[Threat] Warning: Failed to load legal_sections.json: {e}")

# Heuristic keyword matching for offline fallback / validation
KEYWORD_RULES = [
    {
        "pattern": r"(morph|nude|porn|vulgar|gandi photo|gallery.*photo|private picture|edit karke.*photo|photo.*viral)",
        "label": "morphed_photo_threat",
        "severity": 5,
        "why": "Threat to circulate morphed or private photos from gallery."
    },
    {
        "pattern": r"(fir|arrest|warrant|sub-inspector|police station|cbi|crime branch|custody|court summon|magistrate|cyber cell fir)",
        "label": "fake_legal_threat",
        "severity": 5,
        "why": "Fraudulent threat of arrest, fake police FIR, or unauthorized summons."
    },
    {
        "pattern": r"(police officer|sub-inspector|advocate.*court|inspector sharma|cyber cell headquarter)",
        "label": "impersonation_of_authority",
        "severity": 5,
        "why": "Impersonating law enforcement or judicial officers."
    },
    {
        "pattern": r"(blackmail|defame|reputation|jeena haram|street.*drag)",
        "label": "blackmail",
        "severity": 5,
        "why": "Extortion through intimidation and reputational threats."
    },
    {
        "pattern": r"(contact.*list|contacts ko|phonebook|dosto ko|rishtedaar|relatives|parents|mummy|papa|boss|colleagues|office hr|bulk sms|all.*contacts)",
        "label": "contact_threat",
        "severity": 4,
        "why": "Unlawful threat to contact, harass, and shame phonebook contacts."
    },
    {
        "pattern": r"(chor|fraud|kutte|cheat|scammer|harami|bheek|liar|thief|aukaat|bloody|sharam)",
        "label": "abusive_language",
        "severity": 4,
        "why": "Use of abusive, derogatory, and defamatory language."
    },
    {
        "pattern": r"(penalty per hour|double|10 minute|30 minute|turant|immediately|call disconnect|last chance|escalation|recovery agent waiting)",
        "label": "payment_pressure",
        "severity": 3,
        "why": "Excessive and coercive payment pressure tactics."
    },
    {
        "pattern": r"(reminder|due tomorrow|scheduled repayment|maintain credit score|kindly pay|emi schedule|payment link)",
        "label": "neutral_reminder",
        "severity": 1,
        "why": "Standard commercial payment reminder."
    }
]

def _classify_single_heuristic(text: str) -> dict:
    t = text.lower()
    matched_labels = set()
    max_sev = 1
    reasons = []
    key_phrases = []

    for rule in KEYWORD_RULES:
        m = re.findall(rule["pattern"], t)
        if m:
            matched_labels.add(rule["label"])
            if rule["severity"] > max_sev:
                max_sev = rule["severity"]
            reasons.append(rule["why"])
            key_phrases.extend(m if isinstance(m[0], str) else [m[0][0]])

    if not matched_labels:
        matched_labels.add("payment_pressure")
        max_sev = 2
        reasons.append("Unclassified payment collection communication.")

    # Determine language
    lang = "hinglish"
    if any(w in t for w in ["karo", "hai", "paise", "nahi", "tere", "karke", "bhej", "rahe"]):
        lang = "hinglish"
    elif not any(ord(c) > 127 for c in text) and all(w in t for w in ["dear", "the", "your", "payment", "due"]):
        lang = "english"

    return {
        "text": text,
        "labels": list(matched_labels),
        "severity": max_sev,
        "language": lang,
        "key_phrases": list(set(str(k) for k in key_phrases))[:5],
        "why": "; ".join(reasons)
    }

def classify_threat_messages(messages: list[dict], language: str = "hinglish") -> dict:
    """Classify multiple recovery messages using Claude or deterministic fallback."""
    raw_texts = [m.get("text", "").strip() for m in messages if m.get("text", "").strip()]
    if not raw_texts:
        return {
            "messages": [],
            "overall_severity": 1,
            "severity_level": "LOW",
            "message_count": 0,
            "summary": "No messages provided.",
            "legal_info": [],
            "safe_steps": get_safe_action_steps(1)
        }

    classified = []
    user_prompt = f"Classify each of the following {len(raw_texts)} messages in JSON array format:\n"
    for idx, txt in enumerate(raw_texts, start=1):
        user_prompt += f"\nMessage {idx}: {txt}"

    try:
        raw_res = ask(THREAT_SYSTEM_PROMPT, user_prompt, key="threat_sample")
        cleaned = _strip_markdown_fence(raw_res)
        parsed = json.loads(cleaned)
        if isinstance(parsed, list) and len(parsed) > 0:
            for item in parsed:
                classified.append({
                    "text": item.get("text", ""),
                    "labels": item.get("labels", ["payment_pressure"]),
                    "severity": int(item.get("severity", 3)),
                    "language": item.get("language", language),
                    "key_phrases": item.get("key_phrases", []),
                    "why": item.get("why", "")
                })
    except Exception as e:
        print(f"[Threat Classifier API Error, using heuristic]: {e}")

    # Fallback to heuristic if Claude didn't return matches for all messages
    if len(classified) < len(raw_texts):
        classified = [_classify_single_heuristic(txt) for txt in raw_texts]

    # Calculate overall case severity
    overall_severity = max((m["severity"] for m in classified), default=1)
    
    severity_level = "LOW"
    if overall_severity >= 5:
        severity_level = "CRITICAL"
    elif overall_severity >= 4:
        severity_level = "HIGH"
    elif overall_severity == 3:
        severity_level = "MEDIUM"

    # Collect unique labels across all messages
    all_labels = set()
    for m in classified:
        for lbl in m["labels"]:
            all_labels.add(lbl)

    # Attach relevant legal sections
    legal_info = []
    for lbl in all_labels:
        if lbl in LEGAL_SECTIONS:
            sec = LEGAL_SECTIONS[lbl]
            legal_info.append({
                "label": lbl,
                "title": sec.get("title", lbl.replace("_", " ").title()),
                "bns_sections": sec.get("bns_sections", ""),
                "it_act": sec.get("it_act", ""),
                "description": sec.get("description", ""),
                "rbi_directive": sec.get("rbi_directive", "")
            })

    summary_text = (
        f"Analyzed {len(classified)} message(s). Case Severity: {severity_level} (Level {overall_severity}/5). "
        f"Key violations detected: {', '.join([l.replace('_', ' ') for l in all_labels])}."
    )

    return {
        "messages": classified,
        "overall_severity": overall_severity,
        "severity_level": severity_level,
        "message_count": len(classified),
        "summary": summary_text,
        "legal_info": legal_info,
        "safe_steps": get_safe_action_steps(overall_severity)
    }

def get_safe_action_steps(severity: int) -> list[str]:
    steps = [
        "Paise dabav me aakar BILKUL MAT BHEJEIN: Extra payment karne se extortionists aur demanded amount badha dete hain.",
        "Saboot ko delete mat karein: Har message, call recording, aur UPI payment link ka screenshot lein jisme sender number aur timestamp dikhe.",
        "Phone settings me jakar app permissions band karein: Settings > Apps > [Loan App] > Permissions > Contacts, SMS, Photos aur Location turant revoke karein.",
        "Number block karein (evidence lene ke baad): Ek baar screenshot aur call recording save hone ke baad harassers ke number block karein.",
        "Apne parivar aur trusted contacts ko pehle hi suchit karein: Unhe batayein ki fraud app ne contacts chori kiye hain aur unki baaton par vishwas na karein.",
        "National Cyber Crime Portal (cybercrime.gov.in) par turant complaint darj karein ya 1930 par call karein.",
        "RBI Sachet portal (sachet.rbi.org.in) aur RBI CMS (cms.rbi.org.in) par unauthorized digital lending app ke khilaaf complaint submit karein."
    ]
    if severity >= 4:
        steps.insert(1, "URGENT: Agar morphed photo ya family harassment ki dhamki di gayi hai, to turant 1930 Cyber Cell helpline par baat karke emergency incident number lein.")
    return steps
