import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Currency } from "../../services/pricing";
import { formatPrice } from "../../services/pricing";
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
  const open = !!pkg;
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    if (!root) return;

    const focusable = root.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    root.addEventListener("keydown", handleTab as any);
    return () => root.removeEventListener("keydown", handleTab as any);
  }, [open]);

  if (typeof document === "undefined") return null;

  const priceLabel =
    pkg &&
    formatPrice(
      Number(pkg.priceFrom.replace(/[^\d.]/g, "")) || 0,
      currency,
      lang,
      rates
    );

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pkg-modal-title"
            className="fixed inset-0 z-[2001] flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <div
              ref={dialogRef}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-7"
            >
              <button
                onClick={onClose}
                className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2"
                aria-label={labels.close}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {pkg && (
                <>
                  <h3
                    id="pkg-modal-title"
                    className="text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                    {pkg.title}
                  </h3>

                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {pkg.desc}
                  </p>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span>
                      {labels.from}{" "}
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {priceLabel}
                      </span>
                    </span>
                    <span className="mx-1 select-none" aria-hidden="true">
                      ·
                    </span>
                    <span>{pkg.timeline}</span>
                  </p>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">{labels.includes}</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {pkg.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        {labels.deliverables}
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {pkg.deliverables.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => onQuote(pkg)}
                      className="rounded-md px-4 py-2 font-semibold bg-brand text-black dark:text-white hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      {labels.contact}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      {labels.close}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
