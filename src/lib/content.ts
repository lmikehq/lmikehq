import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const contentDirectory = path.join(process.cwd(), "content");

export interface ProjectMeta {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  date: string;
}

export interface BlogMeta {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
  tags: string[];
}

export interface ResearchMeta {
  id: number;
  title: string;
  slug: string;
  conference: string;
  date: string;
  abstract: string;
  link: string;
  tags: string[];
  authors: string[];
  institution: string;
}

export interface ContentItem<T> {
  meta: T;
  content: string;
  contentHtml?: string;
}

function getContentDirectory(type: "projects" | "blog" | "research") {
  return path.join(contentDirectory, type);
}

export function getAllSlugs(type: "projects" | "blog" | "research"): string[] {
  const dir = getContentDirectory(type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllContent<T>(
  type: "projects" | "blog" | "research"
): ContentItem<T>[] {
  const dir = getContentDirectory(type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));

  const items = files.map((file) => {
    const filePath = path.join(dir, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      meta: data as T,
      content,
    };
  });

  return items.sort((a, b) => {
    const dateA = new Date((a.meta as any).date);
    const dateB = new Date((b.meta as any).date);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getContentBySlug<T>(
  type: "projects" | "blog" | "research",
  slug: string
): Promise<ContentItem<T> | null> {
  const dir = getContentDirectory(type);
  const filePath = path.join(dir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    meta: data as T,
    content,
    contentHtml,
  };
}

export function getAllProjects() {
  return getAllContent<ProjectMeta>("projects");
}

export function getAllBlogPosts() {
  return getAllContent<BlogMeta>("blog");
}

export function getAllResearch() {
  return getAllContent<ResearchMeta>("research");
}

export function getProjectBySlug(slug: string) {
  return getContentBySlug<ProjectMeta>("projects", slug);
}

export function getBlogPostBySlug(slug: string) {
  return getContentBySlug<BlogMeta>("blog", slug);
}

export function getResearchBySlug(slug: string) {
  return getContentBySlug<ResearchMeta>("research", slug);
}
