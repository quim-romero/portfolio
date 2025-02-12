import Layout from "../layout/Layout";
import HeroBackground from "../components/HeroBackground";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setGreeting("Good morning");
    else if (hour >= 12 && hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <Layout>
      <main
        id="main"
        role="main"
        aria-label="Homepage greeting"
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative"
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
