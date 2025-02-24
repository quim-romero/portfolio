import Layout from "../layout/Layout";
import { projects } from "../data/projects";
import { useDarkMode } from "../hooks/DarkModeContext";
import { Link } from "react-router-dom";

export default function Projects() {
  const [isDark] = useDarkMode();
  const theme = isDark ? "dark" : "light";

  return (
    <Layout>
      <main id="main" role="main" aria-label="Projects page section">
        <section
          aria-labelledby="projects-heading"
          className="px-6 py-24 max-w-6xl mx-auto"
        >
          <h1
            id="projects-heading"
            className="text-4xl font-bold mb-10 text-center"
          >
            Projects
          </h1>
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-10">
              {projects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  className="block group"
                  key={project.id}
                >
                  <article className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="w-full h-56 relative group overflow-hidden">
                      <img
                        src={project.image[theme]}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <video
                        src={project.preview[theme]}
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold mb-2">
                        {project.title}
                      </h2>
                      <p className="text-sm text-muted dark:text-gray-400 mb-4">
                        {project.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center">
              Coming soon: a curated selection of real-world frontend builds.
            </p>
          )}
        </section>
      </main>
    </Layout>
  );
}
