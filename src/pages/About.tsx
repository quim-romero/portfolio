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
      </section>
    </Layout>
  );
}
