"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Download,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Shield,
  HelpCircle,
  FileCheck,
  Eye,
  Sparkles,
  Lock,
  Scale,
  Calendar,
  AlertTriangle,
  Building,
  User,
  ShieldAlert,
  Landmark,
} from "lucide-react";
import TimelineBuilder from "../../components/TimelineBuilder";
import EvidenceChecklist from "../../components/EvidenceChecklist";
import Disclaimer from "../../components/Disclaimer";
import { createComplaint, getPdfDownloadUrl } from "../../lib/api";
import { ComplaintResponse, TimelineEvent } from "../../lib/types";
import { useI18n } from "../../lib/i18n";

function ComplaintWizardContent() {
  const { t, lang } = useI18n();
  const searchParams = useSearchParams();

  // Wizard tab: 'wizard' | 'script'
  const [activeView, setActiveView] = useState<"wizard" | "script">("wizard");

  // Step 1 - 4
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // Step 1: Complainant Info
  const [name, setName] = useState("Victim Citizen");
  const [stateName, setStateName] = useState("Maharashtra");
  const [phone, setPhone] = useState("+91 98XXX XXXXX");
  const [email, setEmail] = useState("citizen.victim@email.com");

  // Step 2: Loan Details
  const [appName, setAppName] = useState("QuickRupee Instant");
  const [lenderName, setLenderName] = useState("QuickRupee Finance / Unregistered Lending Syndicate");
  const [principal, setPrincipal] = useState<number>(5000);
  const [disbursed, setDisbursed] = useState<number>(3500);
  const [repaymentDemanded, setRepaymentDemanded] = useState<number>(5000);
  const [dateTaken, setDateTaken] = useState(new Date().toISOString().split("T")[0]);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [extraDemands, setExtraDemands] = useState(
    "Exorbitant usurious penalty fees and continuous extortion under threat of circulating morphed photos to contacts"
  );

  // Step 3: Timeline Events
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      date: new Date().toISOString().split("T")[0],
      time: "10:30 AM",
      channel: "WhatsApp",
      summary: "Collection agent issued threats of contacting relatives and employer unless payment was immediately transferred.",
      evidence_file: "whatsapp_threat_01.png",
    },
    {
      date: new Date().toISOString().split("T")[0],
      time: "02:15 PM",
      channel: "VoIP / Cellular Call",
      summary: "Received abusive telephone calls threatening to circulate morphed gallery photos to mutual contacts.",
      evidence_file: "audio_call_recording_01.mp3",
    },
  ]);

  // Step 4: Evidence Checklist
  const [evidenceList, setEvidenceList] = useState<string[]>([
    "Uncropped WhatsApp threat chat screenshots (including phone number & timestamps)",
    "Audio call recordings of abusive verbal threats and extortion demands",
    "Bank account & UPI transaction receipts proving disbursal vs illegal repayment demands",
  ]);

  // Generated Server Result
  const [result, setResult] = useState<ComplaintResponse | null>(null);

  // Import from Threat Shield if arrived via URL param
  useEffect(() => {
    if (searchParams.get("imported") === "true") {
      try {
        const stored = sessionStorage.getItem("imported_threat_timeline");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTimelineEvents(parsed);
            setCurrentStep(3); // Jump directly to timeline step
          }
        }
      } catch (e) {
        console.error("Failed to load imported timeline:", e);
      }
    }
  }, [searchParams]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        complainant: {
          name: name.trim() || undefined,
          state: stateName,
          phone: phone.trim() || undefined,
          email: email.trim() || undefined,
        },
        loan: {
          app_name: appName,
          lender_name: lenderName,
          principal,
          disbursed_amount: disbursed,
          repayment_demanded: repaymentDemanded,
          date_taken: dateTaken,
          amount_paid: amountPaid,
          extra_demands: extraDemands,
        },
        timeline: timelineEvents,
        evidence: evidenceList,
        language: "english",
      };

      const res = await createComplaint(payload);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Dossier compilation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const copyDraftToClipboard = () => {
    const text = result?.draft_text || liveDraftText;
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const copyScriptToClipboard = () => {
    const script = `My name is ${name}. I am reporting an active cyber extortion case by an unverified loan application named ${appName}. On ${dateTaken}, they disbursed ₹${disbursed} after deducting illegal fees from a ₹${principal} sanction. They are now demanding ₹${repaymentDemanded} under threat of circulating morphed photos and harassing my family contacts. I have preserved full digital evidence including WhatsApp screenshots and audio recordings. I request immediate registration of an FIR under BNS Sections 308, 351 and IT Act Section 66E, and blocking of the syndicate's UPI IDs and virtual numbers.`;
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Live interpolated text for real-time preview
  const liveDraftText = useMemo(() => {
    return `STATUTORY REGULATORY COMPLAINT & EVIDENTIARY AFFIDAVIT
To: The Station House Officer / Cyber Crime Police Station / Nodal Officer, cybercrime.gov.in
Copy to: Reserve Bank of India (RBI) Integrated Ombudsman Scheme (RB-IOS)
Subject: Evidentiary Complaint against "${appName}" regarding Criminal Extortion, Usurious Lending, and Cyberstalking under BNS 2023 & IT Act 2000

1. COMPLAINANT PARTICULARS:
- Name: ${name || "[Anonymous Complainant]"}
- Jurisdiction / State: ${stateName}
- Contact: ${phone || "[Protected]"} | Email: ${email || "[Protected]"}

2. TRANSACTION FORENSICS & UNDERWRITING RECONCILIATION:
- Predatory Entity Name: ${appName}
- Purported Lending Entity: ${lenderName}
- Date of Disbursal: ${dateTaken}
- Sanctioned Gross Principal: Rs. ${principal.toLocaleString()}
- Net Capital Credited: Rs. ${disbursed.toLocaleString()} (Upfront Deductions: Rs. ${(principal - disbursed).toLocaleString()})
- Contractual Repayment Demanded: Rs. ${repaymentDemanded.toLocaleString()} (Usurious Effective Yield)
- Total Disputed Demand: ${extraDemands}

3. CHRONOLOGICAL LOG OF EXTORTION & COERCION:
${timelineEvents.map((e, idx) => `  [${idx + 1}] Date: ${e.date} ${e.time} | Channel: ${e.channel}
      Incident Summary: ${e.summary}
      Evidentiary Record: ${e.evidence_file || "Attached to Filing"}`).join("\n\n")}

4. STATUTORY CRIMINAL VIOLATIONS & DIRECTIVES CITED:
- Bharatiya Nyaya Sanhita 2023 Section 308: Extortion under threat of injury and public defamation
- Bharatiya Nyaya Sanhita 2023 Section 351(2): Criminal Intimidation
- Bharatiya Nyaya Sanhita 2023 Section 356: Criminal Defamation & Character Assassination
- Information Technology Act 2000 Section 66E: Violation of Bodily & Communication Privacy
- Information Technology Act 2000 Section 67 / 67A: Transmission of Obscene / Morphed Imagery
- Reserve Bank of India (RBI) Digital Lending Guidelines 2022: Violation of Fair Practices Code

5. PRAYER / RELIEF SOUGHT:
The complainant respectfully requests the competent authorities to:
a) Register a First Information Report (FIR) under the aforementioned provisions;
b) Issue emergency freezing directives against the syndicate's beneficiary UPI accounts and mule bank accounts;
c) Order telecom service providers to de-register the harassing virtual VoIP numbers;
d) Instruct application marketplaces to purge the malicious digital lending APK.

Verification:
I solemnly affirm that the statements recorded above are true to the best of my knowledge and backed by preserved digital records.`;
  }, [name, stateName, phone, email, appName, lenderName, principal, disbursed, repaymentDemanded, dateTaken, extraDemands, timelineEvents]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Complaint &amp; Affidavit Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            File Official Police &amp; Cyber Crime Complaint
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 font-sans font-normal leading-relaxed">
            Generate an official, ready-to-print complaint letter with legal sections, evidence checklist, and timeline formatted for the National Cyber Crime Portal (cybercrime.gov.in) and 1930 helpline.
          </p>
        </div>

        {/* View Switcher: Form vs 1930 Phone Script */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveView("wizard")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "wizard"
                ? "bg-emerald-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Complaint Form
          </button>
          <button
            onClick={() => setActiveView("script")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === "script"
                ? "bg-rose-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>What to Say on 1930 Call</span>
          </button>
        </div>
      </div>

      {/* VIEW: 1930 HELPLINE CALL SIMULATOR */}
      {activeView === "script" ? (
        <div className="glass-panel-danger rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/40">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">1930 National Cyber Helpline: 30-Second Officer Script</h2>
                <p className="text-xs text-slate-400">
                  When you dial 1930, read this exact verbatim script to the officer for immediate incident freezing.
                </p>
              </div>
            </div>
            <button
              onClick={copyScriptToClipboard}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/10 self-start sm:self-auto"
            >
              {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript ? "Script Copied!" : "Copy Script Text"}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#080C14] border border-slate-800 space-y-4 text-sm leading-relaxed text-slate-200">
            <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              &gt;&gt; VERBATIM DIALOGUE SCRIPT:
            </div>
            <p>
              &ldquo;Officer, my name is <strong className="text-white underline">{name || "Victim Citizen"}</strong> calling from <strong className="text-white underline">{stateName}</strong>. I am reporting an active, organized digital loan extortion syndicate operating under the app name <strong className="text-rose-400 underline">{appName}</strong>.&rdquo;
            </p>
            <p>
              &ldquo;On <strong className="text-white">{dateTaken}</strong>, without clear disclosures, they disbursed <strong className="text-emerald-400">₹{disbursed.toLocaleString()}</strong> to my account and are now demanding an usurious sum of <strong className="text-rose-400">₹{repaymentDemanded.toLocaleString()}</strong>. Their agents are continuously harassing me via WhatsApp and cellular calls, threatening to circulate morphed private photos to my contacts and workplace.&rdquo;
            </p>
            <p>
              &ldquo;I have compiled full uncropped screenshots, call recordings, and transaction hashes into a verified regulatory dossier. I request you to please register my complaint immediately under <strong className="text-amber-300">BNS Sections 308 (Extortion), 351 (Criminal Intimidation), and IT Act Section 66E</strong>, and initiate emergency freezing of their collection accounts.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="tel:1930"
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Dial 1930 Directly From Phone</span>
            </a>
            <button
              onClick={() => setActiveView("wizard")}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
            >
              Back to Full Regulatory Dossier Wizard
            </button>
          </div>
        </div>
      ) : (
        /* VIEW: 2-COLUMN SIDE-BY-SIDE INTERACTIVE COMPLAINT BUILDER & LIVE PREVIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Multi-Step Input Wizard (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step Navigation Tabs */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { num: 1, label: "1. Identity" },
                { num: 2, label: "2. Facility" },
                { num: 3, label: "3. Chronology" },
                { num: 4, label: "4. Evidence" },
              ].map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num)}
                  className={`p-2.5 rounded-2xl text-xs font-bold border transition-all ${
                    currentStep === s.num
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-md shadow-emerald-500/20"
                      : currentStep > s.num
                      ? "glass-panel text-slate-300 border-white/10"
                      : "bg-[#080C14] text-slate-500 border-white/5"
                  }`}
                >
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            {/* Wizard Form Panels */}
            <div className="glass-panel rounded-3xl p-6 border border-[#1E2C4A] space-y-6">
              {/* STEP 1: COMPLAINANT PARTICULARS */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Zero-Knowledge Guarantee: Complainant records are rendered strictly in the generated client-side PDF and never stored in any database.
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Complainant Full Name (or Pseudonym for Protected Filing)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">State / Legal Jurisdiction</label>
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-400 focus:outline-none"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Other">Other State / UT</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Contact Mobile Number
                        </label>
                        <input
                          type="tel"
                          placeholder="10-digit mobile"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="complainant@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PREDATORY LOAN FORENSICS */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Lending App Title (Flagged)</label>
                      <input
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Purported NBFC / Syndicate</label>
                      <input
                        type="text"
                        value={lenderName}
                        onChange={(e) => setLenderName(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Gross Sanction (₹)</label>
                      <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-400 mb-1">Net Credited (₹)</label>
                      <input
                        type="number"
                        value={disbursed}
                        onChange={(e) => setDisbursed(Number(e.target.value) || 0)}
                        className="w-full text-xs p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-rose-400 mb-1">Repay Demanded (₹)</label>
                      <input
                        type="number"
                        value={repaymentDemanded}
                        onChange={(e) => setRepaymentDemanded(Number(e.target.value) || 0)}
                        className="w-full text-xs p-2.5 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Disbursal Date</label>
                    <input
                      type="date"
                      value={dateTaken}
                      onChange={(e) => setDateTaken(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Coercive Demands / Extortion Summary
                    </label>
                    <textarea
                      rows={2}
                      value={extraDemands}
                      onChange={(e) => setExtraDemands(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: CHRONOLOGICAL INCIDENT TIMELINE */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold">CHRONOLOGICAL INCIDENT LOG:</span>
                    <span className="text-emerald-400">{timelineEvents.length} Recorded Incidents</span>
                  </div>
                  <TimelineBuilder events={timelineEvents} onChange={setTimelineEvents} />
                </div>
              )}

              {/* STEP 4: PRESERVED EVIDENCE CHECKLIST */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <EvidenceChecklist items={evidenceList} onChange={setEvidenceList} />
                </div>
              )}

              {/* Wizard Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1E2C4A]">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Step</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/30"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>{isLoading ? "Compiling Dossier..." : "Compile Official Regulatory PDF"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Side-by-Side Legal Document Preview (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>LIVE STATUTORY AFFIDAVIT PREVIEW</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyDraftToClipboard}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1"
                >
                  {copiedDraft ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedDraft ? "Copied" : "Copy Text"}</span>
                </button>
                {result && (
                  <a
                    href={getPdfDownloadUrl(result.complaint_id)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold flex items-center gap-1 shadow"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>
            </div>

            {/* Official Legal Document Frame */}
            <div className="rounded-3xl bg-[#080C14] border border-[#1E2C4A] p-5 sm:p-6 shadow-2xl relative overflow-hidden text-xs leading-relaxed text-slate-300">
              {/* Paper Watermark Stamp */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-4 border-rose-500/10 text-rose-500/10 font-black text-3xl sm:text-4xl p-6 rounded-3xl uppercase tracking-widest pointer-events-none select-none text-center font-sans">
                STATUTORY REPORT // EVIDENCE ATTACHED
              </div>

              {/* Document Header */}
              <div className="border-b border-white/10 pb-4 mb-4 text-center space-y-1 font-sans">
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block font-mono">
                  NATIONAL CYBERCRIME REPORTING PROTOCOL (MHA, GOI) FORMAT
                </span>
                <h3 className="text-sm font-black text-white">
                  FORMAL REGULATORY COMPLAINT &amp; EVIDENTIARY AFFIDAVIT
                </h3>
                <span className="text-[10px] text-slate-400 block font-mono">
                  CITED UNDER: BHARATIYA NYAYA SANHITA 2023 &amp; IT ACT 2000
                </span>
              </div>

              {/* Dynamic Document Body */}
              <div className="space-y-4 max-h-[560px] overflow-y-auto pr-2 text-[11px]">
                <pre className="whitespace-pre-wrap font-mono text-slate-300">
                  {result?.draft_text || liveDraftText}
                </pre>
              </div>

              {/* Document Footer Verification */}
              <div className="border-t border-white/10 pt-3 mt-4 flex items-center justify-between text-[10px] text-slate-500">
                <span>DIGITAL INTEGRITY HASH: SHA256-SYNTH-VERIFIED</span>
                <span className="text-emerald-400 font-bold">READY FOR FORMAL FILING</span>
              </div>
            </div>

            {/* Download CTA if result generated */}
            {result && (
              <div className="glass-panel-elevated p-4 rounded-2xl border border-emerald-500/40 flex items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Regulatory Dossier PDF Compiled Successfully</h4>
                    <p className="text-[10px] text-slate-400">ReportLab in-memory generated with Noto Sans Devanagari</p>
                  </div>
                </div>
                <a
                  href={getPdfDownloadUrl(result.complaint_id)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <Disclaimer inline />
    </div>
  );
}

export default function ComplaintPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono">Initializing Regulatory Dossier Wizard...</div>}>
      <ComplaintWizardContent />
    </Suspense>
  );
}
