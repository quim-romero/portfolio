import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-background text-zinc-900 dark:text-foreground transition-colors duration-300">
      <motion.h1
        className="text-6xl font-extrabold text-primary mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl text-muted dark:text-muted mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        This page doesn't exist or was moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded hover:bg-indigo-600 transition"
        >
          Go back home
        </Link>
      </motion.div>
    </section>
  )
}

export default NotFound
