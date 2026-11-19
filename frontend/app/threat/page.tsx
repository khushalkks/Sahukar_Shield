"use client";

import React, { useState, useEffect } from "react";
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
  MessageSquare,
  Shield,
  FileCheck,
  Bot,
  UserX,
  Volume2,
  Trash2,
  Copy,
  Scale,
  Landmark,
} from "lucide-react";
import ThreatBadge from "../../components/ThreatBadge";
import MicButton from "../../components/MicButton";
import Disclaimer from "../../components/Disclaimer";
import { analyzeThreats } from "../../lib/api";
import { ThreatResponse } from "../../lib/types";
import { useI18n } from "../../lib/i18n";

interface PresetScenario {
  id: string;
  title: string;
  tag: string;
  sender: string;
  messages: string[];
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: "morphed_photo",
    title: "Morphed Private Photos Extortion",
    tag: "CRITICAL INFRACTION (BNS § 308 / IT § 66E)",
    sender: "+91 98765 43210 (Unverified Recovery Agent)",
    messages: [
      "We have full access to your phone gallery and intimate photos.",
      "If Rs. 5,000 is not paid to our UPI in 15 minutes, we will edit your face onto explicit nude photos and broadcast to all your WhatsApp contacts.",
      "Your sister and father will receive this first. Do not test our patience.",
    ],
  },
  {
    id: "contact_defamation",
    title: "Contact List Mass Defamation",
    tag: "HIGH SEVERITY (BNS § 356 Defamation)",
    sender: "+91 87654 32109 (Automated Collection Bot)",
    messages: [
      "Your entire phonebook containing 482 contacts has been backed up to our server.",
      "We are creating a WhatsApp group titled 'LOAN FRAUDSTER & DEFAULTER' with your employer, relatives, and neighbors.",
      "Clear your overdue interest immediately or face complete social destruction.",
    ],
  },
  {
    id: "fake_police_notice",
    title: "Fake Police FIR & Arrest Threat",
    tag: "IMPERSONATION (BNS § 204 / § 318)",
    sender: "+91 76543 21098 (Purported Cyber Officer)",
    messages: [
      "LEGAL NOTICE: Cyber Crime Cell FIR No. 402/2026 registered against your Aadhaar identity.",
      "Non-bailable arrest warrant generated under IPC/BNS Section 420 (Financial Fraud).",
      "Police team dispatched to your residential address. Immediate arrest in 2 hours unless loan settled online right now.",
    ],
  },
];

export default function ThreatPage() {
  const { t, lang } = useI18n();
  const router = useRouter();

  const [rawText, setRawText] = useState("");
  const [activeScenario, setActiveScenario] = useState<PresetScenario>(PRESET_SCENARIOS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ThreatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize with the first scenario automatically
  useEffect(() => {
    loadScenario(PRESET_SCENARIOS[0]);
  }, []);

  const loadScenario = (scenario: PresetScenario) => {
    setActiveScenario(scenario);
    setRawText(scenario.messages.join("\n\n"));
    handleAnalyze(scenario.messages);
  };

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
      setError(err.message || "Threat classification failed. Please check inputs.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImportToComplaint = () => {
    if (!result || !result.messages) return;
    const timelineItems = result.messages.map((m, idx) => ({
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      channel: "WhatsApp",
      summary: m.text,
      evidence_file: `recovery_threat_${idx + 1}.png`,
    }));
    sessionStorage.setItem("imported_threat_timeline", JSON.stringify(timelineItems));
    router.push("/complaint?imported=true");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-mono">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2C4A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>STAGE 3 // UNLAWFUL DEBT COLLECTION &amp; EXTORTION TRIAGE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            Recovery Agent Harassment &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">Extortion Triage</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1 font-sans font-normal">
            Predatory lenders deploy coercive third-party collection agents, fake judicial summons, and defamatory photo threats. Evaluate messages to map every infraction directly to the Bharatiya Nyaya Sanhita (BNS 2023) and RBI Fair Practices Code.
          </p>
        </div>

        {/* Emergency Helpline Callout */}
        <div className="flex items-center gap-3">
          <a
            href="tel:1930"
            className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-rose-500/40 bg-rose-950/20 hover:bg-rose-950/40 transition-colors"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <div>
              <span className="block text-[10px] text-rose-300 uppercase tracking-widest font-bold">1930 CYBER HELPLINE</span>
              <span className="text-sm font-black text-white flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>REPORT EXTORTION</span>
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Preset Scenario Selector Chips */}
      <div className="space-y-2">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>LOAD COERCIVE RECOVERY INCIDENT VECTORS:</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => loadScenario(sc)}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                activeScenario.id === sc.id
                  ? "bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-950/30 text-white"
                  : "glass-panel border-white/5 hover:border-white/20 text-slate-300"
              }`}
            >
              <span className="block text-[10px] text-rose-400 font-bold uppercase tracking-wider">{sc.tag}</span>
              <span className="text-xs font-bold block mt-1">{sc.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left WhatsApp Simulator & Right Threat Deconstruction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive WhatsApp Extortion Chat Simulator (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>COLLECTION COMMUNICATION SIMULATOR</span>
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
              EVIDENTIARY RECORD
            </span>
          </div>

          {/* WhatsApp UI Frame */}
          <div className="rounded-3xl bg-[#080C14] border border-[#1E2C4A] shadow-2xl overflow-hidden font-sans">
            {/* WhatsApp Header */}
            <div className="bg-[#0E1526] px-4 py-3 flex items-center justify-between border-b border-[#1E2C4A]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-rose-600/30 border border-rose-500 flex items-center justify-center text-rose-400 font-black">
                  <UserX className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white font-mono">{activeScenario.sender}</span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-500 text-[9px] font-black text-slate-950 uppercase font-mono">
                      UNREGISTERED
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block">
                    typing... (syndicated recovery bot)
                  </span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded">
                SIM 1
              </div>
            </div>

            {/* Fair Practices Code Warning Banner */}
            <div className="bg-[#121A2E] px-4 py-2 border-b border-[#1E2C4A] flex items-center gap-2 text-[10px] text-amber-300 font-mono">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>RBI Fair Practices Code Violation: Unauthorized recovery agent contacting borrower outside official banking hours.</span>
            </div>

            {/* Chat Bubble Scrollable Area */}
            <div className="p-4 space-y-4 min-h-[340px] max-h-[460px] overflow-y-auto bg-[radial-gradient(#152038_1px,transparent_1px)] [background-size:16px_16px]">
              {/* Timestamp Header */}
              <div className="text-center">
                <span className="text-[9px] font-mono text-slate-400 bg-[#0E1526] px-2.5 py-1 rounded-md uppercase tracking-wider">
                  TODAY // RECORDED INCOMING THREATS
                </span>
              </div>

              {/* Chat Messages */}
              {rawText
                .split("\n")
                .map((m) => m.trim())
                .filter((m) => m.length > 0)
                .map((msgText, idx) => {
                  const correspondingClass = result?.messages?.[idx];
                  return (
                    <div key={idx} className="space-y-1.5 max-w-[88%]">
                      {/* Speech Bubble */}
                      <div className="rounded-2xl rounded-tl-sm bg-[#121A2E] p-3 text-slate-100 text-xs shadow-md border border-white/5 space-y-2">
                        <p className="leading-relaxed font-sans">{msgText}</p>
                        <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-white/5">
                          <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          <span className="text-emerald-400">Delivered</span>
                        </div>
                      </div>

                      {/* Attached Legal Infraction Pill */}
                      {correspondingClass && (
                        <div className="flex flex-wrap gap-1.5 pl-2 font-mono">
                          {correspondingClass.labels.map((lbl, lIdx) => (
                            <span
                              key={lIdx}
                              className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 flex items-center gap-1 shadow-sm"
                            >
                              <Scale className="w-2.5 h-2.5 text-rose-400" />
                              <span>{lbl.replace(/_/g, " ").toUpperCase()}</span>
                            </span>
                          ))}
                          <span className="text-[9px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                            SEVERITY {correspondingClass.severity}/5
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Input & Mic Bar */}
            <div className="p-3 bg-[#0E1526] border-t border-[#1E2C4A] flex items-center gap-2">
              <MicButton onTranscript={(txt) => setRawText((prev) => prev ? prev + "\n" + txt : txt)} />
              <input
                type="text"
                placeholder="Dictate or type additional recovery messages..."
                value=""
                readOnly
                className="flex-1 bg-[#080C14] rounded-xl px-3.5 py-2 text-xs text-slate-400 font-mono border border-transparent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAnalyze()}
                disabled={isAnalyzing}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Raw Text Box for Custom Editing */}
          <div className="glass-panel rounded-2xl p-4 border border-[#1E2C4A] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold">RAW MESSAGE LOG EDITOR:</span>
              <button
                type="button"
                onClick={() => setRawText("")}
                className="text-slate-500 hover:text-rose-400 text-[10px] flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste recovery agent communications line by line..."
              className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-950/80 text-white font-mono focus:border-rose-500 focus:outline-none"
            />
            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing || !rawText.trim()}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {isAnalyzing ? "Classifying Infractions..." : "Re-Classify Custom Recovery Logs"}
            </button>
          </div>
        </div>

        {/* Right Column: Statutory Classification & Case Builder (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Severity & Action Banner */}
          {result && (
            <div
              className={`rounded-3xl p-6 border text-white space-y-4 shadow-xl ${
                result.overall_severity >= 4
                  ? "glass-panel-danger border-rose-500/50"
                  : result.overall_severity === 3
                  ? "glass-panel-gold border-amber-500/50"
                  : "glass-panel-elevated border-emerald-500/50"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    REGULATORY INFRACTION REPORT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black mt-1 font-sans">
                    {result.overall_severity >= 5
                      ? "CRITICAL: Non-Bailable Extortion Syndicate"
                      : result.overall_severity >= 4
                      ? "HIGH SEVERITY: Criminal Intimidation & Doxing"
                      : "MEDIUM SEVERITY: Coercive Debt Collection"}
                  </h2>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block">SEVERITY INDEX</span>
                  <span className="text-2xl font-black text-rose-400">
                    {result.overall_severity}/5
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {result.summary}
              </p>

              {/* Transfer to Complaint Builder CTA */}
              <div className="pt-2">
                <button
                  onClick={handleImportToComplaint}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:opacity-90 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-500/30 flex items-center justify-center space-x-2 font-mono transition-transform hover:scale-[1.01]"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Transfer {result.message_count} Incident Logs to Regulatory Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Applicable Legal Sections Panel (BNS 2023 & IT Act) */}
          <div className="glass-panel rounded-3xl p-6 border border-[#1E2C4A] space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                Statutory Provisions &amp; Directives (BNS 2023 &amp; IT Act)
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              These provisions are formally cited in the generated police FIR complaint dossier:
            </p>

            <div className="space-y-3">
              {(result?.legal_info || [
                {
                  title: "Extortion & Blackmail",
                  bns_sections: "BNS § 308 (Extortion) / BNS § 351(2) (Criminal Intimidation)",
                  it_act: "Information Technology Act Section 66E (Violation of Privacy)",
                  description: "Demanding money by threatening defamation or bodily injury is a cognizable criminal offense punishable with up to 7 years imprisonment.",
                  rbi_directive: "RBI Digital Lending Guidelines prohibit calling contacts or third-party intimidation.",
                },
                {
                  title: "Circulation of Morphed Imagery",
                  bns_sections: "BNS § 79 (Outraging Modesty) / BNS § 356 (Defamation)",
                  it_act: "IT Act Section 67 / 67A (Transmission of Obscene Material)",
                  description: "Creating or distributing morphed photos carries severe non-bailable penalties and immediate arrest warrants.",
                  rbi_directive: "Lending apps are strictly forbidden from accessing user gallery or media files.",
                },
              ]).map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#080C14] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">{sec.title}</span>
                    <span className="text-[10px] text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                      BNS 2023
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white">{sec.bns_sections}</p>
                  {sec.it_act && (
                    <p className="text-[11px] text-amber-300">{sec.it_act}</p>
                  )}
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{sec.description}</p>
                  <div className="p-2.5 rounded-xl bg-emerald-950/30 text-[10px] text-emerald-200 border border-emerald-800/40">
                    <strong>RBI Circular:</strong> {sec.rbi_directive}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standard Operating Procedure (SOP) for Harassment */}
          <div className="glass-panel-elevated rounded-3xl p-6 border border-emerald-500/30 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-sans">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Standard Operating Procedure (Immediate Borrower Rights):</span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>DO NOT TRANSFER MONEY IN PANIC:</strong> Submitting to extortion triggers syndicated demands from affiliated sister APKs.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>PRESERVE COMPLETE DIGITAL EVIDENCE:</strong> Preserve uncropped screenshots including phone number, DP, and timestamp. Never delete WhatsApp chats.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>BROADCAST INDEMNITY ADVISORY:</strong> Send our pre-drafted non-guarantor advisory to contact groups to neutralize blackmail threats.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  <strong>FILE COMPLAINT ON CYBERCRIME.GOV.IN:</strong> Attach the official PDF dossier compiled by Sahukar Shield to the national portal.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Disclaimer inline />
    </div>
  );
}
