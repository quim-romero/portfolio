import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-testid="loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 text-white"
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
              className="text-2xl md:text-3xl font-bold text-brand"
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
