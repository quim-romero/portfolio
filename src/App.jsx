import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                {...pageVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/projects"
            element={
              <motion.div
                {...pageVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Projects />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                {...pageVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div
                {...pageVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Contact />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                {...pageVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;