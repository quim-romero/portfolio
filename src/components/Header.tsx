import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useLanguage } from "../hooks/LanguageProvider";
import { t } from "../i18n/translations";
import LanguageTransition from "../components/LanguageTransition";

const navItems = [
  { key: "home", path: "/" },
  { key: "projects", path: "/projects" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "blog", path: "/blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();
  const { lang, setLang } = useLanguage();
  const [theme, setTheme] = useState(isDark ? "dark" : "light");

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  const toggleLang = () => setLang(lang === "en" ? "es" : "en");

  return (
    <header
      role="banner"
      className="relative sticky top-0 z-50 bg-light/80 dark:bg-dark/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition-all overflow-hidden"
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
              onClick={() => setIsDark((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              aria-label={
                lang === "es"
                  ? "Cambiar a modo claro u oscuro"
                  : "Toggle dark mode"
              }
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </button>

            <button
              onClick={toggleLang}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              aria-label={lang === "es" ? "Cambiar idioma" : "Switch language"}
            >
              <span className="text-xl">{lang === "en" ? "🇬🇧" : "🇪🇸"}</span>
            </button>
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label={
              lang === "es"
                ? "Cambiar a modo claro u oscuro"
                : "Toggle dark mode"
            }
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          <button
            onClick={toggleLang}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label={lang === "es" ? "Cambiar idioma" : "Switch language"}
          >
            <span className="text-xl">{lang === "en" ? "🇬🇧" : "🇪🇸"}</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text-base dark:text-text-light"
            aria-label={lang === "es" ? "Menú móvil" : "Toggle mobile menu"}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="md:hidden px-6 py-4 bg-light dark:bg-dark border-t border-gray-200 dark:border-gray-800"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-4 text-sm font-medium">
              {navItems.map(({ key, path }) => (
                <NavLink
                  key={key}
                  to={path}
                  onClick={() => setMenuOpen(false)}
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
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

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
  );
}
