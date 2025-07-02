import MarkdownIt from 'markdown-it';
import fm from 'front-matter';

export type ArticleMeta = {
  title: string;
  date?: string;
  tags?: string[];
  description?: string;
  [key: string]: unknown;
};

export type ArticleData = {
  html: string;
  meta: ArticleMeta;
};

/**
 * Parses raw markdown content, extracts frontmatter and converts markdown to HTML.
 */
export function parseMarkdown(raw: string): ArticleData {
  const { attributes, body } = fm<ArticleMeta>(raw);

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const html = md.render(body);

  return {
    html,
    meta: attributes,
  };
}
