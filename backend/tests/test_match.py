import pytest
from backend.rbi_match import RBIDirectory

@pytest.fixture
def directory():
    return RBIDirectory()

def test_30_queries(directory):
    """Test 30 varied queries covering exact match, typos, noise words, flagged apps, and Play Store URLs."""
    test_queries = [
        # 1-8: Exact RBI Listed Apps
        ("DemoBank Easy Loan", True, "LISTED"),
        ("Sampark Finserv Lend", True, "LISTED"),
        ("Nirmal Credit Plus", True, "LISTED"),
        ("Pragati Personal Credit", True, "LISTED"),
        ("Suraksha Retail Loans", True, "LISTED"),
        ("Bharat Udyog Credit", True, "LISTED"),
        ("Janata Parivar Loan", True, "LISTED"),
        ("Sankalp Kisan Finance", True, "LISTED"),

        # 9-13: Typos & Case Invariance on Listed Apps
        ("demobank easy loan", True, "LISTED"),
        ("Demo Bank Easy Loan App", True, "LISTED"),
        ("Sampark Fin serv Lend", True, "LISTED"),
        ("Nirmal Credit Pluss", True, "LISTED"),
        ("Suraksha Retails Loan", True, "LISTED"),

        # 14-18: Play Store URLs for Listed & Flagged Apps
        ("https://play.google.com/store/apps/details?id=com.demobank.easyloan", True, "LISTED"),
        ("https://play.google.com/store/apps/details?id=com.sampark.finserv&hl=en", True, "LISTED"),
        ("https://play.google.com/store/apps/details?id=com.quickrupee.instant", False, "FLAGGED_PREDATORY"),
        ("https://play.google.com/store/apps/details?id=com.cashnow.express", False, "FLAGGED_PREDATORY"),
        ("com.nirmal.creditplus", True, "LISTED"),

        # 19-24: Known Flagged Predatory Apps
        ("QuickRupee Instant", False, "FLAGGED_PREDATORY"),
        ("CashNow Express", False, "FLAGGED_PREDATORY"),
        ("Jhatpat Loan", False, "FLAGGED_PREDATORY"),
        ("SabkaPaisa Fast", False, "FLAGGED_PREDATORY"),
        ("Rupee Rocket", False, "FLAGGED_PREDATORY"),
        ("Super Paisa Easy", False, "FLAGGED_PREDATORY"),

        # 25-27: Typo variants of flagged apps
        ("Quick Rupee Instant", False, "FLAGGED_PREDATORY"),
        ("Cash Now Express", False, "FLAGGED_PREDATORY"),
        ("Rupee Rocket Fast", False, "FLAGGED_PREDATORY"),

        # 28-30: Unknown / Unlisted Apps
        ("Random Unregistered Loan XYZ", False, "NOT_LISTED"),
        ("Fake Super Magic Moneys 123", False, "NOT_LISTED"),
        ("Totally Unknown App 999", False, "NOT_LISTED"),
    ]

    assert len(test_queries) == 30, f"Expected 30 queries, got {len(test_queries)}"

    correct = 0
    for query, expected_found, expected_status in test_queries:
        res = directory.match(query)
        if expected_status == "FLAGGED_PREDATORY":
            assert res.get("status") == "FLAGGED_PREDATORY" or res.get("known_flagged") is True, (
                f"Query '{query}' expected FLAGGED_PREDATORY, got {res}"
            )
        elif expected_found:
            assert res.get("found") is True or res.get("score") >= 75, (
                f"Query '{query}' expected found, got {res}"
            )
        else:
            assert res.get("found") is False, (
                f"Query '{query}' expected not found, got {res}"
            )
        correct += 1

    print(f"Directory match queries passed: {correct}/30")
