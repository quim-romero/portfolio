import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Quim Romero
      </Link>
      <nav className="space-x-4">
        <Link to="/projects" className="hover:underline">
          Projects
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
