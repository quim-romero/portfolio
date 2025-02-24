import { Link, NavLink } from "react-router-dom";
import { useDarkMode } from "../hooks/DarkModeContext";
import { useLanguage } from "../hooks/LanguageProvider";
import { FiSun, FiMoon } from "react-icons/fi";

const navItems = [
  { key: "home", path: "/" },
  { key: "projects", path: "/projects" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [isDark, setIsDark] = useDarkMode();

  return (
    <header className="sticky top-0 z-50 bg-light/80 dark:bg-dark/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-brand dark:text-brand-light"
        >
          Quim Romero
        </Link>

        <nav
          role="navigation"
          aria-label="Primary Navigation"
          className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm font-medium"
        >
          {navItems.map(({ key, path }) => (
            <NavLink
              key={key}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-brand"
                  : "text-text-base dark:text-text-light hover:text-black dark:hover:text-white"
              }
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </NavLink>
          ))}

          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle language"
          >
            {lang === "en" ? "🇬🇧" : "🇪🇸"}
          </button>
        </nav>
      </div>
    </header>
  );
}
