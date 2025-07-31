import React from "react";
import type { Currency } from "../../services/pricing";

type Lang = "es" | "en";

type Props = {
  currency: Currency;
  onChange: (next: Currency) => void;
  lang: Lang;
  className?: string;
};

const LABELS: Record<Lang, { label: string }> = {
  es: { label: "Moneda" },
  en: { label: "Currency" },
};

const OPTIONS: Array<{ value: Currency; text: string }> = [
  { value: "EUR", text: "EUR (€)" },
  { value: "USD", text: "USD ($)" },
  { value: "GBP", text: "GBP (£)" },
  { value: "AUD", text: "AUD (A$)" },
];

export default function CurrencySwitcher({
  currency,
  onChange,
  lang,
  className = "",
}: Props) {
  const id = "currency-switcher";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <label htmlFor={id} className="text-sm text-gray-600 dark:text-gray-400">
        {LABELS[lang].label}:
      </label>

      <select
        id={id}
        value={currency}
        onChange={(e) => onChange(e.target.value as Currency)}
        className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
        aria-label={LABELS[lang].label}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
}
