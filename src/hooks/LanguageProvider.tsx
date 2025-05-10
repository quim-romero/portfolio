import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

const isValidLang = (value: unknown): value is Language =>
  value === "en" || value === "es";

const detectBrowserLanguage = (): Language => {
  if (typeof navigator !== "undefined") {
    const lang = navigator.language.toLowerCase();
    return lang.includes("es") ? "es" : "en";
  }
  return "en";
};

const getInitialLang = (): Language => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lang");
    if (isValidLang(stored)) {
      return stored;
    }
    const detected = detectBrowserLanguage();
    localStorage.setItem("lang", detected);
    return detected;
  }
  return "en";
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<Language>(() => getInitialLang());

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
