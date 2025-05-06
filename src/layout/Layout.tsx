import type { ReactNode } from "react";
import Header from "../components/Header";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";

export default function Layout({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-light text-text-base dark:bg-dark dark:text-text-light transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-brand text-white px-4 py-2 rounded"
      >
        Skip to content
      </a>

      <LanguageTransition lang={lang} />

      <Header />
      <main id="main" role="main" className="relative z-10 flex-grow">
        {children}
      </main>
    </div>
  );
}
