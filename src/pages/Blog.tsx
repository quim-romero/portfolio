import Layout from '../layout/Layout';

export default function Blog() {
  return (
    <Layout>
      <section className="px-6 py-24 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-muted">Notes, thoughts and experiments in frontend.</p>
      </section>
    </Layout>
  );
}
