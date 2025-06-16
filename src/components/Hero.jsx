import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        key={isDark ? "dark" : "light"}
      >
        <source
          src={isDark ? "/videos/hero-dark.mp4" : "/videos/hero-light.mp4"}
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm z-10" />

      <motion.div
        className="relative z-20 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
          I'm Quim Romero
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-xl mx-auto">
          Frontend developer turning ideas into digital experiences.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
