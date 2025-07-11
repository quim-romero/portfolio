import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import MarkdownIt from "markdown-it";

import Layout from "../layout/Layout";
import LanguageTransition from "../components/LanguageTransition";
import { useLanguage } from "../hooks/LanguageProvider";
import { parseMarkdown } from "../lib/loadMarkdown";
import { t } from "../i18n/translations";

import { esBlogEntries } from "../i18n/es/blogEntries";

import portfolioDesignRaw from "../blog/portfolio-design.md?raw";
import freelanceServicesRaw from "../blog/freelance-services.md?raw";
import myProcessRaw from "../blog/my-process-from-start-to-finish.md?raw";
import whatToExpectRaw from "../blog/what-to-expect-working-with-me.md?raw";

const articleMap: Record<string, string> = {
  "portfolio-design": portfolioDesignRaw,
  "freelance-services": freelanceServicesRaw,
  "my-process-from-start-to-finish": myProcessRaw,
  "what-to-expect-working-with-me": whatToExpectRaw,
};

const md = new MarkdownIt();

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();

  if (!slug) return null;

  // Spanish
  if (lang === "es") {
    const articleEs = esBlogEntries[slug];
    if (articleEs && articleEs.content) {
      const html = md.render(articleEs.content);
      return (
        <Layout>
          <Helmet>
            <html lang="es" />
            <title>{articleEs.title} | Blog – Quim Romero</title>
            <meta name="description" content={articleEs.description} />
            <meta name="robots" content="index, follow" />
            <meta
              property="og:title"
              content={`${articleEs.title} | Blog – Quim Romero`}
            />
            <meta property="og:description" content={articleEs.description} />
            <meta property="og:type" content="article" />
            <meta
              property="og:url"
              content={`https://quimromero.com/blog/${slug}`}
            />
            <meta property="og:image" content="/og-image.png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content={`${articleEs.title} | Blog – Quim Romero`}
            />
            <meta name="twitter:description" content={articleEs.description} />
            <meta name="twitter:image" content="/og-image.png" />
            <link
              rel="canonical"
              href={`https://quimromero.com/blog/${slug}`}
            />
          </Helmet>

          <main
            id="main"
            role="main"
            aria-label={`Artículo del blog: ${articleEs.title}`}
          >
            <section className="relative py-24 px-6 max-w-3xl mx-auto bg-light dark:bg-dark text-text-base dark:text-text-light transition-colors duration-300 overflow-hidden">
              <LanguageTransition>
                <motion.article
                  role="article"
                  aria-labelledby="article-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="prose lg:prose-lg dark:prose-invert max-w-none"
                >
                  <header className="mb-12">
                    <Link
                      to="/blog"
                      className="text-sm text-brand hover:underline mb-4 inline-block"
                      aria-label={t("article", "backToBlog", lang)}
                    >
                      ← {t("article", "backToBlog", lang)}
                    </Link>
                    <h1
                      id="article-title"
                      className="text-4xl font-bold text-gray-900 dark:text-white"
                    >
                      {articleEs.title}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Publicado el{" "}
                      <time dateTime={articleEs.date}>
                        {new Date(articleEs.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </p>
                  </header>

                  <section aria-label="Contenido del artículo">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </section>
                </motion.article>
              </LanguageTransition>
            </section>
          </main>
        </Layout>
      );
    }
  }

  // English
  const raw = articleMap[slug];
  if (!raw) return null;

  const { html, meta } = parseMarkdown(raw);

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>{meta.title} | Blog – Quim Romero</title>
        <meta name="description" content={meta.description} />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={`${meta.title} | Blog – Quim Romero`}
        />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://quimromero.com/blog/${slug}`}
        />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${meta.title} | Blog – Quim Romero`}
        />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href={`https://quimromero.com/blog/${slug}`} />
      </Helmet>

      <main id="main" role="main" aria-label={`Blog article: ${meta.title}`}>
        <section className="relative py-24 px-6 max-w-3xl mx-auto bg-light dark:bg-dark text-text-base dark:text-text-light transition-colors duration-300 overflow-hidden">
          <LanguageTransition>
            <motion.article
              role="article"
              aria-labelledby="article-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose lg:prose-lg dark:prose-invert max-w-none"
            >
              <header className="mb-12">
                <Link
                  to="/blog"
                  className="text-sm text-brand hover:underline mb-4 inline-block"
                  aria-label={t("article", "backToBlog", lang)}
                >
                  ← {t("article", "backToBlog", lang)}
                </Link>
                <h1
                  id="article-title"
                  className="text-4xl font-bold text-gray-900 dark:text-white"
                >
                  {meta.title}
                </h1>
                {meta.date && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Published on{" "}
                    <time dateTime={meta.date}>
                      {new Date(meta.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </p>
                )}
              </header>

              <section aria-label="Article content">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </section>
            </motion.article>
          </LanguageTransition>
        </section>
      </main>
    </Layout>
  );
}
