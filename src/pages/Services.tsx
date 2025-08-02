import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../layout/Layout";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { motion } from "framer-motion";
import { t, tArray } from "../i18n/translations";

import CurrencySwitcher from "../features/services/components/CurrencySwitcher";
import PackageCard from "../features/services/components/PackageCard";
import type { Pkg } from "../features/services/components/PackageCard";
import PackageModal from "../features/services/components/PackageModal";
import ServicesForm from "../features/services/components/ServicesForm";

import type { Currency } from "../features/services/pricing";
import { parsePriceEUR, formatPrice } from "../features/services/pricing";

import {
  trackPageView,
  trackEmailClick,
  trackPackageCta,
  trackDetailsOpen,
  trackStickyCta,
} from "../features/services/analytics";

import { stampHiddenFields } from "../features/services/email";

const canonical = "/services";

export default function Services() {
  const { lang } = useLanguage();
  const heading = t("services", "heading", lang);
  const pageTitle =
    lang === "es"
      ? "Servicios — Quim Romero (Frontend)"
      : "Services — Quim Romero (Frontend)";
  const pageDescription = t("services", "metaDescription", lang);

  const intro = t("services", "intro", lang);
  const ctas = {
    contact: t("services", "ctas.contact", lang),
    emailText: t("services", "ctas.emailText", lang),
  };

  const packages = tArray<Pkg>("services", "packages", lang);

  const [currency, setCurrency] = useState<Currency>("EUR");

  const [modalPkg, setModalPkg] = useState<Pkg | null>(null);

  useEffect(() => {
    trackPageView(lang, canonical);
  }, [lang]);

  const offerCatalog = useMemo(() => {
    return packages.map((p) => {
      const priceEUR = parsePriceEUR(p.priceFrom);
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
      name:
        lang === "es"
          ? "Quim Romero — Desarrollo Frontend"
          : "Quim Romero — Frontend Development",
      url: `https://quimromero.com${canonical}`,
      areaServed: "Remote",
      serviceType: "Web Development",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Frontend Packages",
        itemListElement: offerCatalog,
      },
    }),
    [lang, offerCatalog]
  );

  const breadcrumbSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "es" ? "Inicio" : "Home",
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
    [lang, heading]
  );

  const labels = {
    from: t("services", "from", lang),
    seeDetails: lang === "es" ? "Ver detalles" : "See details",
    includes: lang === "es" ? "Incluye" : "Includes",
    deliverables: lang === "es" ? "Entregables" : "Deliverables",
    close: lang === "es" ? "Cerrar" : "Close",
  };

  const prepareFormForPackage = (pkg: Pkg) => {
    const form = document.getElementById(
      "services-form"
    ) as HTMLFormElement | null;
    if (!form) return;
    const baseEUR = parsePriceEUR(pkg.priceFrom);
    const priceView = formatPrice(baseEUR, currency, lang);
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

              <CurrencySwitcher
                currency={currency}
                onChange={setCurrency}
                lang={lang}
                className="mb-4"
              />

              <section id="packages" aria-labelledby="packages-title">
                <h2
                  id="packages-title"
                  className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"
                >
                  {t("services", "packagesTitle", lang)}
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      lang={lang}
                      currency={currency}
                      labels={{
                        from: labels.from,
                        seeDetails: labels.seeDetails,
                        contact: ctas.contact,
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
                labels={{
                  includes: labels.includes,
                  deliverables: labels.deliverables,
                  from: labels.from,
                  close: labels.close,
                  contact: ctas.contact,
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
                labels={{
                  title: t("services", "formTitle", lang),
                  name: t("services", "form.name", lang),
                  email: t("services", "form.email", lang),
                  goal: t("services", "form.goal", lang),
                  budget: t("services", "form.budget", lang),
                  budgetOptions: tArray("services", "form.budgetOptions", lang),
                  submit: t("services", "form.submit", lang),
                  success: t("services", "form.success", lang),
                }}
                hiddenDefaults={{ page: canonical, package: "" }}
                className="mt-16"
              />
            </motion.div>
          </LanguageTransition>
        </section>

        <div className="md:hidden fixed bottom-4 inset-x-0 px-6 pointer-events-none">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const form = document.getElementById("contact");
              if (form)
                form.scrollIntoView({ behavior: "smooth", block: "start" });
              trackStickyCta(lang);
            }}
            className="pointer-events-auto block w-full text-center rounded-xl px-5 py-3 font-semibold bg-brand text-black dark:text-white shadow-lg hover:brightness-110 transition"
          >
            {ctas.contact}
          </a>
        </div>
      </main>
    </Layout>
  );
}
