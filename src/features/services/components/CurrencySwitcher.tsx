import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Currency } from "../../services/pricing";
import { useLanguage } from "../../../hooks/LanguageProvider";

type Props = {
  currency: Currency;
  onChange: (next: Currency) => void;
  label: string;
  className?: string;
};

const OPTIONS: Array<{
  value: Currency;
  code: string;
  flag: string;
}> = [
  { value: "EUR", code: "EUR", flag: "🇪🇺" },
  { value: "USD", code: "USD", flag: "🇺🇸" },
  { value: "GBP", code: "GBP", flag: "🇬🇧" },
  { value: "CHF", code: "CHF", flag: "🇨🇭" },
  { value: "AUD", code: "AUD", flag: "🇦🇺" },
  { value: "CAD", code: "CAD", flag: "🇨🇦" },
];

const NAMES: Record<"en" | "es", Record<Currency, string>> = {
  en: {
    EUR: "Euro",
    USD: "US Dollar",
    GBP: "British Pound",
    CHF: "Swiss Franc",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
  },
  es: {
    EUR: "Euro",
    USD: "Dólar estadounidense",
    GBP: "Libra esterlina",
    CHF: "Franco suizo",
    AUD: "Dólar australiano",
    CAD: "Dólar canadiense",
  },
};

export default function CurrencySwitcher({
  currency,
  onChange,
  label,
  className = "",
}: Props) {
  const { lang } = useLanguage();
  const dict = lang === "es" ? NAMES.es : NAMES.en;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuId = "currency-menu";

  const current = OPTIONS.find((o) => o.value === currency) ?? OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (v: Currency) => {
    onChange(v);
    setOpen(false);
    btnRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div className="flex items-center gap-3">
        <button
          ref={btnRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          title={label}
        >
          <span className="opacity-75">{label}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            className={`transition ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M5.25 7.5l4.75 4.75L14.75 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fillRule="evenodd"
            />
          </svg>
        </button>

        <div
          className="inline-flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200"
          aria-live="polite"
        >
          <span className="text-base leading-none">{current.flag}</span>
          <span className="font-medium">{dict[current.value]}</span>
        </div>
      </div>

      {/* --- DESKTOP MENU --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={label}
            className="hidden md:block absolute z-40 md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-3 mt-2"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.16, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.98,
              transition: { duration: 0.14, ease: "easeIn" },
            }}
            style={{ transformOrigin: "left center" }}
          >
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-2 min-w-[300px]">
              <ul className="flex flex-col">
                {OPTIONS.map((opt) => {
                  const selected = opt.value === currency;
                  return (
                    <li key={opt.value}>
                      <button
                        role="menuitemradio"
                        aria-checked={selected}
                        onClick={() => choose(opt.value)}
                        className={[
                          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition",
                          selected
                            ? "bg-brand text-black dark:text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
                        ].join(" ")}
                        title={`${opt.flag} ${dict[opt.value]}`}
                      >
                        <span className="flex items-center gap-2 md:whitespace-nowrap">
                          <span className="text-base leading-none">
                            {opt.flag}
                          </span>
                          <span className="font-medium">{dict[opt.value]}</span>
                          <span className="opacity-70">· {opt.code}</span>
                        </span>
                        {selected && <span aria-hidden="true">✓</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PHONE MENU --- */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40"
          role="presentation"
          aria-hidden={!open}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl p-3">
              <div className="flex flex-col">
                {OPTIONS.map((opt) => {
                  const selected = opt.value === currency;
                  return (
                    <button
                      key={opt.value}
                      role="menuitemradio"
                      aria-checked={selected}
                      onClick={() => choose(opt.value)}
                      className={[
                        "flex items-center justify-between w-full rounded-md px-3 py-2 text-sm transition",
                        selected
                          ? "bg-brand text-black dark:text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
                      ].join(" ")}
                      title={`${opt.flag} ${dict[opt.value]}`}
                    >
                      <span className="flex items-center gap-2 md:whitespace-nowrap">
                        <span className="text-base leading-none">
                          {opt.flag}
                        </span>
                        <span className="font-medium">{dict[opt.value]}</span>
                        <span className="opacity-70">· {opt.code}</span>
                      </span>
                      {selected && <span aria-hidden="true">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
