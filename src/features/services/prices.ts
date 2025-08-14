export const BASE_PRICES_EUR: Record<string, number> = {
  dashboards: 3200,
  onboarding: 1900,
  "ecommerce-stripe": 2800,
  "landing-animated": 1200,
};

export const getPriceEur = (id: string): number => BASE_PRICES_EUR[id] ?? 0;

export const setBasePrice = (id: string, eur: number) => {
  BASE_PRICES_EUR[id] = eur;
};
