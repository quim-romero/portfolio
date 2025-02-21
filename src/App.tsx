import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from './pages/About';
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from './pages/Contact';
import Blog from './pages/Blog';

import ScrollToTop from "./components/ScrollToTop";


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}
