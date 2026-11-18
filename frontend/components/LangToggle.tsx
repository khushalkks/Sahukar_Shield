"use client";

import React from "react";
import { useI18n } from "../lib/i18n";
import { Language } from "../lib/types";
import { Globe } from "lucide-react";

export default function LangToggle() {
  const { lang, setLang } = useI18n();

  const options: Array<{ code: Language; label: string }> = [
    { code: "hinglish", label: "Hinglish" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="flex items-center bg-navy-900 border border-navy-700 rounded-lg p-0.5 text-xs font-semibold">
      <div className="px-1.5 text-slate-400 hidden md:block">
        <Globe className="w-3.5 h-3.5" />
      </div>
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => setLang(opt.code)}
          className={`px-2.5 py-1 rounded-md transition-all ${
            lang === opt.code
              ? "bg-teal-500 text-slate-950 shadow-sm font-bold"
              : "text-slate-300 hover:text-white hover:bg-navy-800"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
