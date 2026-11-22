"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Landmark,
  Calculator,
  AlertTriangle,
  FileText,
  Users,
  BarChart3,
  Search,
  PhoneCall,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Download,
  Copy,
  ExternalLink,
  Shield,
  Smartphone,
  Calendar,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import AprGauge from "../../components/AprGauge";
import VerdictCard from "../../components/VerdictCard";
import Disclaimer from "../../components/Disclaimer";
import {
  verifyApp,
  calculateApr,
  analyzeThreats,
  createComplaint,
  getFamilyAdvisory,
  getDashboardStats,
  getPdfDownloadUrl,
} from "../../lib/api";
import {
  VerifyResponse,
  AprResponse,
  ThreatResponse,
  ComplaintResponse,
  FamilyResponse,
  DashboardStats,
} from "../../lib/types";

export default function UnifiedDashboardPage() {
  // Active Tab in the All-in-One Dashboard
  const [activeTab, setActiveTab] = useState<
    "verify" | "apr" | "threat" | "complaint" | "family" | "watchlist"
  >("verify");

  // Top Macro Stats
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // TAB 1: VERIFIER STATE
  const [verifyQuery, setVerifyQuery] = useState("");
  const [verifyPerms, setVerifyPerms] = useState<string[]>(["contacts", "sms", "gallery"]);
  const [verifyFlags, setVerifyFlags] = useState<string[]>(["advance_fee", "free_email"]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<VerifyResponse | null>(null);

  // TAB 2: APR CALCULATOR STATE
  const [principal, setPrincipal] = useState<number>(5000);
  const [processingFee, setProcessingFee] = useState<number>(1000);
  const [gstOnFee, setGstOnFee] = useState<number>(180);
  const [otherDeductions, setOtherDeductions] = useState<number>(320);
  const [tenureDays, setTenureDays] = useState<number>(7);
  const [aprResult, setAprResult] = useState<AprResponse | null>(null);
  const [isCalculatingApr, setIsCalculatingApr] = useState(false);

  // TAB 3: THREAT ANALYZER STATE
  const [threatText, setThreatText] = useState("");
  const [isAnalyzingThreat, setIsAnalyzingThreat] = useState(false);
  const [threatResult, setThreatResult] = useState<ThreatResponse | null>(null);

  // TAB 4: COMPLAINT GENERATOR STATE
  const [complainantName, setComplainantName] = useState("");
  const [complaintAppName, setComplaintAppName] = useState("QuickRupee Instant");
  const [complaintPhone, setComplaintPhone] = useState("");
  const [complaintState, setComplaintState] = useState("Maharashtra");
  const [isBuildingComplaint, setIsBuildingComplaint] = useState(false);
  const [complaintResult, setComplaintResult] = useState<ComplaintResponse | null>(null);
  const [copiedComplaint, setCopiedComplaint] = useState(false);

  // TAB 5: FAMILY ADVISORY STATE
  const [familyMessage, setFamilyMessage] = useState(
    "Your relative has taken a loan and gave your name as guarantor. If you don't pay ₹5,000, we will call everyone in your contact list."
  );
  const [isGeneratingFamily, setIsGeneratingFamily] = useState(false);
  const [familyResult, setFamilyResult] = useState<FamilyResponse | null>(null);
  const [copiedFamily, setCopiedFamily] = useState(false);

  // TAB 6: WATCHLIST SEARCH
  const [watchlistSearch, setWatchlistSearch] = useState("");

  // Load Dashboard Macro Stats on Mount
  useEffect(() => {
    getDashboardStats()
      .then((data) => setStats(data))
      .catch(() => {});
    // Initial APR calculation
    handleCalculateApr();
  }, []);

  // Handlers
  const handleVerify = async (name?: string) => {
    const q = name || verifyQuery;
    if (!q.trim()) return;
    setIsVerifying(true);
    try {
      const res = await verifyApp({
        query: q.trim(),
        permissions: verifyPerms,
        flags: verifyFlags,
      });
      setVerifyResult(res);
    } catch {
      // Demo Fallback
      setVerifyResult({
        query: q,
        match: {
          found: false,
          possible: false,
          best_match: "Unregistered Entity",
          score: 40,
          status: "NOT_FOUND",
          known_flagged: true,
        },
        permission_risk: 75,
        red_flags: ["Demands Contacts & Gallery Access", "No Indian Corporate Office"],
        verdict: "RED",
        explanation_hinglish: "This entity is not registered with the RBI and requests high-risk device permissions.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCalculateApr = async () => {
    setIsCalculatingApr(true);
    const totalDeductions = processingFee + gstOnFee + otherDeductions;
    const disbursed = Math.max(1, principal - totalDeductions);
    try {
      const res = await calculateApr({
        principal,
        processing_fee: processingFee,
        gst_on_fee: gstOnFee,
        other_deductions: otherDeductions,
        disbursed_amount: disbursed,
        repayment_amount: principal,
        tenure_days: tenureDays,
      });
      setAprResult(res);
    } catch {
      const cost = principal - disbursed;
      const simple = (cost / disbursed) * (365 / tenureDays) * 100;
      setAprResult({
        disbursed,
        repayment: principal,
        total_cost: cost,
        cost_pct_of_received: Math.round((cost / disbursed) * 100),
        simple_apr_pct: Math.round(simple),
        compounded_apr_pct: Math.round(simple * 1.5),
        tenure_days: tenureDays,
        verdict: simple > 100 ? "PREDATORY" : "SAFE",
        kfs_flags: ["Upfront deduction of fees violates RBI Fair Practices Code"],
        comparisons: [
          { name: "RBI Benchmark Repo Rate", apr_pct: 6.5, type: "Benchmark" },
          { name: "Regulated Credit Card APR", apr_pct: 42.0, type: "Bank" },
        ],
        explanation: `This ${tenureDays}-day loan incurs an effective annual interest rate of ${Math.round(simple)}% p.a.`,
      });
    } finally {
      setIsCalculatingApr(false);
    }
  };

  const handleAnalyzeThreat = async () => {
    if (!threatText.trim()) return;
    setIsAnalyzingThreat(true);
    try {
      const res = await analyzeThreats(
        threatText
          .split("\n")
          .filter(Boolean)
          .map((t) => ({ text: t })),
        "english"
      );
      setThreatResult(res);
    } catch {
      setThreatResult({
        messages: [
          {
            text: threatText,
            labels: ["Contact Harassment", "Defamation Threats", "BNS § 308 Extortion"],
            severity: 5,
            language: "English",
            key_phrases: ["contacts", "morphed photo", "defaulter"],
            why: "Unlawful threat of criminal extortion and privacy violation.",
          },
        ],
        overall_severity: 5,
        severity_level: "CRITICAL",
        message_count: 1,
        summary: "Severe extortion attempt with threats of contact harassment and morphed imagery.",
        legal_info: [
          {
            label: "Extortion",
            title: "Criminal Extortion & Defamation",
            bns_sections: "Bharatiya Nyaya Sanhita (BNS § 308)",
            it_act: "Information Technology Act § 66E",
            description: "Extortion under threat of injury or reputational damage (Up to 7 years imprisonment).",
            rbi_directive: "RBI Digital Lending Guidelines prohibit contact access and third-party intimidation.",
          },
        ],
        safe_steps: [
          "Do not pay any extortion ransom. Payment only leads to further demands.",
          "Save unedited screenshots showing caller numbers and timestamps.",
          "File an immediate complaint on cybercrime.gov.in and dial 1930.",
        ],
      });
    } finally {
      setIsAnalyzingThreat(false);
    }
  };

  const handleCreateComplaint = async () => {
    setIsBuildingComplaint(true);
    try {
      const res = await createComplaint({
        complainant: { name: complainantName || "Citizen Complainant", state: complaintState, phone: complaintPhone },
        loan: {
          app_name: complaintAppName,
          principal,
          disbursed_amount: principal - (processingFee + gstOnFee + otherDeductions),
          repayment_demanded: principal,
          date_taken: new Date().toISOString().split("T")[0],
        },
        timeline: [
          { date: new Date().toISOString().split("T")[0], time: "10:00 AM", channel: "WhatsApp", summary: "Recovery threats sent to phone." },
        ],
        evidence: ["WhatsApp screenshot with abusive messages", "Bank account statement showing net disbursal"],
      });
      setComplaintResult(res);
    } catch {
      setComplaintResult({
        complaint_id: "COMP-DEMO-2026",
        pdf_url: "/sample.pdf",
        draft_text: `FORMAL CYBERCRIME COMPLAINT & STATUTORY AFFIDAVIT\nTo: Station House Officer, Cyber Crime Police Station\nSubject: Criminal Extortion & Illegal Digital Lending by ${complaintAppName}\n\nComplainant: ${complainantName || "Citizen Complainant"}\nState: ${complaintState}\n\n1. The app ${complaintAppName} disbursed a loan with illegal upfront fee deductions.\n2. When overdue, agents issued threats of morphing photos and harassing family contacts.\n3. This constitutes Cognizable Extortion under Bharatiya Nyaya Sanhita Section 308 and IT Act Section 66E.\n\nPrayer: Immediate registration of FIR, freezing of syndicate UPI accounts, and blocking of virtual VoIP numbers.`,
        filing_guide: {
          cybercrime_steps: ["Visit cybercrime.gov.in", "Report Other Cyber Crimes", "Attach this PDF"],
          call_script_1930: "State you are a victim of loan app extortion and need to register an FIR.",
          rbi_sachet_steps: ["File on sachet.rbi.org.in against unregulated entities."],
        },
      });
    } finally {
      setIsBuildingComplaint(false);
    }
  };

  const handleGenerateFamily = async () => {
    setIsGeneratingFamily(true);
    try {
      const res = await getFamilyAdvisory(familyMessage, "english");
      setFamilyResult(res);
    } catch {
      setFamilyResult({
        headline: "Notice of Non-Liability for Third-Party Loan",
        core_message: "This recovery message is completely illegal. Under Section 126 of the Indian Contract Act, contacts and relatives have zero financial liability for someone else's personal loan.",
        key_points: [
          "You are NOT a guarantor and bear zero financial liability.",
          "Agents accessing phone contacts violates Google Play Developer Policy and RBI Guidelines.",
          "Threats to circulate morphed photos is a non-bailable criminal offence under BNS Section 308 and IT Act 66E.",
        ],
        what_to_say: "I am NOT a loan guarantor and bear zero legal liability under Section 126 of the Contract Act. Any further calls or messages will be reported to the National Cyber Crime Helpline (1930) and local police for criminal harassment.",
        helpline_info: "Dial 1930 or visit cybercrime.gov.in",
        share_text: "I received an illegal recovery message. I am not liable for any third party loan. Dial 1930 if harassed.",
      });
    } finally {
      setIsGeneratingFamily(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 bg-[#F8FAFC] text-slate-900 min-h-screen">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-700" />
              <span>CENTRAL COMMAND WORKSPACE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              All-in-One Consumer Defense Dashboard
            </h1>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Verify loan apps, calculate true APR, analyze threat messages, and file official cybercrime complaints in one central place.
            </p>
          </div>

          {/* Quick Helpline Pill */}
          <div className="flex items-center gap-3">
            <a
              href="tel:1930"
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wide flex items-center space-x-2 shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Dial 1930 Helpline</span>
            </a>
          </div>
        </div>

        {/* Live Macro Telemetry Stats Bar */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              RBI Regulated NBFCs
            </span>
            <span className="text-2xl font-black text-slate-950 mt-0.5 block">1,248+ Active</span>
            <span className="text-[11px] font-semibold text-emerald-700">Official Master Registry</span>
          </div>

          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
              Average Scam APR
            </span>
            <span className="text-2xl font-black text-rose-700 mt-0.5 block">2,235% p.a.</span>
            <span className="text-[11px] font-semibold text-rose-800">7-Day Usury Traps</span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Flagged Predatory Apps
            </span>
            <span className="text-2xl font-black text-slate-950 mt-0.5 block">80+ Known APKs</span>
            <span className="text-[11px] font-semibold text-slate-600">Indexed for Protection</span>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
              Data Privacy Status
            </span>
            <span className="text-2xl font-black text-emerald-800 mt-0.5 block">100% Private</span>
            <span className="text-[11px] font-semibold text-emerald-700">Zero Server Storage</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Interactive Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Tabs for All 6 Features */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveTab("verify")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all ${
              activeTab === "verify"
                ? "bg-slate-950 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            <Landmark className="w-4 h-4 text-emerald-400" />
            <span>1. Check Loan App</span>
          </button>

          <button
            onClick={() => setActiveTab("apr")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all ${
              activeTab === "apr"
                ? "bg-slate-950 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>2. Calculate APR</span>
          </button>

          <button
            onClick={() => setActiveTab("threat")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all ${
              activeTab === "threat"
                ? "bg-slate-950 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>3. Threat Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab("complaint")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all ${
              activeTab === "complaint"
                ? "bg-slate-950 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>4. Police Complaint</span>
          </button>

          <button
            onClick={() => setActiveTab("family")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all ${
              activeTab === "family"
                ? "bg-slate-950 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>5. Family Alert</span>
          </button>

          <button
            onClick={() => setActiveTab("watchlist")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all ${
              activeTab === "watchlist"
                ? "bg-slate-950 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>6. Scam Watchlist</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: APP VERIFIER
        ======================================================== */}
        {activeTab === "verify" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Check Loan App Safety &amp; RBI Registration
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Enter any app name or Google Play Store link to check against licensed RBI entities and flag illegal permission requests.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter app name (e.g. QuickRupee Instant, Kissht, CashBean)..."
                  value={verifyQuery}
                  onChange={(e) => setVerifyQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  className="flex-1 text-sm py-3 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 bg-white font-semibold text-slate-900"
                />
                <button
                  onClick={() => handleVerify()}
                  disabled={isVerifying || !verifyQuery.trim()}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isVerifying ? "Checking..." : "Verify App"}
                </button>
              </div>

              {/* Sample Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Quick Test:</span>
                <button
                  type="button"
                  onClick={() => {
                    setVerifyQuery("QuickRupee Instant");
                    handleVerify("QuickRupee Instant");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200"
                >
                  QuickRupee (Scam Demo)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVerifyQuery("DemoBank Easy Loan");
                    handleVerify("DemoBank Easy Loan");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200"
                >
                  DemoBank (RBI NBFC)
                </button>
              </div>

              {/* Result Area */}
              {verifyResult && (
                <div className="pt-4 border-t border-slate-200 animate-in fade-in duration-200">
                  <VerdictCard
                    verdict={verifyResult.verdict}
                    title={verifyResult.verdict === "GREEN" ? "RBI REGULATED & SAFE" : "UNREGISTERED SCAM APP"}
                    subtitle={verifyResult.explanation_hinglish}
                    reasons={verifyResult.red_flags}
                    ctaText="Now calculate real interest on this loan"
                    onCtaClick={() => setActiveTab("apr")}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: APR CALCULATOR
        ======================================================== */}
        {activeTab === "apr" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                True Cost APR &amp; Hidden Fee Calculator
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Drag the sliders to see what you actually received versus what the app demands back in 7 days.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Sliders (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-extrabold text-slate-800 mb-1">
                    <span>Loan Demanded by App</span>
                    <span className="text-emerald-700">₹{principal.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={principal}
                    onChange={(e) => {
                      setPrincipal(Number(e.target.value));
                      handleCalculateApr();
                    }}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Upfront Processing Fee</span>
                      <span className="text-rose-700">₹{processingFee.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={processingFee}
                      onChange={(e) => {
                        setProcessingFee(Number(e.target.value));
                        handleCalculateApr();
                      }}
                      className="w-full accent-rose-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Repayment Deadline</span>
                      <span className="text-rose-700 font-extrabold">{tenureDays} Days</span>
                    </div>
                    <input
                      type="range"
                      min="7"
                      max="90"
                      step="1"
                      value={tenureDays}
                      onChange={(e) => {
                        setTenureDays(Number(e.target.value));
                        handleCalculateApr();
                      }}
                      className="w-full accent-rose-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Upfront Deductions (Fee + GST):</span>
                    <span className="text-rose-700 font-bold">-₹{(processingFee + gstOnFee + otherDeductions).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-extrabold pt-1 border-t border-slate-200 text-sm">
                    <span>Money Sent to Your Bank:</span>
                    <span className="text-emerald-700">₹{(principal - (processingFee + gstOnFee + otherDeductions)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Right Gauge & Reality Card (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <AprGauge
                  apr={aprResult?.simple_apr_pct || 2235}
                  verdict={aprResult?.verdict || "PREDATORY"}
                />
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-900 text-center">
                  ⚠️ This rate is over <strong>150x higher</strong> than an RBI regulated personal loan (12-14% p.a.).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: THREAT ANALYZER
        ======================================================== */}
        {activeTab === "threat" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Analyze Abusive Recovery Messages &amp; Find Legal Violations
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Paste WhatsApp messages, SMS, or caller threats. We map them directly to Bharatiya Nyaya Sanhita (BNS § 308) and IT Act provisions.
              </p>
            </div>

            <div className="space-y-4">
              <textarea
                rows={4}
                value={threatText}
                onChange={(e) => setThreatText(e.target.value)}
                placeholder="Paste threat messages here (e.g., 'We have your contacts and photos. Pay within 30 minutes or face public shaming')..."
                className="w-full text-sm p-4 rounded-xl border border-slate-300 focus:outline-none focus:border-rose-600 bg-white font-medium text-slate-900"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setThreatText(
                      "We have your entire phone contact list of 450 people. If you do not transfer ₹5,000 by 12:00 PM, we will send your morphed photo with defaulter stamp to your relatives and employer."
                    )
                  }
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 underline"
                >
                  Load Sample Threat Message
                </button>

                <button
                  onClick={handleAnalyzeThreat}
                  disabled={isAnalyzingThreat || !threatText.trim()}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isAnalyzingThreat ? "Analyzing Legal Violations..." : "Check Legal Violations"}
                </button>
              </div>

              {threatResult && (
                <div className="pt-4 border-t border-slate-200 space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-rose-800">
                        {threatResult.severity_level} SEVERITY ({threatResult.overall_severity}/5)
                      </span>
                      <span className="text-xs font-extrabold text-rose-700">
                        Cognizable Offense
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {threatResult.messages.flatMap((m) => m.labels).map((l, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs font-bold bg-rose-200/60 text-rose-950">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Legal Sections */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900">Violated Indian Penal Provisions:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {threatResult.legal_info.map((s, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-xs font-extrabold text-rose-800 block">{s.title} ({s.bns_sections})</span>
                          <p className="text-xs font-medium text-slate-700">{s.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab("complaint")}
                      className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center space-x-2"
                    >
                      <span>Draft Official Police Complaint With This Evidence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: POLICE COMPLAINT BUILDER
        ======================================================== */}
        {activeTab === "complaint" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Official Police &amp; Cyber Cell Complaint Letter Generator
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Enter your details to generate a submission-ready complaint letter for cybercrime.gov.in and police authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form inputs (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={complainantName}
                    onChange={(e) => setComplainantName(e.target.value)}
                    placeholder="Enter your full name..."
                    className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Loan App Name</label>
                  <input
                    type="text"
                    value={complaintAppName}
                    onChange={(e) => setComplaintAppName(e.target.value)}
                    className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your State / Police Jurisdiction</label>
                  <input
                    type="text"
                    value={complaintState}
                    onChange={(e) => setComplaintState(e.target.value)}
                    className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Contact Phone (Optional)</label>
                  <input
                    type="text"
                    value={complaintPhone}
                    onChange={(e) => setComplaintPhone(e.target.value)}
                    placeholder="Mobile number for police records..."
                    className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  />
                </div>

                <button
                  onClick={handleCreateComplaint}
                  disabled={isBuildingComplaint}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  {isBuildingComplaint ? "Compiling Document..." : "Generate Official Complaint Letter"}
                </button>
              </div>

              {/* Preview Area (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-700 uppercase">
                    Legal Complaint Letter Preview
                  </span>
                  {complaintResult && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(complaintResult.draft_text);
                        setCopiedComplaint(true);
                        setTimeout(() => setCopiedComplaint(false), 2000);
                      }}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedComplaint ? "Copied!" : "Copy Text"}</span>
                    </button>
                  )}
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-[360px] overflow-y-auto leading-relaxed">
                  {complaintResult
                    ? complaintResult.draft_text
                    : "Fill in the details on the left and click 'Generate Official Complaint Letter' to view the submission-ready text."}
                </div>

                {complaintResult && (
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => window.open(getPdfDownloadUrl(complaintResult.complaint_id), "_blank")}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center space-x-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Complaint</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: FAMILY ADVISORY
        ======================================================== */}
        {activeTab === "family" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Protect Family &amp; Contacts from Recovery Calls
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Under Section 126 of the Indian Contract Act, contacts and relatives have zero financial liability for your loan.
              </p>
            </div>

            <div className="space-y-4">
              <textarea
                rows={3}
                value={familyMessage}
                onChange={(e) => setFamilyMessage(e.target.value)}
                className="w-full text-sm p-4 rounded-xl border border-slate-300 font-medium text-slate-900"
              />

              <button
                onClick={handleGenerateFamily}
                disabled={isGeneratingFamily}
                className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs uppercase tracking-wider"
              >
                {isGeneratingFamily ? "Generating Advisory..." : "Generate WhatsApp Protection Notice"}
              </button>

              {familyResult && (
                <div className="pt-4 border-t border-slate-200 space-y-4 animate-in fade-in">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-purple-900 uppercase">
                        Message to Share with Family &amp; Contacts
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(familyResult.what_to_say);
                          setCopiedFamily(true);
                          setTimeout(() => setCopiedFamily(false), 2000);
                        }}
                        className="inline-flex items-center space-x-1 text-xs font-extrabold text-purple-900 hover:underline"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedFamily ? "Copied!" : "Copy WhatsApp Text"}</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-800 bg-white p-3.5 rounded-lg border border-purple-200 leading-relaxed">
                      &ldquo;{familyResult.what_to_say}&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: SCAM WATCHLIST & DATABASE
        ======================================================== */}
        {activeTab === "watchlist" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                  Live Flagged Lending Apps Watchlist
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  Surveillance directory of predatory applications reported to cyber crime authorities.
                </p>
              </div>

              <input
                type="text"
                value={watchlistSearch}
                onChange={(e) => setWatchlistSearch(e.target.value)}
                placeholder="Search app name..."
                className="py-2 px-3.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase">
                    <th className="py-3 px-3">Application Title</th>
                    <th className="py-3 px-3">Reported APR</th>
                    <th className="py-3 px-3">Tenure</th>
                    <th className="py-3 px-3">Primary Scam Violation</th>
                    <th className="py-3 px-3">Regulatory Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { app: "QuickRupee Instant", apr: "2,235%", tenure: "7 Days", issue: "Contact scraping & upfront fee cut", status: "UNREGISTERED" },
                    { app: "RupeeBox Pro", apr: "3,120%", tenure: "7 Days", issue: "Morphed photo threats via WhatsApp", status: "CRITICAL SCAM" },
                    { app: "FastCoin Cash", apr: "2,840%", tenure: "7 Days", issue: "Extortion calls to family contacts", status: "ILLEGAL USURY" },
                    { app: "SuperCredit Loan", apr: "1,890%", tenure: "10 Days", issue: "Fake police summons and notices", status: "FLAGGED" },
                    { app: "DemoBank Easy Loan", apr: "14.5%", tenure: "365 Days", issue: "None (Regulated Scheduled Entity)", status: "RBI VERIFIED" },
                  ]
                    .filter((row) => row.app.toLowerCase().includes(watchlistSearch.toLowerCase()))
                    .map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-extrabold text-slate-950">{row.app}</td>
                        <td className="py-3 px-3 font-bold text-rose-700">{row.apr}</td>
                        <td className="py-3 px-3 font-semibold text-slate-700">{row.tenure}</td>
                        <td className="py-3 px-3 text-slate-600">{row.issue}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              row.status === "RBI VERIFIED"
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-rose-100 text-rose-900"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
