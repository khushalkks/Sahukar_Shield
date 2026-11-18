import os
import json
import re
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "").strip()
MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-5")
USE_FALLBACK = os.getenv("USE_DEMO_FALLBACK", "true").lower() == "true"

client = None
if ANTHROPIC_API_KEY:
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    except Exception as e:
        print(f"[LLM] Warning: Failed to init Anthropic client: {e}")
        client = None

# Load pre-saved demo fallbacks
FALLBACKS = {}
fallback_path = Path(__file__).parent / "data" / "demo_fallbacks.json"
if fallback_path.exists():
    try:
        with open(fallback_path, encoding="utf-8") as f:
            FALLBACKS = json.load(f)
    except Exception as e:
        print(f"[LLM] Warning: Failed to load demo_fallbacks.json: {e}")

def _strip_markdown_fence(text: str) -> str:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    return cleaned.strip()

def ask(system: str, user: str, key: str, max_tokens: int = 1500, image_b64: str = None, media_type: str = "image/png") -> str:
    """
    Query Claude model with system/user prompt, with graceful fallback to cached synthetic demo responses.
    """
    if client and ANTHROPIC_API_KEY:
        try:
            content = []
            if image_b64:
                content.append({
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": media_type,
                        "data": image_b64,
                    }
                })
            content.append({"type": "text", "text": user})
            response = client.messages.create(
                model=MODEL,
                max_tokens=max_tokens,
                system=system,
                messages=[{"role": "user", "content": content}]
            )
            if response and response.content and len(response.content) > 0:
                return response.content[0].text
        except Exception as e:
            print(f"[LLM API Error for {key}]: {e}")
            if not USE_FALLBACK:
                raise
    
    # Fallback mode
    if key in FALLBACKS:
        val = FALLBACKS[key]
        return val if isinstance(val, str) else json.dumps(val, ensure_ascii=False)
    
    # Generic emergency fallback
    return json.dumps({
        "status": "fallback",
        "message": f"Demo fallback for {key} active. (API key not configured or call failed)."
    })
