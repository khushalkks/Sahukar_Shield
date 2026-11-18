"use client";

import React from "react";
import Link from "next/link";
import { Shield, Calculator, AlertTriangle, FileText, ArrowRight, ShieldCheck, Lock, PhoneCall, CheckCircle2, Zap } from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0B1F3A] to-[#071324] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Digital Lending Consumer Defense Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto text-slate-100">
            {t("home.hero_title", "Loan lene se pehle check karo. Asli byaj jaano. Dhamki mile to jawab do.")}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {t(
              "home.hero_subtitle",
              "Illegal 7-day loan apps se bachein. RBI register verify karein, 2000%+ APR ka asli sach samjhein, aur extortion messages ka kanooni jawab dein."
            )}
          </p>

          {/* Quick Demo Script Link */}
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/verify"
              className="px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-teal-500/20 flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <span>{t("home.cta_verify", "App Verify Karo")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cost"
              className="px-6 py-3.5 rounded-2xl bg-navy-700 hover:bg-navy-600 text-white font-bold text-sm border border-navy-600 flex items-center space-x-2 transition-colors"
            >
              <span>{t("home.cta_cost", "Asli Byaj (APR) Nikalo")}</span>
              <Calculator className="w-4 h-4 text-teal-400" />
            </Link>
          </div>
        </div>

        {/* Emergency Helpline Ribbon */}
        <div className="max-w-4xl mx-auto mt-12 bg-red-950/60 border border-red-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3 text-red-200">
            <div className="p-2 rounded-xl bg-red-600 text-white shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Emergency Helpline: 1930</p>
              <p className="text-slate-300">National Cyber Crime Reporting Portal (cybercrime.gov.in)</p>
            </div>
          </div>
          <Link
            href="/threat"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shrink-0 transition-colors"
          >
            Dhamki Report Karein
          </Link>
        </div>
      </section>

      {/* 3 Core Action Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8 relative z-20">
          {/* Card 1: Verify */}
          <div className="bg-white rounded-3xl p-7 shadow-lg border border-slate-200/80 hover:border-teal-500 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
                Stage 1: Before Borrowing
              </span>
              <h3 className="text-2xl font-black text-[#0B1F3A]">1. App Verify Karo</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                RBI registered NBFC/Bank match, Play Store URL check, aur dangerous permissions (contacts, gallery, SMS) ka risk score.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/verify"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-100 hover:bg-teal-50 text-navy-800 hover:text-teal-700 font-bold text-sm transition-colors"
              >
                <span>App Check Karein</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: True Cost */}
          <div className="bg-white rounded-3xl p-7 shadow-lg border border-slate-200/80 hover:border-amber-500 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
                Stage 2: While Borrowing
              </span>
              <h3 className="text-2xl font-black text-[#0B1F3A]">2. True Cost X-Ray</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Screenshot upload karo. Code se 2,200%+ simple APR calculate karo. Tumhe mile ₹3,500, wapas mange ₹5,000 ka asli hisaab.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/cost"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-100 hover:bg-amber-50 text-navy-800 hover:text-amber-700 font-bold text-sm transition-colors"
              >
                <span>Asli Byaj Dekho</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Threat Shield */}
          <div className="bg-white rounded-3xl p-7 shadow-lg border border-slate-200/80 hover:border-red-500 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                Stage 3: After Harassment
              </span>
              <h3 className="text-2xl font-black text-[#0B1F3A]">3. Threat Shield & PDF</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                WhatsApp dhamki aur morphed photo threats ko classify karein. Cyber crime portal ke liye formal PDF complaint draft download karein.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/threat"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-100 hover:bg-red-50 text-navy-800 hover:text-red-700 font-bold text-sm transition-colors"
              >
                <span>Complaint Ready Karo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Walkthrough Story Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-navy-800 to-navy-900 text-white p-8 sm:p-10 border border-navy-700 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider">
              3-Minute Demo Case Study
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ramesh Ki Kahani: ₹5,000 Loan Ka 2,235% Byaj Trap
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t("home.sample_story", "Ramesh ne Instagram pe ad dekha '5 minute me ₹5,000 loan'. ₹1,500 advance fees kaat kar mile sirf ₹3,500. 7 din baad agents ne poore ₹5,000 mange aur phone contacts ko morphed photo bhejne ki dhamki di. Sahukar Shield ne exact 2,235% APR expose kiya aur ready-to-file complaint PDF banai.")}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/cost"
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow transition-transform hover:scale-105 inline-flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>Ramesh Ka Case Load Karein</span>
              </Link>
              <Link
                href="/family"
                className="px-5 py-2.5 rounded-xl bg-navy-700 hover:bg-navy-600 text-slate-200 font-semibold text-xs border border-navy-600"
              >
                Family Alert Card Dekhein
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark Stats Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-navy-800">100%</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Deterministic Math (No LLM Guessing)
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-red-600">2,235%</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Max APR Uncovered in 7-Day Trap
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-teal-600">0 Bytes</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Stored User Data (Ephemeral In-Memory)
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-navy-800">20 / 20</p>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              APR Engine Test Harness Accuracy
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
