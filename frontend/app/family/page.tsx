"use client";

import React, { useState } from "react";
import {
  Users,
  Shield,
  HeartHandshake,
  AlertCircle,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Info,
  Download,
  Image as ImageIcon,
  PhoneCall,
  Scale,
  ShieldCheck,
  Share2,
} from "lucide-react";
import ShareButtons from "../../components/ShareButtons";
import Disclaimer from "../../components/Disclaimer";
import { getFamilyAdvisory } from "../../lib/api";
import { FamilyResponse } from "../../lib/types";
import { useI18n } from "../../lib/i18n";

const SAMPLE_FAMILY_THREATS = [
  "Ramesh Sharma took an instant personal loan from our company and his phone is currently switched off. You are listed as his close emergency contact. Transfer Rs. 5,000 within 2 hours or your contact number will be reported to Cyber Crime and police.",
  "URGENT NOTICE: Your relative has defaulted on their instant micro-loan. We are initiating attachment proceedings against your mobile number and broadcasting their loan defaulter status to mutual contacts.",
  "We have downloaded your brother's phone contacts. If his overdue account of Rs. 8,000 is not cleared by 4:00 PM today, his morphed photo will be circulated to your family WhatsApp groups.",
];

export default function FamilyPage() {
  const { t } = useI18n();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FamilyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const downloadImageCard = () => {
    if (!result) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High-tech dark gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, "#060E1A");
    grad.addColorStop(0.5, "#0B192C");
    grad.addColorStop(1, "#030914");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Glowing cyan cyber border
    ctx.strokeStyle = "#14B8A6";
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 590);

    // Header badge
    ctx.fillStyle = "#EF4444";
    ctx.beginPath();
    ctx.roundRect(50, 45, 520, 44, 8);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px monospace, system-ui, sans-serif";
    ctx.fillText("SAHUKAR SHIELD // STATUTORY LEGAL ADVISORY", 70, 74);

    // Main Title
    ctx.fillStyle = "#2DD4BF";
    ctx.font = "bold 40px system-ui, sans-serif";
    ctx.fillText("You Have ZERO Financial Liability for This Loan!", 50, 155);

    // Subtitle
    ctx.fillStyle = "#94A3B8";
    ctx.font = "20px system-ui, sans-serif";
    ctx.fillText("Do NOT transfer money under panic. Contact directory theft is an illegal extortion tactic.", 50, 205);

    // Legal Rules
    const rules = [
      "1. Contact Scraping: Being in a phonebook does NOT constitute legal consent or loan guarantee.",
      "2. Never Send Funds: Paying will trigger repeated syndicated blackmail calls to other family members.",
      "3. Preserve & Block: Capture full uncropped screenshots with phone numbers, then block caller.",
      "4. Emergency Escalation: Report extortion immediately to 1930 Cyber Helpline or cybercrime.gov.in."
    ];

    ctx.fillStyle = "#F8FAFC";
    ctx.font = "500 20px system-ui, sans-serif";
    rules.forEach((rule, idx) => {
      ctx.fillText(rule, 50, 275 + idx * 52);
    });

    // High-tech footer bar
    ctx.fillStyle = "#0F213A";
    ctx.fillRect(25, 520, 1150, 80);

    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 18px monospace, system-ui, sans-serif";
    ctx.fillText("National Cyber Helpline: 1930 | cybercrime.gov.in | Indian Contract Act 1872 // Section 126", 50, 565);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "Sahukar_Shield_Family_Alert.png";
    link.href = dataUrl;
    link.click();
  };

  const handleExplain = async (overrideMsg?: string) => {
    const msg = overrideMsg || message;
    if (!msg.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await getFamilyAdvisory(msg.trim(), "english");
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Failed to generate family guide");
    } finally {
      setIsLoading(false);
    }
  };

  const copyScriptText = () => {
    if (!result?.what_to_say) return;
    navigator.clipboard.writeText(result.what_to_say);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>STAGE 5 // CONTACT LIST VICTIM PROTECTION & FAMILY SHIELD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Family Shield: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Advisory for Harassed Relatives</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Did you receive aggressive calls or defamatory messages regarding someone else&apos;s loan? Know your statutory rights: Phone contacts carry zero legal liability.
          </p>
        </div>

        <a
          href="tel:1930"
          className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-red-500/40 bg-red-950/20 hover:bg-red-950/40 transition-colors self-start sm:self-auto"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <div>
            <span className="block text-[10px] font-mono text-red-300 uppercase tracking-widest font-bold">1930 CYBER HELPLINE</span>
            <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>Report Harassment</span>
            </span>
          </div>
        </a>
      </div>

      {/* Preset Scenario Selector Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>LOAD REAL-WORLD RELATIVE EXTORTION SAMPLES:</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_FAMILY_THREATS.map((sampleText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setMessage(sampleText);
                handleExplain(sampleText);
              }}
              className="p-3 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/40 text-left text-xs font-mono text-slate-300 hover:text-white transition-all space-y-1"
            >
              <span className="text-[10px] text-cyan-400 font-bold block">SAMPLE CASE {idx + 1}</span>
              <p className="line-clamp-2 text-slate-400 text-[11px] font-sans">{sampleText}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          Paste the Threatening Message Received by You as a Contact or Relative:
        </label>

        <textarea
          rows={4}
          placeholder="Paste SMS or WhatsApp message (e.g. 'Your relative has defaulted on loan. Pay Rs 5000 immediately or your number will be reported to police')..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-xs p-4 rounded-2xl border border-slate-700 focus:outline-none focus:border-cyan-400 bg-slate-900/80 text-white font-mono leading-relaxed"
        />

        <div className="flex justify-end">
          <button
            onClick={() => handleExplain()}
            disabled={isLoading || !message.trim()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:opacity-90 text-slate-950 font-black text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            {isLoading ? "Analyzing Threat Vector..." : "Generate Protective Legal Advisory"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Reassurance Headline Banner */}
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-teal-500/40 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                STATUTORY LEGAL REALITY
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">ZERO LIABILITY CONFIRMED</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {result.headline}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-normal">
              {result.core_message}
            </p>
          </div>

          {/* Legal Distinction: Contact vs Guarantor */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#1E2C4A] space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <Scale className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Statutory Distinction: Contact Entry vs Legitimate Loan Guarantor
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wide block text-[11px]">
                  DECEPTIVE USURY CLAIM:
                </span>
                <p className="text-slate-300 font-sans leading-relaxed text-xs">
                  &ldquo;Because your phone number exists in the borrower&apos;s contacts or was entered as a reference, you are legally responsible to pay their debt.&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wide block text-[11px]">
                  INDIAN LAW (CONTRACT ACT § 126):
                </span>
                <p className="text-slate-300 font-sans leading-relaxed text-xs">
                  Under Section 126 of the Indian Contract Act 1872, a person only becomes a guarantor if they have explicitly signed an enforceable tripartite agreement. Harvesting contacts without explicit consent violates the law.
                </p>
              </div>
            </div>
          </div>

          {/* Key Advice Action Points */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#1E2C4A] space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Recommended Standard Operating Procedure:</span>
            </h3>
            <ul className="space-y-3 text-xs font-mono text-slate-300">
              {result.key_points.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-900/60 border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-sans">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Word-for-Word Telephone Rebuttal Script */}
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Word-for-Word Verbal Response to Harassing Agents:
              </span>
              <button
                type="button"
                onClick={copyScriptText}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] flex items-center gap-1 border border-white/10"
              >
                {copiedResponse ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedResponse ? "Copied" : "Copy Script"}</span>
              </button>
            </div>
            <p className="text-xs text-slate-200 font-mono leading-relaxed italic bg-slate-950/80 p-4 rounded-2xl border border-white/5">
              &ldquo;{result.what_to_say}&rdquo;
            </p>
          </div>

          {/* WhatsApp Share Card & PNG Generator */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#1E2C4A] space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center space-x-2 text-emerald-400">
                <MessageCircle className="w-4 h-4" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Family Protective Broadcast Card
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                DISARM EXTORTION PANIC
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              Share this pre-verified broadcast in family WhatsApp groups to alert relatives and prevent any unauthorized ransom payments.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              {result.share_text}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ShareButtons shareText={result.share_text} />
              <button
                type="button"
                onClick={downloadImageCard}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:opacity-90 text-slate-950 font-black text-xs font-mono uppercase tracking-wider shadow-lg shadow-teal-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Warning Card (PNG)</span>
              </button>
            </div>
          </div>

          <Disclaimer inline />
        </div>
      )}
    </div>
  );
}
