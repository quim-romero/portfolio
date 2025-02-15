import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import Layout from '../layout/Layout';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return null;

  return (
    <Layout>
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-muted mb-6">{project.description}</p>
        <img src={project.image.light} alt={project.title} className="rounded-xl shadow-md" />
      </section>
    </Layout>
  );
}
