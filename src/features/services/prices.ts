export const BASE_PRICES_EUR: Record<string, number> = {
  landing: 950,
  ecommerce: 1900,
  dashboard: 1700,
};

export const getPriceEur = (id: string): number => BASE_PRICES_EUR[id] ?? 0;

export const setBasePrice = (id: string, eur: number) => {
  BASE_PRICES_EUR[id] = eur;
};
