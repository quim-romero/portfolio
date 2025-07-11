import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import LanguageTransition from "../components/LanguageTransition";
import { Helmet } from "react-helmet-async";
import { parseMarkdown } from "../lib/loadMarkdown";
import { useLanguage } from "../hooks/LanguageProvider";

import { translations } from "../i18n/translations";
import { esBlogEntries } from "../i18n/es/blogEntries";

import portfolioDesignRaw from "../blog/portfolio-design.md?raw";
import freelanceServicesRaw from "../blog/freelance-services.md?raw";
import myProcessRaw from "../blog/my-process-from-start-to-finish.md?raw";
import whatToExpectRaw from "../blog/what-to-expect-working-with-me.md?raw";

const rawArticles = [
  { slug: "portfolio-design", raw: portfolioDesignRaw },
  { slug: "freelance-services", raw: freelanceServicesRaw },
  { slug: "my-process-from-start-to-finish", raw: myProcessRaw },
  { slug: "what-to-expect-working-with-me", raw: whatToExpectRaw },
];

export default function Blog() {
  const { lang } = useLanguage();
  const blogMeta = translations[lang].blogMeta;

  const pageTitle =
    lang === "es"
      ? "Blog | Reflexiones sobre frontend y trabajo freelance – Quim Romero"
      : "Blog | Frontend insights and freelance mindset – Quim Romero";

  const pageDescription =
    lang === "es"
      ? "Ideas, experiencias y mentalidad sobre desarrollo frontend, interfaces animadas y trabajo freelance. Artículos personales por Quim Romero."
      : "Thoughts and processes on frontend development, animated interfaces and freelance work. Blog articles by Quim Romero.";

  const articles = rawArticles.map(({ slug, raw }) => {
    if (lang === "es" && esBlogEntries[slug]) {
      const { title, description, tags, date, content } = esBlogEntries[slug];
      return {
        slug,
        meta: {
          title,
          description,
          tags: tags ?? [],
          date: date ?? "",
          content,
        },
      };
    }

    const { meta } = parseMarkdown(raw);
    return {
      slug,
      meta: {
        title: meta.title,
        description: meta.description,
        tags: meta.tags ?? [],
        date: meta.date ?? "",
      },
    };
  });

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://quimromero.com/blog" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://quimromero.com/blog" />
      </Helmet>

      <main id="main" role="main" aria-label="Quim Romero Blog Articles">
        <section className="px-6 py-24 max-w-4xl mx-auto bg-light dark:bg-dark text-text-base dark:text-text-light transition-colors duration-300">
          <LanguageTransition>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                  {blogMeta.heading}
                </h1>
                <p className="text-lg text-muted dark:text-gray-400">
                  {blogMeta.subtitle}
                </p>
              </header>

              <section aria-label="Blog posts list" className="space-y-16">
                {articles.map(({ slug, meta }, index) => (
                  <motion.article
                    key={slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                    aria-labelledby={`article-${slug}`}
                  >
                    <Link
                      to={`/blog/${slug}`}
                      className="block focus:outline-none focus:ring-2 focus:ring-brand rounded-lg"
                    >
                      {meta.tags && meta.tags.length > 0 && (
                        <div className="mb-2 text-xs text-brand tracking-widest uppercase font-semibold">
                          {meta.tags.slice(0, 2).join(" • ")}
                        </div>
                      )}

                      <h2
                        id={`article-${slug}`}
                        className="text-2xl md:text-3xl font-semibold text-text-base dark:text-white mb-2 group-hover:underline decoration-brand/40 underline-offset-4 transition-all"
                      >
                        {meta.title}
                      </h2>

                      {meta.description && (
                        <p className="text-sm md:text-base text-muted dark:text-gray-400 max-w-3xl leading-relaxed">
                          {meta.description}
                        </p>
                      )}
                    </Link>
                  </motion.article>
                ))}
              </section>
            </motion.div>
          </LanguageTransition>
        </section>
      </main>
    </Layout>
  );
}
