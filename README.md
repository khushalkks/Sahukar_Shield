# Sahukar Shield 🛡️
### *Institutional Credit Defense & Consumer Protection Against Predatory Digital Lending Syndicates*

[![Arthon Hackathon](https://img.shields.io/badge/Arthon%20Hackathon-FinTech%20%26%20Consumer%20Defense-emerald.svg?style=for-the-badge)](#-1-what-sahukar-shield-does)
[![AI Powered](https://img.shields.io/badge/AI%20Models-Claude%203.5%20Sonnet%20%2B%20Vision-orange.svg?style=for-the-badge)](#-2-ai-models--apis-used)
[![Deterministic Math](https://img.shields.io/badge/APR%20Engine-100%25%20Deterministic%20Python-blue.svg?style=for-the-badge)](#2-true-apr-usury-engine)
[![RBI Registry Matcher](https://img.shields.io/badge/RBI%20Matcher-9%2C400%2B%20NBFCs%20Indexed-teal.svg?style=for-the-badge)](#1-lender-rbi-registry-verifier)
[![Zero Data Retention](https://img.shields.io/badge/Privacy-100%25%20Ephemeral%20Memory-purple.svg?style=for-the-badge)](#-5-zero-knowledge-privacy--security-architecture)
[![Statutory Law](https://img.shields.io/badge/Legal%20Mapping-BNS%202023%20%7C%20IT%20Act-navy.svg?style=for-the-badge)](#3-threat-classifier--statutory-mapping)

---

## 📌 Executive Summary

In India, **unauthorized 7-day instant loan apps** have created an acute national crisis. Distributed through social media advertisements and sideloaded APKs, these predatory syndicates target low-income and financially vulnerable citizens with deceptive promises of *"instant cash without credit checks"*. 

In reality, borrowers are trapped in an aggressive debt spiral:
1. **Hidden 2,000%+ APR:** Advertised as "0.1% daily interest", but with 35% upfront fee deductions on a 7-day term, the real effective APR exceeds **2,200% to 3,000% p.a.**
2. **Device Doxing & Contact Harvesting:** Rogue APKs demand access to phone contacts and photo galleries in violation of Google Play policies and RBI directives.
3. **Blackmail & Social Extortion:** When borrowers cannot repay within 7 days, recovery syndicates send morphed obscene photos, fake police arrest warrants, and abusive WhatsApp messages to everyone in their contact list.
4. **Legal Illiteracy Trap:** Victims and their families rarely know that under **Section 126 of the Indian Contract Act**, relatives and contacts bear **zero legal liability** for someone else's loan.

**Sahukar Shield** is an end-to-end, privacy-first consumer credit defense platform. It equips citizens and law enforcement with instant RBI entity verification, deterministic true APR calculation, automated statutory legal violation mapping under the **Bharatiya Nyaya Sanhita (BNS 2023)**, and court-ready cybercrime FIR complaint dossiers.

---

## 💡 1. What Sahukar Shield Does

Sahukar Shield integrates 6 specialized consumer defense tools into one unified command center:

### 1. Lender RBI Registry Verifier
- **Master Directory Search:** Indexes **9,400+** Scheduled Commercial Banks and RBI-Registered NBFCs using RapidFuzz token matching.
- **Permission Threat Score (0–100):** Analyzes requested Android permissions (`READ_CONTACTS`, `ACCESS_MEDIA_IMAGES`, `READ_SMS`) against the RBI August 2022 Digital Lending Guidelines.
- **Three-Tier Verdict:** 🟢 **GREEN** (Regulated NBFC/Bank), 🟡 **AMBER** (Unverified Entity), 🔴 **RED** (Known Predatory / Delisted Syndicate).

### 2. True APR Usury Engine
- **Deterministic Mathematics (Pure Python):** Exposes deceptive "daily interest rates" by accurately factoring in upfront processing deductions, GST, insurance, and 7-to-15 day tenures.
- **Compounding Usury Calculation:** Mathematical formulas reveal true simple and effective APRs exceeding 2,000%+ p.a.
- **Key Fact Statement (KFS) Audit:** Evaluates whether mandatory cooling-off/look-up periods, APR disclosures, and nodal grievance officers were provided.

### 3. Threat Classifier & Statutory Legal Mapping
- **Criminal Statute Mapping:** Automatically classifies WhatsApp, SMS, and call transcripts, mapping every recovery infraction to:
  - **BNS § 308 (IPC § 384):** Extortion under threat of injury or reputation damage (Up to 7 years imprisonment, non-bailable).
  - **BNS § 351(2) (IPC § 506):** Criminal intimidation.
  - **BNS § 79 & IT Act § 66E / 67:** Obscene communication and privacy violations.
  - **BNS § 318 & § 204:** Forged court summons and impersonation of public servants.
- **Severity Index (1 to 5):** Flags non-bailable extortion syndicates for prioritized police intervention.

### 4. Official Cybercrime Police FIR Dossier Generator
- **ReportLab PDF Engine:** Compiles user evidence, loan terms, and WhatsApp threat transcripts into a structured, court-admissible complaint affidavit.
- **Ready for `cybercrime.gov.in`:** Formatted specifically for National Cyber Crime Portal filings and local cyber cell police stations.
- **30-Second 1930 Script:** Provides an actionable telephone script for calling the National Cyber Helpline.

### 5. Family & Contact Shield (WhatsApp Advisory)
- **Indian Contract Act § 126:** Explains in plain, calming language (Hindi, Hinglish, English) that contacts are **NOT guarantors** and have zero legal or financial liability.
- **1-Click Share:** Generates pre-written legal advisories ready to share with relatives and friends who are being harassed by recovery agents.

### 6. National Scam Watchlist & Central Dashboard
- **All-in-One Dashboard:** Every tool is directly accessible inside an interactive central workspace (`/dashboard`).
- **Telemetry & Patterns:** Real-time trends tracking top flagged app names, common predatory tenure lengths, and state-wise complaint distribution.

---

## 🤖 2. AI Models & APIs Used

Sahukar Shield follows an **Architectural Division of Labor**: **Math is code; AI is language and vision.**

```
┌────────────────────────────────────────────────────────────────────────┐
│                   AI & ALGORITHMIC ARCHITECTURE                        │
├───────────────────────────────────┬────────────────────────────────────┤
│ Vision & Multimodal Extraction    │ Claude 3.5 Sonnet Vision API       │
│ Threat & Harassment NLP           │ Claude 3.5 Sonnet / Anthropic API  │
│ Legal Complaint Drafting          │ Claude 3.5 Sonnet                  │
│ Plain-Language Explainability     │ Claude 3.5 Sonnet (Hinglish/Hindi) │
│ Interest & APR Calculations       │ 100% Deterministic Python (No LLM) │
│ Entity Registry Matching          │ RapidFuzz Token Matcher (No LLM)   │
│ Offline Emergency Fallback        │ Regex Heuristics & Local Fallback  │
└───────────────────────────────────┴────────────────────────────────────┘
```

### Detailed Breakdown of AI Models & APIs:

1. **Anthropic Claude 3.5 Sonnet (`claude-sonnet-4-5` via Anthropic Messages API):**
   - **Multimodal Screenshot Term Extractor (`extract_from_image`):**
     - Accepts screenshots of digital loan approval cards, sanction letters, and SMS loan offers.
     - Performs zero-shot OCR and structured entity extraction to isolate: `principal`, `processing_fee`, `gst_on_fee`, `disbursed_amount`, `repayment_amount`, and `tenure_days`.
     - Validates presence of mandatory Key Fact Statement (KFS) elements and grievance officer contacts.
   - **Multilingual Threat & Blackmail Classifier (`classify_threat_messages`):**
     - Classifies aggressive Hinglish, Hindi, and English recovery messages into 8 distinct threat labels (`morphed_photo_threat`, `blackmail`, `contact_threat`, `fake_legal_threat`, `abusive_language`, `impersonation_of_authority`, `payment_pressure`, `neutral_reminder`).
     - Scores severity from 1 (mild reminder) to 5 (critical criminal extortion).
   - **Factual Cybercrime Complaint Synthesis (`build_complaint_draft`):**
     - Synthesizes borrower timeline logs, evidence filenames, and loan amounts into a formal, chronological legal complaint petition for the Cyber Crime Police Station / National Cyber Crime Portal.
   - **Empathetic Family Protection Advisory (`generate_family_response`):**
     - Translates Section 126 Contract Act non-liability into calm, empowering Hindi/Hinglish WhatsApp text messages.

2. **The "Code-First Math" Guardrail (Zero Hallucination Guarantee):**
   - **Critical Architectural Principle:** **NO LLM ever calculates interest rates, processing cuts, or APR.**
   - All financial numbers are computed using pure deterministic Python mathematics (`apr_engine.py`).
   - The LLM is strictly provided with the *already-computed* mathematical results and is instruction-bound to quote them without modification.

3. **100% Offline Rule-Engine & Regex Fallbacks:**
   - To ensure mission-critical resilience even without an active Anthropic API key or internet access, Sahukar Shield includes a built-in heuristic regex engine (`KEYWORD_RULES`) and pre-saved synthetic demo fallbacks (`demo_fallbacks.json`).
   - The application will **never crash** or fail to evaluate an emergency extortion case.

---

## 🏛️ 3. System Architecture Diagram

```
                       [ CITIZEN / BORROWER ]
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
[ Modern FinTech Web App ]                       [ Responsive Mobile UI ]
Next.js 14 (App Router) + TypeScript             Tailwind CSS (Zinc/Emerald Theme)
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  │ JSON / Multipart / Web Speech
                                  ▼
                     [ FastAPI High-Performance Backend ]
                     (Stateless, Ephemeral In-Memory)
  ┌───────────────────────────────┼───────────────────────────────┐
  ▼                               ▼                               ▼
[ Module 1: RBI Matcher ]    [ Module 2: APR Engine ]    [ Module 3: Threat Shield ]
• RapidFuzz token index       • Pure Deterministic Math   • BNS 2023 § 308 Extortion
• 9,400+ Banks & NBFCs        • Upfront fee deconstruct   • IT Act § 66E / 67 Privacy
• Android permission risk     • KFS fair practice check   • Evidence classification
  │                               │                               │
  └───────────────────────────────┼───────────────────────────────┘
                                  ▼
           ┌─────────────────────────────────────────────┐
           │        OUTPUT & LEGAL ACTION HUB            │
           ├─────────────────────────────────────────────┤
           │ 1. Downloadable Police FIR Affidavit (PDF)  │
           │ 2. Section 126 Family Protection WhatsApp   │
           │ 3. 1930 Cyber Helpline Action Script        │
           │ 4. Unified All-in-One Dashboard Workspace   │
           └─────────────────────────────────────────────┘
```

---

## 🛠️ 4. How to Run the Application

Follow these simple step-by-step instructions to run both the backend and frontend locally.

### Prerequisites
- **Node.js:** v18.0.0+ (tested on Node v20/v22)
- **Python:** v3.11+ (tested on Python 3.13)
- **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/khushalkks/Sahukar_Shield.git
cd Sahukar_Shield
```

---

### Step 2: Backend Setup (FastAPI)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create and activate a Python virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# 3. Install required Python packages
pip install -r requirements.txt pillow

# 4. (Optional) Configure Anthropic API Key
# If no key is provided, the built-in offline demo fallback runs seamlessly
cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY=your_key_here

# 5. Run the automated test suite to verify math and endpoints
python -m pytest tests/ -v

# 6. Start the FastAPI development server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

- **Backend API URL:** `http://localhost:8000`
- **Interactive Swagger API Documentation:** `http://localhost:8000/docs`

---

### Step 3: Frontend Setup (Next.js 14)

Open a new terminal window:

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install Node dependencies
npm install

# 3. (Optional) Configure environment variables
# Defaults to http://localhost:8000 if omitted
cp .env.local.example .env.local

# 4. Verify production build
npm run build

# 5. Start Next.js development server
npm run dev
```

- **Web Application URL:** `http://localhost:3000`
- **All-in-One Dashboard:** `http://localhost:3000/dashboard`

---

## 🔒 5. Zero-Knowledge Privacy & Security Architecture

1. **Zero Database Retention:** Sahukar Shield has no user database. No borrower names, phone numbers, loan terms, or contact lists are ever saved to disk or persistent tables.
2. **Ephemeral Memory Processing:** All loan calculations, uploaded screenshots, and message texts are evaluated in-memory and immediately discarded.
3. **Client-Side Safety:** No tracking cookies, third-party analytics scripts, or data brokers are integrated.
4. **EXIF Stripping:** Uploaded loan screenshots have all camera, GPS, and device metadata automatically stripped in-memory before evaluation.

---

## 🧪 6. Verified Test Suite & Benchmark

The project includes an automated test harness validating both algorithmic math and statutory logic:

```bash
backend\venv\Scripts\python -m pytest backend/tests/ -v
```

### Benchmark Results:
- ✅ **Worked Example:** `5,000 principal`, `3,500 disbursed`, `7 days` -> **2,234.69% APR** -> Classified as `PREDATORY`.
- ✅ **20/20 Test Cases:** Verified in `backend/tests/test_cases.csv` within 0.5% mathematical tolerance.
- ✅ **30/30 Entity Match Queries:** Exact matches, typos, noise-word filtering, and package ID matching verified in `backend/tests/test_match.py`.
- ✅ **Production Build:** All 11 Next.js routes compile statically with **0 TypeScript and 0 linting errors**.

---

## ⚖️ 7. Official Regulatory & Legal References

- **National Cyber Crime Helpline:** Dial `1930` (Toll-Free, 24/7)
- **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **RBI Sachet (Report Unregistered Financial Entities):** [https://sachet.rbi.org.in](https://sachet.rbi.org.in)
- **RBI Complaint Management System (CMS):** [https://cms.rbi.org.in](https://cms.rbi.org.in)
- **Statutory Criminal Law:** Bharatiya Nyaya Sanhita (BNS 2023) § 308 (Extortion), § 351 (Criminal Intimidation), § 356 (Defamation); IT Act 2000 § 66E (Privacy), § 67 (Obscenity); Indian Contract Act 1872 § 126 (Guarantor definition).

---

## 📜 8. License
MIT License. Built for citizen consumer protection, financial literacy, and cyber defense.
