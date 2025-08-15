import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useLanguage } from "../hooks/LanguageProvider";
import { t } from "../i18n/translations";
import LanguageTransition from "../components/LanguageTransition";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { key: "home", path: "/" },
  { key: "projects", path: "/projects" },
  { key: "services", path: "/services" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "blog", path: "/blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();
  const { lang } = useLanguage();
  const [theme, setTheme] = useState(isDark ? "dark" : "light");

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 w-full bg-light/80 dark:bg-dark/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition-all"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
          <Link
            to="/"
            className="text-2xl font-bold text-brand dark:text-brand-light"
          >
            <span className="tracking-tight">Quim Romero</span>
          </Link>

          <nav
            role="navigation"
            aria-label="Main navigation"
            className="hidden md:flex items-center space-x-8 text-sm font-medium"
          >
            {navItems.map(({ key, path }) => (
              <NavLink
                key={key}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-brand"
                    : "text-text-base dark:text-text-light hover:text-black dark:hover:text-white transition"
                }
              >
                <LanguageTransition>
                  {t("header", `nav.${key}`, lang)}
                </LanguageTransition>
              </NavLink>
            ))}

            <div className="flex items-center space-x-2 ml-4">
              <button
                data-testid="toggle-theme"
                onClick={() => setIsDark((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                aria-label={
                  lang === "es"
                    ? "Cambiar a modo claro u oscuro"
                    : "Toggle dark mode"
                }
                type="button"
              >
                {isDark ? <FiSun /> : <FiMoon />}
              </button>

              <LanguageSwitcher />
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button
              data-testid="toggle-theme"
              onClick={() => setIsDark((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              aria-label={
                lang === "es"
                  ? "Cambiar a modo claro u oscuro"
                  : "Toggle dark mode"
              }
              type="button"
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </button>

            <LanguageSwitcher />

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="text-text-base dark:text-text-light"
              aria-label={lang === "es" ? "Menú móvil" : "Toggle mobile menu"}
              type="button"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

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
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            role="navigation"
            aria-label="Mobile navigation"
            className="
              fixed inset-x-0 top-16 z-40
              md:hidden px-6 py-4
              bg-light/95 dark:bg-dark/95
              border-t border-gray-200 dark:border-gray-800
              backdrop-blur
              shadow-lg
            "
          >
            <div className="flex flex-col items-center space-y-4 text-sm font-medium text-center">
              {navItems.map(({ key, path }) => (
                <NavLink
                  key={key}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    (isActive
                      ? "text-brand"
                      : "text-text-base dark:text-text-light hover:text-black dark:hover:text-white transition") +
                    " w-full text-center"
                  }
                >
                  <LanguageTransition>
                    {t("header", `nav.${key}`, lang)}
                  </LanguageTransition>
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
