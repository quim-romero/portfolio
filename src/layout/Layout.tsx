import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDarkMode } from "../hooks/DarkModeContext";

export default function Layout({ children }: { children: ReactNode }) {
  const [isDark] = useDarkMode();
  const [theme, setTheme] = useState(isDark ? "dark" : "light");

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="relative min-h-screen flex flex-col transition-colors duration-300 bg-light dark:bg-dark text-text-base dark:text-text-light">
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 pointer-events-none bg-light dark:bg-dark"
        />
      </AnimatePresence>
    </div>
  );
}
