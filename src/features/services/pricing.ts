export type Currency = "EUR" | "USD" | "GBP" | "AUD" | "CAD" | "CHF";

export const BASE_CURRENCY: Currency = "EUR";

export const RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.1,
  GBP: 0.85,
  AUD: 1.6,
  CAD: 1.47,
  CHF: 0.98,
};

export const setRates = (next: Partial<Record<Currency, number>>) => {
  Object.assign(RATES, next);
};

export const convert = (
  amountEur: number,
  currency: Currency,
  rates: Record<Currency, number> = RATES
): number => amountEur * rates[currency];

export const formatPrice = (
  amountEur: number,
  currency: Currency,
  lang: "es" | "en" = "en",
  rates: Record<Currency, number> = RATES
): string =>
  new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(convert(amountEur, currency, rates));

export const parsePriceEUR = (label: string): number => {
  const onlyDigits = (label || "").replace(/[^\d]/g, "");
  const n = parseInt(onlyDigits, 10);
  return Number.isNaN(n) ? 0 : n;
};

export const priceLabel = (
  priceFromLabel: string,
  currency: Currency,
  lang: "es" | "en" = "en",
  rates: Record<Currency, number> = RATES
): string => formatPrice(parsePriceEUR(priceFromLabel), currency, lang, rates);
