"use client";

import React from "react";

interface ThreatBadgeProps {
  label: string;
  severity?: number;
}

const LABEL_CONFIG: Record<
  string,
  { name: string; bg: string; text: string; border: string }
> = {
  blackmail: {
    name: "Extortion / Blackmail",
    bg: "bg-purple-100 dark:bg-purple-950/40",
    text: "text-purple-800 dark:text-purple-300",
    border: "border-purple-300 dark:border-purple-700",
  },
  morphed_photo_threat: {
    name: "Morphed Photo Threat",
    bg: "bg-red-100 dark:bg-red-950/40",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-300 dark:border-red-700",
  },
  contact_threat: {
    name: "Contact List Harassment",
    bg: "bg-rose-100 dark:bg-rose-950/40",
    text: "text-rose-800 dark:text-rose-300",
    border: "border-rose-300 dark:border-rose-700",
  },
  abusive_language: {
    name: "Abusive / Foul Language",
    bg: "bg-orange-100 dark:bg-orange-950/40",
    text: "text-orange-800 dark:text-orange-300",
    border: "border-orange-300 dark:border-orange-700",
  },
  fake_legal_threat: {
    name: "Fake Police / Court Notice",
    bg: "bg-red-100 dark:bg-red-950/40",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-300 dark:border-red-700",
  },
  impersonation_of_authority: {
    name: "Impersonation of Police",
    bg: "bg-indigo-100 dark:bg-indigo-950/40",
    text: "text-indigo-800 dark:text-indigo-300",
    border: "border-indigo-300 dark:border-indigo-700",
  },
  payment_pressure: {
    name: "Coercive Payment Pressure",
    bg: "bg-amber-100 dark:bg-amber-950/40",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
  },
  neutral_reminder: {
    name: "Standard Due Reminder",
    bg: "bg-blue-100 dark:bg-blue-950/40",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-300 dark:border-blue-700",
  },
};

export default function ThreatBadge({ label, severity }: ThreatBadgeProps) {
  const conf = LABEL_CONFIG[label] || {
    name: label.replace(/_/g, " "),
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-800 dark:text-slate-200",
    border: "border-slate-300 dark:border-slate-700",
  };

  return (
    <div className="inline-flex items-center space-x-2">
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${conf.bg} ${conf.text} ${conf.border}`}
      >
        {conf.name}
      </span>
      {severity !== undefined && (
        <div className="flex items-center space-x-0.5" title={`Severity: ${severity}/5`}>
          {[1, 2, 3, 4, 5].map((dot) => (
            <span
              key={dot}
              className={`w-2 h-2 rounded-full ${
                dot <= severity
                  ? severity >= 4
                    ? "bg-red-600"
                    : severity === 3
                    ? "bg-amber-500"
                    : "bg-blue-500"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
