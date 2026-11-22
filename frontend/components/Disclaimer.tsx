"use client";

import React from "react";
import { Shield, ExternalLink, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useI18n } from "../lib/i18n";

export default function Disclaimer({ inline = false }: { inline?: boolean }) {
  const { t } = useI18n();

  if (inline) {
    return (
      <div className="flex items-start space-x-3 text-xs text-amber-900 bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed font-medium">
          <span className="font-bold text-amber-950">Consumer Notice: </span>
          {t("disclaimer", "Sahukar Shield provides algorithmic and informational analysis of digital loan applications, calculation of effective APR based on user-supplied terms, and generation of formal factual complaint drafts. This platform does not provide legal, financial, or investment advice.")}
        </div>
      </div>
    );
  }

  return (
    <footer className="border-t border-zinc-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500 font-medium">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-100 pb-8">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white ring-1 ring-zinc-900/10">
              <Shield className="w-4.5 h-4.5 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-zinc-950 text-sm">Sahukar Shield</p>
              <p className="text-[11px] text-zinc-400">Institutional Consumer Credit Defense &amp; Anti-Usury Registry</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-zinc-600">
            <Link href="/dashboard" className="hover:text-zinc-950 transition-colors">
              Open Dashboard
            </Link>
            <Link href="/about" className="hover:text-zinc-950 transition-colors">
              Borrower Legal Rights
            </Link>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-600 inline-flex items-center space-x-1 transition-colors"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href="https://sachet.rbi.org.in"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-600 inline-flex items-center space-x-1 transition-colors"
            >
              <span>RBI Sachet Portal</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href="tel:1930"
              className="text-rose-600 hover:text-rose-700 font-bold transition-colors"
            >
              Helpline: Dial 1930
            </a>
          </div>
        </div>

        <div className="leading-relaxed space-y-2 text-zinc-500">
          <p className="font-bold text-zinc-900">Disclaimer &amp; Important Information:</p>
          <p className="text-zinc-500 leading-relaxed">
            {t("disclaimer", "Sahukar Shield provides algorithmic and informational analysis of digital loan applications, calculation of effective APR based on user-supplied terms, and generation of formal factual complaint drafts. This platform does not provide legal, financial, or investment advice. Sahukar Shield is not affiliated with the Reserve Bank of India (RBI) or any government agency. All directory checks and legal mappings are educational and must be verified with licensed counsel or designated cybercrime authorities.")}
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400">
          <p>© 2026 Sahukar Shield. Built for citizen protection against predatory digital lending and cyber extortion.</p>
          <p className="font-semibold text-zinc-500">100% Ephemeral Memory • Zero Data Stored</p>
        </div>
      </div>
    </footer>
  );
}
