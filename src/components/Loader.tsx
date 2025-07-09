import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function getInitialDark(): boolean {
  const forcedTheme =
    (import.meta.env.VITE_THEME as string | undefined) ||
    ((window as any).Cypress?.env?.theme as string | undefined);

  if (forcedTheme === "dark") return true;
  if (forcedTheme === "light") return false;

  const saved =
    localStorage.getItem("theme") ||
    localStorage.getItem("color-theme") ||
    localStorage.getItem("preferred-theme");

  if (saved === "dark") return true;
  if (saved === "light") return false;

  if (window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}

export default function Loader() {
  const forcedLang =
    import.meta.env.VITE_LOCALE || (window as any).Cypress?.env?.locale;
  const lang =
    forcedLang?.startsWith("es") || navigator.language.startsWith("es")
      ? "es"
      : "en";

  const text = {
    en: {
      headline: "Interfaces that think. Animations that feel.",
      domain: "quimromero.com",
    },
    es: {
      headline: "Interfaces que piensan. Animaciones que sienten.",
      domain: "quimromero.com",
    },
  };

  const { headline, domain } = text[lang];

  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(getInitialDark());

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 2100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const forcedTheme =
      (import.meta.env.VITE_THEME as string | undefined) ||
      ((window as any).Cypress?.env?.theme as string | undefined);
    const saved =
      localStorage.getItem("theme") ||
      localStorage.getItem("color-theme") ||
      localStorage.getItem("preferred-theme");

    if (forcedTheme || saved) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setIsDark(e.matches);

    try {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    } catch {
      mq.addListener(onChange);
      return () => mq.removeListener(onChange);
    }
  }, []);

  const wrapperClass = useMemo(
    () => (isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"),
    [isDark]
  );

  const subTextClass = useMemo(
    () => (isDark ? "text-brand" : "text-brand"),
    [isDark]
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-testid="loader"
          className={`fixed inset-0 z-50 flex items-center justify-center ${wrapperClass}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center font-mono space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.p
              className="text-lg md:text-xl tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {headline}
            </motion.p>

            <motion.h1
              className={`text-2xl md:text-3xl font-bold ${subTextClass}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {domain}
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
