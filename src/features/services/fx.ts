import { useEffect, useState, useCallback } from "react";
import type { Currency } from "./pricing";

const FX_ENDPOINT =
  "https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD,GBP,AUD";
const STORAGE_KEY = "fx.v1";
const MAX_AGE_MS = 1000 * 60 * 60 * 18;

const DEFAULT_RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.1,
  GBP: 0.85,
  AUD: 1.6,
};

export type FxSnapshot = {
  base: "EUR";
  date: string;
  rates: Record<Exclude<Currency, "EUR">, number>;
  savedAt: number;
};

function loadSnapshot(): FxSnapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const snap = JSON.parse(raw) as FxSnapshot;
    if (!snap?.rates) return null;
    return snap;
  } catch {
    return null;
  }
}

function saveSnapshot(snap: FxSnapshot) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
  } catch {}
}

function isFresh(snap: FxSnapshot): boolean {
  return Date.now() - snap.savedAt < MAX_AGE_MS;
}

async function fetchFx(): Promise<FxSnapshot> {
  const res = await fetch(FX_ENDPOINT, { cache: "no-store" });
  if (!res.ok) throw new Error(`fx_fetch_failed_${res.status}`);
  const json = (await res.json()) as {
    base: string;
    date: string;
    rates: Record<string, number>;
  };
  const rates = {
    USD: json.rates["USD"],
    GBP: json.rates["GBP"],
    AUD: json.rates["AUD"],
  } as FxSnapshot["rates"];

  return {
    base: "EUR",
    date: json.date,
    rates,
    savedAt: Date.now(),
  };
}

// --- Public API ---
export function useFxRates() {
  const [rates, setRates] = useState<Record<Currency, number>>(DEFAULT_RATES);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apply = useCallback((snap: FxSnapshot) => {
    setRates({
      EUR: 1,
      USD: snap.rates.USD ?? DEFAULT_RATES.USD,
      GBP: snap.rates.GBP ?? DEFAULT_RATES.GBP,
      AUD: snap.rates.AUD ?? DEFAULT_RATES.AUD,
    });
    setDate(snap.date);
  }, []);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const snap = await fetchFx();
      saveSnapshot(snap);
      apply(snap);
    } catch (e: any) {
      setError(e?.message || "fx_fetch_failed");
    } finally {
      setLoading(false);
    }
  }, [apply]);

  useEffect(() => {
    const cached = loadSnapshot();
    if (cached) {
      apply(cached);
      setLoading(false);
      if (!isFresh(cached)) {
        refresh();
      }
    } else {
      refresh();
    }
  }, []);

  return { rates, date, loading, error, refresh };
}

export function toCurrencyRecord(
  snap: FxSnapshot | null | undefined
): Record<Currency, number> {
  if (!snap) return DEFAULT_RATES;
  return {
    EUR: 1,
    USD: snap.rates.USD ?? DEFAULT_RATES.USD,
    GBP: snap.rates.GBP ?? DEFAULT_RATES.GBP,
    AUD: snap.rates.AUD ?? DEFAULT_RATES.AUD,
  };
}
