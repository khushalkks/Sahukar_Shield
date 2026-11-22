"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  UploadCloud,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Smartphone,
  Sliders,
  DollarSign,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Info,
  Scale,
  Landmark,
  BadgePercent,
  Receipt,
} from "lucide-react";
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

  // Tab State: 'sliders' | 'upload' | 'text'
  const [activeTab, setActiveTab] = useState<"sliders" | "upload" | "text">("sliders");
  const [textInput, setTextInput] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Core Numerical Parameters (defaults to classic 7-day predatory trap)
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

  // Real-time client-side calculation for instantaneous slider reactivity
  const liveStats = useMemo(() => {
    const totalDeductions = processingFee + gstOnFee + otherDeductions + insuranceFee;
    const computedDisbursed = Math.max(1, principal - totalDeductions);
    const totalCost = repaymentAmount - computedDisbursed;
    const tenure = Math.max(1, tenureDays);
    const simpleApr = ((totalCost / computedDisbursed) * (365 / tenure)) * 100;
    const costPct = (totalCost / computedDisbursed) * 100;

    let verdict: "SAFE" | "RISKY" | "PREDATORY" = "SAFE";
    if (simpleApr > 100 || (tenure <= 15 && totalCost > 0)) {
      verdict = "PREDATORY";
    } else if (simpleApr > 45 || !kfsAprShown) {
      verdict = "RISKY";
    }

    return {
      totalDeductions,
      computedDisbursed,
      totalCost,
      simpleApr: Math.round(simpleApr * 100) / 100,
      costPct: Math.round(costPct * 10) / 10,
      verdict,
    };
  }, [principal, processingFee, gstOnFee, otherDeductions, insuranceFee, repaymentAmount, tenureDays, kfsAprShown]);

  // Synchronize disbursed amount when principal or deductions change in slider mode
  useEffect(() => {
    setDisbursedAmount(liveStats.computedDisbursed);
  }, [liveStats.computedDisbursed]);

  // Initial calculation on mount
  useEffect(() => {
    handleCalculate();
  }, []);

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
      setRepaymentAmount(22800);
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
      setRepaymentAmount(66000);
      setTenureDays(730);
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

  // Execute Code-Based APR Calculation with server explanation
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interest &amp; Fee Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate True Interest (APR) &amp; Hidden Fees
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Instant loan apps advertise &ldquo;low daily interest of 0.05%&rdquo;, but deduct 30% to 40% upfront as processing fees. We calculate your actual Annual Percentage Rate (APR) using exact math so you know the truth.
          </p>
        </div>

        {/* Live Status */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 px-3.5 py-2 rounded-xl flex items-center gap-2.5 border border-slate-800 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-live-dot" />
            <span className="text-slate-300 font-medium">Exact Formula Calculation</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Modes & Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Preset Buttons */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Load Common Loan Examples:</span>
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSample("sample_predatory_7day")}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold transition-all"
              >
                7-Day Trap (₹5,000)
              </button>
              <button
                type="button"
                onClick={() => handleSample("sample_predatory_15day")}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold transition-all"
              >
                15-Day Trap (₹10,000)
              </button>
              <button
                type="button"
                onClick={() => handleSample("sample_quick_3000")}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold transition-all"
              >
                10-Day QuickCash (₹3,000)
              </button>
              <button
                type="button"
                onClick={() => handleSample("sample_safe_bank_emi")}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold transition-all"
              >
                Bank Personal Loan (₹20,000)
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="glass-panel rounded-3xl p-6 border border-[#1E2C4A] space-y-6">
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setActiveTab("sliders")}
                className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === "sliders"
                    ? "border-emerald-400 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Adjust Loan Sliders</span>
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === "upload"
                    ? "border-emerald-400 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Screenshot</span>
              </button>
              <button
                onClick={() => setActiveTab("text")}
                className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === "text"
                    ? "border-emerald-400 text-emerald-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Paste Loan Text</span>
              </button>
            </div>

            {/* TAB: LIVE SLIDERS */}
            {activeTab === "sliders" && (
              <div className="space-y-6">
                {/* Principal Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Loan Amount Stated by App</span>
                    </span>
                    <span className="text-emerald-400 font-bold text-sm bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                      ₹{principal.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="500"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>₹1,000</span>
                    <span>₹25,000</span>
                    <span>₹50,000</span>
                    <span>₹100,000</span>
                  </div>
                </div>

                {/* Deductions Breakdown Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Upfront Processing Fee Deducted</span>
                      <span className="text-rose-400 font-bold">₹{processingFee.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="15000"
                      step="100"
                      value={processingFee}
                      onChange={(e) => setProcessingFee(Number(e.target.value))}
                      className="w-full accent-rose-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">GST on Processing Fee</span>
                      <span className="text-rose-400 font-bold">₹{gstOnFee.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="20"
                      value={gstOnFee}
                      onChange={(e) => setGstOnFee(Number(e.target.value))}
                      className="w-full accent-rose-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Other Hidden Fees &amp; Deductions</span>
                      <span className="text-rose-400 font-bold">₹{otherDeductions.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="50"
                      value={otherDeductions}
                      onChange={(e) => setOtherDeductions(Number(e.target.value))}
                      className="w-full accent-rose-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Total Amount Demanded Back</span>
                      <span className="text-amber-400 font-bold">₹{repaymentAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="120000"
                      step="500"
                      value={repaymentAmount}
                      onChange={(e) => setRepaymentAmount(Number(e.target.value))}
                      className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Tenure Slider */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Loan Repayment Deadline (Days)</span>
                    </span>
                    <span className={`font-bold text-xs px-2.5 py-1 rounded-lg border ${
                      tenureDays <= 15
                        ? "bg-rose-950/80 text-rose-400 border-rose-800"
                        : "bg-slate-800 text-slate-200 border-slate-700"
                    }`}>
                      {tenureDays} Days {tenureDays <= 15 ? "(Illegal 7-15 Day Trap)" : ""}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="365"
                    step="1"
                    value={tenureDays}
                    onChange={(e) => setTenureDays(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span className="text-rose-400 font-medium">7 Days (Scam Trap)</span>
                    <span className="text-amber-400">15 Days</span>
                    <span>90 Days</span>
                    <span>180 Days</span>
                    <span className="text-emerald-400">365 Days</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: UPLOAD BOX */}
            {activeTab === "upload" && (
              <UploadBox
                onFileSelect={handleFile}
                onSampleSelect={handleSample}
                isLoading={isExtracting}
              />
            )}

            {/* TAB: TEXT BOX */}
            {activeTab === "text" && (
              <div className="space-y-3 font-mono">
                <textarea
                  rows={4}
                  placeholder="Paste loan SMS or contractual terms (e.g., Sanctioned Rs 5000, Disbursed Rs 3500, Repay Rs 5000 in 7 days)..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-2xl border border-slate-700 focus:outline-none focus:border-emerald-500 bg-slate-900/80 text-white font-mono"
                />
                <button
                  onClick={handleExtractText}
                  disabled={isExtracting || !textInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow disabled:opacity-50 font-mono transition-all"
                >
                  {isExtracting ? "Extracting..." : "Parse Facility Terms"}
                </button>
              </div>
            )}

            {/* RBI Mandatory Key Fact Statement (KFS) Checklist */}
            <div className="pt-4 border-t border-[#1E2C4A] space-y-3 font-mono">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                RBI MANDATORY KEY FACT STATEMENT (KFS) REGULATORY COMPLIANCE:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer hover:border-emerald-500/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={kfsAprShown}
                    onChange={(e) => setKfsAprShown(e.target.checked)}
                    className="w-4 h-4 accent-emerald-400 rounded"
                  />
                  <span className="text-slate-300">Annual APR prominently displayed</span>
                </label>
                <label className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer hover:border-emerald-500/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={kfsFeesItemised}
                    onChange={(e) => setKfsFeesItemised(e.target.checked)}
                    className="w-4 h-4 accent-emerald-400 rounded"
                  />
                  <span className="text-slate-300">All fees itemized before disbursal</span>
                </label>
                <label className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer hover:border-emerald-500/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={kfsCoolingOff}
                    onChange={(e) => setKfsCoolingOff(e.target.checked)}
                    className="w-4 h-4 accent-emerald-400 rounded"
                  />
                  <span className="text-slate-300">Cooling-off / look-up exit window provided</span>
                </label>
                <label className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer hover:border-emerald-500/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={kfsGrievanceOfficer}
                    onChange={(e) => setKfsGrievanceOfficer(e.target.checked)}
                    className="w-4 h-4 accent-emerald-400 rounded"
                  />
                  <span className="text-slate-300">Grievance Redressal Officer published</span>
                </label>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all transform active:scale-[0.99]"
              >
                {isCalculating ? "Calculating Interest..." : "Calculate Full APR Breakdown"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Smartphone Mockup Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>What It Looks Like on Your Phone:</span>
            </span>

            {/* Smartphone Frame */}
            <div className="relative mx-auto w-full max-w-[340px] rounded-[40px] bg-[#0A101D] border-4 border-slate-800 p-3 shadow-2xl shadow-black/60">
              {/* Speaker / Camera Notch */}
              <div className="mx-auto h-4 w-28 bg-[#060A14] rounded-b-xl flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-8 h-1 rounded-full bg-slate-800" />
              </div>

              {/* Screen Content */}
              <div className="rounded-[28px] bg-gradient-to-b from-[#0E172A] via-[#091122] to-[#060A14] p-4 border border-white/5 space-y-4 text-white overflow-hidden relative">
                {/* Simulated App Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-xs font-bold">
                      ₹
                    </div>
                    <span className="text-xs font-bold tracking-tight">InstantRupee Loan</span>
                  </div>
                  <span className="text-[10px] text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800">
                    7-Day Deadline
                  </span>
                </div>

                {/* Stated Limit vs Disbursal */}
                <div className="rounded-xl bg-white/5 p-3.5 border border-white/5 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">Loan Amount:</span>
                    <span className="text-base font-extrabold text-white">₹{principal.toLocaleString()}</span>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Upfront Fees Cut:</span>
                      <span className="text-rose-400 font-bold">-₹{liveStats.totalDeductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-200 font-bold pt-1 border-t border-white/5">
                      <span className="text-emerald-400">Money in Your Bank:</span>
                      <span className="text-emerald-400 font-extrabold">₹{liveStats.computedDisbursed.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Repayment Reality Callout */}
                <div className="rounded-xl bg-rose-950/40 p-3.5 border border-rose-500/30 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-rose-300 font-semibold">Repay in {tenureDays} Days:</span>
                    <span className="text-lg font-extrabold text-rose-400">₹{repaymentAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-tight">
                    Extra money lost in just {tenureDays} days:
                    <strong className="text-rose-300 font-bold block mt-0.5">
                      ₹{liveStats.totalCost.toLocaleString()} ({liveStats.costPct}% of what you received)
                    </strong>
                  </p>
                </div>

                {/* Live Computed APR Meter Badge */}
                <div className="text-center p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                    EFFECTIVE ANNUALIZED APR
                  </span>
                  <span className={`text-2xl font-black font-mono block mt-0.5 ${
                    liveStats.simpleApr > 100 ? "text-rose-400" : liveStats.simpleApr > 45 ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {liveStats.simpleApr.toLocaleString()}% p.a.
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block mt-1">
                    {liveStats.verdict === "PREDATORY" ? "🚨 Usurious Predatory Yield" : "Regulated Prime Yield"}
                  </span>
                </div>

                {/* Simulated Action Button */}
                <div className="pt-1">
                  <div className="w-full py-2.5 rounded-xl bg-slate-800/80 text-center text-[11px] font-mono font-bold text-slate-400 border border-white/5">
                    Credit Terms Locked
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3 font-mono">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Visual Telemetry & Deconstructed Results Section */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        {/* Highlight Banner */}
        <div className="bg-rose-950/30 rounded-2xl p-6 sm:p-7 border border-rose-900/50 text-center space-y-2 relative overflow-hidden">
          <span className="text-xs uppercase font-semibold tracking-wider text-rose-400">
            Real Cost Breakdown
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            You Received ₹{liveStats.computedDisbursed.toLocaleString()} &rarr; You Must Pay ₹{repaymentAmount.toLocaleString()}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Total extra charges for just {tenureDays} days:{" "}
            <strong className="text-rose-400 font-bold">
              ₹{liveStats.totalCost.toLocaleString()} ({liveStats.costPct}% of what you received)
            </strong>
          </p>
        </div>

        {/* Verdict HUD & APR Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <AprGauge apr={liveStats.simpleApr} verdict={liveStats.verdict} />

          <VerdictCard
            verdict={liveStats.verdict}
            title={
              liveStats.verdict === "PREDATORY"
                ? "Illegal Scam Loan (Dangerous Interest)"
                : liveStats.verdict === "RISKY"
                ? "High Risk / Heavy Deductions"
                : "Safe & Reasonable Interest Rate"
            }
            subtitle={
              aprResult?.explanation ||
              `This loan charges an annualized interest rate of ${liveStats.simpleApr.toLocaleString()}% p.a. over a short ${tenureDays}-day repayment window.`
            }
            reasons={[
              `Calculated Annual Interest (APR): ${liveStats.simpleApr.toLocaleString()}% per year`,
              `${tenureDays}-day repayment deadline violates RBI's minimum tenure regulations`,
              `₹${liveStats.totalDeductions.toLocaleString()} was cut upfront before sending money to your bank`,
              kfsAprShown ? "Annual APR was disclosed" : "Annual interest was hidden from you",
            ]}
            ctaText="Being threatened for repayment? Get help now"
            ctaHref="/threat"
          />
        </div>

        {/* Recharts Benchmark Comparison Bar Chart */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-400" />
                <span>How This Compares with Real Bank Loans</span>
              </h3>
              <p className="text-xs text-slate-400">
                Compare this loan&apos;s annual interest rate against regular banks, NBFCs, and credit cards.
              </p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800 self-start sm:self-auto font-medium">
              RBI Standards
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  aprResult?.comparisons || [
                    { name: "SBI Personal Loan", apr_pct: 12.5, type: "Safe" },
                    { name: "Regulated NBFC EMI", apr_pct: 24.0, type: "Safe" },
                    { name: "Credit Card Revolving", apr_pct: 42.0, type: "High" },
                    { name: "Current Facility (Analyzed)", apr_pct: liveStats.simpleApr, type: "Current" },
                  ]
                }
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" unit="%" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 11, fill: "#e2e8f0", fontWeight: "bold" }} />
                <Tooltip
                  formatter={(value: any) => [`${value}% p.a.`, "Annual Percentage Rate (APR)"]}
                  contentStyle={{ backgroundColor: "#0E1526", borderColor: "#1E2C4A", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                />
                <Bar dataKey="apr_pct" radius={[0, 8, 8, 0]}>
                  {(aprResult?.comparisons || [
                    { type: "Safe" },
                    { type: "Safe" },
                    { type: "High" },
                    { type: "Current" },
                  ]).map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.type === "Current"
                          ? "#f43f5e"
                          : entry.type === "High"
                          ? "#f59e0b"
                          : "#10b981"
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
    </div>
  );
}
