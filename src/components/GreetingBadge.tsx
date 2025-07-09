import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../hooks/LanguageProvider";

type Period = "morning" | "afternoon" | "evening" | "night";

export default function GreetingBadge() {
  const { lang } = useLanguage();
  const [greeting, setGreeting] = useState("");
  const [period, setPeriod] = useState<Period>("night");

  useEffect(() => {
    const h = new Date().getHours();
    const p: Period =
      h >= 6 && h < 12
        ? "morning"
        : h >= 12 && h < 18
        ? "afternoon"
        : h >= 18 && h < 22
        ? "evening"
        : "night";

    setPeriod(p);

    if (lang === "es") {
      setGreeting(
        p === "morning"
          ? "Buenos días"
          : p === "afternoon"
          ? "Buenas tardes"
          : "Buenas noches"
      );
    } else {
      setGreeting(
        p === "morning"
          ? "Good morning"
          : p === "afternoon"
          ? "Good afternoon"
          : "Good evening"
      );
    }
  }, [lang]);

  const Icon = useMemo(() => {
    if (period === "morning" || period === "afternoon") {
      return (
        <svg
          className="w-3.5 h-3.5 md:w-4 md:h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10-9h2V1h-2v3z" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
    }
    return (
      <svg
        className="w-3.5 h-3.5 md:w-4 md:h-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 1 0 21 12.79z" />
      </svg>
    );
  }, [period]);

  return (
    <motion.span
      data-testid="greeting"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="inline-flex items-center gap-1.5 align-middle text-xs md:text-sm font-medium
                 text-gray-700 dark:text-gray-300"
      aria-live="polite"
    >
      {greeting}
      <span className="opacity-80">{Icon}</span>
    </motion.span>
  );
}
