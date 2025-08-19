import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../hooks/LanguageProvider";

type Period = "morning" | "afternoon" | "evening" | "night";

export default function GreetingBadge() {
  const { lang } = useLanguage();
  const [greeting, setGreeting] = useState("");
  const [period, setPeriod] = useState<Period>("night");

  const getPeriod = (hour: number): Period => {
    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 22) return "evening";
    return "night";
  };

  const greetingsMap: Record<string, Record<Period, string>> = {
    es: {
      morning: "Buenos días",
      afternoon: "Buenas tardes",
      evening: "Buenas tardes",
      night: "Buenas noches",
    },
    en: {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
      night: "Good night",
    },
  };

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      const currentPeriod = getPeriod(hour);
      setPeriod(currentPeriod);
      setGreeting(greetingsMap[lang][currentPeriod]);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const Icon = useMemo(() => {
    switch (period) {
      case "morning":
        return (
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="5" />
            <line
              x1="12"
              y1="1"
              x2="12"
              y2="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="20"
              x2="12"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="4.22"
              y1="4.22"
              x2="6.34"
              y2="6.34"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="17.66"
              y1="17.66"
              x2="19.78"
              y2="19.78"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="12"
              x2="4"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="20"
              y1="12"
              x2="23"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="4.22"
              y1="19.78"
              x2="6.34"
              y2="17.66"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="17.66"
              y1="6.34"
              x2="19.78"
              y2="4.22"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        );

      case "afternoon":
        return (
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="5" />
            <line
              x1="12"
              y1="2"
              x2="12"
              y2="5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="19"
              x2="12"
              y2="22"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="2"
              y1="12"
              x2="5"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="19"
              y1="12"
              x2="22"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        );

      case "evening":
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

      case "night":
        return (
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="12,2 14.09,8.26 20.9,8.27 15.5,12.97 17,19 12,15.5 7,19 8.5,12.97 3.1,8.27 9.91,8.26" />
          </svg>
        );

      default:
        return null;
    }
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
