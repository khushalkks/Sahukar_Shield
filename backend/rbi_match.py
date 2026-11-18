import csv
import re
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from rapidfuzz import fuzz, process

NOISE = {"loan", "cash", "instant", "pay", "money", "finance", "app", "quick", "fast", "credit", "paisa", "rupee"}

def _norm(s: str) -> str:
    # Separate camelCase / joined words if any
    s = re.sub(r"([a-z])([A-Z])", r"\1 \2", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return " ".join(w for w in s.split() if w)

def _core(s: str) -> str:
    words = [w for w in _norm(s).split() if w not in NOISE]
    return " ".join(words)


def extract_package_id(query: str) -> str | None:
    """Extract package ID if query is a Play Store URL."""
    if "play.google.com" in query or "id=" in query:
        try:
            parsed = urlparse(query if "://" in query else "https://" + query)
            qs = parse_qs(parsed.query)
            if "id" in qs and qs["id"]:
                return qs["id"][0].strip()
        except Exception:
            pass
        match = re.search(r"id=([a-zA-Z0-9_\.]+)", query)
        if match:
            return match.group(1).strip()
    # Check if query itself looks like a package id (e.g. com.something.app)
    if re.match(r"^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$", query.strip()):
        return query.strip()
    return None

class RBIDirectory:
    def __init__(self, rbi_path: str = "data/rbi_apps.csv", flagged_path: str = "data/known_flagged_apps.csv"):
        base_dir = Path(__file__).parent
        self.rbi_file = base_dir / rbi_path
        self.flagged_file = base_dir / flagged_path
        
        self.rows = []
        if self.rbi_file.exists():
            with open(self.rbi_file, newline="", encoding="utf-8") as f:
                self.rows = list(csv.DictReader(f))
        self.names = [_norm(r.get("app_name", "")) for r in self.rows]
        self.packages = {r.get("package_id", "").strip().lower(): r for r in self.rows if r.get("package_id")}

        self.flagged_rows = []
        if self.flagged_file.exists():
            with open(self.flagged_file, newline="", encoding="utf-8") as f:
                self.flagged_rows = list(csv.DictReader(f))
        self.flagged_names = [_norm(r.get("app_name", "")) for r in self.flagged_rows]
        self.flagged_packages = {r.get("package_id", "").strip().lower(): r for r in self.flagged_rows if r.get("package_id")}

    def match(self, query: str) -> dict:
        pkg = extract_package_id(query)
        
        # 1. Exact Package ID check against known flagged list
        if pkg and pkg.lower() in self.flagged_packages:
            flagged = self.flagged_packages[pkg.lower()]
            return {
                "found": False,
                "possible": False,
                "score": 100,
                "best_match": flagged.get("app_name"),
                "lender": "Unauthorized Entity",
                "status": "FLAGGED_PREDATORY",
                "entity_type": "Illegal / Unregulated Lending App",
                "known_flagged": True,
                "flagged_pattern": flagged.get("reported_pattern", ""),
                "reports_count": int(flagged.get("reports_count", 0)),
                "matched_by": "package_id",
            }

        # 2. Exact Package ID check against RBI list
        if pkg and pkg.lower() in self.packages:
            rbi_row = self.packages[pkg.lower()]
            return {
                "found": True,
                "possible": False,
                "score": 100,
                "best_match": rbi_row.get("app_name"),
                "lender": rbi_row.get("lender_name"),
                "status": rbi_row.get("status", "LISTED"),
                "entity_type": rbi_row.get("rbi_entity_type"),
                "known_flagged": False,
                "flagged_pattern": "",
                "matched_by": "package_id",
            }

        q = _norm(query)
        if not q:
            return {"found": False, "possible": False, "score": 0, "best_match": None, "status": "NOT_FOUND"}

        # 3. Check name against Known Flagged predatory apps
        best_flagged = process.extractOne(q, self.flagged_names, scorer=fuzz.token_set_ratio) if self.flagged_names else None
        if best_flagged:
            fl_name, fl_score, fl_idx = best_flagged
            q_core = _core(query)
            target_core = _core(self.flagged_rows[fl_idx]["app_name"])
            if q_core and target_core and fuzz.token_set_ratio(q_core, target_core) < 60:
                fl_score = min(fl_score, 65)
            
            if fl_score >= 80:
                flagged_item = self.flagged_rows[fl_idx]
                return {
                    "found": False,
                    "possible": False,
                    "score": round(fl_score, 1),
                    "best_match": flagged_item["app_name"],
                    "lender": "Unauthorized Entity",
                    "status": "FLAGGED_PREDATORY",
                    "entity_type": "Illegal / Unregulated Lending App",
                    "known_flagged": True,
                    "flagged_pattern": flagged_item.get("reported_pattern", ""),
                    "reports_count": int(flagged_item.get("reports_count", 0)),
                    "matched_by": "name",
                }

        # 4. Check name against RBI listed apps
        best_rbi = process.extractOne(q, self.names, scorer=fuzz.token_set_ratio) if self.names else None
        if not best_rbi:
            return {
                "found": False,
                "possible": False,
                "score": 0,
                "best_match": None,
                "status": "NOT_LISTED",
                "known_flagged": False,
            }

        name, score, idx = best_rbi
        # Penalise matches that only agree on noise words
        q_core = _core(query)
        rbi_core = _core(self.rows[idx]["app_name"])
        if q_core and rbi_core and fuzz.token_set_ratio(q_core, rbi_core) < 60:
            score = min(score, 69)

        row = self.rows[idx]
        is_found = score >= 90
        is_possible = 70 <= score < 90

        return {
            "found": is_found,
            "possible": is_possible,
            "score": round(score, 1),
            "best_match": row["app_name"],
            "lender": row["lender_name"],
            "status": row["status"] if is_found else ("POSSIBLE_MATCH" if is_possible else "NOT_LISTED"),
            "entity_type": row.get("rbi_entity_type", ""),
            "known_flagged": False,
            "flagged_pattern": "",
            "matched_by": "name",
        }
