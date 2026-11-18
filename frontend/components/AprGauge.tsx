"use client";

import React from "react";

interface AprGaugeProps {
  apr: number; // e.g. 2234.69
  verdict: "SAFE" | "RISKY" | "PREDATORY";
}

export default function AprGauge({ apr, verdict }: AprGaugeProps) {
  // Semi-circle gauge: angle from -90 degrees (left) to +90 degrees (right)
  // Mapping logic:
  // 0% - 36% -> -90 deg to -30 deg (Safe zone: green)
  // 36% - 100% -> -30 deg to +20 deg (Risky zone: amber)
  // 100% - 1000%+ -> +20 deg to +90 deg (Predatory zone: red)
  let angle = -90;
  if (apr <= 36) {
    angle = -90 + (apr / 36) * 60; // -90 to -30
  } else if (apr <= 100) {
    angle = -30 + ((apr - 36) / (100 - 36)) * 50; // -30 to +20
  } else {
    const capped = Math.min(apr, 1000);
    angle = 20 + ((capped - 100) / 900) * 70; // 20 to 90
  }

  const isCapped = apr >= 1000;
  const displayApr = isCapped ? `${Math.round(apr).toLocaleString()}%+` : `${apr.toFixed(1)}%`;

  const verdictColor =
    verdict === "SAFE"
      ? "text-green-600"
      : verdict === "RISKY"
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="relative w-64 h-36 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-64 h-36">
          {/* Background track arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Safe Zone Arc (0 - 36%) */}
          <path
            d="M 20 100 A 80 80 0 0 1 60 40"
            fill="none"
            stroke="#16A34A"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Risky Zone Arc (36 - 100%) */}
          <path
            d="M 64 36 A 80 80 0 0 1 115 22"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="16"
          />

          {/* Predatory Zone Arc (100%+) */}
          <path
            d="M 120 22 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#DC2626"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 100)`}>
            <polygon points="98,100 102,100 100,24" fill="#0B1F3A" className="dark:fill-slate-100" />
            <circle cx="100" cy="100" r="7" fill="#0B1F3A" className="dark:fill-slate-100" />
            <circle cx="100" cy="100" r="3" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Labels underneath the arch */}
        <div className="absolute bottom-0 text-center">
          <span className="text-[11px] font-semibold text-slate-400 block tracking-wider uppercase">
            Effective Simple APR
          </span>
          <span className={`text-3xl font-black tracking-tight ${verdictColor}`}>
            {displayApr}
          </span>
        </div>
      </div>

      {/* Legend below gauge */}
      <div className="flex items-center justify-between w-full max-w-xs mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
        <span className="flex items-center gap-1 text-green-700 dark:text-green-400">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Safe (&le;36%)
        </span>
        <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Risky (36-100%)
        </span>
        <span className="flex items-center gap-1 text-red-700 dark:text-red-400">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Loot (&gt;100%)
        </span>
      </div>
    </div>
  );
}
