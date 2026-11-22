# Sahukar Shield 🛡️
### *Institutional Credit Defense & Consumer Protection Against Predatory Digital Lending Syndicates*

[![Arthon Hackathon](https://img.shields.io/badge/Arthon%20Hackathon-FinTech%20%26%20Consumer%20Defense-emerald.svg?style=for-the-badge)](#the-problem-in-india)
[![Deterministic Math](https://img.shields.io/badge/APR%20Engine-100%25%20Deterministic%20Python-blue.svg?style=for-the-badge)](#1-deterministic-apr-usury-engine)
[![RBI Registry Matcher](https://img.shields.io/badge/RBI%20Matcher-9%2C400%2B%20NBFCs%20Indexed-teal.svg?style=for-the-badge)](#2-rbi-registry--permission-risk-engine)
[![Zero Data Retention](https://img.shields.io/badge/Privacy-100%25%20Ephemeral%20Memory-purple.svg?style=for-the-badge)](#security--zero-retention-privacy)
[![Statutory Law](https://img.shields.io/badge/Legal%20Mapping-BNS%202023%20%7C%20IT%20Act-navy.svg?style=for-the-badge)](#3-threat-classifier--statutory-mapping)

---

## 📌 Executive Summary (Hackathon Submission)

In India, **unauthorized 7-day instant loan apps** have created an acute national crisis. Distributed through social media advertisements and sideloaded APKs, these predatory syndicates target low-income and financially vulnerable citizens with deceptive promises of *"instant cash without credit checks"*. 

In reality, borrowers are trapped in an aggressive debt spiral:
1. **Hidden 2,000%+ APR:** Advertised as "0.1% daily interest", but with 35% upfront fee deductions on a 7-day term, the real effective APR exceeds **2,200% to 3,000% p.a.**
2. **Device Doxing & Contact Harvesting:** Rogue APKs demand access to phone contacts and photo galleries in violation of Google Play policies and RBI directives.
3. **Blackmail & Social Extortion:** When borrowers cannot repay within 7 days, recovery syndicates send morphed obscene photos, fake police arrest warrants, and abusive WhatsApp messages to everyone in their contact list.
4. **Legal Illiteracy Trap:** Victims and their families rarely know that under **Section 126 of the Indian Contract Act**, relatives and contacts bear **zero legal liability** for someone else's loan.

**Sahukar Shield** is an end-to-end, privacy-first consumer credit defense platform. It equips citizens and law enforcement with instant RBI entity verification, deterministic true APR calculation, automated statutory legal violation mapping under the **Bharatiya Nyaya Sanhita (BNS 2023)**, and court-ready cybercrime FIR complaint dossiers.

---

## 🏛️ System Architecture

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

## 🌟 Core Features & Modules

### 1. Deterministic APR Usury Engine
- **Pure Python Mathematics:** Never relies on LLMs for calculations.
- **Deconstructs Hidden Costs:** Accurately deducts processing fees, GST, insurance, and calculates simple and compounding Annual Percentage Rates (APR).
- **RBI Key Fact Statement (KFS) Audit:** Evaluates whether mandatory look-up periods, APR disclosures, and nodal grievance officers were provided.

### 2. RBI Registry & Permission Risk Engine
- **Master Directory Search:** Indexes over 9,400+ Scheduled Commercial Banks and RBI-Registered NBFCs using token-ratio fuzzy matching.
- **Permission Threat Score (0–100):** Automatically scores Android app manifest permissions (`READ_CONTACTS`, `ACCESS_MEDIA_IMAGES`, `READ_SMS`) against RBI August 2022 Digital Lending Guidelines.
- **Three-Tier Verdict:** 🟢 **GREEN** (Regulated), 🟡 **AMBER** (Unverified), 🔴 **RED** (Known Predatory / Delisted Syndicate).

### 3. Threat Classifier & Statutory Legal Mapping
- **Criminal Law Mapping:** Automatically tags recovery harassment messages to:
  - **BNS § 308 (IPC § 384):** Extortion under threat of injury or reputation damage (Up to 7 years imprisonment).
  - **BNS § 351(2) (IPC § 506):** Criminal intimidation.
  - **BNS § 79 & IT Act § 66E / 67:** Obscene communication and privacy violations.
  - **BNS § 318 & § 204:** Forged court summons and impersonation of public servants.
- **Severity Index (1 to 5):** Flags non-bailable extortion syndicates for prioritized police intervention.

### 4. Official Cybercrime Police FIR Dossier Generator
- **ReportLab PDF Engine:** Compiles user evidence, loan terms, and WhatsApp threat transcripts into a structured, court-admissible complaint affidavit.
- **Ready for `cybercrime.gov.in`:** Formatted specifically for National Cyber Crime Portal filings and local cyber cell police stations.
- **1930 Call Script:** Provides a structured 30-second telephone script for calling the National Cyber Helpline.

### 5. Family & Contact Shield (WhatsApp Advisory)
- **Indian Contract Act § 126:** Explains in plain, calming language (Hindi, Hinglish, English) that contacts are **NOT guarantors** and have zero legal or financial liability.
- **1-Click Share:** Generates pre-written legal advisories ready to share with relatives and friends who are being harassed by recovery agents.

### 6. National Scam Watchlist & All-in-One Dashboard
- **Unified Central Workspace:** Every tool is directly operable inside a single interactive dashboard at `/dashboard`.
- **Telemetry & Patterns:** Real-time trends tracking top flagged app names, common predatory tenure lengths, and state-wise complaint distribution.

---

## 🔒 Security & Zero-Knowledge Privacy Architecture

1. **Zero Database Retention:** Sahukar Shield does not use a user database or persistent storage for borrower data.
2. **Ephemeral Memory Processing:** All loan calculations, uploaded screenshots, and message texts are evaluated in-memory and immediately discarded.
3. **Client-Side Safety:** No user identity, phone numbers, or contact lists are ever retained, sold, or transmitted to third parties.

---

## 💻 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling & Design System** | Tailwind CSS (Modern FinTech Zinc `#FAFAFA` palette), Lucide Icons |
| **Backend Framework** | FastAPI (Python 3.11+ / 3.13), Uvicorn, Pydantic v2 |
| **Algorithms & Math** | Pure Python (`apr_engine.py`), RapidFuzz token matcher (`rbi_match.py`) |
| **Document Generation** | ReportLab (In-memory court-admissible PDF generator) |
| **Quality & Tests** | Pytest, 20-case test benchmark (`test_cases.csv`), Next.js production build |

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js:** v18+ (tested on Node v20/v22)
- **Python:** v3.11+ (tested on Python 3.13)
- **Git**

### 2. Backend Installation & Startup
```powershell
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt pillow

# Run automated tests to verify math & matching
python -m pytest tests/

# Start FastAPI server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
*API Swagger documentation will be available at:* `http://localhost:8000/docs`

### 3. Frontend Installation & Startup
```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build production bundle
npm run build

# Start Next.js development server
npm run dev
```
*Web application will be accessible at:* `http://localhost:3000`

---

## 🧪 Verified Test Suite & Benchmark

The project includes an automated test harness validating both algorithmic math and statutory logic:

```powershell
backend\venv\Scripts\python -m pytest backend/tests/ -v
```

### Benchmark Results:
- ✅ **Worked Example:** `5,000 principal`, `3,500 disbursed`, `7 days` -> **2,234.69% APR** -> Classified as `PREDATORY`.
- ✅ **20/20 Test Cases:** Verified in `backend/tests/test_cases.csv` within 0.5% mathematical tolerance.
- ✅ **30/30 Entity Match Queries:** Exact matches, typos, noise-word filtering, and package ID matching verified in `backend/tests/test_match.py`.
- ✅ **Production Build:** All 11 Next.js routes compile statically with **0 TypeScript and 0 linting errors**.

---

## ⚖️ Official Regulatory & Legal References

- **National Cyber Crime Helpline:** Dial `1930` (Toll-Free, 24/7)
- **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in](https://cybercrime.gov.in)
- **RBI Sachet (Report Unregistered Financial Entities):** [https://sachet.rbi.org.in](https://sachet.rbi.org.in)
- **RBI Complaint Management System (CMS):** [https://cms.rbi.org.in](https://cms.rbi.org.in)
- **Statutory Criminal Law:** Bharatiya Nyaya Sanhita (BNS 2023) § 308, § 351, § 356; IT Act 2000 § 66E, § 67; Indian Contract Act 1872 § 126.

---

## 📜 License
MIT License. Built for citizen consumer protection, financial literacy, and cyber defense.
