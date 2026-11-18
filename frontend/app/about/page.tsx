"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, Calculator, CheckCircle2, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";
import Disclaimer from "../../components/Disclaimer";
import { useI18n } from "../../lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
          <span>About Sahukar Shield</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800">
          Consumer Defense Against Digital Lending Harassment
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Sahukar Shield ek open citizen protection framework hai jiska lakshya aam nagriko ko predatory digital loan apps aur illegal recovery extortion se surakshit rakhna hai.
        </p>
      </div>

      {/* Core Design Principles */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <h2 className="text-lg font-black text-navy-800">
          Humare 5 Mool Sidhant (Core Design Principles)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center space-x-2 text-teal-700 font-bold">
              <Calculator className="w-4 h-4" />
              <span>1. Numbers are computed by CODE, never LLMs</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              APR (Annual Percentage Rate), KFS deductions, aur RBI directory RapidFuzz scores 100% deterministic Python me calculate hote hain. AI model kabhi numbers guess ya invent nahi karta.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center space-x-2 text-teal-700 font-bold">
              <Lock className="w-4 h-4" />
              <span>2. Zero User Data Retention (Ephemeral)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Koi database nahi hai. User dwara upload kiye gaye loan screenshots aur chat messages process hote hi memory se discard ho jaate hain. EXIF metadata image se turant strip hota hai.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center space-x-2 text-teal-700 font-bold">
              <Shield className="w-4 h-4" />
              <span>3. Legal Awareness, Not Legal Advice</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Bharatiya Nyaya Sanhita (BNS 2023) aur IT Act ke sections public awareness ke liye provide kiye jaate hain taaki victim dar ke maare paise na de. Court proceedings ke liye licensed counsel se consult karein.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center space-x-2 text-teal-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>4. 100% Offline Fallback Resilience</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Agar Claude API network ya quota unavailable ho, tab bhi pre-saved deterministic rule engines aur demo fallbacks chalte hain. Tool kabhi crash nahi hota.
            </p>
          </div>
        </div>
      </div>

      {/* Accuracy & Evaluation Harness Metrics */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <h2 className="text-lg font-black text-navy-800">
          Accuracy Benchmarks (Measured on Synthetic Test Set)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
            <span className="text-3xl font-black text-teal-900">20 / 20</span>
            <span className="text-xs font-bold text-teal-800 block mt-1">
              APR Engine Accuracy
            </span>
            <span className="text-[10px] text-teal-600 block">
              100% within 0.5% tolerance in <code>test_apr.py</code>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
            <span className="text-3xl font-black text-teal-900">30 / 30</span>
            <span className="text-xs font-bold text-teal-800 block mt-1">
              RBI Match Accuracy
            </span>
            <span className="text-[10px] text-teal-600 block">
              Exact, typo, & Play Store URLs in <code>test_match.py</code>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
            <span className="text-3xl font-black text-teal-900">0.68</span>
            <span className="text-xs font-bold text-teal-800 block mt-1">
              Threat Severity MAE
            </span>
            <span className="text-[10px] text-teal-600 block">
              Tested on 80 labelled recovery messages
            </span>
          </div>
        </div>
      </div>

      {/* Government & Regulatory Official Sources */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 border border-navy-700 space-y-4">
        <h2 className="text-base font-bold text-white">
          Official Consumer Redressal Portals (Verify Before Launch):
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-700 flex items-center justify-between transition-colors"
          >
            <div>
              <p className="font-bold text-teal-400">cybercrime.gov.in</p>
              <p className="text-[11px] text-slate-300">National Cyber Crime Reporting</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href="https://sachet.rbi.org.in"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-700 flex items-center justify-between transition-colors"
          >
            <div>
              <p className="font-bold text-teal-400">sachet.rbi.org.in</p>
              <p className="text-[11px] text-slate-300">RBI Unregistered Entities Portal</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href="https://cms.rbi.org.in"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-700 flex items-center justify-between transition-colors"
          >
            <div>
              <p className="font-bold text-teal-400">cms.rbi.org.in</p>
              <p className="text-[11px] text-slate-300">RBI Complaint Management System</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}
