"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function Disclaimer({ inline = false }: { inline?: boolean }) {
  const { t } = useI18n();

  if (inline) {
    return (
      <div className="flex items-start space-x-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Disclaimer: </span>
          {t("disclaimer", "Sahukar Shield ek consumer education tool hai. Ye kanooni ya financial advice nahi hai.")}
        </div>
      </div>
    );
  }

  return (
    <footer className="bg-navy-900 text-slate-400 text-xs py-8 border-t border-navy-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-navy-800 pb-6">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-base">Sahukar Shield</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 text-xs">Anti-Predatory Loan Consumer Defense</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">
              cybercrime.gov.in
            </a>
            <a href="https://sachet.rbi.org.in" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">
              sachet.rbi.org.in
            </a>
            <a href="tel:1930" className="text-red-400 hover:underline font-bold">
              National Helpline: 1930
            </a>
          </div>
        </div>

        <div className="text-slate-400 text-[11px] leading-relaxed max-w-4xl">
          <p className="font-semibold text-slate-300 mb-1">Consumer Legal Disclaimer:</p>
          <p>
            {t("disclaimer", "Sahukar Shield provides algorithmic and informational analysis of digital loan applications, calculation of effective APR based on user-supplied terms, and generation of formal factual complaint drafts. This platform does not provide legal, financial, or investment advice. Sahukar Shield is not affiliated with the Reserve Bank of India (RBI) or any government law enforcement agency. All directory matches and legal mappings are educational and must be verified with licensed counsel or designated cybercrime authorities before judicial filings.")}
          </p>
        </div>

        <div className="text-slate-500 text-[10px] pt-2 flex flex-col sm:flex-row items-center justify-between">
          <p>© 2026 Sahukar Shield. Processed ephemerally in-memory. Zero data stored.</p>
          <p>Built for citizen safety & financial sovereignty.</p>
        </div>
      </div>
    </footer>
  );
}
