import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../layout/Layout";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { motion } from "framer-motion";
import { t, tArray } from "../i18n/translations";

type Pkg = {
  id: string;
  title: string;
  desc: string;
  priceFrom: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const track = (event: string, data?: Record<string, unknown>) => {
  window?.dataLayer?.push({ event, ...data });
};

export default function Services() {
  const { lang } = useLanguage();
  const pageTitle =
    lang === "es"
      ? "Servicios — Quim Romero (Frontend)"
      : "Services — Quim Romero (Frontend)";
  const canonical = lang === "es" ? "/servicios" : "/services";
  const pageDescription = t("services", "metaDescription", lang);

  const intro = t("services", "intro", lang);
  const heading = t("services", "heading", lang);
  const packages = tArray<Pkg>("services", "packages", lang);
  const formLabels = {
    name: t("services", "form.name", lang),
    email: t("services", "form.email", lang),
    goal: t("services", "form.goal", lang),
    budget: t("services", "form.budget", lang),
    budgetOptions: tArray<string>("services", "form.budgetOptions", lang),
    submit: t("services", "form.submit", lang),
    success: t("services", "form.success", lang),
  };
  const ctas = {
    contact: t("services", "ctas.contact", lang),
    emailText: t("services", "ctas.emailText", lang),
  };

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const normalizedOffers = useMemo(() => {
    return packages.map((p) => {
      const digits = (p.priceFrom || "").replace(/[^\d.,]/g, "");
      const normalized = digits.replace(",", ".");
      const numeric = parseFloat(normalized);
      const base: any = {
        "@type": "Offer",
        priceCurrency: "EUR",
        url: `https://quimromero.com${canonical}#${p.id}`,
      };
      if (!Number.isNaN(numeric) && numeric > 0) {
        base.price = numeric;
      }
      return {
        "@type": "Service",
        name: p.title,
        description: p.desc,
        offers: base,
      };
    });
  }, [packages, canonical]);

  const professionalServiceSchema = {
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
      itemListElement: normalizedOffers,
    },
  };

  const breadcrumbSchema = {
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
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSending(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      goal: String(form.get("goal") || ""),
      budget: String(form.get("budget") || ""),
    };

    await new Promise((r) => setTimeout(r, 500));

    track("services_form_submit", { lang, ...payload });
    setSending(false);
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
  };

  const onEmailClick = () => {
    track("services_email_click", { lang });
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
              <header className="mb-8">
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
                    onClick={onEmailClick}
                  >
                    quim@quimromero.com
                  </a>
                  .
                </p>
              </header>

              <section id="paquetes" aria-labelledby="packages">
                <h2
                  id="packages"
                  className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"
                >
                  {t("services", "packagesTitle", lang)}
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <article
                      id={pkg.id}
                      key={pkg.id}
                      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {pkg.title}
                      </h3>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">
                        {pkg.desc}
                      </p>

                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        {t("services", "from", lang)}{" "}
                        <span className="font-semibold">{pkg.priceFrom}</span>
                      </div>

                      <div className="mt-6">
                        <a
                          href="#contacto"
                          onClick={() =>
                            track("services_package_cta_click", {
                              lang,
                              package: pkg.id,
                            })
                          }
                          className="inline-flex items-center justify-center w-full rounded-md px-4 py-2 font-semibold bg-brand text-black dark:text-white hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          {ctas.contact}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="contacto"
                aria-labelledby="contact-form"
                className="mt-16"
              >
                <h2
                  id="contact-form"
                  className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"
                >
                  {t("services", "formTitle", lang)}
                </h2>

                <form
                  className="grid md:grid-cols-2 gap-6"
                  onSubmit={onSubmit}
                  noValidate
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {formLabels.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {formLabels.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col">
                    <label
                      htmlFor="goal"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {formLabels.goal}
                    </label>
                    <textarea
                      id="goal"
                      name="goal"
                      required
                      rows={5}
                      className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="budget"
                      className="text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {formLabels.budget}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      className="mt-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
                    >
                      <option value="" disabled selected hidden>
                        —
                      </option>
                      {formLabels.budgetOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center rounded-md px-5 py-3 font-semibold bg-brand text-black dark:text-white hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
                    >
                      {sending ? "…" : formLabels.submit}
                    </button>
                    <span
                      role="status"
                      aria-live="polite"
                      className="ml-4 text-sm text-green-600 dark:text-green-400"
                    >
                      {sent ? formLabels.success : ""}
                    </span>
                  </div>
                </form>
              </section>
            </motion.div>
          </LanguageTransition>
        </section>
      </main>
    </Layout>
  );
}
