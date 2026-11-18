from dataclasses import dataclass
from typing import Optional
import math

@dataclass
class LoanTerms:
    principal: float                 # stated loan amount
    disbursed_amount: float          # money actually received by borrower
    repayment_amount: float          # total to be repaid
    tenure_days: int

def _validate(t: LoanTerms):
    if t.disbursed_amount <= 0 or t.repayment_amount <= 0 or t.tenure_days <= 0:
        raise ValueError("disbursed, repayment and tenure must be > 0")
    if t.repayment_amount < t.disbursed_amount:
        raise ValueError("repayment cannot be less than disbursed amount")

def derive_disbursed(principal: float, processing_fee: float = 0, gst_on_fee: float = 0,
                     other_deductions: float = 0, insurance_fee: float = 0) -> float:
    return principal - processing_fee - gst_on_fee - other_deductions - insurance_fee

def compute_apr(t: LoanTerms) -> dict:
    _validate(t)
    cost = t.repayment_amount - t.disbursed_amount
    period_rate = cost / t.disbursed_amount                 # e.g. 1500/3500 = 0.4286
    simple_apr = period_rate * (365 / t.tenure_days) * 100  # RBI-style simple annualised
    # compounded effective annual rate (display-capped)
    try:
        compounded = (math.pow(1 + period_rate, 365 / t.tenure_days) - 1) * 100
    except OverflowError:
        compounded = float("inf")
    return {
        "disbursed": round(t.disbursed_amount, 2),
        "repayment": round(t.repayment_amount, 2),
        "total_cost": round(cost, 2),
        "cost_pct_of_received": round(period_rate * 100, 2),
        "simple_apr_pct": round(simple_apr, 2),
        "compounded_apr_pct": None if compounded == float("inf") else round(compounded, 2),
        "tenure_days": t.tenure_days,
    }

def verdict(apr_simple: float, tenure_days: int, cost_pct_of_received: float,
            safe_max: float = 36.0, risky_max: float = 100.0) -> str:
    if apr_simple > risky_max or (tenure_days <= 30 and cost_pct_of_received >= 10):
        return "PREDATORY"
    if apr_simple > safe_max:
        return "RISKY"
    return "SAFE"

# Reference EMI for multi-month loans (reducing balance); use IRR for APR
def emi_irr_apr(disbursed: float, emi: float, n_months: int) -> float:
    """Monthly IRR via bisection, annualised x12 (nominal APR)."""
    if n_months <= 0 or disbursed <= 0 or emi <= 0:
        return 0.0
    total_repayment = emi * n_months
    if total_repayment <= disbursed:
        return 0.0
    lo, hi = 0.0, 1.0
    for _ in range(200):
        mid = (lo + hi) / 2
        if mid == 0:
            pv = emi * n_months
        else:
            pv = emi * (1 - (1 + mid) ** (-n_months)) / mid
        if pv > disbursed:
            lo = mid
        else:
            hi = mid
    return round(((lo + hi) / 2) * 12 * 100, 2)
