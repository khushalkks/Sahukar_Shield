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
    <div className="flex items-center bg-[#080C14] border border-[#1E2C4A] rounded-xl p-0.5 text-xs font-mono font-semibold">
      <div className="px-1.5 text-slate-400 hidden md:block">
        <Globe className="w-3.5 h-3.5 text-emerald-400" />
      </div>
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => setLang(opt.code)}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            lang === opt.code
              ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
