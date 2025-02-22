import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import matter from 'gray-matter';
import { marked } from 'marked';

import Layout from '../layout/Layout';
import LanguageTransition from '../components/LanguageTransition';
import { useLanguage } from '../hooks/LanguageProvider';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!slug) return;
    import(`../posts/${lang}/${slug}.md?raw`)
      .then((mod) => {
        const parsed = matter(mod.default);
        setTitle(parsed.data.title);
        setContent(marked.parse(parsed.content));
      })
      .catch(() => {
        setTitle('Post not found');
        setContent('# 404');
      });
  }, [slug, lang]);

  return (
    <Layout>
      <Helmet>
        <title>{title} | Blog</title>
      </Helmet>
      <main id="main" className="py-24 px-6 max-w-3xl mx-auto">
        <LanguageTransition>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose dark:prose-invert max-w-none"
          >
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </motion.article>
        </LanguageTransition>
      </main>
    </Layout>
  );
}
