import Layout from "../layout/Layout";
import HeroBackground from "../components/HeroBackground";
import LanguageToggle from "../components/LanguageToggle";

import { useGreeting } from "../hooks/useGreeting";
import { useLanguage } from "../hooks/LanguageProvider";

import { t } from "../i18n/translations";

export default function Home() {
  const greeting = useGreeting();
  const { lang } = useLanguage();

  return (
    <Layout>
      <main
        id="main"
        role="main"
        aria-label="Homepage hero section"
        className="relative min-h-screen flex items-center justify-center px-6 text-center bg-light dark:bg-dark text-text-base dark:text-text-light"
      >
        <section aria-labelledby="home-title">
          <div className="absolute top-6 right-6">
            <LanguageToggle />
          </div>

          <h1
            id="home-title"
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {greeting}, {t("home", "title", lang)}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t("home", "subtitle", lang)}
          </p>
        </section>

        <HeroBackground />
      </main>
    </Layout>
  );
}
