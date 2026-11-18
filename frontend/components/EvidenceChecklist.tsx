"use client";

import React from "react";
import { CheckSquare, Square } from "lucide-react";

interface EvidenceChecklistProps {
  selected: string[];
  onChange: (items: string[]) => void;
}

const DEFAULT_EVIDENCE_ITEMS = [
  { id: "msg_screenshots", label: "Dhamki wale messages / WhatsApp chats ke complete screenshots (with phone number & timestamp)" },
  { id: "call_recordings", label: "Recovery agents ke audio call recordings (verbal abuse / threats)" },
  { id: "call_logs", label: "Call log screenshot (evidence of repeated calls at odd hours / harassment)" },
  { id: "transaction_proofs", label: "Bank statement ya UPI transaction receipts (showing ₹ disbursed vs extra demanded)" },
  { id: "app_interface", label: "App ke 7-day tenure aur upfront deductions wale screen ke screenshots" },
  { id: "play_store_page", label: "Play Store app page ya APK download link ka screenshot" },
  { id: "upi_handles", label: "Recovery agents dwara diye gaye payment QR codes aur mule UPI handles" },
  { id: "phone_numbers_list", label: "Harass karne wale numbers ki list (Truecaller screenshots)" },
];

export default function EvidenceChecklist({ selected, onChange }: EvidenceChecklistProps) {
  const toggleItem = (label: string) => {
    if (selected.includes(label)) {
      onChange(selected.filter((item) => item !== label));
    } else {
      onChange([...selected, label]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Check available digital evidence (ye list PDF complaint me jurti hai):
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {DEFAULT_EVIDENCE_ITEMS.map((item) => {
          const isChecked = selected.includes(item.label);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.label)}
              className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                isChecked
                  ? "bg-teal-50 dark:bg-teal-950/20 border-teal-500 text-teal-950 dark:text-teal-100"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-teal-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <span className="text-xs font-medium leading-relaxed select-none">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
