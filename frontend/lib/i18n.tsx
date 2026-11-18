"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "./types";
import en from "../locales/en.json";
import hi from "../locales/hi.json";
import hinglish from "../locales/hinglish.json";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string, fallback?: string) => string;
}

const dictionaries: Record<Language, any> = {
  hinglish,
  hi,
  en,
};

const I18nContext = createContext<I18nContextType>({
  lang: "hinglish",
  setLang: () => {},
  t: (path: string) => path,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("hinglish");

  useEffect(() => {
    const saved = localStorage.getItem("sahukar_shield_lang") as Language;
    if (saved && (saved === "hinglish" || saved === "hi" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("sahukar_shield_lang", newLang);
    document.documentElement.lang = newLang === "hi" ? "hi" : "en";
  };

  const t = (path: string, fallback?: string): string => {
    const dict = dictionaries[lang] || dictionaries["hinglish"];
    const parts = path.split(".");
    let curr: any = dict;
    for (const part of parts) {
      if (curr && typeof curr === "object" && part in curr) {
        curr = curr[part];
      } else {
        return fallback || path;
      }
    }
    return typeof curr === "string" ? curr : fallback || path;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
