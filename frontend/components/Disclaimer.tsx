"use client";

import React from "react";
import { AlertCircle, Shield, ExternalLink } from "lucide-react";
import { useI18n } from "../lib/i18n";

export default function Disclaimer({ inline = false }: { inline?: boolean }) {
  const { t } = useI18n();

  if (inline) {
    return (
      <div className="flex items-start space-x-3 text-xs text-slate-700 bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-xs">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed font-medium">
          <span className="font-bold text-slate-900">Consumer Notice: </span>
          {t("disclaimer", "Sahukar Shield provides algorithmic and informational analysis of digital loan applications, calculation of effective APR based on user-supplied terms, and generation of formal factual complaint drafts. This platform does not provide legal, financial, or investment advice.")}
        </div>
      </div>
    );
  }

  return (
    <footer className="bg-white text-slate-600 text-xs py-12 border-t border-slate-200 mt-20 font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-950 text-base">Sahukar Shield</span>
              <p className="text-xs text-slate-500 font-semibold">Consumer Credit Defense &amp; Anti-Harassment Intelligence</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
            <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors">
              cybercrime.gov.in <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://sachet.rbi.org.in" target="_blank" rel="noreferrer" className="text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors">
              sachet.rbi.org.in <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://cms.rbi.org.in" target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors">
              cms.rbi.org.in <ExternalLink className="w-3 h-3" />
            </a>
            <a href="tel:1930" className="text-rose-700 hover:text-rose-800 font-extrabold flex items-center gap-1 transition-colors">
              Helpline: 1930
            </a>
          </div>
        </div>

        <div className="text-slate-600 text-xs leading-relaxed max-w-4xl space-y-2">
          <p className="font-extrabold text-slate-900">Disclaimer &amp; Important Information:</p>
          <p className="leading-relaxed text-slate-700 font-medium">
            {t("disclaimer", "Sahukar Shield provides algorithmic and informational analysis of digital loan applications, calculation of effective APR based on user-supplied terms, and generation of formal factual complaint drafts. This platform does not provide legal, financial, or investment advice. Sahukar Shield is not affiliated with the Reserve Bank of India (RBI) or any government agency. All directory checks and legal mappings are educational and must be verified with licensed counsel or designated cybercrime authorities.")}
          </p>
        </div>

        <div className="text-slate-500 text-xs pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 font-semibold">
          <p>© 2026 Sahukar Shield. Built for citizen protection against predatory digital lending and cyber extortion.</p>
          <p className="text-slate-700 font-bold">100% Ephemeral Memory • Zero Data Stored</p>
        </div>
      </div>
    </footer>
  );
}
