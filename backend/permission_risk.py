WEIGHTS = {
    "contacts": 30,
    "sms": 25,
    "gallery": 20,
    "call_logs": 15,
    "location": 5,
    "microphone": 3,
    "camera": 2,
}

FLAG_POINTS = {
    "free_email": 10,
    "no_address": 10,
    "new_app": 10,
    "harassment_reviews": 15,
    "advance_fee": 25,
    "no_cibil_claim": 10,
}

PERMISSION_LABELS = {
    "contacts": "Contacts Access (Highest risk - used to harass friends/family)",
    "sms": "SMS Access (Can read OTPs and financial messages)",
    "gallery": "Gallery / Photos Access (Used for morphing and blackmail)",
    "call_logs": "Call Logs Access (Used to identify frequent callers)",
    "location": "Location Access (Tracks physical movement)",
    "microphone": "Microphone Access",
    "camera": "Camera Access",
}

FLAG_LABELS = {
    "free_email": "Support email uses free provider (Gmail/Yahoo/Hotmail)",
    "no_address": "No physical registered office address listed",
    "new_app": "App is less than 6 months old",
    "harassment_reviews": "Reviews report harassment or threat tactics",
    "advance_fee": "Asks for advance fee / security deposit before disbursal",
    "no_cibil_claim": "Claims '100% approval, No CIBIL / Credit check required'",
}

def risk_score(perms: list[str], flags: list[str]) -> int:
    s = sum(WEIGHTS.get(p, 0) for p in perms) + sum(FLAG_POINTS.get(f, 0) for f in flags)
    return min(100, s)

def explain_risk_factors(perms: list[str], flags: list[str]) -> list[str]:
    reasons = []
    for p in perms:
        if p in PERMISSION_LABELS:
            reasons.append(PERMISSION_LABELS[p])
    for f in flags:
        if f in FLAG_LABELS:
            reasons.append(FLAG_LABELS[f])
    return reasons
