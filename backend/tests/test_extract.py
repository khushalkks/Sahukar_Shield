import pytest
from backend.extractor import _heuristic_text_extraction, _sanitize_extracted_dict

GROUND_TRUTH_SAMPLES = [
    {
        "id": 1,
        "text": "QuickRupee Instant Loan. Principal Amount: Rs 5,000. Processing Fee: Rs 1,000. You Receive Disbursed: Rs 3,500. Total Repayment: Rs 5,000. Tenure: 7 days.",
        "expected": {"principal": 5000, "disbursed_amount": 3500, "repayment_amount": 5000, "tenure_days": 7}
    },
    {
        "id": 2,
        "text": "CashNow Express Credit. Loan Amount: Rs 10,000. Processing Fee: Rs 2,000. Total Payable: Rs 10,000. 15 days repayment period.",
        "expected": {"principal": 10000, "repayment_amount": 10000, "tenure_days": 15}
    },
    {
        "id": 3,
        "text": "Jhatpat Fast Cash. Sanctioned limit: Rs 3,000. Platform charges: Rs 600. Repay: Rs 3,000 within 10 days.",
        "expected": {"principal": 3000, "repayment_amount": 3000, "tenure_days": 10}
    },
    {
        "id": 4,
        "text": "DemoBank Personal Credit. Sanctioned: Rs 20,000. Total Repay: Rs 22,800. Tenure: 365 days.",
        "expected": {"principal": 20000, "repayment_amount": 22800, "tenure_days": 365}
    },
    {
        "id": 5,
        "text": "Sampark Finserv Retail. Principal Amount: Rs 50,000. Total Repayment: Rs 66,000. 730 days tenure.",
        "expected": {"principal": 50000, "repayment_amount": 66000, "tenure_days": 730}
    },
    {
        "id": 6,
        "text": "Kuber Dhan Credit. Loan Amount: Rs 15,000. Fee: Rs 450. Total due: Rs 15,900. 90 days repayment.",
        "expected": {"principal": 15000, "repayment_amount": 15900, "tenure_days": 90}
    },
    {
        "id": 7,
        "text": "Rupee Rocket Fast. Loan Amount: Rs 8,000. Processing fee: Rs 1,500. Repayment: Rs 8,000. 14 days tenure.",
        "expected": {"principal": 8000, "repayment_amount": 8000, "tenure_days": 14}
    },
    {
        "id": 8,
        "text": "Bharat Udyog Prime Bank. Sanctioned: Rs 100,000. Total repayment: Rs 117,000. Tenure: 1095 days.",
        "expected": {"principal": 100000, "repayment_amount": 117000, "tenure_days": 1095}
    }
]

def test_extraction_field_accuracy():
    """Verify field-level extraction accuracy across 8 sample cases."""
    total_fields = 0
    correct_fields = 0

    for sample in GROUND_TRUTH_SAMPLES:
        res = _heuristic_text_extraction(sample["text"])
        expected = sample["expected"]

        for field, exp_val in expected.items():
            total_fields += 1
            actual_val = res.get(field)
            if actual_val == exp_val:
                correct_fields += 1

    accuracy = (correct_fields / total_fields) * 100
    print(f"\nExtraction Field Accuracy: {correct_fields}/{total_fields} ({accuracy:.1f}%)")
    assert accuracy >= 90.0, f"Expected extraction accuracy >= 90%, got {accuracy}%"
