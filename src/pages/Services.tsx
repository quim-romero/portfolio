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

import { t, tArray } from "../i18n/translations";

const canonical = "/services";

export default function Services() {
  const { lang } = useLanguage();

  // i18n texts
  const heading = t("services", "heading", lang);
  const pageTitle = t("services", "metaTitle", lang);
  const pageDescription = t("services", "metaDescription", lang);
  const intro = t("services", "intro", lang);

  const contactCta = t("services", "ctas.contact", lang);
  const emailText = t("services", "ctas.emailText", lang);

  const packagesTitle = t("services", "packagesTitle", lang);
  const fromLabel = t("services", "from", lang);

  const ui = {
    seeDetails: t("services", "ui.seeDetails", lang),
    hideDetails: t("services", "ui.hideDetails", lang),
    includes: t("services", "ui.includes", lang),
    deliverables: t("services", "ui.deliverables", lang),
    close: t("services", "ui.close", lang),
    currency: t("services", "ui.currency", lang),
    fxLastUpdate: t("services", "ui.fxLastUpdate", lang),
  };

  const [currency, setCurrency] = useState<Currency>("EUR");
  const { rates, date, loading: fxLoading } = useFxRates();

  const eurLabel = (v: number) =>
    new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  // Packages from i18n
  const i18nPackages = tArray<{
    id: string;
    title: string;
    desc: string;
    timeline: string;
    features: string[];
    deliverables: string[];
  }>("services", "packages", lang);

  const packages: Pkg[] = useMemo(() => {
    return i18nPackages.map((p) => {
      const base = getPriceEur(p.id);
      return {
        ...p,
        priceFrom: eurLabel(base),
      };
    });
  }, [i18nPackages, lang]);

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
          name: t("services", "breadcrumbHome", lang),
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
    [heading, lang]
  );

  const prepareFormForPackage = (pkg: Pkg) => {
    const form = document.getElementById(
      "services-form"
    ) as HTMLFormElement | null;
    if (!form) return;
    const baseEUR = getPriceEur(pkg.id);
    const priceView = formatPrice(baseEUR, currency, lang, rates);
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
        <html lang={lang} />
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
                  {emailText}{" "}
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
                  {packagesTitle}
                </h2>

                <div className="mb-6 flex items-center justify-between gap-3">
                  <CurrencySwitcher
                    currency={currency}
                    onChange={setCurrency}
                    label={ui.currency}
                  />
                  {date && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {ui.fxLastUpdate}: {date}
                      {fxLoading ? " …" : ""}
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-6 items-stretch">
                  {packages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      lang={lang}
                      currency={currency}
                      rates={rates}
                      labels={{
                        from: fromLabel,
                        seeDetails: ui.seeDetails,
                        contact: contactCta,
                      }}
                      onOpenDetails={(p) => {
                        setModalPkg(p);
                        trackDetailsOpen(lang, p.id, true);
                      }}
                      onQuote={(p) => {
                        prepareFormForPackage(p);
                        trackPackageCta(lang, p.id, "card");
                      }}
                    />
                  ))}
                </div>
              </section>

              <PackageModal
                pkg={modalPkg}
                lang={lang}
                currency={currency}
                rates={rates}
                labels={{
                  includes: ui.includes,
                  deliverables: ui.deliverables,
                  from: fromLabel,
                  close: ui.close,
                  contact: contactCta,
                }}
                onClose={() => {
                  if (modalPkg) trackDetailsOpen(lang, modalPkg.id, false);
                  setModalPkg(null);
                }}
                onQuote={(p) => {
                  prepareFormForPackage(p);
                  trackPackageCta(lang, p.id, "modal");
                }}
              />

              <ServicesForm
                lang={lang}
                currency={currency}
                rates={rates}
                labels={{
                  title: t("services", "formTitle", lang),
                  name: t("services", "form.name", lang),
                  email: t("services", "form.email", lang),
                  goal: t("services", "form.goal", lang),
                  budget: t("services", "form.budget", lang),
                  submit: t("services", "form.submit", lang),
                  success: t("services", "form.success", lang),
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
