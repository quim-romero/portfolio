import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { projectDetails } from "../data/projectDetails";
import { useDarkMode } from "../hooks/DarkModeContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const [isDark] = useDarkMode();
  const theme = isDark ? "dark" : "light";

  const project = projectDetails.find((p) => p.id === id);
  if (!project) return null;

  const { title, longDescription, image, preview, tech } = project;

  return (
    <Layout>
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
      </section>
    </Layout>
  );
}
