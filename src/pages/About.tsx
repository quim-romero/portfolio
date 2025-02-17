import Layout from "../layout/Layout";

export default function About() {
  return (
    <Layout>
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
        <p className="text-muted mb-6 leading-relaxed text-lg">
          I’m a frontend developer with a product-first mindset. My journey
          started through experimentation, and later I formalized it with a
          degree in web development. My strengths lie in blending clean design,
          logical structure, and smooth animation.
        </p>
        <p className="text-muted mb-6 leading-relaxed text-lg">
          I’ve built full interface simulations — from dashboards to microsites
          — all crafted with performance and personality in mind. I move fast,
          write scalable code, and care about the little things.
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-10">How I Work</h2>
        <ul className="list-disc list-inside text-muted space-y-3">
          <li>
            Quick and focused cycles — I deliver a working version early and
            polish fast.
          </li>
          <li>
            Detail-obsessed: from spacing to keyboard UX to microinteractions.
          </li>
          <li>
            Clear communication: I give updates, ask early, and avoid
            overpromising.
          </li>
          <li>
            I work solo or with teams — always bringing structure and
            product-thinking.
          </li>
          <li>
            User experience is a priority — the interface should feel as good as
            it looks.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4 mt-12">
          Tools & Technologies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-muted">
          <span>React</span>
          <span>TypeScript</span>
          <span>Tailwind CSS</span>
          <span>Framer Motion</span>
          <span>Vite</span>
          <span>Zustand</span>
          <span>EmailJS</span>
          <span>Cypress</span>
          <span>Figma</span>
        </div>
      </section>
    </Layout>
  );
}
