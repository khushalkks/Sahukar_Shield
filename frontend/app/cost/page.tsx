"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, UploadCloud, AlertCircle, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import UploadBox, { SAMPLES } from "../../components/UploadBox";
import AprGauge from "../../components/AprGauge";
import VerdictCard from "../../components/VerdictCard";
import Disclaimer from "../../components/Disclaimer";
import { extractFromScreenshot, extractFromText, calculateApr } from "../../lib/api";
import { ExtractedLoanTerms, AprResponse } from "../../lib/types";
import { useI18n } from "../../lib/i18n";

export default function TrueCostPage() {
  const { t, lang } = useI18n();

  // Tab State: 'upload' | 'text' | 'manual'
  const [activeTab, setActiveTab] = useState<"upload" | "text" | "manual">("upload");
  const [textInput, setTextInput] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editable Form Terms
  const [principal, setPrincipal] = useState<number>(5000);
  const [processingFee, setProcessingFee] = useState<number>(1000);
  const [gstOnFee, setGstOnFee] = useState<number>(180);
  const [otherDeductions, setOtherDeductions] = useState<number>(320);
  const [insuranceFee, setInsuranceFee] = useState<number>(0);
  const [disbursedAmount, setDisbursedAmount] = useState<number>(3500);
  const [repaymentAmount, setRepaymentAmount] = useState<number>(5000);
  const [tenureDays, setTenureDays] = useState<number>(7);

  // KFS Checkboxes
  const [kfsAprShown, setKfsAprShown] = useState<boolean>(false);
  const [kfsFeesItemised, setKfsFeesItemised] = useState<boolean>(false);
  const [kfsCoolingOff, setKfsCoolingOff] = useState<boolean>(false);
  const [kfsGrievanceOfficer, setKfsGrievanceOfficer] = useState<boolean>(false);

  // Calculation Result
  const [aprResult, setAprResult] = useState<AprResponse | null>(null);

  // Handle Extraction from File
  const handleFile = async (file: File) => {
    setIsExtracting(true);
    setError(null);
    try {
      const res = await extractFromScreenshot(file);
      populateForm(res);
    } catch (err: any) {
      setError(err.message || "Failed to extract terms from image");
    } finally {
      setIsExtracting(false);
    }
  };

  // Handle Sample selection
  const handleSample = (sampleId: string) => {
    if (sampleId === "sample_predatory_7day") {
      setPrincipal(5000);
      setProcessingFee(1000);
      setGstOnFee(180);
      setOtherDeductions(320);
      setInsuranceFee(0);
      setDisbursedAmount(3500);
      setRepaymentAmount(5000);
      setTenureDays(7);
      setKfsAprShown(false);
      setKfsFeesItemised(false);
      setKfsCoolingOff(false);
      setKfsGrievanceOfficer(false);
    } else if (sampleId === "sample_predatory_15day") {
      setPrincipal(10000);
      setProcessingFee(2000);
      setGstOnFee(0);
      setOtherDeductions(0);
      setInsuranceFee(0);
      setDisbursedAmount(8000);
      setRepaymentAmount(10000);
      setTenureDays(15);
      setKfsAprShown(false);
      setKfsFeesItemised(false);
      setKfsCoolingOff(false);
      setKfsGrievanceOfficer(false);
    } else if (sampleId === "sample_quick_3000") {
      setPrincipal(3000);
      setProcessingFee(600);
      setGstOnFee(0);
      setOtherDeductions(0);
      setInsuranceFee(0);
      setDisbursedAmount(2400);
      setRepaymentAmount(3000);
      setTenureDays(10);
      setKfsAprShown(false);
      setKfsFeesItemised(false);
      setKfsCoolingOff(false);
      setKfsGrievanceOfficer(false);
    } else if (sampleId === "sample_safe_bank_emi" || sampleId === "sample_safe_bank") {
      setPrincipal(20000);
      setProcessingFee(300);
      setGstOnFee(54);
      setOtherDeductions(0);
      setInsuranceFee(0);
      setDisbursedAmount(19646);
      setRepaymentAmount(22800); // 12 * 1900
      setTenureDays(365);
      setKfsAprShown(true);
      setKfsFeesItemised(true);
      setKfsCoolingOff(true);
      setKfsGrievanceOfficer(true);
    } else if (sampleId === "sample_nbfc_personal") {
      setPrincipal(50000);
      setProcessingFee(1000);
      setGstOnFee(180);
      setOtherDeductions(0);
      setInsuranceFee(0);
      setDisbursedAmount(48820);
      setRepaymentAmount(66000); // 24 * 2750
      setTenureDays(730);
      setKfsAprShown(true);
      setKfsFeesItemised(true);
      setKfsCoolingOff(true);
      setKfsGrievanceOfficer(true);
    } else if (sampleId === "sample_short_term_emi") {
      setPrincipal(15000);
      setProcessingFee(450);
      setGstOnFee(0);
      setOtherDeductions(0);
      setInsuranceFee(0);
      setDisbursedAmount(14550);
      setRepaymentAmount(15900); // 3 * 5300
      setTenureDays(90);
      setKfsAprShown(true);
      setKfsFeesItemised(true);
      setKfsCoolingOff(false);
      setKfsGrievanceOfficer(true);
    } else if (sampleId === "sample_predatory_14day") {
      setPrincipal(8000);
      setProcessingFee(1500);
      setGstOnFee(0);
      setOtherDeductions(0);
      setInsuranceFee(0);
      setDisbursedAmount(6500);
      setRepaymentAmount(8000);
      setTenureDays(14);
      setKfsAprShown(false);
      setKfsFeesItemised(false);
      setKfsCoolingOff(false);
      setKfsGrievanceOfficer(false);
    } else if (sampleId === "sample_100k_safe") {
      setPrincipal(100000);
      setProcessingFee(1500);
      setGstOnFee(0);
      setOtherDeductions(0);
      setInsuranceFee(0);
      setDisbursedAmount(98500);
      setRepaymentAmount(117000); // 36 * 3250
      setTenureDays(1095);
      setKfsAprShown(true);
      setKfsFeesItemised(true);
      setKfsCoolingOff(true);
      setKfsGrievanceOfficer(true);
    }
  };

  // Handle Extraction from Text
  const handleExtractText = async () => {
    if (!textInput.trim()) return;
    setIsExtracting(true);
    setError(null);
    try {
      const res = await extractFromText(textInput);
      populateForm(res);
    } catch (err: any) {
      setError(err.message || "Failed to extract terms from text");
    } finally {
      setIsExtracting(false);
    }
  };

  const populateForm = (data: ExtractedLoanTerms) => {
    if (data.principal) setPrincipal(data.principal);
    if (data.processing_fee !== undefined && data.processing_fee !== null) setProcessingFee(data.processing_fee);
    if (data.gst_on_fee !== undefined && data.gst_on_fee !== null) setGstOnFee(data.gst_on_fee);
    if (data.other_deductions !== undefined && data.other_deductions !== null) setOtherDeductions(data.other_deductions);
    if (data.insurance_fee !== undefined && data.insurance_fee !== null) setInsuranceFee(data.insurance_fee);
    if (data.disbursed_amount) setDisbursedAmount(data.disbursed_amount);
    if (data.repayment_amount) setRepaymentAmount(data.repayment_amount);
    if (data.tenure_days) setTenureDays(data.tenure_days);
    if (data.kfs_shown !== undefined) setKfsAprShown(data.kfs_shown);
    if (data.cooling_off_mentioned !== undefined) setKfsCoolingOff(data.cooling_off_mentioned);
    if (data.grievance_officer_shown !== undefined) setKfsGrievanceOfficer(data.grievance_officer_shown);
  };

  // Auto-calculate disbursed if user edits deductions
  const updateDisbursed = (p: number, fee: number, gst: number, other: number, ins: number) => {
    const d = p - fee - gst - other - ins;
    setDisbursedAmount(Math.max(d, 1));
  };

  // Execute Code-Based APR Calculation
  const handleCalculate = async () => {
    setIsCalculating(true);
    setError(null);
    try {
      const res = await calculateApr({
        principal,
        processing_fee: processingFee,
        gst_on_fee: gstOnFee,
        other_deductions: otherDeductions,
        insurance_fee: insuranceFee,
        disbursed_amount: disbursedAmount,
        repayment_amount: repaymentAmount,
        tenure_days: tenureDays,
        kfs_checks: {
          apr_shown: kfsAprShown,
          fees_itemised: kfsFeesItemised,
          cooling_off_period: kfsCoolingOff,
          grievance_officer: kfsGrievanceOfficer,
        },
        language: lang,
      });
      setAprResult(res);
    } catch (err: any) {
      setError(err.message || "Calculation failed. Check inputs.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          <span>Stage 2: Deterministic APR Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800">
          {t("cost.title", "True Cost X-Ray (Asli APR Calculator)")}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t("cost.subtitle", "Loan offer ka screenshot upload karo ya text paste karo. Code aapka exact annualised interest rate calculate karega.")}
        </p>
      </div>

      {/* Input Mode Tabs */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "upload"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t("cost.tab_upload", "Screenshot Upload")}
          </button>
          <button
            onClick={() => setActiveTab("text")}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "text"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t("cost.tab_text", "Text Paste")}
          </button>
          <button
            onClick={() => setActiveTab("manual")}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "manual"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t("cost.tab_manual", "Manual Entry")}
          </button>
        </div>

        {activeTab === "upload" && (
          <UploadBox
            onFileSelect={handleFile}
            onSampleSelect={handleSample}
            isLoading={isExtracting}
          />
        )}

        {activeTab === "text" && (
          <div className="space-y-3">
            <textarea
              rows={4}
              placeholder="Loan offer message ya terms paste karein (Jaise: Sanctioned Rs 5000, Disbursed Rs 3500, Repay Rs 5000 in 7 days)..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full text-xs p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:border-teal-500 bg-slate-50 text-navy-900"
            />
            <button
              onClick={handleExtractText}
              disabled={isExtracting || !textInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow disabled:opacity-50"
            >
              {isExtracting ? "Extracting..." : "Terms Extract Karein"}
            </button>
          </div>
        )}

        {/* Step 2: Human-Editable Confirmation Form */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>Step 2: Confirm Loan Terms (Human-in-the-Loop)</span>
            </h3>
            <span className="text-[11px] text-teal-600 font-semibold">
              Fields editable hain
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Stated Loan (₹)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setPrincipal(val);
                  updateDisbursed(val, processingFee, gstOnFee, otherDeductions, insuranceFee);
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-navy-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Processing Fee (₹)</label>
              <input
                type="number"
                value={processingFee}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setProcessingFee(val);
                  updateDisbursed(principal, val, gstOnFee, otherDeductions, insuranceFee);
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-navy-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">GST / Tax on Fee (₹)</label>
              <input
                type="number"
                value={gstOnFee}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setGstOnFee(val);
                  updateDisbursed(principal, processingFee, val, otherDeductions, insuranceFee);
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-navy-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Other Deductions (₹)</label>
              <input
                type="number"
                value={otherDeductions}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setOtherDeductions(val);
                  updateDisbursed(principal, processingFee, gstOnFee, val, insuranceFee);
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-navy-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-teal-800 mb-1">Haath Me Mile (Disbursed ₹)</label>
              <input
                type="number"
                value={disbursedAmount}
                onChange={(e) => setDisbursedAmount(parseFloat(e.target.value) || 1)}
                className="w-full text-xs p-2.5 rounded-xl border border-teal-500 bg-teal-50 font-black text-teal-950"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-red-800 mb-1">Wapas Dene Hain (Repay ₹)</label>
              <input
                type="number"
                value={repaymentAmount}
                onChange={(e) => setRepaymentAmount(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2.5 rounded-xl border border-red-500 bg-red-50 font-black text-red-950"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Tenure (Din / Days)</label>
              <input
                type="number"
                value={tenureDays}
                onChange={(e) => setTenureDays(parseInt(e.target.value) || 1)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-navy-900"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-md transition-all hover:scale-105"
              >
                {isCalculating ? "Calculating..." : t("cost.btn_calculate", "Asli APR Calculate Karo")}
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: KFS RBI Digital Lending Checklist */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            RBI Mandatory Key Fact Statement (KFS) Checklist:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <label className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={kfsAprShown}
                onChange={(e) => setKfsAprShown(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>APR (वार्षिक ब्याज दर) स्क्रीन पर स्पष्ट दिखाया गया था</span>
            </label>
            <label className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={kfsFeesItemised}
                onChange={(e) => setKfsFeesItemised(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>सभी फीस और टैक्स स्पष्ट रूप से अलग-अलग बताए गए</span>
            </label>
            <label className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={kfsCoolingOff}
                onChange={(e) => setKfsCoolingOff(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>Cooling-off / Look-up period (लोन रद्द करने की छूट) दी गई</span>
            </label>
            <label className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={kfsGrievanceOfficer}
                onChange={(e) => setKfsGrievanceOfficer(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>Grievance Redressal Officer का नाम और संपर्क उपलब्ध है</span>
            </label>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 4: APR Results Section */}
      {aprResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Big Highlight Headline */}
          <div className="bg-[#0B1F3A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-700 text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-teal-400">
              Loan Reality X-Ray
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              Tumhe mile ₹{aprResult.disbursed.toLocaleString()}, wapas dene hain ₹{aprResult.repayment.toLocaleString()}
            </h2>
            <p className="text-sm text-slate-300 font-medium">
              Sirf {aprResult.tenure_days} dino ka extra kharcha:{" "}
              <strong className="text-red-400 font-bold">
                ₹{aprResult.total_cost.toLocaleString()} ({aprResult.cost_pct_of_received}% of principal)
              </strong>
            </p>
          </div>

          {/* Verdict Card & Gauge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <AprGauge apr={aprResult.simple_apr_pct} verdict={aprResult.verdict} />

            <VerdictCard
              verdict={aprResult.verdict}
              title={
                aprResult.verdict === "PREDATORY"
                  ? "PREDATORY LOAN (PURE LOOT)"
                  : aprResult.verdict === "RISKY"
                  ? "HIGH RISK / DEBT TRAP"
                  : "SAFE / REGULATED RATE"
              }
              subtitle={aprResult.explanation}
              reasons={
                aprResult.kfs_flags.length > 0
                  ? aprResult.kfs_flags
                  : [
                      `Simple Annualised APR: ${aprResult.simple_apr_pct}%`,
                      `${aprResult.tenure_days} din ka tenure predatory lending pattern hai`,
                      `Hidden deductions: ₹${aprResult.total_cost}`,
                    ]
              }
              ctaText="Dhamki mil rahi hai? -> Threat Shield me check karo"
              ctaHref="/threat"
            />
          </div>

          {/* Recharts Comparison Bar Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy-800">
                  {t("cost.bank_comparison", "Market Byaj Rates Se Tulna")}
                </h3>
                <p className="text-xs text-slate-500">
                  Annualized interest rate comparison across regulated credit options vs this loan
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aprResult.comparisons}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, "dataMax + 20"]} unit="%" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fontWeight: "bold" }} />
                  <Tooltip
                    formatter={(value: any) => [`${value}% p.a.`, "Annual Percentage Rate"]}
                    contentStyle={{ borderRadius: "12px", fontSize: "12px" }}
                  />
                  <Bar dataKey="apr_pct" radius={[0, 8, 8, 0]}>
                    {aprResult.comparisons.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.type === "Current"
                            ? "#DC2626"
                            : entry.type === "High"
                            ? "#F59E0B"
                            : "#16A34A"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Disclaimer inline />
        </div>
      )}
    </div>
  );
}
