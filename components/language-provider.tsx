"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "ms" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ms");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("senitukang-language");
      const initial: Language = saved === "en" ? "en" : "ms";
      setLanguageState(initial);
      document.documentElement.lang = initial;
    } catch {
      document.documentElement.lang = "ms";
    }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem("senitukang-language", next);
    } catch {
      // Language still updates for this session when local storage is unavailable.
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`language-switcher ${className}`} role="group" aria-label="Pilih bahasa / Choose language">
      <button
        type="button"
        className={`language-option ${language === "ms" ? "is-active" : ""}`}
        aria-pressed={language === "ms"}
        onClick={() => setLanguage("ms")}
        title="Bahasa Melayu"
      >
        BM
      </button>
      <span className="language-divider" aria-hidden="true">/</span>
      <button
        type="button"
        className={`language-option ${language === "en" ? "is-active" : ""}`}
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
