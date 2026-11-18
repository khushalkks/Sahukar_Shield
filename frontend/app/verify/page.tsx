"use client";

import React, { useState } from "react";
import { Shield, Search, AlertCircle, CheckCircle, ExternalLink, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { verifyApp } from "../../lib/api";
import { VerifyResponse } from "../../lib/types";
import VerdictCard from "../../components/VerdictCard";
import MicButton from "../../components/MicButton";
import Disclaimer from "../../components/Disclaimer";
import { useI18n } from "../../lib/i18n";

const SAMPLE_APPS = [
  { name: "QuickRupee Instant", type: "predatory" },
  { name: "CashNow Express", type: "predatory" },
  { name: "DemoBank Easy Loan", type: "safe" },
  { name: "Sampark Finserv Lend", type: "safe" },
  { name: "https://play.google.com/store/apps/details?id=com.quickrupee.instant", type: "url" },
];

const PERMISSIONS_LIST = [
  { id: "contacts", label: "Contacts (Phonebook)", risk: 30, critical: true },
  { id: "sms", label: "SMS Messages", risk: 25, critical: true },
  { id: "gallery", label: "Photos / Media / Gallery", risk: 20, critical: true },
  { id: "call_logs", label: "Call Logs", risk: 15, critical: false },
  { id: "location", label: "Location", risk: 5, critical: false },
  { id: "microphone", label: "Microphone", risk: 3, critical: false },
  { id: "camera", label: "Camera", risk: 2, critical: false },
];

const RED_FLAGS_LIST = [
  { id: "advance_fee", label: "Loan milne se pehle Advance Processing Fee maang raha hai (+25)", heavy: true },
  { id: "harassment_reviews", label: "Play Store reviews me harassment ya blackmail ki shikayatein hain (+15)", heavy: true },
  { id: "free_email", label: "Support email Gmail / Yahoo / Hotmail ka hai (+10)", heavy: false },
  { id: "no_address", label: "Koi registered office address nahi dikh raha (+10)", heavy: false },
  { id: "new_app", label: "App 6 mahine se kam purana hai (+10)", heavy: false },
  { id: "no_cibil_claim", label: "Dawa: '100% Approval, No CIBIL / Credit Check' (+10)", heavy: false },
];

export default function VerifyPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>(["contacts", "sms"]);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (appQuery?: string) => {
    const q = appQuery || query;
    if (!q.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await verifyApp({
        query: q.trim(),
        permissions: selectedPerms,
        flags: selectedFlags,
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || "App verification failed. Please try again.");
    } finally {
      setIsLoading(false);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>Stage 1: Pre-Loan Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800">
          {t("verify.title", "Loan App Verification & Risk Check")}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t("verify.subtitle", "Play Store URL ya app ka naam likhein. RBI directory match aur permissions check karein.")}
        </p>
      </div>

      {/* Directory Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs flex items-center justify-between">
        <span>
          ℹ️ <strong>Demo Directory Active:</strong> 35 synthetic banks & flagged apps loaded. Real-world RBI list update karne ke liye <code>rbi_apps.csv</code> replace karein.
        </span>
      </div>

      {/* Main Search Input Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            App Ka Naam Ya Play Store Link:
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t("verify.input_placeholder", "Jaise: QuickRupee Instant, ya Play Store link...")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                className="w-full text-sm py-3.5 pl-10 pr-24 rounded-2xl border border-slate-300 focus:outline-none focus:border-teal-500 shadow-inner bg-slate-50 text-navy-900"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <MicButton onTranscript={(txt) => setQuery((prev) => prev + " " + txt)} />
              </div>
            </div>
            <button
              onClick={() => handleVerify()}
              disabled={isLoading || !query.trim()}
              className="px-6 py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-navy-700 text-white font-bold text-sm shadow transition-all disabled:opacity-50 shrink-0"
            >
              {isLoading ? "Checking..." : t("verify.btn_check", "Verify Karo")}
            </button>
          </div>
        </div>

        {/* Quick Sample Chips */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {t("verify.sample_chips", "Sample try karo:")}
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
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  item.type === "predatory"
                    ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    : item.type === "safe"
                    ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-mono"
                }`}
              >
                ⚡ {item.name.length > 30 ? item.name.slice(0, 30) + "..." : item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Checkbox Group 1: Permissions */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
            <span>{t("verify.perms_heading", "App kaunse permissions maang raha hai?")}</span>
            <span className="text-[11px] font-normal text-slate-500">(Tick all that apply)</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PERMISSIONS_LIST.map((p) => {
              const active = selectedPerms.includes(p.id);
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => togglePerm(p.id)}
                  className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                    active
                      ? p.critical
                        ? "bg-red-50 border-red-400 text-red-900 font-bold"
                        : "bg-teal-50 border-teal-400 text-teal-900 font-bold"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span>{p.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      active ? "bg-white/80" : "bg-slate-100 text-slate-500"
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
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
            <span>{t("verify.flags_heading", "Developer ke red flags (check karein):")}</span>
          </h3>
          <div className="space-y-2">
            {RED_FLAGS_LIST.map((f) => {
              const active = selectedFlags.includes(f.id);
              return (
                <div
                  key={f.id}
                  onClick={() => toggleFlag(f.id)}
                  className={`p-3 rounded-xl text-xs font-medium border cursor-pointer transition-all flex items-center justify-between ${
                    active
                      ? f.heavy
                        ? "bg-red-50 border-red-500 text-red-950 font-bold"
                        : "bg-amber-50 border-amber-500 text-amber-950 font-bold"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span>{f.label}</span>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => {}}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
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
                ? "RBI DIRECTORY ME VERIFIED HAI"
                : result.verdict === "AMBER"
                ? "UNVERIFIED / KHATARNAK HO SAKTA HAI"
                : "ILLEGAL PREDATORY APP (SAVDHAN!)"
            }
            subtitle={result.explanation_hinglish}
            reasons={
              result.red_flags.length > 0
                ? result.red_flags
                : [
                    "RBI Regulated Entity ke saath registered match",
                    "Permissions risk level normal hai",
                    "Koi advance fee flag nahi mila",
                  ]
            }
            ctaText="Next: Is Loan Ka Asli Byaj (True Cost) Check Karo"
            ctaHref="/cost"
          />

          {/* Detailed Score Breakdown Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Detailed Verifier Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-semibold block">RBI Name Match</span>
                <span className="text-2xl font-black text-navy-800">
                  {result.match.score.toFixed(0)}%
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {result.match.found ? "Official Match Found" : "No Direct Match"}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-semibold block">Permission Risk</span>
                <span
                  className={`text-2xl font-black ${
                    result.permission_risk >= 70
                      ? "text-red-600"
                      : result.permission_risk >= 40
                      ? "text-amber-600"
                      : "text-green-600"
                  }`}
                >
                  {result.permission_risk} / 100
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {result.permission_risk >= 70 ? "Critical Danger" : "Moderate Risk"}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 font-semibold block">Lender Entity</span>
                <span className="text-sm font-bold text-navy-800 block truncate mt-1">
                  {result.match.lender || "Unknown / Unregistered"}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {result.match.entity_type || "No Regulatory Record"}
                </span>
              </div>
            </div>
          </div>

          <Disclaimer inline />
        </div>
      )}
    </div>
  );
}
