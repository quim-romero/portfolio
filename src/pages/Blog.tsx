import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import matter from "gray-matter";
import { marked } from "marked";

import Layout from "../layout/Layout";
import LanguageTransition from "../components/LanguageTransition";
import { useLanguage } from "../hooks/LanguageProvider";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      try {
        const mod = await import(`../posts/${lang}/${slug}.md?raw`);
        const parsed = matter(mod.default);
        const html = await marked.parse(parsed.content);

        setTitle(parsed.data.title);
        setDate(parsed.data.date || "");
        setContent(html);
      } catch {
        setTitle("Post not found");
        setContent("<h1>404</h1>");
      }
    };

    loadPost();
  }, [slug, lang]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Layout>
      <Helmet>
        <title>{title} | Blog</title>
      </Helmet>

      <main
        id="main"
        role="main"
        aria-label={`Blog post: ${title}`}
        className="py-24 px-6 max-w-3xl mx-auto"
      >
        <LanguageTransition>
          <motion.article
            aria-labelledby="post-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose dark:prose-invert max-w-none"
          >
            <h1 id="post-heading">{title}</h1>
            {date && (
              <p className="text-sm text-muted mb-1">{formatDate(date)}</p>
            )}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </motion.article>
        </LanguageTransition>
      </main>
    </Layout>
  );
}
