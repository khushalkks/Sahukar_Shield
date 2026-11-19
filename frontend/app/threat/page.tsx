"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ShieldAlert,
  Send,
  BookOpen,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Info,
  Lock,
} from "lucide-react";
import ThreatBadge from "../../components/ThreatBadge";
import MicButton from "../../components/MicButton";
import Disclaimer from "../../components/Disclaimer";
import { analyzeThreats } from "../../lib/api";
import { ThreatResponse } from "../../lib/types";
import { useI18n } from "../../lib/i18n";

const PRESET_THREAT_SAMPLES = [
  "Tere gallery ki photo edit karke gande tareeqe se tere dosto aur rishtedaaron ko bhej rahe hain.",
  "Tumhare sabhi WhatsApp contacts ko message ja raha hai ki ye chor hai aur loan lekar bhaag gaya hai.",
  "Police cyber cell FIR No 402/2026 registered. Police team arriving at your home address for arrest within 2 hours.",
];

export default function ThreatPage() {
  const { t, lang } = useI18n();
  const router = useRouter();

  const [rawText, setRawText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ThreatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (sampleOverride?: string[]) => {
    let lines = sampleOverride;
    if (!lines) {
      lines = rawText
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
    }
    if (!lines || lines.length === 0) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      const messagesPayload = lines.map((text) => ({
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));
      const res = await analyzeThreats(messagesPayload, lang);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Threat analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = () => {
    setRawText(PRESET_THREAT_SAMPLES.join("\n\n"));
    handleAnalyze(PRESET_THREAT_SAMPLES);
  };

  const handleImportToComplaint = () => {
    if (!result || !result.messages) return;
    // Store in sessionStorage so Complaint Wizard can import directly
    const timelineItems = result.messages.map((m, idx) => ({
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      channel: "WhatsApp",
      summary: m.text,
      evidence_file: `threat_screenshot_${idx + 1}.png`,
    }));
    sessionStorage.setItem("imported_threat_timeline", JSON.stringify(timelineItems));
    router.push("/complaint?imported=true");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Stage 3: Post-Harassment Legal Defense</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800">
          {t("threat.title", "Threat Shield (Dhamki Classifier)")}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t(
            "threat.subtitle",
            "Recovery agents ke WhatsApp/SMS messages paste karein ya bol kar likhein. Har message ko classify karke kanooni adhikar samjhein."
          )}
        </p>
      </div>

      {/* Emergency Strip */}
      <div className="bg-red-600 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-3 text-xs">
          <div className="p-2 bg-white/20 rounded-xl">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm">Emergency: 1930 Cyber Cell Call Karein</p>
            <p className="text-red-100">Dhamki se dar kar extra paise bilkul transfer na karein.</p>
          </div>
        </div>
        <a
          href="tel:1930"
          className="px-4 py-2 rounded-xl bg-white text-red-700 font-black text-xs shadow hover:bg-red-50 transition-colors"
        >
          Call 1930
        </a>
      </div>

      {/* Message Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Dhamki Wale Messages Yahan Paste Karein:
          </label>
          <div className="flex items-center gap-2">
            <MicButton onTranscript={(txt) => setRawText((prev) => prev + "\n" + txt)} />
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample Dhamki Load Karein</span>
            </button>
          </div>
        </div>

        <textarea
          rows={5}
          placeholder="Har ek message ko nayi line me paste karein (WhatsApp messages, SMS, ya call par boli baatein)..."
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          className="w-full text-xs p-4 rounded-2xl border border-slate-300 focus:outline-none focus:border-red-500 bg-slate-50 text-navy-900 leading-relaxed font-medium"
        />

        <div className="flex justify-end">
          <button
            onClick={() => handleAnalyze()}
            disabled={isAnalyzing || !rawText.trim()}
            className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? "Classifying..." : t("threat.btn_analyze", "Messages Classify Karo")}</span>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Severity Banner */}
          <div
            className={`rounded-3xl p-6 shadow-md border text-white flex flex-col sm:flex-row items-center justify-between gap-4 ${
              result.overall_severity >= 4
                ? "bg-gradient-to-r from-red-600 to-rose-700 border-red-500"
                : result.overall_severity === 3
                ? "bg-gradient-to-r from-amber-600 to-orange-600 border-amber-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500"
            }`}
          >
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/20">
                Case Classification
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                {result.overall_severity >= 5
                  ? "CRITICAL SEVERITY: Non-Bailable Extortion Case"
                  : result.overall_severity >= 4
                  ? "HIGH SEVERITY: Criminal Intimidation & Doxing"
                  : "MEDIUM SEVERITY: Coercive Debt Collection"}
              </h2>
              <p className="text-xs text-white/90">{result.summary}</p>
            </div>
            <button
              onClick={handleImportToComplaint}
              className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow-lg hover:bg-slate-100 transition-transform hover:scale-105 shrink-0 flex items-center space-x-2"
            >
              <span>{t("threat.btn_build_complaint", "Is Case Ki Complaint Banao")}</span>
              <ArrowRight className="w-4 h-4 text-red-600" />
            </button>
          </div>

          {/* Individual Message Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Message-by-Message Classification ({result.message_count}):
            </h3>
            {result.messages.map((msg, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {msg.labels.map((lbl, idx) => (
                      <ThreatBadge key={idx} label={lbl} severity={msg.severity} />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Severity Level {msg.severity}/5
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium text-xs text-slate-800 leading-relaxed italic">
                  "{msg.text}"
                </div>

                {msg.why && (
                  <p className="text-xs text-slate-600 font-normal">
                    <strong className="text-slate-800 font-bold">Kanooni pehlu: </strong>
                    {msg.why}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Legal Sections Panel (BNS 2023 & IT Act) */}
          {result.legal_info && result.legal_info.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-navy-800">
                  {t("threat.legal_panel_title", "Kanooni Jaankari (BNS 2023 & IT Act Provisions)")}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Informational reference: In violations par Bharat ke kanoon ke anusaar FIR darj hoti hai.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.legal_info.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-teal-700 block">{sec.title}</span>
                    <p className="text-xs font-bold text-navy-800 font-mono">{sec.bns_sections}</p>
                    {sec.it_act && (
                      <p className="text-[11px] font-semibold text-slate-600">{sec.it_act}</p>
                    )}
                    <p className="text-[11px] text-slate-600 leading-relaxed">{sec.description}</p>
                    <div className="p-2 rounded-lg bg-teal-50 text-[10px] text-teal-900 border border-teal-200/60">
                      <strong>RBI Guideline: </strong> {sec.rbi_directive}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Immediate Safe Action Steps */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-navy-700 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <span>{t("threat.safe_action_title", "Abhi Turant Kya Karein (Safe Actions)")}</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-200">
              {result.safe_steps.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={handleImportToComplaint}
                className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow flex items-center gap-2"
              >
                <span>Factual Complaint & PDF Download Karein</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Disclaimer inline />
        </div>
      )}
    </div>
  );
}

