import { useState } from "react";
import projects from "../projects/data";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

const getUniqueCategories = (projects) => {
  const categories = projects.map((p) => p.category);
  return ["All", ...new Set(categories)];
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories = getUniqueCategories(projects);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setShowFiltersMobile(false);
  };

  return (
    <section className="min-h-screen px-6 pt-28 pb-16 bg-white dark:bg-background text-zinc-900 dark:text-foreground transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-muted dark:text-muted mb-10">
        A selection of work I've crafted with care.
      </p>

      <div className="mb-6 md:hidden">
        <button
          onClick={() => setShowFiltersMobile(!showFiltersMobile)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700"
        >
          <Filter size={16} />
          Filters
        </button>

        <AnimatePresence>
          {showFiltersMobile && (
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 text-sm rounded-full font-medium border transition-colors ${
                    activeCategory === category
                      ? "text-white dark:bg-primary dark:border-primary bg-primary-light border-primary-light hover:bg-primary-lightHover"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:flex flex-wrap gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 text-sm rounded-full font-medium border transition-colors ${
              activeCategory === category
                ? "text-white dark:bg-primary dark:border-primary bg-primary-light border-primary-light hover:bg-primary-lightHover"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </motion.div>

      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
