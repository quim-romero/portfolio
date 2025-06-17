import { motion } from 'framer-motion'
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt } from 'react-icons/fa'
import { SiTailwindcss, SiJavascript, SiTypescript, SiFramer, SiVite } from 'react-icons/si'

const techStack = [
  { name: 'React', icon: <FaReact className="text-cyan-400" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
  { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
  { name: 'Framer Motion', icon: <SiFramer className="text-pink-400" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
  { name: 'Git', icon: <FaGitAlt className="text-red-500" /> },
  { name: 'Vite', icon: <SiVite className="text-purple-400" /> },
]

const About = () => {
  return (
    <section className="min-h-screen px-6 pt-28 pb-16 max-w-4xl mx-auto bg-white dark:bg-background text-zinc-900 dark:text-foreground transition-colors duration-300">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        About Me
      </motion.h1>

      <motion.p
        className="text-muted dark:text-muted mb-10 leading-relaxed text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        I specialize in building modern, accessible interfaces focused on user experience.  
        I enjoy refining the small details that make a website feel smooth, clear, and well-structured.  
        Right now, I'm focusing on personal projects where I explore best practices in frontend development, performance, visual design, and motion.
      </motion.p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {techStack.map((tech, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center hover:scale-110 transition-transform"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-4xl mb-2">{tech.icon}</div>
            <span className="text-sm text-muted dark:text-muted">{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 text-white font-medium rounded 
            bg-primary-light hover:bg-primary-lightHover 
            dark:bg-primary dark:hover:bg-primary-dark transition"
        >
          Download CV
        </a>
      </div>
    </section>
  )
}

export default About
