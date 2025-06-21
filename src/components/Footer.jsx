import { Link, useLocation } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <footer
      className={`
        mt-16 border-t text-sm transition-colors duration-300
        ${isHome
          ? 'border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md'
          : 'border-zinc-200 dark:border-zinc-800'}
        text-zinc-600 dark:text-zinc-400
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Quim Romero. All rights reserved.</p>
        </div>

        <nav className="flex flex-col md:flex-row gap-4 items-center">
          <Link to="/projects" className="hover:underline hover:text-primary transition">
            Projects
          </Link>
          <Link to="/about" className="hover:underline hover:text-primary transition">
            About
          </Link>
          <Link to="/contact" className="hover:underline hover:text-primary transition">
            Contact
          </Link>
        </nav>

        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/quim-romero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/quimromero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
