"use client";

import React from "react";
import { AlertCircle, Shield, ExternalLink, Landmark } from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function Disclaimer({ inline = false }: { inline?: boolean }) {
  const { t } = useI18n();

  if (inline) {
    return (
      <div className="flex items-start space-x-3 text-xs text-slate-400 bg-[#0E1526] p-4 rounded-2xl border border-[#1E2C4A] backdrop-blur-sm font-mono">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-slate-200 uppercase tracking-wide">Statutory Consumer &amp; Regulatory Notice: </span>
          {t("disclaimer", "Sahukar Shield provides algorithmic and informational analysis of digital loan applications, calculation of effective APR based on user-supplied terms, and generation of formal factual complaint drafts. This platform does not provide legal, financial, or investment advice.")}
        </div>
      </div>
    );
  }

  return (
    <footer className="bg-[#05080F] text-slate-400 text-xs py-12 border-t border-[#1E2C4A] mt-20 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#1E2C4A] pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-white text-base tracking-wide font-sans">SAHUKAR SHIELD</span>
              <p className="text-[11px] text-slate-500 font-mono">Digital Lending Regulatory Audit &amp; Consumer Credit Defense</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
              cybercrime.gov.in <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://sachet.rbi.org.in" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
              sachet.rbi.org.in <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://cms.rbi.org.in" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
              cms.rbi.org.in <ExternalLink className="w-3 h-3" />
            </a>
            <a href="tel:1930" className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors">
              Helpline: 1930
            </a>
          </div>
        </div>

        <div className="text-slate-400 text-[11px] leading-relaxed max-w-4xl space-y-2">
          <p className="font-bold text-slate-300 uppercase tracking-wider font-mono">Statutory Disclaimer &amp; Regulatory Standing:</p>
          <p className="font-sans leading-relaxed text-slate-400">
            {t("disclaimer", "Sahukar Shield provides algorithmic and informational analysis of digital loan applications, calculation of effective APR based on user-supplied terms, and generation of formal factual complaint drafts. This platform does not provide legal, financial, or investment advice. Sahukar Shield is not affiliated with the Reserve Bank of India (RBI) or any government law enforcement agency. All directory matches and legal mappings are educational and must be verified with licensed counsel or designated cybercrime authorities before judicial filings.")}
          </p>
        </div>

        <div className="text-slate-500 text-[10px] font-mono pt-4 border-t border-[#1E2C4A]/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Sahukar Shield. Built for public safety and citizen protection against financial cybercrime.</p>
          <p className="text-slate-400 font-bold">100% Ephemeral Memory • Zero Database Writes</p>
        </div>
      </div>
    </footer>
  );
}
