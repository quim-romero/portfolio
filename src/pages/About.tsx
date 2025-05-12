import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "../layout/Layout";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { t, tArray } from "../i18n/translations";

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
      ? "Sobre mí | Desarrollador Frontend Freelance – Quim Romero"
      : "About Me | Frontend Freelance Developer – Quim Romero";

  const pageDescription =
    lang === "es"
      ? "Perfil profesional de Quim Romero: desarrollador frontend freelance especializado en React, animación y diseño UX. Disponible para proyectos."
      : "Quim Romero – Frontend freelance developer focused on React, UI motion, and UX design. Available for freelance projects.";

  const freelanceIntro = t("about", "freelanceCTA.intro", lang);
  const freelanceExamples = tArray("about", "freelanceCTA.examples", lang);
  const freelanceClosing = t("about", "freelanceCTA.closing", lang);
  const howIWork = tArray("about", "howIWork", lang);
  const whatIOffer = tArray("about", "whatIOffer", lang);
  const introParagraphs = tArray("about", "intro", lang);
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
              <header>
                <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t("about", "heading", lang)}
                </h1>
              </header>

              <section aria-labelledby="freelance-highlight">
                <h2 id="freelance-highlight" className="sr-only">
                  Freelance Availability
                </h2>
                <p className="text-lg text-gray-800 dark:text-gray-300 mb-6 leading-relaxed">
                  {freelanceIntro}
                </p>

                <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-6 space-y-1">
                  {freelanceExamples.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-10">
                  {freelanceClosing}{" "}
                  <a
                    href="/contact"
                    className="text-brand font-medium hover:underline"
                  >
                    {t("about", "freelanceCTA.contactLink", lang)}
                  </a>{" "}
                  {t("about", "freelanceCTA.orEmail", lang)}{" "}
                  <a
                    href="mailto:quim@quimromero.com"
                    className="text-brand font-medium hover:underline"
                  >
                    quim@quimromero.com
                  </a>
                  .
                </p>
              </section>

              <section
                className="grid md:grid-cols-2 gap-12 mt-20 mb-16"
                aria-labelledby="offer-work-section"
              >
                <article
                  aria-labelledby="what-i-offer"
                  className="space-y-4 border-l-4 border-brand pl-5 sm:pl-6"
                >
                  <h3
                    id="what-i-offer"
                    className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white"
                  >
                    {t("about", "whatIOfferTitle", lang)}
                  </h3>
                  {whatIOffer.map((item, index) => (
                    <p
                      key={index}
                      className="text-gray-800 dark:text-gray-300 leading-relaxed"
                    >
                      {item}
                    </p>
                  ))}
                </article>

                <article
                  aria-labelledby="how-i-work"
                  className="space-y-4 border-l-4 border-brand pl-5 sm:pl-6"
                >
                  <h3
                    id="how-i-work"
                    className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white"
                  >
                    {t("about", "howIWorkTitle", lang)}
                  </h3>
                  {howIWork.map((item, index) => (
                    <p
                      key={index}
                      className="text-gray-800 dark:text-gray-300 leading-relaxed"
                    >
                      {item}
                    </p>
                  ))}
                </article>
              </section>

              <section aria-labelledby="tools-tech">
                <h2
                  id="tools-tech"
                  className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white"
                >
                  {t("about", "toolsHeading", lang)}
                </h2>
                <div
                  className="grid grid-cols-5 grid-rows-2 gap-6 mt-6 items-center"
                  role="list"
                  aria-label="Technologies I use"
                >
                  {techList.slice(0, 10).map(({ name, id }) => (
                    <div
                      key={id}
                      className="flex flex-col items-center text-center"
                    >
                      <img
                        src={
                          id === "zustand-custom"
                            ? "/icons/zustand.png"
                            : `https://api.iconify.design/logos/${id}.svg`
                        }
                        alt={`${name} logo`}
                        className="h-10 w-10 mb-2 object-contain"
                        loading="lazy"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="personal-intro" className="mt-20">
                <h2 id="personal-intro" className="sr-only">
                  Personal background
                </h2>
                {introParagraphs.map((text, index) => (
                  <p
                    key={index}
                    className="text-lg text-gray-800 dark:text-gray-300 mb-6 leading-relaxed"
                  >
                    {text}
                  </p>
                ))}
              </section>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
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
