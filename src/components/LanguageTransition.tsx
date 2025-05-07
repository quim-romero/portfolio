import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLanguage } from "../hooks/LanguageProvider";

type Props = {
  children?: ReactNode;
};

export default function LanguageTransition({ children }: Props) {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <>
      {visible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-md bg-black/90 text-white text-sm animate-fade-in-out"
        >
          {lang === "en" ? "Language: English" : "Idioma: Español"}
        </div>
      )}
      {children}
    </>
  );
}
