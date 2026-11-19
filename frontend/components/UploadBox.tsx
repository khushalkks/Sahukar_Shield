"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, Camera, CheckCircle2, Sparkles } from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  onSampleSelect: (sampleId: string) => void;
  isLoading?: boolean;
}

export const SAMPLES = [
  { id: "sample_predatory_7day", label: "₹5,000 / 7-Day Loan (Predatory 2,235% APR)", img: "/samples/sample_1_predatory_7day.png" },
  { id: "sample_predatory_15day", label: "₹10,000 / 15-Day Loan (Deductions ₹2,000)", img: "/samples/sample_2_predatory_15day.png" },
  { id: "sample_quick_3000", label: "₹3,000 / 10-Day Loan (Deductions ₹600)", img: "/samples/sample_3_predatory_10day.png" },
  { id: "sample_safe_bank_emi", label: "₹20,000 / 12-Month EMI ₹1,900 (Safe Bank ~13.5% APR)", img: "/samples/sample_4_safe_bank_emi.png" },
  { id: "sample_nbfc_personal", label: "₹50,000 / 24-Month EMI ₹2,750 (Regulated NBFC)", img: "/samples/sample_5_nbfc_personal.png" },
  { id: "sample_short_term_emi", label: "₹15,000 / 3-Month EMI ₹5,300 (Fee ₹450)", img: "/samples/sample_6_short_term_emi.png" },
  { id: "sample_predatory_14day", label: "₹8,000 / 14-Day Loan (Deductions ₹1,500)", img: "/samples/sample_7_predatory_14day.png" },
  { id: "sample_100k_safe", label: "₹100,000 / 36-Month Prime Bank Loan", img: "/samples/sample_8_safe_commercial_bank.png" },
];

export default function UploadBox({ onFileSelect, onSampleSelect, isLoading }: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragOver(true);
    } else if (e.type === "dragleave") {
      setDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-cyan-400 bg-cyan-950/30 shadow-[0_0_25px_rgba(6,182,212,0.2)]"
            : "border-slate-700 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-inner">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-white font-mono">
              Drag &amp; drop loan agreement screenshot or photo here
            </p>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Supports PNG, JPEG, WebP. Sensitive image EXIF metadata is stripped automatically in-memory.
            </p>
          </div>
          {selectedFileName && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-teal-950/60 border border-teal-500/40 text-teal-300 rounded-full text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Selected: {selectedFileName}</span>
            </div>
          )}
          {previewImg && (
            <div className="mt-2 p-1.5 bg-slate-950 rounded-xl border border-white/10 max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewImg} alt="Sample screenshot preview" className="rounded-lg max-h-48 w-auto object-contain mx-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Synthetic Demo Screenshots Gallery */}
      <div className="space-y-2 pt-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>TRY REAL SYNTHETIC LOAN OFFER TEST VECTORS:</span>
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                setPreviewImg(sample.img);
                setSelectedFileName(sample.id + ".png");
                onSampleSelect(sample.id);
              }}
              className="p-2.5 rounded-xl glass-panel border border-white/5 hover:border-cyan-500/40 text-left text-[11px] font-mono text-slate-300 hover:text-white transition-all group"
            >
              <div className="flex items-center space-x-1.5 text-cyan-400 group-hover:text-cyan-300">
                <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate font-bold">Vector {sample.id.replace("sample_", "")}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 truncate">{sample.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
