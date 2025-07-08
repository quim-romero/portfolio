import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useLanguage } from "../hooks/LanguageProvider";

export default function GreetingBadge() {
  const { lang } = useLanguage();
  const [isDark] = useDarkMode();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    const inRange = (a: number, b: number) => hour >= a && hour < b;

    if (lang === "es") {
      setGreeting(inRange(6, 12) ? "Buenos días" : inRange(12, 18) ? "Buenas tardes" : "Buenas noches");
    } else {
      setGreeting(inRange(6, 12) ? "Good morning" : inRange(12, 18) ? "Good afternoon" : "Good evening");
    }
  }, [lang]);

  const Icon = useMemo(() => {
    return isDark ? (
      // Moon
      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 1 0 21 12.79z" />
      </svg>
    ) : (
      // Sun
      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.04.46l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM20 11v2h3v-2h-3zm-3.24 8.16l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM11 20h2v3h-2v-3zM4.22 18.36l-1.79 1.8 1.41 1.41 1.8-1.79-1.42-1.42z" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    );
  }, [isDark]);

  return (
    <motion.div
      data-testid="greeting"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full
                 ring-1 ring-black/5 dark:ring-white/10
                 bg-white/70 dark:bg-black/30 backdrop-blur
                 shadow-sm dark:shadow-none relative"
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full blur-xl opacity-60
                   bg-gradient-to-r from-amber-300/30 via-fuchsia-300/25 to-sky-300/30
                   dark:from-amber-400/15 dark:via-fuchsia-400/10 dark:to-sky-400/15"
      />
      <span className="relative inline-flex items-center gap-2">
        <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-100
                         bg-clip-text [text-shadow:0_0_1px_rgba(0,0,0,.05)]">
          {greeting}
        </span>
        <span className="text-gray-800/80 dark:text-gray-100/80">{Icon}</span>
      </span>
    </motion.div>
  );
}
