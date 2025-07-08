import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";

import NebulaTerminal from "./components/NebulaTerminal";
import Loader from "./components/Loader";

declare global {
  interface Window {
    __hasLoggedEasterEgg?: boolean;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  // Show only once per tab
  const [isLoading, setIsLoading] = useState(() => {
    const alreadyLoaded = sessionStorage.getItem("hasLoaded");
    return !alreadyLoaded;
  });

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 2100);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  // Easter egg in console
  useEffect(() => {
    if (!window.__hasLoggedEasterEgg) {
      console.log(
        "%c👀 You opened the console. Curious mind detected.",
        "color: cyan; font-size: 16px;"
      );
      console.log(
        "%c🚀 Tip: Visit /projects/nebulaos and click 'Start Demo'. You won't regret it.",
        "color: cyan; font-size: 16px;"
      );
      window.__hasLoggedEasterEgg = true;
    }
  }, []);

  const [openTerminal, setOpenTerminal] = useState(false);

  // Loader overlay
  if (isLoading) return <Loader />;

  return (
    <>
      <ScrollToTop />
      <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300">
        <NebulaTerminal
          isOpen={openTerminal}
          onClose={() => setOpenTerminal(false)}
        />

        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition>
                  <Projects onOpenTerminal={() => setOpenTerminal(true)} />
                </PageTransition>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/blog"
              element={
                <PageTransition>
                  <Blog />
                </PageTransition>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <PageTransition>
                  <ArticleDetail />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
