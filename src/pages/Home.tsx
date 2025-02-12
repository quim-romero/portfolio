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
        <h1 className="text-4xl font-bold text-brand mb-4">
          {greeting}, welcome to my portfolio.
        </h1>
        <p className="text-lg text-muted max-w-xl">
          Crafting frontend experiences with design, performance and purpose.
        </p>

        <HeroBackground />
      </main>
    </Layout>
  );
}
