import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "mdx", "posts");
const ARCHIVE_DIR = path.join(process.cwd(), "mdx", "archive");

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  sortDate: string;
  description?: string;
  author?: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

function parsePostFile(filePath: string, slug: string): PostMeta {
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContents);
  
  return {
    title: data.title || "Untitled",
    slug,
    date: data.date || "",
    sortDate: data.sortDate || data.date || "",
    description: data.description || "",
    author: data.author || "",
    tags: data.tags || [],
  };
}

// Get all posts from the posts directory (new posts)
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  
  const posts = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const filePath = path.join(POSTS_DIR, filename);
    return parsePostFile(filePath, slug);
  });

  // Sort by sortDate descending (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.sortDate || "1970-01-01");
    const dateB = new Date(b.sortDate || "1970-01-01");
    return dateB.getTime() - dateA.getTime();
  });
}

// Get the latest post
export function getLatestPost(): PostMeta | null {
  const posts = getAllPosts();
  return posts[0] || null;
}

// Get a single post by slug
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  
  return {
    title: data.title || "Untitled",
    slug,
    date: data.date || "",
    sortDate: data.sortDate || data.date || "",
    description: data.description || "",
    author: data.author || "",
    tags: data.tags || [],
    content,
  };
}

// Get all post slugs for static paths
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  
  return fs.readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

// Save a post (create or update)
export function savePost(slug: string, frontmatter: Omit<PostMeta, "slug">, content: string): void {
  // Ensure posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
  
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  
  const fileContent = `---
title: ${frontmatter.title}
date: ${frontmatter.date}
author: ${frontmatter.author || "Aaron Chan"}
description: "${frontmatter.description || ""}"
sortDate: "${frontmatter.sortDate || new Date().toISOString().split("T")[0]}"
tags: ${JSON.stringify(frontmatter.tags || [])}
---

${content}`;

  fs.writeFileSync(filePath, fileContent, "utf-8");
}

// Delete a post
export function deletePost(slug: string): boolean {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  fs.unlinkSync(filePath);
  return true;
}

// Get all archive posts
export function getAllArchivePosts(): PostMeta[] {
  if (!fs.existsSync(ARCHIVE_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(ARCHIVE_DIR).filter((f) => f.endsWith(".mdx"));
  
  const posts = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const filePath = path.join(ARCHIVE_DIR, filename);
    return parsePostFile(filePath, slug);
  });

  return posts.sort((a, b) => {
    const dateA = new Date(a.sortDate || "1970-01-01");
    const dateB = new Date(b.sortDate || "1970-01-01");
    return dateB.getTime() - dateA.getTime();
  });
}

