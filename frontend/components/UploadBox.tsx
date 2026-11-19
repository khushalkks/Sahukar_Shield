"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, Camera, CheckCircle2 } from "lucide-react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  onSampleSelect: (sampleId: string) => void;
  isLoading?: boolean;
}

export const SAMPLES = [
  { id: "sample_predatory_7day", label: "₹5,000 / 7-Day Loan (Predatory ~2,235% APR)", img: "/samples/sample_1_predatory_7day.png" },
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
    <div className="space-y-4">
      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-teal-500 bg-teal-50 dark:bg-teal-950/20"
            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-teal-500"
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
          <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center shadow-inner">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Loan screen ka photo ya screenshot yahan drag & drop karein
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports PNG, JPG, WebP (Max 5MB). Photo ka EXIF data automatically strip ho jaata hai.
            </p>
          </div>
          {selectedFileName && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 rounded-full text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Selected: {selectedFileName}</span>
            </div>
          )}
          {previewImg && (
            <div className="mt-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImg}
                alt="Selected loan sample screenshot preview"
                className="w-full h-auto rounded-lg shadow-sm max-h-40 object-contain mx-auto"
              />
            </div>
          )}
        </div>
      </div>

      {/* Preset Synthetic Sample Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
          Ya Synthetic Sample Screenshot Try Karein (All 8 Test Cases):
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              disabled={isLoading}
              onClick={() => {
                setSelectedFileName(sample.label);
                setPreviewImg(sample.img);
                onSampleSelect(sample.id);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              ⚡ {sample.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
