"use client";

import React from "react";

interface AprGaugeProps {
  apr: number;
  verdict: "SAFE" | "RISKY" | "PREDATORY";
}

export default function AprGauge({ apr, verdict }: AprGaugeProps) {
  // Mapping angle from -90 deg to +90 deg
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
      ? "text-emerald-700"
      : verdict === "RISKY"
      ? "text-amber-700"
      : "text-rose-700";

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="relative w-64 h-36 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-64 h-36">
          {/* Background track arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Safe Zone Arc (0 - 36%): Emerald */}
          <path
            d="M 20 100 A 80 80 0 0 1 60 40"
            fill="none"
            stroke="#10B981"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Risky Zone Arc (36 - 100%): Amber */}
          <path
            d="M 64 36 A 80 80 0 0 1 115 22"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="14"
          />

          {/* Predatory Zone Arc (100%+): Rose */}
          <path
            d="M 120 22 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#EF4444"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 100)`} className="transition-transform duration-700 ease-out">
            <polygon points="98,100 102,100 100,24" fill="#0F172A" />
            <circle cx="100" cy="100" r="7" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="100" cy="100" r="3" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Labels underneath the arch */}
        <div className="absolute bottom-0 text-center">
          <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
            Annual Interest Rate (APR)
          </span>
          <span className={`text-3xl sm:text-4xl font-black tracking-tight ${verdictColor}`}>
            {displayApr}
          </span>
        </div>
      </div>

      {/* Legend below gauge */}
      <div className="flex items-center justify-between w-full max-w-xs mt-4 text-xs font-bold text-slate-600 uppercase tracking-wider px-2 border-t border-slate-200 pt-3">
        <span className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> &le;36% (Safe)
        </span>
        <span className="flex items-center gap-1.5 text-amber-800 font-extrabold">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> 36-100% (High)
        </span>
        <span className="flex items-center gap-1.5 text-rose-800 font-extrabold">
          <span className="w-2 h-2 rounded-full bg-rose-500" /> &gt;100% (Usury)
        </span>
      </div>
    </div>
  );
}
