import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "../layout/Layout";
import { t } from "../i18n/translations";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useEffect, useState } from "react";
import HeroBackground from "../components/HeroBackground";
import GreetingBadge from "../components/GreetingBadge";

export default function Home() {
  const { lang } = useLanguage();
  const [isDark] = useDarkMode();
  const [theme, setTheme] = useState(isDark ? "dark" : "light");

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  const pageTitle =
    lang === "es"
      ? "Desarrollador Frontend Freelance – Quim Romero | Interfaces modernas, React y animación"
      : "Frontend Developer Freelance – Quim Romero | React, Motion & Product Interfaces";

  const pageDescription =
    lang === "es"
      ? "Portafolio profesional de Quim Romero, desarrollador frontend freelance. Interfaces modernas y animadas construidas con React, Tailwind y diseño UX. Disponible para proyectos y colaboraciones."
      : "Professional portfolio of Quim Romero, frontend developer freelance. Clean, animated interfaces built with React, Tailwind, and UX-focused design. Available for freelance projects and collaborations.";

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quimromero.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://quimromero.com" />
      </Helmet>

      <main
        id="main"
        role="main"
        aria-label="Homepage hero section"
        className="relative min-h-screen flex items-center justify-center px-6 text-center bg-light dark:bg-dark text-text-base dark:text-text-light overflow-hidden transition-colors duration-300"
      >
        <HeroBackground />

        <LanguageTransition>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-3 md:mb-4">
              <GreetingBadge />
            </div>

            <h1
              data-testid="header-title"
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              {t("home", "title", lang)}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {t("home", "subtitle", lang)}
            </p>

            <p
              className="text-sm text-muted dark:text-gray-400 mt-4"
              dangerouslySetInnerHTML={{ __html: t("home", "note", lang) }}
            />
          </motion.div>
        </LanguageTransition>

        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-0 pointer-events-none bg-light dark:bg-dark"
          />
        </AnimatePresence>
      </main>
    </Layout>
  );
}
