import fs from "fs";
import path from "path";
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


const legalDir = path.join(process.cwd(), 'content/legal');

export const getLegalContent = async (slug: string) => {
    const filePath = path.join(legalDir, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Legal page not found for slug: ${slug}`);
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        title: data.title || slug,
        content: contentHtml
    };
}

export const getAllLegalSlugs = (): string[] => {
    const files = fs.readdirSync(legalDir);

    return files
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace(/\.md$/, ''));
}