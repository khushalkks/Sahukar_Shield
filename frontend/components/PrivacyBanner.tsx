"use client";

import React, { useState } from "react";
import { Lock, X } from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function PrivacyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { t } = useI18n();

  if (dismissed) return null;

  return (
    <div className="bg-emerald-50 text-emerald-950 text-xs py-2 px-4 border-b border-emerald-200 transition-all font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <span className="p-1 rounded-md bg-emerald-100 text-emerald-800">
            <Lock className="w-3.5 h-3.5" />
          </span>
          <span>
            <strong className="text-emerald-900 font-bold">100% Private &amp; Anonymous:</strong>{" "}
            {t("privacy_banner", "All financial data, screenshots, and loan terms are evaluated 100% ephemerally in memory. Nothing is stored in a database or sent to third parties.")}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-emerald-700 hover:text-emerald-950 p-1 rounded-md hover:bg-emerald-100 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
