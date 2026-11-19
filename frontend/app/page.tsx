"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Calculator,
  AlertTriangle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Lock,
  PhoneCall,
  CheckCircle2,
  Zap,
  Activity,
  Terminal,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Radio,
  Landmark,
  Scale,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function HomePage() {
  const { t } = useI18n();

  // Interactive Live Financial Sandbox state on Home page
  const [sandboxTab, setSandboxTab] = useState<"verify" | "apr" | "threat">("verify");
  const [sandboxPrincipal, setSandboxPrincipal] = useState<number>(5000);
  const [sandboxDisbursed, setSandboxDisbursed] = useState<number>(3500);
  const [sandboxTenure, setSandboxTenure] = useState<number>(7);

  // Real-time APR calculation in sandbox
  const cost = 5000 - sandboxDisbursed;
  const periodRate = cost / sandboxDisbursed;
  const liveSimpleApr = (periodRate * (365 / sandboxTenure) * 100).toFixed(1);

  return (
    <div className="space-y-16 pb-20 bg-[#080C14] bg-financial-grid min-h-screen text-slate-100">
      {/* Live Financial Telemetry Ticker (Bloomberg / Stripe Radar style) */}
      <div className="bg-[#05080F] border-b border-[#1E2C4A] py-2 px-4 text-[11px] font-mono text-slate-400 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-live-dot" />
            <span className="font-bold text-emerald-400 tracking-wider uppercase">REGULATORY CREDIT TELEMETRY:</span>
          </div>
          <div className="overflow-x-auto whitespace-nowrap scrollbar-none flex items-center space-x-6 text-slate-300">
            <span className="hover:text-white transition-colors">🏛️ [RBI Audit] <strong>DemoBank Easy Loan</strong> verified: Regulated Scheduled Commercial Bank</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-white transition-colors">🚨 [Usury Alert] <strong>QuickRupee Instant</strong> flagged: 2,234.7% effective APR with illegal fee deductions</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-white transition-colors">⚠️ [Compliance Breach] <strong>FastCoin</strong>: Unregistered NBFC entity operating without Certificate of Registration (CoR)</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-white transition-colors">🛡️ [Cyber Coordination] <strong>1930 Helpline</strong>: Frozen 8 mule UPI accounts linked to predatory syndicates</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Institutional Banking HUD */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080C14] bg-fin-glow">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>Institutional Lending Audit &amp; Consumer Credit Protection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto text-white">
            {t(
              "home.hero_title",
              "Institutional Credit Audit. Expose 2,000%+ Usurious APR. Defend Borrower Rights."
            )}
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {t(
              "home.hero_subtitle",
              "Regulatory intelligence against predatory digital lending syndicates. Reconcile net disbursals, calculate true annualized percentage rates (APR) via deterministic mathematics, and compile court-admissible evidence affidavits in seconds."
            )}
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap justify-center gap-4 font-mono">
            <Link
              href="/verify"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center space-x-2.5 transition-all hover:scale-105"
            >
              <Landmark className="w-4 h-4" />
              <span>{t("home.cta_verify", "Audit Lending Entity")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cost"
              className="px-8 py-4 rounded-2xl bg-[#0E1526] hover:bg-slate-800 text-white font-bold text-sm border border-[#1E2C4A] flex items-center space-x-2.5 transition-all shadow-lg"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>{t("home.cta_cost", "Deconstruct Effective APR")}</span>
            </Link>
          </div>
        </div>

        {/* Emergency Dispatch Banner */}
        <div className="max-w-4xl mx-auto mt-12 glass-panel-danger rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-rose-600 rounded-2xl text-white shadow-lg shadow-rose-600/30">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <p className="font-black text-white text-base">Facing Blackmail, Coercion, or Defamation Threats?</p>
              <p className="text-xs text-rose-200">
                National Cyber Crime Helpline: <strong>Dial 1930</strong> • Do not transfer extortion ransom.
              </p>
            </div>
          </div>
          <Link
            href="/threat"
            className="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs font-mono uppercase tracking-wider shadow-lg shadow-rose-600/30 transition-all shrink-0"
          >
            Launch Recovery Triage
          </Link>
        </div>
      </section>

      {/* Interactive Live Financial Sandbox */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2C4A] pb-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                Interactive Credit &amp; Compliance Sandbox
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Deconstruct Predatory Lending in Real-Time
              </h2>
            </div>
            <div className="flex bg-[#080C14] p-1 rounded-xl border border-[#1E2C4A] text-xs font-bold font-mono">
              <button
                onClick={() => setSandboxTab("verify")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  sandboxTab === "verify" ? "bg-emerald-500 text-slate-950 font-black" : "text-slate-400 hover:text-white"
                }`}
              >
                1. Regulatory Audit
              </button>
              <button
                onClick={() => setSandboxTab("apr")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  sandboxTab === "apr" ? "bg-emerald-500 text-slate-950 font-black" : "text-slate-400 hover:text-white"
                }`}
              >
                2. Effective APR Engine
              </button>
              <button
                onClick={() => setSandboxTab("threat")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  sandboxTab === "threat" ? "bg-emerald-500 text-slate-950 font-black" : "text-slate-400 hover:text-white"
                }`}
              >
                3. Coercive Collection Triage
              </button>
            </div>
          </div>

          {/* Sandbox Tab 1: Live Verifier Simulation */}
          {sandboxTab === "verify" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fadeIn">
              <div className="space-y-4 font-mono text-xs">
                <div className="bg-[#05080F] p-4 rounded-2xl border border-[#1E2C4A] space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-[10px]">
                    <span>QUERY: QuickRupee Instant</span>
                    <span className="text-emerald-400">RESOLVED</span>
                  </div>
                  <p className="text-slate-300">
                    <span className="text-emerald-400">[REGISTRY CHECK]</span> Cross-referencing RBI Master NBFC Directory (9,400 licensed entities)...
                  </p>
                  <p className="text-rose-400 font-bold">
                    <span className="text-rose-500">[FLAGGED]</span> No valid Certificate of Registration (CoR) issued by RBI.
                  </p>
                  <p className="text-slate-300">
                    <span className="text-emerald-400">[FPC AUDIT]</span> Evaluating Fair Practices Code compliance...
                  </p>
                  <p className="text-amber-400 font-bold">
                    <span className="text-amber-500">[BREACH]</span> Unauthorized contact scraping &amp; upfront fee deductions detected.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/verify"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono transition-transform hover:scale-105 inline-flex items-center gap-1.5"
                  >
                    <span>Audit Any Lending Entity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="glass-panel-danger p-6 rounded-3xl space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  REGULATORY STATUS: CRITICAL RISK
                </span>
                <h3 className="text-xl font-black text-rose-300">UNLICENSED USURY SYNDICATE</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Composite Danger Index: <strong>75/100</strong>. This entity operates completely outside the RBI regulatory perimeter, charging usurious annualized rates exceeding 2,000% with coercive collection tactics.
                </p>
                <div className="pt-2 text-[11px] font-mono text-slate-400">
                  Regulatory directive: Revoke device permissions; do not submit identity or bank KYC.
                </div>
              </div>
            </div>
          )}

          {/* Sandbox Tab 2: Live APR Slider Simulation */}
          {sandboxTab === "apr" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fadeIn">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-slate-300 mb-1">
                    <span>Stated Principal: ₹{sandboxPrincipal.toLocaleString()}</span>
                    <span className="text-emerald-400">Net Disbursed: ₹{sandboxDisbursed.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="4500"
                    step="100"
                    value={sandboxDisbursed}
                    onChange={(e) => setSandboxDisbursed(parseInt(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span className="text-rose-400">Upfront deductions: ₹{(5000 - sandboxDisbursed).toLocaleString()}</span>
                    <span>Repayment in 7 days: ₹5,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold text-slate-300 mb-1">
                    <span>Facility Tenure: {sandboxTenure} Days</span>
                    <span className="text-rose-400 font-black">7-Day Usury Compression</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="30"
                    step="1"
                    value={sandboxTenure}
                    onChange={(e) => setSandboxTenure(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <Link
                  href="/cost"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono transition-transform hover:scale-105 inline-flex items-center gap-1.5"
                >
                  <span>Deconstruct Full Facility Terms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="glass-panel p-6 rounded-3xl text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  DETERMINISTIC SIMPLE APR
                </span>
                <p className="text-4xl sm:text-5xl font-black font-mono text-rose-500 tracking-tight">
                  {liveSimpleApr}% p.a.
                </p>
                <p className="text-xs text-slate-300 font-medium">
                  Borrower receives ₹{sandboxDisbursed.toLocaleString()} and repays ₹5,000 in {sandboxTenure} days.
                </p>
                <p className="text-[11px] font-mono text-rose-400 font-bold bg-rose-950/40 p-2 rounded-xl border border-rose-900/60">
                  Financing charge equivalent to {(parseFloat(liveSimpleApr) / 14).toFixed(0)}x the cost of a prime regulated commercial bank facility.
                </p>
              </div>
            </div>
          )}

          {/* Sandbox Tab 3: Harassment Triage Simulation */}
          {sandboxTab === "threat" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fadeIn">
              <div className="space-y-3">
                <div className="bg-[#05080F] p-4 rounded-2xl border border-[#1E2C4A] text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                    <span>RECOVERY COMMUNICATION LOG</span>
                    <span>10:42 AM</span>
                  </div>
                  <p className="text-slate-200 italic font-medium">
                    &ldquo;We have scraped your entire phone directory of 450 contacts. Within 30 minutes, your family and employer will receive your defaulter notice.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/threat"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono transition-transform hover:scale-105 inline-flex items-center gap-1.5"
                  >
                    <span>Classify Infractions &amp; Draft Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="glass-panel-danger p-6 rounded-3xl space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  SEVERITY 5/5: COGNIZABLE EXTORTION
                </span>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white font-mono">BNS § 308 (Extortion under threat of injury)</p>
                  <p className="text-xs font-bold text-white font-mono">IT Act § 66E (Violation of Bodily &amp; Communication Privacy)</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Third-party contact harassment violates RBI Digital Lending Guidelines. Contacts carry strictly zero financial liability.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3 Core Architecture Stages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
            End-to-End Consumer Credit Defense
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t("home.how_it_works_title", "Comprehensive Credit Defense Architecture")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {/* Card 1: Regulatory Lender Audit */}
          <div className="glass-panel rounded-3xl p-7 hover:border-emerald-500/60 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                Stage 1: Pre-Disbursal
              </span>
              <h3 className="text-xl font-black text-white font-sans">1. Regulatory Lender Audit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {t(
                  "home.step1_desc",
                  "Automated matching against the Reserve Bank of India (RBI) NBFC Master Registry with Fair Practices Code manifest scoring."
                )}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/verify"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-800/80 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 font-bold text-xs transition-all font-mono"
              >
                <span>Audit Lending Entity</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: True Cost X-Ray */}
          <div className="glass-panel rounded-3xl p-7 hover:border-amber-500/60 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
                Stage 2: While Evaluating
              </span>
              <h3 className="text-xl font-black text-white font-sans">2. True Cost X-Ray</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {t(
                  "home.step2_desc",
                  "Isolate hidden deductions, upfront fees, and tenure compressions to calculate true annualized financing cost using pure math."
                )}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/cost"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-800/80 hover:bg-amber-500 text-slate-200 hover:text-slate-950 font-bold text-xs transition-all font-mono"
              >
                <span>Calculate True APR</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Threat Shield */}
          <div className="glass-panel rounded-3xl p-7 hover:border-rose-500/60 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400 block">
                Stage 3: Post-Harassment
              </span>
              <h3 className="text-xl font-black text-white font-sans">3. Recovery Triage &amp; Dossier</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {t(
                  "home.step3_desc",
                  "Map harassment to Bharatiya Nyaya Sanhita (BNS 2023) and compile submission-ready affidavits for police and RBI Ombudsmen."
                )}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/threat"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-800/80 hover:bg-rose-500 text-slate-200 hover:text-white font-bold text-xs transition-all font-mono"
              >
                <span>Triage Extortion Communications</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
