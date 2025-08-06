import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Currency } from "../../services/pricing";
import { parsePriceEUR, formatPrice } from "../../services/pricing";
import type { Pkg } from "./PackageCard";

type Lang = "es" | "en";

type Props = {
  pkg: Pkg | null;
  lang: Lang;
  currency: Currency;
  rates: Record<Currency, number>;
  labels: {
    includes: string;
    deliverables: string;
    from: string;
    close: string;
    contact: string;
  };
  onClose: () => void;
  onQuote: (pkg: Pkg) => void;
};

export default function PackageModal({
  pkg,
  lang,
  currency,
  rates,
  labels,
  onClose,
  onQuote,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pkg) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [pkg, onClose]);

  const price = pkg
    ? formatPrice(parsePriceEUR(pkg.priceFrom), currency, lang, rates)
    : "";

  return (
    <AnimatePresence>
      {pkg && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="service-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800 max-h-[85vh] overflow-y-auto"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-md focus:outline-none focus:ring-2"
              aria-label={labels.close}
            >
              ✕
            </button>

            <h3
              id="service-modal-title"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              {pkg.title}
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{pkg.desc}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {labels.from} <span className="font-semibold">{price}</span>
              <span className="mx-2">·</span>
              {pkg.timeline}
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {labels.includes}
                </h4>
                <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {pkg.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {labels.deliverables}
                </h4>
                <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {pkg.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onQuote(pkg);
                  const form = document.getElementById("contact");
                  if (form)
                    form.scrollIntoView({ behavior: "smooth", block: "start" });
                  onClose();
                }}
                className="inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold bg-brand text-black dark:text-white hover:brightness-110 transition"
              >
                {labels.contact}
              </a>
              <button
                onClick={onClose}
                className="rounded-md px-3 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {labels.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
