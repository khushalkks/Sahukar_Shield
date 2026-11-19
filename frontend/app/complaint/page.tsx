"use client";

import React, { useState, useEffect, Suspense } from "react";
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

  // Step 1 - 4
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Step 1: Complainant Info
  const [name, setName] = useState("");
  const [stateName, setStateName] = useState("Maharashtra");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Step 2: Loan Details
  const [appName, setAppName] = useState("QuickRupee Instant");
  const [lenderName, setLenderName] = useState("QuickRupee Finance / Unknown Entity");
  const [principal, setPrincipal] = useState<number>(5000);
  const [disbursed, setDisbursed] = useState<number>(3500);
  const [repaymentDemanded, setRepaymentDemanded] = useState<number>(5000);
  const [dateTaken, setDateTaken] = useState(new Date().toISOString().split("T")[0]);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [extraDemands, setExtraDemands] = useState(
    "Exorbitant penalty fees and continuous extortion under threat of defaming contacts"
  );

  // Step 3: Timeline Events
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      date: new Date().toISOString().split("T")[0],
      time: "10:30 AM",
      channel: "WhatsApp",
      summary: "Agent sent abusive messages demanding immediate payment under threat of contacting parents.",
      evidence_file: "whatsapp_threat_01.jpg",
    },
    {
      date: new Date().toISOString().split("T")[0],
      time: "02:15 PM",
      channel: "Phone Call",
      summary: "Received abusive call from virtual number threatening to circulate morphed gallery photos.",
      evidence_file: "call_recording_01.mp3",
    },
  ]);

  // Step 4: Evidence Checklist
  const [evidenceList, setEvidenceList] = useState<string[]>([
    "Dhamki wale messages / WhatsApp chats ke complete screenshots (with phone number & timestamp)",
    "Recovery agents ke audio call recordings (verbal abuse / threats)",
    "Bank statement ya UPI transaction receipts (showing ₹ disbursed vs extra demanded)",
  ]);

  // Generated Result
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
        language: lang === "hi" ? "hindi" : "english",
      };

      const res = await createComplaint(payload);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Complaint generation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const copyDraftToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.draft_text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Stage 4: Formal Complaint & PDF</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800">
          {t("complaint.title", "Cybercrime Complaint Builder")}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t(
            "complaint.subtitle",
            "Cyber crime portal (cybercrime.gov.in) aur 1930 helpline ke liye formal factual complaint draft aur PDF tayyar karein."
          )}
        </p>
      </div>

      {/* Stepper Wizard Progress */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { num: 1, label: t("complaint.step1", "1. Complainant") },
          { num: 2, label: t("complaint.step2", "2. Loan Info") },
          { num: 3, label: t("complaint.step3", "3. Timeline") },
          { num: 4, label: t("complaint.step4", "4. Evidence") },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setCurrentStep(s.num)}
            className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
              currentStep === s.num
                ? "bg-navy-800 text-white border-navy-800 shadow-sm"
                : currentStep > s.num
                ? "bg-teal-50 text-teal-800 border-teal-300"
                : "bg-white text-slate-400 border-slate-200"
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Wizard Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        {/* Step 1: Complainant Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="p-3 bg-teal-50 rounded-xl text-teal-900 text-xs flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>Privacy Guaranteed:</strong> Yeh jaankari sirf aapke PDF document me print hoti hai. Server par kabhi persist nahi hoti.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Aapka Naam (Optional / Leave blank for anonymity)
                </label>
                <input
                  type="text"
                  placeholder="Jaise: Ramesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rajya / State</label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-navy-900"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Other">Other State / UT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-navy-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Loan Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Loan Application Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">App Ka Naam</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 font-bold text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Purported Lender / NBFC</label>
                <input
                  type="text"
                  value={lenderName}
                  onChange={(e) => setLenderName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Stated Loan Amount (₹)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-800 mb-1">Actually Disbursed (₹)</label>
                <input
                  type="number"
                  value={disbursed}
                  onChange={(e) => setDisbursed(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs p-3 rounded-xl border border-teal-500 bg-teal-50 font-black text-teal-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-red-800 mb-1">Repayment Demanded (₹)</label>
                <input
                  type="number"
                  value={repaymentDemanded}
                  onChange={(e) => setRepaymentDemanded(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs p-3 rounded-xl border border-red-500 bg-red-50 font-black text-red-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date Loan Disbursed</label>
                <input
                  type="date"
                  value={dateTaken}
                  onChange={(e) => setDateTaken(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-navy-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Extra Demands & Threats</label>
              <textarea
                rows={2}
                value={extraDemands}
                onChange={(e) => setExtraDemands(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 text-navy-900"
              />
            </div>
          </div>
        )}

        {/* Step 3: Timeline Builder */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <TimelineBuilder
              events={timelineEvents}
              onChange={(updated) => setTimelineEvents(updated)}
            />
          </div>
        )}

        {/* Step 4: Evidence Checklist */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <EvidenceChecklist
              selected={evidenceList}
              onChange={(updated) => setEvidenceList(updated)}
            />
          </div>
        )}

        {/* Nav Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("complaint.btn_prev", "Peeche")}</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-navy-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
            >
              <span>{t("complaint.btn_next", "Aage Badhein")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black shadow-md flex items-center gap-2 hover:scale-105 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>
                {isLoading ? "Generating PDF..." : t("complaint.btn_generate", "Complaint PDF Generate Karo")}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Generated Results & PDF Download */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Action Header Card */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-600/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                COMPLAINT DRAFT READY
              </span>
              <h2 className="text-2xl font-black">Official Cybercrime PDF Tayyar Hai</h2>
              <p className="text-xs text-slate-300 max-w-xl">
                Is PDF me aapka chronology timeline table, evidence checklist, aur statutory relief requests shamil hain.
              </p>
            </div>
            <a
              href={getPdfDownloadUrl(result.complaint_id)}
              download
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs shadow-lg flex items-center space-x-2 shrink-0 transition-transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>{t("complaint.download_pdf", "Official Complaint PDF Download")}</span>
            </a>
          </div>

          {/* 30-Second 1930 Phone Call Script */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-red-600">
              <PhoneCall className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                {t("complaint.script_title", "1930 Call Script (30 Seconds me kya bolein)")}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Jab aap 1930 par call karein, to ghabraaye bina seedha ye bole:
            </p>
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-xs font-medium text-red-950 leading-relaxed italic">
              {result.filing_guide.call_script_1930}
            </div>
          </div>

          {/* Full Draft Text Viewer with Copy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Formal Complaint Text (cybercrime.gov.in description box ke liye):
              </h3>
              <button
                type="button"
                onClick={copyDraftToClipboard}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                {copiedDraft ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Draft</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-slate-800 whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
              {result.draft_text}
            </pre>
          </div>

          {/* Step-by-Step Filing Instructions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Filing Guide: Cyber Crime Portal Par Kaise Submit Karein
            </h3>
            <div className="space-y-2 text-xs text-slate-700">
              {result.filing_guide.cybercrime_steps.map((st, i) => (
                <div key={i} className="flex items-start space-x-2.5 p-2 rounded-xl hover:bg-slate-50">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          <Disclaimer inline />
        </div>
      )}
    </div>
  );
}

export default function ComplaintPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-sm font-semibold text-slate-500">
          Loading Complaint Wizard...
        </div>
      }
    >
      <ComplaintWizardContent />
    </Suspense>
  );
}

