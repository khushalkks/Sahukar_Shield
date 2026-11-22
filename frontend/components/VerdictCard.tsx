"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, AlertTriangle, AlertOctagon } from "lucide-react";

interface VerdictCardProps {
  verdict: "SAFE" | "RISKY" | "PREDATORY" | "GREEN" | "AMBER" | "RED";
  title: string;
  subtitle?: string;
  reasons: string[];
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export default function VerdictCard({
  verdict,
  title,
  subtitle,
  reasons,
  ctaText = "Proceed to Next Step",
  ctaHref,
  onCtaClick,
}: VerdictCardProps) {
  const isSafe = verdict === "SAFE" || verdict === "GREEN";
  const isRisky = verdict === "RISKY" || verdict === "AMBER";

  const theme = isSafe
    ? {
        border: "border-emerald-300",
        bg: "bg-emerald-50/80",
        badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
        textColor: "text-emerald-950",
        bulletColor: "bg-emerald-600",
        icon: ShieldCheck,
        iconColor: "text-emerald-700",
        iconBg: "bg-emerald-100 border border-emerald-200",
        btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-sm",
        statusText: "RBI REGISTERED (SAFE)",
      }
    : isRisky
    ? {
        border: "border-amber-300",
        bg: "bg-amber-50/80",
        badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
        textColor: "text-amber-950",
        bulletColor: "bg-amber-600",
        icon: AlertTriangle,
        iconColor: "text-amber-700",
        iconBg: "bg-amber-100 border border-amber-200",
        btnClass: "bg-amber-600 hover:bg-amber-700 text-white font-extrabold shadow-sm",
        statusText: "UNVERIFIED OR ELEVATED RISK",
      }
    : {
        border: "border-rose-300",
        bg: "bg-rose-50/90",
        badgeBg: "bg-rose-100 text-rose-900 border-rose-300",
        textColor: "text-rose-950",
        bulletColor: "bg-rose-600",
        icon: AlertOctagon,
        iconColor: "text-rose-700",
        iconBg: "bg-rose-100 border border-rose-200",
        btnClass: "bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-sm",
        statusText: "DANGEROUS SCAM APP (DO NOT INSTALL)",
      };

  const Icon = theme.icon;

  return (
    <div
      className={`rounded-2xl border ${theme.border} ${theme.bg} p-6 shadow-sm transition-all duration-200 text-slate-900`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.iconColor} shrink-0`}>
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider border ${theme.badgeBg}`}
            >
              {theme.statusText}
            </span>
            <h3 className={`text-xl font-extrabold mt-1 ${theme.textColor} tracking-tight font-sans`}>
              {title}
            </h3>
          </div>
        </div>
      </div>

      {subtitle && (
        <p className="mt-3 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-white/80 p-3 rounded-xl border border-slate-200 shadow-2xs">
          {subtitle}
        </p>
      )}

      {reasons && reasons.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Key Assessment Factors:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 font-semibold">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${theme.bulletColor}`} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(ctaHref || onCtaClick) && (
        <div className="mt-5 pt-3">
          {ctaHref ? (
            <Link
              href={ctaHref}
              className={`inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all ${theme.btnClass}`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              onClick={onCtaClick}
              className={`inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all ${theme.btnClass}`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
