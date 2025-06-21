import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header className="w-full fixed top-0 z-30 py-4 px-6 flex items-center justify-between 
      bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md 
      text-zinc-900 dark:text-foreground transition-colors duration-300 border-b border-zinc-200 dark:border-zinc-800">
      
      {!isHome && (
        <Link to="/" className="text-xl font-bold z-50">
          Quim Romero
        </Link>
      )}

      <div className="hidden md:flex items-center gap-6 ml-auto">
        <nav className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="hover:underline transition">
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-4 md:hidden z-50 ml-auto">
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="text-zinc-900 dark:text-foreground"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-zinc-900 shadow-lg border-t border-zinc-200 dark:border-zinc-800 px-6 py-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:underline transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
