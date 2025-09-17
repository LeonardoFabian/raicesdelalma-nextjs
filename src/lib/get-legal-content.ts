// import fs from "fs";
// import path from "path";
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


// const legalDir = path.join(process.cwd(), 'content/legal');

const legalFiles: Record<string, () => Promise<any>> = {
    'ads-policy': () => import('@/app/(public)/legal/_content/ads-policy.md?raw'),
  'privacy-policy': () => import('@/app/(public)/legal/_content/privacy-policy.md?raw'),
  'refund-policy': () => import('@/app/(public)/legal/_content/refund-policy.md?raw'),
  'shipping-policy': () => import('@/app/(public)/legal/_content/shipping-policy.md?raw'),
  'terms-and-conditions': () => import('@/app/(public)/legal/_content/terms-and-conditions.md?raw'),
};

// export const getLegalContent = async (slug: string) => {
//     const filePath = path.join(legalDir, `${slug}.md`);

//     if (!fs.existsSync(filePath)) {
//         throw new Error(`Legal page not found for slug: ${slug}`);
//     }

//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     const { content, data } = matter(fileContents);

//     const processedContent = await remark().use(html).process(content);
//     const contentHtml = processedContent.toString();

//     return {
//         title: data.title || slug,
//         content: contentHtml
//     };
// }

// export const getAllLegalSlugs = (): string[] => {
//     const files = fs.readdirSync(legalDir);

//     return files
//         .filter((file) => file.endsWith('.md'))
//         .map((file) => file.replace(/\.md$/, ''));
// }

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

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title || slug,
    content: contentHtml,
  };
};