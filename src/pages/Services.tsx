import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../layout/Layout";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { motion } from "framer-motion";

import CurrencySwitcher from "../features/services/components/CurrencySwitcher";
import PackageCard from "../features/services/components/PackageCard";
import PackageModal from "../features/services/components/PackageModal";
import ServicesForm from "../features/services/components/ServicesForm";

import type { Currency } from "../features/services/pricing";
import { formatPrice } from "../features/services/pricing";
import type { Pkg } from "../features/services/components/PackageCard";

import {
  trackPageView,
  trackEmailClick,
  trackPackageCta,
  trackDetailsOpen,
} from "../features/services/analytics";

import { stampHiddenFields } from "../lib/email";
import { useFxRates } from "../features/services/fx";
import { getPriceEur } from "../features/services/prices";

const canonical = "/services";

export default function Services() {
  const { lang } = useLanguage();

  const heading = "Services — SaaS & Business Tools";
  const pageTitle = "Services — Quim Romero (SaaS & Business Tools)";
  const pageDescription =
    "Development of Dashboards & Internal Tools, Multi‑step Onboarding Apps, Stripe E‑commerce, and premium animated Landing Pages.";

  const intro =
    "I build business‑oriented web applications: dashboards & internal tools, advanced multi‑step forms, lightweight Stripe shops, and premium animated landing pages. Fast delivery, clean code, and polished UX.";

  const ctas = {
    contact: "Get a quote",
    emailText: "Have a project? Email me at",
  };

  const [currency, setCurrency] = useState<Currency>("EUR");
  const { rates, date, loading: fxLoading } = useFxRates();

  const eurLabel = (v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  const basePackages: Array<Omit<Pkg, "priceFrom">> = useMemo(() => {
    return [
      {
        id: "dashboards",
        title: "SaaS Dashboards / Internal Tools",
        desc: "Admin dashboards and internal tools with authentication, data management, and charts. Ideal for SMEs and startups needing to see and act on their data.",
        timeline: "Typical delivery: 2–3 weeks",
        features: [
          "Authentication and basic roles",
          "Core entities CRUD",
          "Charts (Chart.js/Recharts)",
          "Filters & search",
          "Responsive & accessible UI",
        ],
        deliverables: [
          "Operational dashboard + usage guide",
          "Source code & deployment",
          "1 revision round included",
        ],
      },
      {
        id: "onboarding",
        title: "Onboarding Apps / Multi‑step Forms",
        desc: "Advanced intake forms for clients or employees: steps, Zod validation, state persistence, and file uploads.",
        timeline: "Typical delivery: ~2 weeks",
        features: [
          "React Hook Form + Zod validation",
          "State persistence (Zustand)",
          "File uploads with previews",
          "Final review screen + submit",
          "Light/Dark theme",
        ],
        deliverables: [
          "Production‑ready multi‑step flow",
          "Source code & deployment",
          "1 revision round included",
        ],
      },
      {
        id: "ecommerce-stripe",
        title: "Lightweight E‑commerce with Stripe",
        desc: "Stripe checkout (test/production), a lightweight catalog and email confirmations for a smooth buying experience.",
        timeline: "Typical delivery: 2–3 weeks",
        features: [
          "Stripe Checkout (test & live)",
          "Catalog & product detail",
          "Simple cart",
          "Validated contact form",
          "Fast, responsive UI",
        ],
        deliverables: [
          "Functional shop with Stripe",
          "Source code & deployment",
          "1 revision round included",
        ],
      },
      {
        id: "landing-animated",
        title: "Premium animated landing pages",
        desc: "Conversion‑oriented landing page with animations (Framer Motion/GSAP), accessible and SEO‑ready.",
        timeline: "Typical delivery: 5–7 days",
        features: [
          "UX sections + base copy",
          "Animations & transitions",
          "Forms & basic tracking",
          "Basic SEO meta & OpenGraph",
          "Responsive design",
        ],
        deliverables: [
          "Deployed landing ready for campaigns",
          "Source code",
          "1 revision round included",
        ],
      },
    ];
  }, []);

  const packages: Pkg[] = useMemo(() => {
    return basePackages.map((p) => {
      const base = getPriceEur(p.id);
      return {
        ...p,
        priceFrom: eurLabel(base),
      };
    });
  }, [basePackages]);

  const [modalPkg, setModalPkg] = useState<Pkg | null>(null);

  useEffect(() => {
    trackPageView(lang, canonical);
  }, [lang]);

  // Schema.org (service catalog)
  const offerCatalog = useMemo(() => {
    return packages.map((p) => {
      const priceEUR = getPriceEur(p.id);
      const offer: any = {
        "@type": "Offer",
        priceCurrency: "EUR",
        url: `https://quimromero.com${canonical}#${p.id}`,
      };
      if (priceEUR > 0) offer.price = priceEUR;
      return {
        "@type": "Service",
        name: p.title,
        description: p.desc,
        offers: offer,
      };
    });
  }, [packages]);

  const professionalServiceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Quim Romero — SaaS & Business Tools",
      url: `https://quimromero.com${canonical}`,
      areaServed: "Remote",
      serviceType: "Web Development",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SaaS & Business Tools Services",
        itemListElement: offerCatalog,
      },
    }),
    [offerCatalog]
  );

  const breadcrumbSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://quimromero.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: heading,
          item: `https://quimromero.com${canonical}`,
        },
      ],
    }),
    [heading]
  );

  const prepareFormForPackage = (pkg: Pkg) => {
    const form = document.getElementById(
      "services-form"
    ) as HTMLFormElement | null;
    if (!form) return;
    const baseEUR = getPriceEur(pkg.id);
    const priceView = formatPrice(baseEUR, currency, "en", rates);
    stampHiddenFields(form, {
      package: pkg.id,
      price_eur: String(baseEUR),
      price_view: priceView,
      currency,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://quimromero.com${canonical}`}
        />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href={`https://quimromero.com${canonical}`} />
        <script type="application/ld+json">
          {JSON.stringify(professionalServiceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <main id="main" role="main" aria-label={`${heading} page content`}>
        <section className="relative py-24 px-6 max-w-6xl mx-auto">
          <LanguageTransition>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <header className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {heading}
                </h1>
                <p className="mt-4 text-lg text-gray-800 dark:text-gray-300 max-w-3xl">
                  {intro}
                </p>
                <p className="mt-3 text-gray-700 dark:text-gray-400">
                  {ctas.emailText}{" "}
                  <a
                    href="mailto:quim@quimromero.com"
                    className="text-brand font-medium hover:underline"
                    onClick={() => trackEmailClick(lang)}
                  >
                    quim@quimromero.com
                  </a>
                  .
                </p>
              </header>

              <section id="packages" aria-labelledby="packages-title">
                <h2
                  id="packages-title"
                  className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white"
                >
                  Services
                </h2>

                <div className="mb-6 flex items-center justify-between gap-3">
                  <CurrencySwitcher
                    currency={currency}
                    onChange={setCurrency}
                    label={"Currency"}
                  />
                  {date && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Last update: {date}
                      {fxLoading ? " …" : ""}
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-6 items-stretch">
                  {packages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      lang={"en"}
                      currency={currency}
                      rates={rates}
                      labels={{
                        from: "From",
                        seeDetails: "See details",
                        contact: ctas.contact,
                      }}
                      onOpenDetails={(p) => {
                        setModalPkg(p);
                        trackDetailsOpen("en", p.id, true);
                      }}
                      onQuote={(p) => {
                        prepareFormForPackage(p);
                        trackPackageCta("en", p.id, "card");
                      }}
                    />
                  ))}
                </div>
              </section>

              <PackageModal
                pkg={modalPkg}
                lang={"en"}
                currency={currency}
                rates={rates}
                labels={{
                  includes: "Includes",
                  deliverables: "Deliverables",
                  from: "From",
                  close: "Close",
                  contact: ctas.contact,
                }}
                onClose={() => {
                  if (modalPkg) trackDetailsOpen("en", modalPkg.id, false);
                  setModalPkg(null);
                }}
                onQuote={(p) => {
                  prepareFormForPackage(p);
                  trackPackageCta("en", p.id, "modal");
                }}
              />

              <ServicesForm
                lang={"en"}
                currency={currency}
                rates={rates}
                labels={{
                  title: "Tell me about your project",
                  name: "Name",
                  email: "Email",
                  goal: "Goal",
                  budget: "Budget",
                  submit: "Send",
                  success: "Thanks! I’ll get back to you shortly.",
                }}
                budgetBandsEUR={[1000, 3000, 6000, 10000]}
                hiddenDefaults={{ page: canonical }}
                className="mt-16"
              />
            </motion.div>
          </LanguageTransition>
        </section>
      </main>
    </Layout>
  );
}
