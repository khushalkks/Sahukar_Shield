"use client";

import React from "react";
import { CheckSquare, Square, ShieldCheck } from "lucide-react";

interface EvidenceChecklistProps {
  selected?: string[];
  items?: string[];
  onChange: (items: string[]) => void;
}

const DEFAULT_EVIDENCE_ITEMS = [
  {
    id: "msg_screenshots",
    label: "Uncropped WhatsApp & SMS threat screenshots (displaying sender phone number & timestamps)",
  },
  {
    id: "call_recordings",
    label: "Audio call recordings of verbal abuse, abusive language, and physical extortion threats",
  },
  {
    id: "call_logs",
    label: "Incoming call history logs (evidence of continuous spam calling at odd hours)",
  },
  {
    id: "transaction_proofs",
    label: "Bank statements & UPI transaction receipts proving net disbursal vs illegal usurious repayment demands",
  },
  {
    id: "app_interface",
    label: "Screenshots of predatory 7-day loan tenure and hidden upfront fee deductions inside app",
  },
  {
    id: "play_store_page",
    label: "Google Play Store listing or APK download URL showing developer metadata and package ID",
  },
  {
    id: "upi_handles",
    label: "Mule UPI IDs, bank accounts, and QR codes provided by recovery agents for extortion payment",
  },
  {
    id: "phone_numbers_list",
    label: "Compiled list of harassing phone numbers and caller identities (Truecaller / WhatsApp profiles)",
  },
];

export default function EvidenceChecklist({
  selected,
  items,
  onChange,
}: EvidenceChecklistProps) {
  const currentList = selected || items || [];

  const toggleItem = (label: string) => {
    if (currentList.includes(label)) {
      onChange(currentList.filter((item) => item !== label));
    } else {
      onChange([...currentList, label]);
    }
  };

  return (
    <div className="space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Preserved Digital Evidence Inventory:</span>
        </p>
        <span className="text-[10px] text-teal-400">
          {currentList.length} of {DEFAULT_EVIDENCE_ITEMS.length} Attached to PDF
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {DEFAULT_EVIDENCE_ITEMS.map((item) => {
          const isChecked = currentList.includes(item.label);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.label)}
              className={`flex items-start space-x-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                isChecked
                  ? "bg-teal-950/40 border-teal-500/60 text-teal-200 shadow-sm"
                  : "bg-slate-900/60 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-teal-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600" />
                )}
              </div>
              <span className="text-xs leading-relaxed select-none">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
