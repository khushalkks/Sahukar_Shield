"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  shareText: string;
  title?: string;
  url?: string;
}

export default function ShareButtons({ shareText, title = "Sahukar Shield Advisory", url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 font-mono">
      <button
        onClick={shareOnWhatsApp}
        className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all font-mono"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Broadcast to WhatsApp Group</span>
      </button>

      <button
        onClick={handleCopy}
        className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 shadow-sm transition-all font-mono"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400">Copied to Clipboard!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy Advisory Text</span>
          </>
        )}
      </button>
    </div>
  );
}
