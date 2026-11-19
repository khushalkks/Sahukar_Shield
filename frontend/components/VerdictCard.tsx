"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, ShieldCheck, ShieldAlert, AlertOctagon, Landmark } from "lucide-react";

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
  ctaText = "Proceed to Next Action",
  ctaHref,
  onCtaClick,
}: VerdictCardProps) {
  const isSafe = verdict === "SAFE" || verdict === "GREEN";
  const isRisky = verdict === "RISKY" || verdict === "AMBER";
  const isPredatory = verdict === "PREDATORY" || verdict === "RED";

  const theme = isSafe
    ? {
        border: "border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)]",
        bg: "bg-[#081812]/95",
        badgeBg: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
        textColor: "text-emerald-300",
        bulletColor: "bg-emerald-400",
        icon: ShieldCheck,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border border-emerald-500/30",
        btnClass: "bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 text-slate-950 font-black shadow-lg shadow-emerald-500/20",
        statusText: "RBI REGULATED / PRIME FACILITY",
      }
    : isRisky
    ? {
        border: "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]",
        bg: "bg-[#1A1208]/95",
        badgeBg: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
        textColor: "text-amber-300",
        bulletColor: "bg-amber-400",
        icon: AlertTriangle,
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/10 border border-amber-500/30",
        btnClass: "bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-black shadow-lg shadow-amber-500/20",
        statusText: "UNVERIFIED ENTITY / ELEVATED RISK",
      }
    : {
        border: "border-rose-600/60 shadow-[0_0_30px_rgba(225,29,72,0.25)]",
        bg: "bg-[#1C080E]/95",
        badgeBg: "bg-rose-500/20 text-rose-400 border border-rose-500/50",
        textColor: "text-rose-300",
        bulletColor: "bg-rose-400",
        icon: AlertOctagon,
        iconColor: "text-rose-500",
        iconBg: "bg-rose-500/10 border border-rose-500/30",
        btnClass: "bg-gradient-to-r from-rose-600 to-rose-500 hover:opacity-95 text-white font-black shadow-lg shadow-rose-600/30",
        statusText: "USURIOUS SYNDICATE / CRITICAL DANGER",
      };

  const Icon = theme.icon;

  return (
    <div
      className={`rounded-3xl border-2 ${theme.border} ${theme.bg} p-6 sm:p-7 shadow-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-md font-mono`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className={`p-3 rounded-2xl ${theme.iconBg} ${theme.iconColor} shrink-0`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase ${theme.badgeBg}`}
            >
              {theme.statusText}
            </span>
            <h3 className={`text-xl sm:text-2xl font-black mt-1 ${theme.textColor} tracking-tight font-sans`}>
              {title}
            </h3>
          </div>
        </div>
      </div>

      {subtitle && (
        <p className="mt-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed bg-black/40 p-3.5 rounded-2xl border border-white/5">
          {subtitle}
        </p>
      )}

      {reasons && reasons.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Regulatory &amp; Underwriting Findings:
          </p>
          <ul className="space-y-2">
            {reasons.slice(0, 4).map((r, i) => (
              <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-200">
                <span className={`w-1.5 h-1.5 rounded-full ${theme.bulletColor} mt-1.5 shrink-0`} />
                <span className="font-sans leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ctaHref && (
        <div className="mt-6 pt-2">
          <Link
            href={ctaHref}
            className={`w-full py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01] ${theme.btnClass}`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {onCtaClick && !ctaHref && (
        <div className="mt-6 pt-2">
          <button
            onClick={onCtaClick}
            className={`w-full py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01] ${theme.btnClass}`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
