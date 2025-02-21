import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';

export default function Post() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    import(`../posts/en/${slug}.md?raw`)
      .then((module) => {
        const raw = module.default;
        const parsed = matter(raw);
        setTitle(parsed.data.title);
        setContent(parsed.content);
      })
      .catch(() => {
        setContent('# Not found');
      });
  }, [slug]);

  return (
    <Layout>
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    </Layout>
  );
}
