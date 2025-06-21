import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background text-zinc-900 dark:text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
