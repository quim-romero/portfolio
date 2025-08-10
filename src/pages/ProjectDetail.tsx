import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { projectDetails } from "../data/projectDetails";
import { t } from "../i18n/translations";
import { useLanguage } from "../hooks/LanguageProvider";
import { useDarkMode } from "../hooks/DarkModeContext";
import Layout from "../layout/Layout";
import LanguageTransition from "../components/LanguageTransition";
import { Code2, ExternalLink } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [isDark] = useDarkMode();
  const theme = isDark ? "dark" : "light";

  if (!id) {
    navigate("/projects");
    return null;
  }

  const title = t("projectDetails", `${id}.title`, lang);
  const description = t("projectDetails", `${id}.longDescription`, lang);
  const isValid = title !== `projectDetails.${id}.title`;

  useEffect(() => {
    if (!isValid) navigate("/projects");
  }, [isValid, navigate]);

  if (!isValid) return null;

  const project = projectDetails.find((p) => p.id === id);
  const tech = project?.tech ?? [];
  const image = project?.image?.[theme];
  const preview = project?.preview?.[theme];
  const liveUrl = project?.liveUrl;
  const githubUrl = project?.githubUrl;

  const highlights = Array.from({ length: 10 }).reduce<string[]>(
    (acc, _, i) => {
      const point = t("projectDetails", `${id}.highlights.${i}`, lang);
      if (
        typeof point === "string" &&
        point !== `projectDetails.${id}.highlights.${i}`
      ) {
        acc.push(point);
      }
      return acc;
    },
    []
  );

  const pageTitle = `${title} – Quim Romero | Frontend Developer`;
  const pageDescription = description;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://quimromero.com/projects/${id}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {image && <meta name="twitter:image" content={image} />}
      </Helmet>

      <section
        className="px-6 py-24 max-w-5xl mx-auto"
        role="main"
        aria-label={`Project details for ${title}`}
      >
        <LanguageTransition>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="text-sm text-brand hover:underline mb-6 inline-block"
              aria-label={t("projectDetails", "backToProjects", lang)}
            >
              ← {t("projectDetails", "backToProjects", lang)}
            </Link>

            <h1 className="text-4xl font-bold mb-4 text-text-base dark:text-text-light">
              {title}
            </h1>
            <p className="text-lg text-muted dark:text-gray-400 mb-6">
              {description}
            </p>

            <div
              className="flex flex-wrap gap-2 mb-8"
              role="list"
              aria-label="Technologies used"
            >
              {tech.map((techItem) => (
                <span
                  key={techItem}
                  className="bg-brand/10 dark:bg-brand/20 text-brand text-sm font-medium px-3 py-1 rounded-full"
                  role="listitem"
                >
                  {techItem}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-brand to-cyan-500 hover:from-cyan-500 hover:to-brand transition duration-300 shadow-lg"
                  aria-label={`Visit live site of ${title}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Site
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border border-brand text-brand dark:text-cyan-400 dark:border-cyan-400 hover:bg-brand/10 dark:hover:bg-cyan-400/10 transition duration-300"
                  aria-label={`View source code for ${title}`}
                >
                  <Code2 className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>

            <div className="w-full h-72 relative rounded-xl overflow-hidden shadow-md mb-10 group">
              <AnimatePresence mode="wait">
                {image && (
                  <motion.img
                    key={`${id}-img-${theme}`}
                    src={image}
                    alt={`Screenshot of ${title}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 ${
                      project?.id === "trackforge" ? "object-top" : ""
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </AnimatePresence>

              {preview && (
                <AnimatePresence mode="wait">
                  <motion.video
                    key={`${id}-video-${theme}`}
                    src={preview}
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      project?.id === "trackforge" ? "object-top" : ""
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    autoPlay
                  />
                </AnimatePresence>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-3 text-text-base dark:text-white">
              {t("projectDetails", "featuresTitle", lang)}
            </h2>
            <ul className="list-disc list-inside text-muted dark:text-gray-300 mb-10 space-y-2">
              {highlights.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mb-3 text-text-base dark:text-white">
              {t("projectDetails", "lighthouse.heading", lang)}
            </h2>

            <figure className="mb-6 relative w-full max-w-xl group overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${id}-lh-${theme}`}
                  src={`/lighthouse/${id}-${theme}.png`}
                  alt={`Lighthouse audit summary for ${title}`}
                  className="
                    w-full rounded-lg shadow-md
                    transform-gpu transition-transform duration-300 ease-out
                    group-hover:scale-105 group-focus-within:scale-105
                    will-change-transform
                  "
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement & {
                      dataset: { triedCommon?: string; triedGlobal?: string };
                    };
                    if (!el.dataset.triedCommon) {
                      el.src = `/lighthouse/${id}.png`;
                      el.dataset.triedCommon = "1";
                    } else if (!el.dataset.triedGlobal) {
                      el.src = `/lighthouse/fallback.png`;
                      el.dataset.triedGlobal = "1";
                    }
                  }}
                />
              </AnimatePresence>

              <span
                tabIndex={0}
                aria-label={t(
                  "projectDetails",
                  "lighthouse.captionPrefix",
                  lang
                )}
                className="absolute inset-0 outline-none"
              />

              <figcaption
                className="
                  pointer-events-none absolute inset-0 flex items-center justify-center
                  px-4 text-center text-white font-semibold text-sm md:text-base
                  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                  transition-opacity duration-200 bg-black/40
                "
              >
                {t("projectDetails", "lighthouse.captionPrefix", lang)}
              </figcaption>
            </figure>
          </motion.div>
        </LanguageTransition>
      </section>
    </Layout>
  );
}
