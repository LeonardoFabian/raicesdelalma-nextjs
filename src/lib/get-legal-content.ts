import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

const legalFiles: Record<string, () => Promise<any>> = {
  'ads-policy': () => import('@/app/(public)/legal/_content/ads-policy.md?raw'),
  'privacy-policy': () => import('@/app/(public)/legal/_content/privacy-policy.md?raw'),
  'refund-policy': () => import('@/app/(public)/legal/_content/refund-policy.md?raw'),
  'shipping-policy': () => import('@/app/(public)/legal/_content/shipping-policy.md?raw'),
  'terms-and-conditions': () => import('@/app/(public)/legal/_content/terms-and-conditions.md?raw'),
};

export const getAllLegalSlugs = (): string[] => {
  return Object.keys(legalFiles);
};

export const getLegalContent = async (slug: string) => {
  const load = legalFiles[slug];

  if (!load) {
    throw new Error(`Legal content not found for slug: ${slug}`);
  }

  const fileContents = await load();
  const { content, data } = matter(fileContents.default || fileContents);

  const processedContent = await unified()
    .use(remarkParse)                  // parsea markdown
    .use(remarkRehype)                 // convierte a HTML AST
    .use(rehypeSlug)                   // añade ids a headings
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',               // envuelve el heading con un link
    })
    .use(rehypeStringify)             // convierte a string HTML
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    title: data.title || slug,
    content: contentHtml,
  };
};