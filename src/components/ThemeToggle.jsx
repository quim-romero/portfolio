import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import useDarkMode from '../hooks/useDarkMode'

const ThemeToggle = () => {
  const [theme, toggleTheme] = useDarkMode()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 transition-colors"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Sun className="text-white w-5 h-5" />
        ) : (
          <Moon className="text-zinc-900 w-5 h-5" />
        )}
      </motion.div>
    </button>
  )
}

export default ThemeToggle
