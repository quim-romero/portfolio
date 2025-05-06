import matter from 'gray-matter';
import type { Language } from '../hooks/LanguageProvider';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export async function getPosts(lang: Language): Promise<Post[]> {
  const files = import.meta.glob(`/src/posts/${lang}/*.md`, { as: 'raw', eager: true });

  return Object.entries(files).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { data } = matter(content as string);
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
    };
  });
}
