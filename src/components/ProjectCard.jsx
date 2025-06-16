const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-48 object-cover object-top"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted dark:text-muted mb-4">{project.category}</p>

        <div className="flex gap-4 mt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-indigo-600 transition"
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            onClick={(e) => e.stopPropagation()}
          >
            View Code
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
