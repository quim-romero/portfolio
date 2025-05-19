import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLanguage } from "../hooks/LanguageProvider";
import { t } from "../i18n/translations";
import LanguageTransition from "../components/LanguageTransition";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useEffect, useState } from "react";
import StackModal from "./StackModal";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLanguage();
  const [isDark] = useDarkMode();
  const [theme, setTheme] = useState(isDark ? "dark" : "light");
  const [showStack, setShowStack] = useState(false);

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  // Keyboard trigger for easter egg
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "q") {
        setShowStack(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <motion.footer
        role="contentinfo"
        className="relative bg-light dark:bg-dark border-t border-gray-200 dark:border-gray-800 px-6 py-10 text-sm text-gray-600 dark:text-gray-400 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          {/* Social icons */}
          <div className="flex gap-5 text-xl" aria-label="Social links">
            <a
              href="https://github.com/quim-romero"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com/in/quimromero"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              href="mailto:quim@quimromero.com"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>

          {/* Freelance availability + Easter egg */}
          <div className="text-center md:text-left space-y-1">
            <p>
              {t("footer", "freelanceShort", lang)}{" "}
              <a
                href="/contact"
                className="text-brand font-medium hover:underline"
              >
                {t("footer", "freelanceContact", lang)}
              </a>
            </p>
            <p className="text-xs italic opacity-50">
              {t("footer", "stackHint", lang)}
            </p>
          </div>

          {/* Copyright */}
          <LanguageTransition>
            <div
              className="flex flex-wrap justify-center md:justify-end gap-4 text-sm font-medium"
              aria-label="Legal info"
            >
              <span className="text-gray-500 dark:text-gray-400">
                {t("footer", "copyright", lang).replace(
                  "{year}",
                  year.toString()
                )}
              </span>
            </div>
          </LanguageTransition>
        </div>

        {/* Theme overlay */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-0 pointer-events-none bg-light dark:bg-dark"
          />
        </AnimatePresence>
      </motion.footer>

      {/* Modal */}
      {showStack && <StackModal onClose={() => setShowStack(false)} />}
    </>
  );
}
