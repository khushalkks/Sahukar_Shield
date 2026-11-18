import os
from dotenv import load_dotenv

load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-5")
USE_DEMO_FALLBACK = os.getenv("USE_DEMO_FALLBACK", "true").lower() == "true"
ALLOWED_ORIGINS_RAW = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
ALLOWED_ORIGINS = [orig.strip() for orig in ALLOWED_ORIGINS_RAW.split(",") if orig.strip()]

# Configurable APR and Risk thresholds
SAFE_APR_MAX = 36.0
RISKY_APR_MAX = 100.0
SHORT_TENURE_MAX_DAYS = 30
HIGH_FEE_RATIO_PCT = 10.0


