"use client";

import React, { useState } from "react";
import { Lock, X, ShieldCheck } from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function PrivacyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { t } = useI18n();

  if (dismissed) return null;

  return (
    <div className="bg-[#05080F] text-slate-300 text-xs py-2 px-4 border-b border-[#1E2C4A] transition-all font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <span className="p-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
          </span>
          <span className="text-slate-300">
            <strong className="text-emerald-400 font-bold tracking-wider uppercase">Zero Financial Data Retention:</strong>{" "}
            {t("privacy_banner", "All financial data, screenshots, and loan terms are evaluated 100% ephemerally in volatile RAM. Nothing is written to database or third-party servers.")}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
