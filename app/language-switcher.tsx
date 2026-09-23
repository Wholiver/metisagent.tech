"use client";

import { useCallback, useEffect, useState } from "react";

export type Language = "en" | "zh";

const storageKey = "metis-language";
const languageEvent = "metis-language-change";

function applyDocumentLanguage(language: Language) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }
}

export function useLanguage(initialLang?: Language) {
  const [language, setLanguageState] = useState<Language>(initialLang ?? "en");

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    applyDocumentLanguage(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Language still changes when storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent<Language>(languageEvent, { detail: next }));
  }, []);

  useEffect(() => {
    let initial: Language = initialLang ?? (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === "en" || stored === "zh") initial = stored;
    } catch {
      // Browser language remains the fallback.
    }

    setLanguageState(initial);
    applyDocumentLanguage(initial);

    const syncLanguage = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next === "en" || next === "zh") setLanguageState(next);
    };
    window.addEventListener(languageEvent, syncLanguage);
    return () => window.removeEventListener(languageEvent, syncLanguage);
  }, [initialLang]);

  return { language, setLanguage };
}

export function LanguageSwitcher({
  language,
  onChange,
}: {
  language: Language;
  onChange: (language: Language) => void;
}) {
  const label = language === "zh" ? "选择网站语言" : "Choose site language";

  return (
    <div className="lang-segmented" role="group" aria-label={label}>
      <button
        type="button"
        lang="zh-CN"
        className={`lang-btn ${language === "zh" ? "active" : ""}`}
        aria-pressed={language === "zh"}
        onClick={() => onChange("zh")}
      >
        中文
      </button>
      <button
        type="button"
        lang="en"
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        aria-pressed={language === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
    </div>
  );
}
