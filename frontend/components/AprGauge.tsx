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
      ? "text-emerald-400"
      : verdict === "RISKY"
      ? "text-amber-400"
      : "text-rose-500";

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0E1526] rounded-3xl shadow-xl border border-[#1E2C4A] backdrop-blur-md font-mono">
      <div className="relative w-64 h-36 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-64 h-36">
          {/* Background track arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1E2C4A"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Safe Zone Arc (0 - 36%): Financial Emerald */}
          <path
            d="M 20 100 A 80 80 0 0 1 60 40"
            fill="none"
            stroke="#10B981"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Risky Zone Arc (36 - 100%): Financial Gold */}
          <path
            d="M 64 36 A 80 80 0 0 1 115 22"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="14"
          />

          {/* Predatory Zone Arc (100%+): Usury Ruby */}
          <path
            d="M 120 22 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#E11D48"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Needle Pointer with Gold Pivot */}
          <g transform={`rotate(${angle}, 100, 100)`} className="transition-transform duration-700 ease-out">
            <polygon points="98,100 102,100 100,24" fill="#F59E0B" filter="drop-shadow(0 0 6px #F59E0B)" />
            <circle cx="100" cy="100" r="7" fill="#080C14" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="100" cy="100" r="3" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Labels underneath the arch */}
        <div className="absolute bottom-0 text-center">
          <span className="text-[10px] font-bold text-slate-400 block tracking-widest uppercase">
            Effective Annualized APR
          </span>
          <span className={`text-3xl sm:text-4xl font-black tracking-tight ${verdictColor}`}>
            {displayApr}
          </span>
        </div>
      </div>

      {/* Legend below gauge */}
      <div className="flex items-center justify-between w-full max-w-xs mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 border-t border-[#1E2C4A] pt-3">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" /> Regulated (&le;36%)
        </span>
        <span className="flex items-center gap-1.5 text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#F59E0B]" /> High Yield (36-100%)
        </span>
        <span className="flex items-center gap-1.5 text-rose-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#E11D48]" /> Usury (&gt;100%)
        </span>
      </div>
    </div>
  );
}
