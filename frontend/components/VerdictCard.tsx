"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from "lucide-react";

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
  ctaText = "Aage Badhein",
  ctaHref,
  onCtaClick,
}: VerdictCardProps) {
  const isSafe = verdict === "SAFE" || verdict === "GREEN";
  const isRisky = verdict === "RISKY" || verdict === "AMBER";
  const isPredatory = verdict === "PREDATORY" || verdict === "RED";

  const theme = isSafe
    ? {
        border: "border-green-500",
        bg: "bg-green-50 dark:bg-green-950/30",
        badgeBg: "bg-green-600 text-white",
        textColor: "text-green-900 dark:text-green-200",
        icon: CheckCircle2,
        iconColor: "text-green-600",
        btnClass: "bg-green-600 hover:bg-green-700 text-white",
        statusText: "SAFE / REGULATED",
      }
    : isRisky
    ? {
        border: "border-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950/30",
        badgeBg: "bg-amber-600 text-white",
        textColor: "text-amber-900 dark:text-amber-200",
        icon: AlertTriangle,
        iconColor: "text-amber-600",
        btnClass: "bg-amber-600 hover:bg-amber-700 text-white",
        statusText: "RISKY / UNVERIFIED",
      }
    : {
        border: "border-red-600",
        bg: "bg-red-50 dark:bg-red-950/30",
        badgeBg: "bg-red-600 text-white",
        textColor: "text-red-900 dark:text-red-200",
        icon: XCircle,
        iconColor: "text-red-600",
        btnClass: "bg-red-600 hover:bg-red-700 text-white",
        statusText: "PREDATORY / DANGEROUS",
      };

  const Icon = theme.icon;

  return (
    <div
      className={`rounded-2xl border-2 ${theme.border} ${theme.bg} p-6 shadow-md transition-all duration-300 relative overflow-hidden`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm ${theme.iconColor}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide uppercase ${theme.badgeBg}`}
            >
              {theme.statusText}
            </span>
            <h3 className={`text-xl font-bold mt-1 ${theme.textColor}`}>{title}</h3>
          </div>
        </div>
      </div>

      {subtitle && <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{subtitle}</p>}

      {reasons && reasons.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Assessment Points:</p>
          <ul className="space-y-2">
            {reasons.slice(0, 3).map((r, i) => (
              <li key={i} className="flex items-start space-x-2 text-sm text-slate-800 dark:text-slate-200">
                <span className="text-base leading-none">•</span>
                <span className="font-medium">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(ctaHref || onCtaClick) && (
        <div className="mt-6 pt-2">
          {ctaHref ? (
            <Link
              href={ctaHref}
              className={`inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-bold text-sm shadow transition-all ${theme.btnClass}`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={onCtaClick}
              className={`inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl font-bold text-sm shadow transition-all ${theme.btnClass}`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
