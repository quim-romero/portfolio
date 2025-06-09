import { motion, AnimatePresence } from 'framer-motion'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.95 },
}

const ProjectModal = ({ isOpen, onClose, project }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-zinc-900 rounded-xl max-w-2xl w-full p-6 relative text-white shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-xl hover:text-muted"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-2">{project?.title}</h2>
            <p className="text-sm text-muted mb-4">{project?.category}</p>

            <img
              src={project?.thumbnail}
              alt={project?.title}
              className="w-full max-h-[340px] object-cover object-top rounded mb-4"
            />

            <p className="text-sm text-zinc-300 mb-6">{project?.description}</p>

            <div className="flex flex-wrap gap-2 text-xs mb-4">
              {project?.tech?.map((tech, index) => (
                <span key={index} className="bg-zinc-800 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={project?.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-indigo-600 transition"
              >
                Live Demo
              </a>
              <a
                href={project?.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded hover:bg-zinc-700 transition"
              >
                View Code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
