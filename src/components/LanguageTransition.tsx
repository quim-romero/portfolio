import { useEffect, useState } from "react";

export default function LanguageTransition({ lang }: { lang: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, [lang]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-6 right-6 z-50 text-sm px-4 py-2 rounded shadow-md bg-light/90 dark:bg-dark/90 text-black dark:text-white animate-fade-in-out"
    >
      {lang === "en" ? "Language: English" : "Idioma: Español"}
    </div>
  );
}
