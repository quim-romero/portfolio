import Layout from "../layout/Layout";
import HeroBackground from "../components/HeroBackground";
import { useGreeting } from '../hooks/useGreeting';

export default function Home() {
  const greeting = useGreeting();

  return (
    <Layout>
      <main
        id="main"
        role="main"
        aria-label="Homepage hero section"
        className="relative min-h-screen flex items-center justify-center px-6 text-center bg-light dark:bg-dark text-text-base dark:text-text-light"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {greeting}, welcome to my portfolio.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          I build modern interfaces with React, motion and detail.
        </p>

        <HeroBackground />
      </main>
    </Layout>
  );
}
