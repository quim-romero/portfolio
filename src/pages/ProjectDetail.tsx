import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { projectDetails } from "../data/projectDetails";
import { useDarkMode } from "../hooks/DarkModeContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  const [isDark] = useDarkMode();
  const theme = isDark ? "dark" : "light";
  const navigate = useNavigate();

  const project = projectDetails.find((p) => p.id === id);

  if (!id || !project) {
    navigate("/projects");
    return null;
  }

  const { title, longDescription, image, preview, tech } = project;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <section className="px-6 py-24 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-muted mb-8">{longDescription}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tech.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="rounded-xl shadow overflow-hidden mb-10">
            {preview ? (
              <video
                src={preview[theme]}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-80 object-cover"
              />
            ) : (
              <img
                src={image[theme]}
                alt={title}
                className="w-full h-80 object-cover"
              />
            )}
          </div>

          {project.highlights?.length ? (
            <>
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc list-inside text-muted mb-6 space-y-2">
                {project.highlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </>
          ) : null}

          {project.liveUrl || project.githubUrl ? (
            <div className="flex flex-wrap gap-4 mt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand text-white px-5 py-2.5 rounded-full font-medium shadow"
                >
                  Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-brand text-brand px-5 py-2.5 rounded-full font-medium hover:bg-brand/10"
                >
                  GitHub
                </a>
              )}
            </div>
          ) : null}
        </section>
      </motion.div>
    </Layout>
  );
}
