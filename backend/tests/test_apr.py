import csv
from pathlib import Path
import pytest
from backend.apr_engine import LoanTerms, compute_apr, verdict, derive_disbursed

def test_worked_example():
    """Worked test case from spec:
    principal 5000, fee 1000, GST 180, other 320 -> disbursed 3500;
    repay 5000; 7 days -> cost 1500; period 42.857%;
    simple APR = 42.857 x 365/7 = 2234.69% (approx 2,235%); verdict PREDATORY.
    """
    principal = 5000
    disbursed = derive_disbursed(principal, processing_fee=1000, gst_on_fee=180, other_deductions=320)
    assert disbursed == 3500

    terms = LoanTerms(principal=principal, disbursed_amount=disbursed, repayment_amount=5000, tenure_days=7)
    res = compute_apr(terms)
    
    assert res["disbursed"] == 3500
    assert res["repayment"] == 5000
    assert res["total_cost"] == 1500
    assert abs(res["cost_pct_of_received"] - 42.86) < 0.05
    assert abs(res["simple_apr_pct"] - 2234.69) < 0.1
    
    v = verdict(res["simple_apr_pct"], terms.tenure_days, res["cost_pct_of_received"])
    assert v == "PREDATORY"

def test_all_20_test_cases():
    """Run all 20 test cases from test_cases.csv and verify APR accuracy within 0.5% tolerance."""
    csv_path = Path(__file__).parent / "test_cases.csv"
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = list(csv.DictReader(f))
    
    assert len(reader) == 20, f"Expected 20 test cases, found {len(reader)}"

    passed = 0
    for idx, row in enumerate(reader, start=1):
        principal = float(row["principal"])
        disbursed = float(row["disbursed"])
        repayment = float(row["repayment"])
        tenure = int(row["tenure_days"])
        expected_apr = float(row["expected_simple_apr"])
        expected_verdict = row["expected_verdict"].strip()

        terms = LoanTerms(
            principal=principal,
            disbursed_amount=disbursed,
            repayment_amount=repayment,
            tenure_days=tenure
        )
        res = compute_apr(terms)
        calculated_apr = res["simple_apr_pct"]
        calc_verdict = verdict(calculated_apr, tenure, res["cost_pct_of_received"])

        # Check APR tolerance (within 0.5% or 0.5 absolute percentage points)
        rel_diff = abs(calculated_apr - expected_apr) / max(expected_apr, 1.0)
        assert rel_diff < 0.005 or abs(calculated_apr - expected_apr) < 0.5, (
            f"Case {idx}: Calc APR {calculated_apr} vs Expected {expected_apr}"
        )
        assert calc_verdict == expected_verdict, (
            f"Case {idx}: Calc verdict {calc_verdict} vs Expected {expected_verdict}"
        )
        passed += 1

    print(f"Test cases passed: {passed}/20")
