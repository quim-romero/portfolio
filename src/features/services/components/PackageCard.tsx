import type { Currency } from "../../services/pricing";
import { parsePriceEUR, formatPrice } from "../../services/pricing";

type Lang = "es" | "en";

export type Pkg = {
  id: string;
  title: string;
  desc: string;
  priceFrom: string;
  timeline: string;
  features: string[];
  deliverables: string[];
};

type Props = {
  pkg: Pkg;
  lang: Lang;
  currency: Currency;
  rates: Record<Currency, number>;
  labels: {
    from: string;
    seeDetails: string;
    contact: string;
  };
  onOpenDetails: (pkg: Pkg) => void;
  onQuote: (pkg: Pkg) => void;
  className?: string;
};

export default function PackageCard({
  pkg,
  lang,
  currency,
  rates,
  labels,
  onOpenDetails,
  onQuote,
  className = "",
}: Props) {
  const amountEur = parsePriceEUR(pkg.priceFrom);
  const priceLabel = formatPrice(amountEur, currency, lang, rates);

  return (
    <article
      id={pkg.id}
      className={[
        "h-full flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800",
        "bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-shadow",
        className,
      ].join(" ")}
      aria-labelledby={`${pkg.id}-title`}
    >
      <header>
        <h3
          id={`${pkg.id}-title`}
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          {pkg.title}
        </h3>
      </header>

      <div className="mt-3 flex flex-col gap-4 grow">
        <p className="text-gray-700 dark:text-gray-300">{pkg.desc}</p>

        <p
          className="mt-auto text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
          aria-label={
            lang === "es"
              ? `Precio desde ${priceLabel}. ${pkg.timeline}`
              : `Price from ${priceLabel}. ${pkg.timeline}`
          }
        >
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

        <div className="pt-1 flex gap-3">
          <button
            type="button"
            onClick={() => onOpenDetails(pkg)}
            className="rounded-md px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            aria-label={
              lang === "es"
                ? `Ver detalles de ${pkg.title}`
                : `See details for ${pkg.title}`
            }
          >
            {labels.seeDetails}
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onQuote(pkg);
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center rounded-md px-4 py-2 font-semibold bg-brand text-black dark:text-white hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label={
              lang === "es"
                ? `Pedir presupuesto para ${pkg.title}`
                : `Request a quote for ${pkg.title}`
            }
          >
            {labels.contact}
          </a>
        </div>
      </div>
    </article>
  );
}
