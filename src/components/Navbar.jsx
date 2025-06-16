import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 z-30 py-4 px-6 flex justify-between items-center 
      bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md 
      text-zinc-900 dark:text-foreground transition-colors duration-300 border-b border-zinc-200 dark:border-zinc-800">
      
      <Link to="/" className="text-xl font-bold">
        Quim Romero
      </Link>

      <nav className="flex items-center gap-4">
        <Link to="/projects" className="hover:underline transition">
          Projects
        </Link>
        <Link to="/about" className="hover:underline transition">
          About
        </Link>
        <Link to="/contact" className="hover:underline transition">
          Contact
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}

export default Navbar
