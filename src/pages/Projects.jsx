import projects from '../projects/data'
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  return (
    <section className="min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-muted mb-10">A selection of work I've crafted with care.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
