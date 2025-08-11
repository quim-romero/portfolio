import CountryFlag from "react-country-flag";
import { useLanguage } from "../hooks/LanguageProvider";

export default function LanguageSwitcher({
  className = "",
  size = 22,
}: {
  className?: string;
  size?: number;
}) {
  const { lang, setLang } = useLanguage();

  const nextLang = lang === "en" ? "es" : "en";
  const currentCode = lang === "en" ? "GB" : "ES";
  const label = lang === "es" ? "Cambiar idioma" : "Switch language";
  const title = lang === "es" ? "Cambiar a inglés" : "Switch to Spanish";

  const onToggle = () => setLang(nextLang as typeof lang);

  return (
    <button
      data-testid="toggle-language"
      onClick={onToggle}
      className={[
        "inline-flex items-center justify-center rounded-full",
        "p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition",
        className,
      ].join(" ")}
      aria-label={label}
      title={title}
      type="button"
    >
      <CountryFlag
        countryCode={currentCode}
        svg
        aria-label={currentCode}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: "1",
          borderRadius: "9999px",
          display: "block",
        }}
      />
    </button>
  );
}
