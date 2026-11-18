"use client";

import React, { useState } from "react";
import { Lock, X } from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function PrivacyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { t } = useI18n();

  if (dismissed) return null;

  return (
    <div className="bg-slate-900 text-teal-300 text-xs py-2 px-4 border-b border-navy-700 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="p-1 rounded-md bg-teal-500/20 text-teal-400">
            <Lock className="w-3.5 h-3.5" />
          </span>
          <span className="font-medium text-slate-200">
            <strong className="text-teal-400 font-bold">100% Private:</strong> {t("privacy_banner", "Aapka data store nahi hota. Sabhi calculation memory me hoti hain.")}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
