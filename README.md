# Sahukar_Shield

> **"Loan lene se pehle check karo. Asli byaj jaano. Dhamki mile to jawab do."**  
> *"Check before borrowing. Know the true interest. Respond to threats."*

[![Python Tests](https://img.shields.io/badge/pytest-20%2F20%20APR%20Passed-emerald.svg)](#testing--accuracy-harness)
[![RBI Matcher](https://img.shields.io/badge/matcher-30%2F30%20Queries%20Passed-blue.svg)](#testing--accuracy-harness)
[![Zero Data Storage](https://img.shields.io/badge/Privacy-100%25%20Ephemeral%20Memory-teal.svg)](#security--zero-retention-privacy)
[![Languages](https://img.shields.io/badge/i18n-Hinglish%20%7C%20Hindi%20%7C%20English-navy.svg)](#languages--i18n)

Sahukar Shield is a responsive, mobile-first consumer protection web platform designed to defend Indian borrowers against predatory digital lending applications (unauthorized 7-to-15 day loan apps), extortionate hidden interest traps (APR > 2,000%), and unlawful recovery agent harassment.

---

## 1. Core Architecture & Pipeline

```
[Browser: Next.js 14 (App Router) + TypeScript + Tailwind CSS]
   |  (text / image / voice-transcript)
   v
[FastAPI Backend - Port 8000]
   |-- /api/verify      -> RapidFuzz token match + Permission Risk scoring (0-100) -> Verdict (GREEN/AMBER/RED)
   |-- /api/extract     -> Claude Vision / Regex Fallback -> Extracted structured loan terms
   |-- /api/apr         -> Deterministic apr_engine.py (Pure Math, NEVER LLM) -> APR + Verdict + KFS audit
   |-- /api/threat      -> threat.py (BNS 2023 & IT Act classification) -> Severity (1-5) + Legal rights
   |-- /api/complaint   -> complaint_builder.py + ReportLab PDF Engine -> Cybercrime-ready PDF + 1930 Script
   |-- /api/family      -> family_guide.py -> "Guarantor vs Contact" guidance + WhatsApp share card
   |-- /api/dashboard   -> Real-time analytics on common predatory patterns & avg flagged APR
   v
[Explanation Layer: Claude writes friendly Hinglish summaries quoting exact computed numbers]
```

### Key Principles
1. **Numbers are computed by CODE, never by the LLM:** APR, penalty ratios, and risk scores are 100% deterministic Python. The LLM only formats human explanations, extracts text, and drafts formal complaints.
2. **Zero user data storage:** No databases. Processing runs ephemerally in-memory; uploaded images and messages are discarded immediately.
3. **100% Offline Fallback:** If Claude API keys are unset or network fails, pre-saved deterministic rule engines and demo fallbacks ensure the app never crashes.
4. **Informational only:** Clear disclaimer on every page that this is consumer awareness, not legal advice.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons |
| **Data Visuals** | Recharts (Comparison bars, scam pie charts, 12-month trends), Custom SVG APR Gauge |
| **i18n** | React Context + JSON dictionaries (`hinglish.json`, `hi.json`, `en.json`) |
| **Voice Input** | Web Speech API (`SpeechRecognition` with `hi-IN` / `en-IN` recognition) |
| **Backend** | FastAPI, Python 3.11+, Uvicorn, Pydantic v2 |
| **Math / Scoring** | Pure Python (`apr_engine.py`), RapidFuzz token matcher (`rbi_match.py`) |
| **PDF Generation** | ReportLab with clean tabular layout and fallback font handling |
| **Testing** | pytest, 20-case test harness (`test_cases.csv`), threat evaluation harness |

---

## 3. Quickstart & Setup Guide

### Prerequisites
- Node.js 18+ (tested on Node 22)
- Python 3.11+ (tested on Python 3.13)
- Git

### Backend Setup
```bash
# 1. Navigate to backend directory
cd backend

# 2. Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt pillow

# 4. Configure environment variables (optional; demo fallback active by default)
cp .env.example .env

# 5. Start FastAPI server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
The backend API will be available at `http://localhost:8000` with interactive Swagger docs at `http://localhost:8000/docs`.

### Frontend Setup
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local

# 4. Start Next.js development server
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 4. 3-Minute Demo Walkthrough Script

1. **Home (`/`):**
   - Introduce Ramesh's story: Saw an Instagram ad for a ₹5,000 instant loan with "no credit check".
2. **App Verifier (`/verify`):**
   - Type `"QuickRupee Instant"` or paste `https://play.google.com/store/apps/details?id=com.quickrupee.instant`.
   - Select requested permissions: *Contacts, SMS, Gallery*.
   - Result: **RED VERDICT** — Not found in RBI directory, permission risk score 75/100, previously reported predatory app.
3. **True Cost X-Ray (`/cost`):**
   - Click preset sample: `"₹5,000 / 7-Day Loan"`.
   - Stated loan: ₹5,000; Deductions: ₹1,500; Disbursed: ₹3,500; Repay: ₹5,000 in 7 days.
   - Click **"Asli APR Calculate Karo"**.
   - Result: **2,234.69% APR (Predatory Loot)**. Visual semi-circle AprGauge swings into red zone, comparison bar chart contrasts against 12% bank personal loans.
4. **Threat Shield (`/threat`):**
   - Click **"Sample Dhamki Load Karein"** or paste 3 Hinglish recovery threats.
   - Result: **CRITICAL SEVERITY (Level 5/5)**. Tags: *Morphed Photo Threat, Contact Harassment, Fake FIR*. Displays applicable provisions under Bharatiya Nyaya Sanhita (BNS 2023) and IT Act 2000.
5. **Complaint Builder (`/complaint`):**
   - Click **"Is Case Ki Complaint Banao"** to import the timeline directly.
   - Complete the 4-step wizard and click **"Complaint PDF Generate Karo"**.
   - Instantly downloads a cybercrime-ready PDF with chronological incident table and provides a 30-second call script for dialling **1930**.
6. **Family Alert (`/family`):**
   - Paste the threatening message received by Ramesh's mother.
   - Generates calming Hindi reassurance explaining that contacts have zero legal liability as guarantors, plus an instant WhatsApp share card.
7. **Scam Dashboard (`/dashboard`):**
   - View top flagged apps, scam patterns (38% 7-day loans, 28% contact harassment), and monthly trends.

---

## 5. Testing & Accuracy Harness

Run the automated test suite from the repository root:

```bash
# Run deterministic APR math & RBI matcher tests
backend\venv\Scripts\python.exe -m pytest backend/tests/test_apr.py backend/tests/test_match.py -v

# Run Threat Classifier multi-label evaluation on 80 labelled samples
backend\venv\Scripts\python.exe -m backend.tests.eval_threat
```

### Verified Test Results
- **`test_worked_example`:** Passes worked test case (`5000 principal`, `3500 disbursed`, `5000 repay`, `7 days` -> `2234.69% APR` -> `PREDATORY`).
- **`test_all_20_test_cases`:** **20/20 PASS** in `backend/tests/test_cases.csv` within 0.5% tolerance.
- **`test_30_queries`:** **30/30 PASS** in `backend/tests/test_match.py` (exact matches, case insensitivity, typos, noise-word filtering, package ID matching).
- **`eval_threat.py`:** Generates `backend/eval_report.md` measuring multi-label precision/recall and severity Mean Absolute Error (MAE: 0.68).

---

## 6. How to Replace Demo Data with Real RBI Registry

The repository comes configured with synthetic demo datasets in `/backend/data/`:
1. **`rbi_apps.csv`:** Replace with the latest official RBI list of Registered NBFCs and Scheduled Commercial Banks from [RBI Official Portal](https://www.rbi.org.in). Keep the schema `app_name,package_id,lender_name,status,rbi_entity_type`.
2. **`known_flagged_apps.csv`:** Populate with crowd-sourced or law enforcement lists of delisted predatory APKs.
3. **`legal_sections.json`:** Update with updated judicial notifications or regional high court directives.

---

## 7. Verify Before Launch (Official Sources)

Before deploying to production, verify regulatory references:
- **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **National Cyber Fraud Helpline:** Dial `1930`
- **RBI Sachet (Report Unregistered Entities):** [https://sachet.rbi.org.in](https://sachet.rbi.org.in)
- **RBI Complaint Management System (CMS):** [https://cms.rbi.org.in](https://cms.rbi.org.in)
- **RBI Digital Lending Guidelines:** RBI Master Direction (September 2022) mandating Key Fact Statements (KFS), prohibition of contact list access, and cooling-off periods.
- **Statutory Criminal Law:** Transition from Indian Penal Code (IPC) to **Bharatiya Nyaya Sanhita (BNS 2023)** (Section 308 for extortion, Section 351 for criminal intimidation, Section 356 for defamation) and Information Technology Act 2000 (Section 66E for privacy violation, Section 67 for transmission of obscene material).

---

## 8. License & Privacy
- **License:** MIT License. Built for citizen protection.
- **Privacy:** 100% ephemeral processing. No user data, screenshots, or transcripts are stored on servers.
