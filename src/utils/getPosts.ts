import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export async function getPosts(): Promise<Post[]> {
  const files = import.meta.glob('/src/posts/en/*.md', { as: 'raw', eager: true });
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
