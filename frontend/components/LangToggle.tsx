"use client";

import React from "react";
import { useI18n } from "../lib/i18n";
import { Language } from "../lib/types";
import { Globe } from "lucide-react";

export default function LangToggle() {
  const { lang, setLang } = useI18n();

  const options: Array<{ code: Language; label: string }> = [
    { code: "en", label: "EN" },
    { code: "hinglish", label: "Hinglish" },
    { code: "hi", label: "हिंदी" },
  ];

  return (
    <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-semibold">
      <div className="px-1.5 text-slate-500 hidden md:block">
        <Globe className="w-3.5 h-3.5 text-slate-600" />
      </div>
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => setLang(opt.code)}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            lang === opt.code
              ? "bg-white text-slate-900 font-bold shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
