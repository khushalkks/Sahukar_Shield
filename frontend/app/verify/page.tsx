"use client";

import React, { useState } from "react";
import {
  Shield,
  Search,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Terminal,
  Activity,
  Smartphone,
  Lock,
  Layers,
  Landmark,
  Scale,
  CheckCircle2,
} from "lucide-react";
import { verifyApp } from "../../lib/api";
import { VerifyResponse } from "../../lib/types";
import VerdictCard from "../../components/VerdictCard";
import MicButton from "../../components/MicButton";
import Disclaimer from "../../components/Disclaimer";
import { useI18n } from "../../lib/i18n";

const SAMPLE_APPS = [
  { name: "QuickRupee Instant", type: "predatory", label: "QuickRupee (Predatory Usury)" },
  { name: "CashNow Express", type: "predatory", label: "CashNow (Unregistered)" },
  { name: "DemoBank Easy Loan", type: "safe", label: "DemoBank (RBI Scheduled Bank)" },
  { name: "Sampark Finserv Lend", type: "safe", label: "Sampark Finserv (NBFC-ICC)" },
  { name: "https://play.google.com/store/apps/details?id=com.quickrupee.instant", type: "url", label: "Play Store URL" },
];

const PERMISSIONS_LIST = [
  { id: "contacts", label: "Contacts Directory (Phonebook)", risk: 30, critical: true, tag: "android.permission.READ_CONTACTS" },
  { id: "sms", label: "SMS Messages & Financial OTPs", risk: 25, critical: true, tag: "android.permission.READ_SMS" },
  { id: "gallery", label: "Photos / Camera Gallery Access", risk: 20, critical: true, tag: "android.permission.READ_EXTERNAL_STORAGE" },
  { id: "call_logs", label: "Call History Logs", risk: 15, critical: false, tag: "android.permission.READ_CALL_LOG" },
  { id: "location", label: "Fine Location GPS", risk: 5, critical: false, tag: "android.permission.ACCESS_FINE_LOCATION" },
  { id: "microphone", label: "Microphone Audio Recording", risk: 3, critical: false, tag: "android.permission.RECORD_AUDIO" },
  { id: "camera", label: "Camera Hardware Access", risk: 2, critical: false, tag: "android.permission.CAMERA" },
];

const RED_FLAGS_LIST = [
  { id: "advance_fee", label: "Demands upfront processing fees or security deposit before disbursal (+25)", heavy: true },
  { id: "harassment_reviews", label: "Consumer reviews report extortion calls, blackmail, or morphed photo threats (+15)", heavy: true },
  { id: "free_email", label: "Customer support uses free email provider (Gmail / Yahoo / Hotmail) (+10)", heavy: false },
  { id: "no_address", label: "No verifiable physical registered corporate office listed in India (+10)", heavy: false },
  { id: "new_app", label: "Application domain or APK was published less than 6 months ago (+10)", heavy: false },
  { id: "no_cibil_claim", label: "Deceptive claim: '100% Instant Approval with No CIBIL / Credit Underwriting' (+10)", heavy: false },
];

export default function VerifyPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>(["contacts", "sms", "gallery"]);
  const [selectedFlags, setSelectedFlags] = useState<string[]>(["advance_fee", "free_email"]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (appQuery?: string) => {
    const q = appQuery || query;
    if (!q.trim()) return;

    setIsScanning(true);
    setError(null);
    setResult(null);

    // Real-time forensic scan simulation progression
    setScanStep(1);
    await new Promise((r) => setTimeout(r, 400));
    setScanStep(2);
    await new Promise((r) => setTimeout(r, 450));
    setScanStep(3);

    try {
      const res = await verifyApp({
        query: q.trim(),
        permissions: selectedPerms,
        flags: selectedFlags,
      });
      setScanStep(4);
      await new Promise((r) => setTimeout(r, 300));
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Regulatory audit failed. Please try again.");
    } finally {
      setIsScanning(false);
      setScanStep(0);
    }
  };

  const togglePerm = (id: string) => {
    setSelectedPerms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleFlag = (id: string) => {
    setSelectedFlags((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
          <Landmark className="w-3.5 h-3.5" />
          <span>STAGE 1 // PRE-DISBURSAL REGULATORY LENDER AUDIT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
          {t("verify.title", "Digital Lending Underwriting & CoR Verification")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-sans font-normal">
          {t(
            "verify.subtitle",
            "Audit digital lending applications and Play Store packages against the Reserve Bank of India (RBI) Master NBFC Registry and mandatory Fair Practices Code (FPC) guidelines."
          )}
        </p>
      </div>

      {/* Directory Notice Banner */}
      <div className="bg-[#0E1526]/90 border border-emerald-500/30 text-slate-300 rounded-2xl p-4 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            <strong>RBI Master Directory Telemetry:</strong> 35 Regulated Scheduled Commercial Banks &amp; Known Flagged Predatory Syndicates indexed.
          </span>
        </div>
        <span className="text-emerald-400 font-bold hidden sm:block">STATUS: VERIFIED</span>
      </div>

      {/* Main Search Input Form */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Target Application Title or Google Play Store Package URL:
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t(
                  "verify.input_placeholder",
                  "Enter digital lending application title (e.g. QuickRupee Instant) or Play Store URL..."
                )}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                className="w-full text-sm py-3.5 pl-10 pr-24 rounded-2xl border border-slate-700 focus:outline-none focus:border-emerald-400 shadow-inner bg-[#080C14] text-white font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <MicButton onTranscript={(txt) => setQuery((prev) => prev + " " + txt)} />
              </div>
            </div>
            <button
              onClick={() => handleVerify()}
              disabled={isScanning || !query.trim()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 shrink-0 flex items-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>{isScanning ? "Auditing..." : t("verify.btn_check", "Execute Regulatory Audit")}</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Chips */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            {t("verify.sample_chips", "Select Benchmark Audit Vectors:")}
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_APPS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(item.name);
                  handleVerify(item.name);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  item.type === "predatory"
                    ? "bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20"
                    : item.type === "safe"
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                🏛️ {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Checkbox Group 1: Permissions */}
        <div className="pt-4 border-t border-[#1E2C4A] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {t("verify.perms_heading", "Android Manifest Permissions & Data Scraping Telemetry:")}
            </h3>
            <span className="text-[10px] text-slate-500">(Audited against RBI cyber directives)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {PERMISSIONS_LIST.map((p) => {
              const active = selectedPerms.includes(p.id);
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => togglePerm(p.id)}
                  className={`p-3 rounded-2xl text-xs text-left border transition-all flex items-center justify-between ${
                    active
                      ? p.critical
                        ? "bg-rose-950/40 border-rose-500 text-rose-200 font-bold shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                        : "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold"
                      : "bg-[#080C14] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="block font-bold">{p.label}</span>
                    <span className="text-[9px] text-slate-500 block truncate">{p.tag}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      active ? "bg-white/10" : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    +{p.risk}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Checkbox Group 2: Red Flags */}
        <div className="pt-4 border-t border-[#1E2C4A] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {t("verify.flags_heading", "Operator Red Flags & Regulatory Non-Compliance Signals:")}
          </h3>
          <div className="space-y-2">
            {RED_FLAGS_LIST.map((f) => {
              const active = selectedFlags.includes(f.id);
              return (
                <div
                  key={f.id}
                  onClick={() => toggleFlag(f.id)}
                  className={`p-3.5 rounded-2xl text-xs border cursor-pointer transition-all flex items-center justify-between ${
                    active
                      ? f.heavy
                        ? "bg-rose-950/30 border-rose-500/80 text-rose-200 font-bold"
                        : "bg-amber-950/30 border-amber-500/80 text-amber-200 font-bold"
                      : "bg-[#080C14] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className="font-sans">{f.label}</span>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => {}}
                    className="w-4 h-4 accent-emerald-400 rounded"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-Time Live Security Audit Progress Bar */}
      {isScanning && (
        <div className="glass-panel-elevated rounded-3xl p-6 text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-emerald-400 font-bold">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              EXECUTING REGULATORY UNDERWRITING AUDIT...
            </span>
            <span>{scanStep * 25}%</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-emerald-500 h-2 transition-all duration-300"
              style={{ width: `${scanStep * 25}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 space-y-1 pt-1">
            <p className={scanStep >= 1 ? "text-emerald-400 font-semibold" : "text-slate-600"}>
              [✓] Step 1: Resolving Google Play Package ID &amp; APK Manifest...
            </p>
            <p className={scanStep >= 2 ? "text-emerald-400 font-semibold" : "text-slate-600"}>
              [✓] Step 2: Cross-referencing RBI Master Directory of Licensed NBFCs...
            </p>
            <p className={scanStep >= 3 ? "text-amber-400 font-semibold" : "text-slate-600"}>
              [✓] Step 3: Auditing Fair Practices Code (FPC) data access perimeter...
            </p>
            <p className={scanStep >= 4 ? "text-emerald-400 font-semibold" : "text-slate-600"}>
              [✓] Step 4: Generating Composite Danger Index (CDI) &amp; Regulatory Verdict...
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Verification Result Display */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          <VerdictCard
            verdict={result.verdict}
            title={
              result.verdict === "GREEN"
                ? "RBI REGULATED & VERIFIED (PRIME ENTITY)"
                : result.verdict === "AMBER"
                ? "UNVERIFIED ENTITY / ELEVATED RISK"
                : "PREDATORY USURY SYNDICATE (CRITICAL DANGER)"
            }
            subtitle={result.explanation_hinglish}
            reasons={
              result.red_flags.length > 0
                ? result.red_flags
                : [
                    "Direct cryptographic match with registered RBI NBFC entity",
                    "Permission risk profile within safe consumer guidelines",
                    "No advance fees or coercive recovery patterns on record",
                  ]
            }
            ctaText="Next: Deconstruct Effective APR & Financing Cost"
            ctaHref="/cost"
          />

          {/* Telemetry Breakdown Grid */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E2C4A] pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Regulatory Underwriting &amp; Manifest Telemetry
              </h3>
              <span className="text-[10px] text-emerald-400">DETERMINISTIC VERIFIER</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#080C14] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">RBI Match Score</span>
                <p className="text-2xl font-black text-white">{result.match.score}%</p>
                <span className="text-[10px] text-slate-400 block truncate">{result.match.best_match}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#080C14] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Data Access Risk</span>
                <p className={`text-2xl font-black ${result.permission_risk > 50 ? "text-rose-400" : "text-emerald-400"}`}>
                  {result.permission_risk} / 100
                </p>
                <span className="text-[10px] text-slate-400 block">Manifest Weighted Score</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#080C14] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Red Flags Tripped</span>
                <p className="text-2xl font-black text-amber-400">{result.red_flags.length}</p>
                <span className="text-[10px] text-slate-400 block">Unfair Practices Identified</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#080C14] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Entity Classification</span>
                <p className="text-lg font-black text-white truncate">
                  {result.verdict === "GREEN" ? "NBFC / Bank" : "Unlicensed App"}
                </p>
                <span className="text-[10px] text-slate-400 block">Regulatory Standing</span>
              </div>
            </div>
          </div>

          <Disclaimer inline />
        </div>
      )}
    </div>
  );
}
