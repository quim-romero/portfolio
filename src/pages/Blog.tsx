import { useEffect, useState } from "react";
import { getPosts, Post } from "../utils/getPosts";
import { Link } from "react-router-dom";

import Layout from "../layout/Layout";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <Layout>
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-6">
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-1">{post.title}</h2>
              </Link>
              <p className="text-sm text-muted mb-1">{post.date}</p>
              <p className="text-muted">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
