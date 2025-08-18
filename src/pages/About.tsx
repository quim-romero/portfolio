import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "../layout/Layout";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { t, tArray } from "../i18n/translations";
import { Icon } from "@iconify/react";

export default function About() {
  const { lang } = useLanguage();
  const [isDark] = useDarkMode();
  const [theme, setTheme] = useState(isDark ? "dark" : "light");
  const cvPath = lang === "es" ? "/cv/cv-es.pdf" : "/cv/cv-en.pdf";

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  const pageTitle =
    lang === "es"
      ? "Sobre mí | Desarrollador Frontend – Quim Romero"
      : "About Me | Frontend Developer – Quim Romero";

  const pageDescription = t("about", "metaDescription", lang);

  const intro = t("about", "intro", lang);
  const howIWork = tArray("about", "howIWork", lang);
  const valueAdd = tArray("about", "valueAdd", lang);
  const techList = tArray<{ name: string; id: string }>("about", "tech", lang);

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://quimromero.com/about" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://quimromero.com/about" />
      </Helmet>

      <main id="main" role="main" aria-label="About page content">
        <section className="relative py-24 px-6 max-w-5xl mx-auto bg-light dark:bg-dark text-text-base dark:text-text-light transition-colors duration-300 overflow-hidden">
          <LanguageTransition>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <header className="mb-6">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                  {t("about", "heading", lang)}
                </h1>
              </header>

              <section aria-labelledby="intro">
                <h2 id="intro" className="sr-only">
                  {t("about", "heading", lang)}
                </h2>
                <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                  {intro}
                </p>

                <div className="mt-6">
                  <a
                    href={cvPath}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-black dark:text-white font-semibold rounded-md hover:brightness-110 transition"
                    aria-label={`Download CV in ${
                      lang === "es" ? "Spanish" : "English"
                    }`}
                  >
                    <FiDownload className="text-xl" aria-hidden="true" />
                    {t("about", "downloadCV", lang)}
                  </a>
                </div>
              </section>

              <section aria-labelledby="work-and-value" className="mt-12">
                <h2 id="work-and-value" className="sr-only">
                  {t("about", "heading", lang)}
                </h2>

                <div className="grid md:grid-cols-2 gap-10">
                  <article
                    aria-labelledby="how-i-work"
                    className="border-l-4 border-brand pl-5 sm:pl-6"
                  >
                    <h3
                      id="how-i-work"
                      className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white"
                    >
                      {t("about", "howIWorkTitle", lang)}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                      {howIWork.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </article>

                  <article
                    aria-labelledby="value-add"
                    className="border-l-4 border-brand pl-5 sm:pl-6 md:mt-0"
                  >
                    <h3
                      id="value-add"
                      className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white"
                    >
                      {t("about", "valueAddTitle", lang)}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                      {valueAdd.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              </section>

              <section aria-labelledby="tools-tech" className="mt-12">
                <h2
                  id="tools-tech"
                  className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white"
                >
                  {t("about", "toolsHeading", lang)}
                </h2>
                <div
                  className="grid grid-cols-6 grid-rows-2 gap-6 mt-6 items-center"
                  role="list"
                  aria-label="Technologies I use"
                >
                  {[
                    { name: "JavaScript", icon: "logos:javascript" },
                    { name: "TypeScript", icon: "logos:typescript-icon" },
                    { name: "Next.js", icon: "akar-icons:nextjs-fill" },
                    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
                    { name: "Figma", icon: "logos:figma" },
                    { name: "Framer Motion", icon: "logos:framer" },
                    { name: "Vite", icon: "logos:vitejs" },
                    { name: "React", icon: "logos:react" },
                    { name: "Zustand", icon: "devicon:zustand" },
                    { name: "Cypress", icon: "logos:cypress-icon" },
                    { name: "Vitest", icon: "logos:vitest" },
                    { name: "Playwright", icon: "devicon:playwright" },
                  ].map(({ name, icon }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center text-center"
                    >
                      {icon.startsWith("/") ? (
                        <img
                          src={icon}
                          alt={`${name} logo`}
                          className="h-10 w-10 mb-2 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <Icon
                          icon={icon}
                          width={40}
                          height={40}
                          className="mb-2"
                        />
                      )}
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
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
        </section>
      </main>
    </Layout>
  );
}
