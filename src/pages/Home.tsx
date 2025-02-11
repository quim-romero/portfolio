import Layout from '../layout/Layout';

export default function Home() {
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold text-brand mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg text-muted text-center max-w-xl">
          This is the beginning of a handcrafted frontend experience.
        </p>
      </section>
    </Layout>
  );
}
