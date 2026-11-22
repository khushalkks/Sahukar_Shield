"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  PhoneCall,
  ArrowRight,
  Calculator,
  AlertTriangle,
  Landmark,
  Scale,
  Users,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Lock,
  FileText,
  LayoutDashboard,
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  Building2,
  Clock,
  Sparkles,
  Search,
} from "lucide-react";

export default function LandingPage() {
  const [loanPrincipal, setLoanPrincipal] = useState<number>(5000);
  const [loanTenure, setLoanTenure] = useState<number>(7);
  const [processingCut, setProcessingCut] = useState<number>(1750); // ₹1,750 upfront cut

  // Live calculation for the comparison widget
  const disbursed = Math.max(1, loanPrincipal - processingCut);
  const totalCost = loanPrincipal - disbursed;
  const simpleApr = Math.round((totalCost / disbursed) * (365 / loanTenure) * 100);

  return (
    <div className="text-zinc-900 min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      {/* ========================================================
          HERO SECTION
      ======================================================== */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Institutional Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-emerald-900 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>RBI Fair Practices Code • 100% Private • Zero Data Retention</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.12]">
            Institutional Credit Defense. <br />
            <span className="text-emerald-600">Expose 2,000%+ Usury.</span> <br />
            <span className="text-zinc-900">Defend Your Rights.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Predatory 7-day loan apps charge over 2,000% hidden interest, deduct up to 40% upfront as illegal fees, and harass family contacts. Sahukar Shield provides instant RBI verification, true APR calculations, and official cybercrime legal defense.
          </p>

          {/* Primary CTA Hub */}
          <div className="pt-3 flex flex-col sm:flex-row justify-center items-center gap-3">
            {/* Primary Action Button to Dashboard */}
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm shadow-sm flex items-center justify-center space-x-2.5 transition-all hover:scale-102 active:scale-98"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Launch All-in-One Dashboard</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </Link>

            {/* Quick check button */}
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-sm border border-zinc-200 shadow-2xs flex items-center justify-center space-x-2 transition-all"
            >
              <Landmark className="w-4 h-4 text-emerald-600" />
              <span>Check Loan App Legality</span>
            </Link>
          </div>

          {/* Security & Regulatory Strip */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs font-semibold text-zinc-500">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>9,000+ RBI NBFCs Indexed</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Deterministic Python Math</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Account or Sign-up Needed</span>
            </div>
          </div>
        </div>

        {/* Emergency Assistance Hotline Callout */}
        <div className="max-w-4xl mx-auto mt-10 p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5 text-left">
            <div className="p-3 bg-rose-600 rounded-xl text-white shrink-0 shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-rose-950 text-sm sm:text-base">
                Facing WhatsApp Blackmail, Morphed Photos, or Contact Harassment?
              </p>
              <p className="text-xs sm:text-sm text-rose-800 font-medium mt-0.5">
                Recovery agents have <strong>NO legal right</strong> to call your contacts or relatives under Section 126 of the Contract Act.
              </p>
            </div>
          </div>
          <a
            href="tel:1930"
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-transform hover:scale-102 shadow-xs"
          >
            Dial 1930 Helpline Free
          </a>
        </div>
      </section>

      {/* ========================================================
          INSTITUTIONAL METRICS ROW
      ======================================================== */}
      <section className="border-y border-zinc-200/80 bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-sans">9,400+</p>
            <p className="text-xs sm:text-sm font-semibold text-zinc-500">RBI Regulated NBFCs in Master Database</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-rose-600 font-sans">2,235%</p>
            <p className="text-xs sm:text-sm font-semibold text-zinc-500">Average Hidden APR on 7-Day Loan Apps</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-sans">₹0 / 100%</p>
            <p className="text-xs sm:text-sm font-semibold text-zinc-500">Free Consumer Defense &amp; Client Privacy</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-sans">BNS § 308</p>
            <p className="text-xs sm:text-sm font-semibold text-zinc-500">Non-Bailable Extortion Statutes Enforced</p>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE FINANCIAL ANATOMY: PREDATORY VS REGULATED
      ======================================================== */}
      <section id="comparison" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
            Financial Usury Deconstruction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            How 7-Day Loan Apps Trap You in 2,000%+ Debt
          </h2>
          <p className="text-sm sm:text-base font-medium text-zinc-600">
            Predatory lenders market &quot;0.1% daily interest&quot; to appear harmless. Here is the mathematically proven reality of how ₹5,000 turns into an illegal debt spiral:
          </p>
        </div>

        {/* Side-by-Side Financial Reality Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Illegal 7-Day Loan App (Usury Trap) */}
          <div className="bg-rose-50/50 border border-rose-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-rose-200/60 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-200/70 text-rose-950">
                  Illegal Loan App Trap
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-rose-950 mt-1">
                  &quot;InstantRupee / QuickCash 7-Day&quot;
                </h3>
              </div>
              <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            {/* Financial Numbers */}
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-rose-200/70 text-xs font-semibold text-zinc-800 shadow-2xs">
              <div className="flex justify-between">
                <span className="text-zinc-600">Stated Loan Amount:</span>
                <span className="text-zinc-950 text-sm font-bold">₹5,000</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Upfront Processing Deductions (35%):</span>
                <span>-₹1,750</span>
              </div>
              <div className="flex justify-between border-t border-zinc-100 pt-2 font-bold text-sm">
                <span>Actual Cash Disbursed to Bank:</span>
                <span className="text-zinc-950">₹3,250</span>
              </div>
              <div className="flex justify-between text-rose-700">
                <span>Repayment Demanded in 7 Days:</span>
                <span>₹5,000</span>
              </div>
              <div className="p-3 bg-rose-100/70 rounded-xl border border-rose-200 flex items-center justify-between text-rose-950 font-bold text-sm">
                <span>True Effective Annual APR:</span>
                <span className="text-xl">2,809% p.a.</span>
              </div>
            </div>

            {/* Predatory Mechanics */}
            <ul className="space-y-2 text-xs font-medium text-rose-950">
              <li className="flex items-start space-x-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>No RBI License:</strong> Operates through offshore APKs and mule UPI handles.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Contacts Blackmail:</strong> Reads your address book to threaten relatives and coworkers.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Fake Legal Notices:</strong> Distributes forged police summons on WhatsApp (BNS § 318 fraud).</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Regulated Indian Bank / NBFC Loan */}
          <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950">
                  RBI Regulated Institution
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 mt-1">
                  Scheduled Commercial Bank / NBFC
                </h3>
              </div>
              <div className="p-2.5 bg-emerald-700 text-white rounded-xl shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
            </div>

            {/* Financial Numbers */}
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-emerald-200/70 text-xs font-semibold text-zinc-800 shadow-2xs">
              <div className="flex justify-between">
                <span className="text-zinc-600">Stated Loan Amount:</span>
                <span className="text-zinc-950 text-sm font-bold">₹5,000</span>
              </div>
              <div className="flex justify-between text-emerald-800">
                <span>Transparent Processing Fee (1% + GST):</span>
                <span>-₹59</span>
              </div>
              <div className="flex justify-between border-t border-zinc-100 pt-2 font-bold text-sm">
                <span>Actual Cash Disbursed to Bank:</span>
                <span className="text-zinc-950">₹4,941</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>Repayment Period:</span>
                <span>3 to 12 Months EMI</span>
              </div>
              <div className="p-3 bg-emerald-100/70 rounded-xl border border-emerald-200 flex items-center justify-between text-emerald-950 font-bold text-sm">
                <span>True Annual Percentage Rate:</span>
                <span className="text-xl">12.5% p.a.</span>
              </div>
            </div>

            {/* Legitimate Safeguards */}
            <ul className="space-y-2 text-xs font-medium text-emerald-950">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span><strong>Mandatory Key Fact Statement (KFS):</strong> Full breakdown of every fee before approval.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span><strong>Zero Contact Harvesting:</strong> Strictly forbidden from accessing contacts or gallery.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span><strong>RBI Ombudsman Recourse:</strong> Regulated grievance officer with 30-day resolution timeline.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Direct Action Link to Dashboard Calculator */}
        <div className="text-center pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-sm font-bold text-zinc-900 hover:text-emerald-600 underline underline-offset-4 transition-colors"
          >
            <span>Audit your own loan terms inside the Dashboard Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          ALL-IN-ONE DASHBOARD SHOWCASE (CENTRAL WORKSPACE)
      ======================================================== */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/80 pb-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold">
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                <span>CENTRALIZED FEATURE WORKSPACE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                Everything You Need in One Unified Dashboard
              </h2>
              <p className="text-sm sm:text-base font-medium text-zinc-600">
                No disjointed apps or scattered forms. Access all 6 legal, financial, and regulatory consumer defense tools in a single interactive dashboard.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm shadow-xs transition-all hover:scale-102 shrink-0"
            >
              <span>Open Full Dashboard</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>

          {/* 6 Core Integrated Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tool 1: RBI Verifier */}
            <div className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200 hover:border-emerald-300 hover:bg-white hover:shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">1. RBI NBFC Verifier</h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  Search 9,000+ RBI registered scheduled commercial banks and NBFCs. Detect rogue APKs pretending to be registered entities.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-2"
              >
                <span>Run App Check in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 2: True APR Usury Engine */}
            <div className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200 hover:border-emerald-300 hover:bg-white hover:shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">2. True APR Usury Engine</h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  Deterministic mathematical calculator factoring in upfront processing deductions, GST, and 7-day tenures to expose compounding rates.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-2"
              >
                <span>Calculate APR in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 3: Threat & Harassment Classifier */}
            <div className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200 hover:border-rose-300 hover:bg-white hover:shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">3. Threat &amp; Extortion Analyzer</h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  Paste abusive WhatsApp or SMS messages. Maps every violation to BNS § 308 (Extortion) and IT Act § 66E (Privacy Violation).
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 pt-2"
              >
                <span>Analyze Threats in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 4: Cybercrime Police FIR Generator */}
            <div className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200 hover:border-zinc-400 hover:bg-white hover:shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">4. Police FIR Complaint Dossier</h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  Generate official submission-ready complaint letters and court-admissible evidence PDFs for cybercrime.gov.in and police stations.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-zinc-900 hover:text-emerald-700 pt-2"
              >
                <span>Build Legal Dossier in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 5: Family & Contact Protection Notice */}
            <div className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200 hover:border-purple-300 hover:bg-white hover:shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">5. Family Protection Advisory</h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  Pre-drafted WhatsApp legal notice citing Contract Act Section 126 to send to relatives so they know they have zero financial liability.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 pt-2"
              >
                <span>Generate Notice in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 6: Live Scam Watchlist */}
            <div className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200 hover:border-emerald-300 hover:bg-white hover:shadow-sm transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">6. National Scam Watchlist</h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  Search live database of flagged predatory digital lending syndicates, fraudulent UPI IDs, and blacklisted APK filenames.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-2"
              >
                <span>Search Watchlist in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Banner: Go to Dashboard Now */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-lg font-bold">
                Ready to protect yourself or audit a suspicious loan?
              </p>
              <p className="text-xs sm:text-sm font-normal text-zinc-400">
                100% confidential. No login required. Zero personal data leaves your browser.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all hover:scale-102 shadow-xs"
            >
              Enter Dashboard Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          STATUTORY BORROWER RIGHTS (INDIAN LAW)
      ======================================================== */}
      <section id="rules" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
            Statutory Legal Protections
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Know Your 4 Non-Negotiable Legal Rights
          </h2>
          <p className="text-sm sm:text-base font-medium text-zinc-600">
            Predatory recovery agents use fear and legal illiteracy. The Supreme Court of India and the Reserve Bank of India guarantee these fundamental protections:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-2.5 shadow-2xs">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="text-base font-bold text-zinc-950">
                Family &amp; Contacts Have ZERO Legal Liability
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
              Under Section 126 of the Indian Contract Act (1872), someone only becomes a guarantor if they sign a formal written deed. Calling or threatening your relatives or contacts is illegal criminal intimidation.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-2.5 shadow-2xs">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="text-base font-bold text-zinc-950">
                Lenders Are FORBIDDEN from Accessing Phone Contacts
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
              Under RBI Digital Lending Guidelines (August 2022) and Google Play Financial Services Policy, loan apps cannot request permission for contacts, device storage, or media galleries.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-2.5 shadow-2xs">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="text-base font-bold text-zinc-950">
                Morphed Photos &amp; Threats Are Severe Criminal Offenses
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
              Circulating morphed photos or threatening defamation violates Bharatiya Nyaya Sanhita (BNS § 308 - Extortion) and IT Act § 66E / 67. These are cognizable offenses carrying up to 7 years imprisonment.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-2.5 shadow-2xs">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-900 font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="text-base font-bold text-zinc-950">
                Fake Court Summons on WhatsApp Are Fraud
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
              Indian courts and police NEVER serve arrest warrants, summons, or legal notices via informal WhatsApp messages or unregistered VoIP calls. Impersonating public officers is punishable under BNS § 204.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
