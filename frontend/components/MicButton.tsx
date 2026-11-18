"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { useI18n } from "../lib/i18n";

interface MicButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export default function MicButton({ onTranscript, className = "" }: MicButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { lang, t } = useI18n();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang === "en" ? "en-IN" : "hi-IN";

        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          if (finalTranscript.trim()) {
            onTranscript(finalTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.log("[SpeechRecognition Error]:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [lang, onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = lang === "en" ? "en-IN" : "hi-IN";
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech start error:", err);
      }
    }
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
        isListening
          ? "bg-red-600 text-white animate-pulse"
          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
      } ${className}`}
      title={isListening ? "Listening... Tap to stop" : "Tap to speak (Hindi/English voice)"}
    >
      {isListening ? (
        <>
          <MicOff className="w-3.5 h-3.5" />
          <span>Sun rahe hain...</span>
        </>
      ) : (
        <>
          <Mic className="w-3.5 h-3.5 text-teal-600" />
          <span>{t("threat.voice_btn", "Voice Input")}</span>
        </>
      )}
    </button>
  );
}
