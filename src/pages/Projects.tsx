import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "../layout/Layout";
import { projects } from "../data/projects";
import { useDarkMode } from "../hooks/DarkModeContext";
import { t } from "../i18n/translations";
import { useLanguage } from "../hooks/LanguageProvider";
import LanguageTransition from "../components/LanguageTransition";
import { Code2, ExternalLink } from "lucide-react";
import Tilt from "react-parallax-tilt";
import MagnetButton from "../components/MagnetButton";

export default function Projects() {
  const { lang } = useLanguage();
  const [isDark] = useDarkMode();
  const theme = isDark ? "dark" : "light";

  const pageTitle =
    lang === "es"
      ? "Proyectos | Interfaces reales con React, Tailwind y animación – Quim Romero"
      : "Projects | Real-world interfaces with React, Tailwind and motion – Quim Romero";

  const pageDescription =
    lang === "es"
      ? "Explora proyectos frontend creados por Quim Romero: dashboards, micrositios e interfaces animadas construidas con React, TypeScript y animación."
      : "Explore frontend projects by Quim Romero: dashboards, microsites, and animated interfaces built with React, TypeScript, and motion design.";

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quimromero.com/projects" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/og-image.png" />
      </Helmet>

      <section
        role="region"
        aria-labelledby="projects-heading"
        className="px-6 py-24 max-w-6xl mx-auto bg-light dark:bg-dark transition-colors duration-300"
      >
        <LanguageTransition>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              id="projects-heading"
              className="text-4xl font-bold mb-4 text-text-base dark:text-text-light"
            >
              {t("projects", "heading", lang)}
            </h1>
            <p className="text-muted dark:text-gray-400 max-w-2xl mx-auto">
              {t("projects", "subheading", lang)}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <div className="grid md:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <Tilt
                  key={`${project.id}-tilt`}
                  glareEnable
                  glareMaxOpacity={0.1}
                  scale={1.02}
                  transitionSpeed={1500}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  className="rounded-2xl"
                >
                  <motion.article
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    aria-labelledby={`project-${project.id}`}
                  >
                    <div className="w-full h-56 relative overflow-hidden group">
                      <img
                        src={project.image[theme]}
                        alt={t("projectDetails", `${project.id}.title`, lang)}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 ${
                          project.id === "trackforge" ? "object-top" : ""
                        }`}
                      />
                      {project.preview && (
                        <video
                          key={`${project.id}-video-${theme}`}
                          src={project.preview[theme]}
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-hidden="true"
                          className={`absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            project.id === "trackforge" ? "object-top" : ""
                          }`}
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                        />
                      )}
                    </div>

                    <div className="p-6">
                      <h2
                        id={`project-${project.id}`}
                        className="text-2xl font-semibold mb-2 text-text-base dark:text-white"
                      >
                        {t("projectDetails", `${project.id}.title`, lang)}
                      </h2>
                      <p className="text-sm text-muted dark:text-gray-400 mb-4">
                        {t("projectDetails", `${project.id}.description`, lang)}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
                          aria-label={`View details for ${project.id}`}
                        >
                          Details
                        </Link>

                        {project.liveUrl && (
                          <MagnetButton
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-brand to-cyan-500 hover:from-cyan-500 hover:to-brand transition duration-300 shadow-md"
                            aria-label={`View ${project.id} live`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live
                          </MagnetButton>
                        )}

                        {project.githubUrl && (
                          <MagnetButton
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border border-brand text-brand dark:text-cyan-400 dark:border-cyan-400 hover:bg-brand/10 dark:hover:bg-cyan-400/10 transition duration-300"
                            aria-label={`View ${project.id} source code`}
                          >
                            <Code2 className="w-4 h-4" />
                            GitHub
                          </MagnetButton>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Tilt>
              ))}
            </div>
          </AnimatePresence>
        </LanguageTransition>
      </section>
    </Layout>
  );
}
