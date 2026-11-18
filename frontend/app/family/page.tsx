"use client";

import React, { useState } from "react";
import { Users, Shield, HeartHandshake, AlertCircle, Sparkles, MessageCircle, Copy, Check, Info } from "lucide-react";
import ShareButtons from "../../components/ShareButtons";
import Disclaimer from "../../components/Disclaimer";
import { getFamilyAdvisory } from "../../lib/api";
import { FamilyResponse } from "../../lib/types";
import { useI18n } from "../../lib/i18n";

const SAMPLE_FAMILY_THREATS = [
  "Ramesh Sharma ne hamari company se loan liya hai aur apna phone switch off kar diya hai. Aap unke relative hain, 2 ghante me Rs 5000 bhariye warna aapka number cyber police ko de diya jayega.",
  "Warning: Your contact person has defaulted on credit dues. We are filing an attachment order on your phone number unless settled.",
];

export default function FamilyPage() {
  const { t, lang } = useI18n();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FamilyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async (overrideMsg?: string) => {
    const msg = overrideMsg || message;
    if (!msg.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await getFamilyAdvisory(msg.trim(), lang);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Failed to generate family guide");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Stage 5: Support For Contacts & Relatives</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800">
          {t("family.title", "Family Alert: Rishtedaaron Ke Liye Guide")}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t(
            "family.subtitle",
            "Agar aapko kisi aur ke loan ke naam par recovery agent se dhamki aayi hai, to pareshan na hon. Aap kisi debt ke liye kanooni taur par zimmedar nahi hain."
          )}
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Aapko Jo Message Aaya Hai Yahan Paste Karein:
          </label>
          <button
            type="button"
            onClick={() => {
              setMessage(SAMPLE_FAMILY_THREATS[0]);
              handleExplain(SAMPLE_FAMILY_THREATS[0]);
            }}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Relative Threat Load Karein</span>
          </button>
        </div>

        <textarea
          rows={4}
          placeholder={t(
            "family.input_placeholder",
            "Aapko jo dhamki bhara message aaya hai yahan paste karein..."
          )}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-xs p-4 rounded-2xl border border-slate-300 focus:outline-none focus:border-teal-500 bg-slate-50 text-navy-900 leading-relaxed font-medium"
        />

        <div className="flex justify-end">
          <button
            onClick={() => handleExplain()}
            disabled={isLoading || !message.trim()}
            className="px-6 py-3 rounded-2xl bg-[#0B1F3A] hover:bg-navy-700 text-white font-bold text-xs shadow transition-all disabled:opacity-50"
          >
            {isLoading ? "Analyzing..." : t("family.btn_explain", "Sahi Jaankari Paayein")}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Calm Reassuring Headline */}
          <div className="bg-gradient-to-r from-teal-900 to-navy-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-500/30 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300">
              Reassurance & Truth
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-200">
              {result.headline}
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {result.core_message}
            </p>
          </div>

          {/* Guarantor vs Contact Explainer Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center space-x-2 text-navy-800">
              <Info className="w-5 h-5 text-teal-600" />
              <h3 className="text-base font-bold">
                {t("family.guarantor_vs_contact", "Guarantor vs Contact: Kanooni Sach")}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 space-y-1">
                <span className="font-bold text-red-900 uppercase tracking-wide block">
                  Myth (Fraud App Ka Jhooth):
                </span>
                <p className="text-slate-700 leading-relaxed">
                  "Agar aapka phone number borrower ke contacts me hai, to aapko uska karza chukana hoga."
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100 space-y-1">
                <span className="font-bold text-green-900 uppercase tracking-wide block">
                  Reality (Bharat Ka Kanoon):
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Aap tab tak kisi loan ke liye zimmedar nahi hain jab tak aapne kisi bank loan document par <strong>Guarantor ke roop me physical/digital sign</strong> na kiya ho. Contact list chori karna kanoonan apradh hai.
                </p>
              </div>
            </div>
          </div>

          {/* Key Advice Action Points */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Aapko Kya Karna Chahiye (Key Action Points):
            </h3>
            <ul className="space-y-3 text-xs text-slate-800">
              {result.key_points.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to Say to the Recovery Agent */}
          <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Recovery Agent Ko Call Par Kya Jawab Dein:
            </span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed italic bg-white p-4 rounded-2xl border border-amber-100">
              "{result.what_to_say}"
            </p>
          </div>

          {/* WhatsApp Share Card */}
          <div className="bg-[#0B1F3A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-700 space-y-4">
            <div className="flex items-center space-x-2 text-teal-400">
              <MessageCircle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">
                {t("family.whatsapp_card_title", "WhatsApp Share Card")}
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              {t(
                "family.whatsapp_card_desc",
                "Ye message apne family WhatsApp group ya contacts me share karein taaki koi unhe blackmail na kar sake."
              )}
            </p>

            <div className="p-4 rounded-2xl bg-navy-900 border border-navy-700 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
              {result.share_text}
            </div>

            <ShareButtons shareText={result.share_text} />
          </div>

          <Disclaimer inline />
        </div>
      )}
    </div>
  );
}
