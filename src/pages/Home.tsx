import Layout from '../layout/Layout';

export default function Home() {
  return (
    <Layout>
      <main
        role="main"
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        <h1 className="text-5xl font-bold text-brand mb-6">Welcome to My Portfolio</h1>
        <p className="text-lg text-muted max-w-xl">
          Crafting frontend experiences with design, performance and purpose.
        </p>
      </main>
    </Layout>
  );
}
