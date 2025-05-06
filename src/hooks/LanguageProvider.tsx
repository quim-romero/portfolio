import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

export type Language = "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  prevLang?: Language;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

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
    if (stored === "es" || stored === "en") return stored;
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
  const prevLangRef = useRef<Language | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    prevLangRef.current = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, prevLang: prevLangRef.current }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
