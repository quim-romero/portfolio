import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted mb-4">{project.category}</p>
        <div className="flex justify-between items-center text-sm">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Live Demo
          </a>
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:underline">
            Code
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
