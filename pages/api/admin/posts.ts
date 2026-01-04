import type { NextApiRequest, NextApiResponse } from "next";
import matter from "gray-matter";
import {
  isGitHubConfigured,
  getFileFromGitHub,
  listFilesFromGitHub,
  saveFileToGitHub,
  deleteFileFromGitHub,
} from "../../../lib/github";

// Simple password check
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";
const POSTS_PATH = "mdx/posts";

function isAuthorized(req: NextApiRequest): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.split(" ")[1];
  return token === ADMIN_PASSWORD;
}

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  content?: string;
  sha?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

// Validation functions
function validateSlug(slug: string): ValidationError | null {
  if (!slug || slug.trim() === "") {
    return { field: "slug", message: "Slug is required" };
  }
  if (slug.length < 3) {
    return { field: "slug", message: "Slug must be at least 3 characters" };
  }
  if (slug.length > 100) {
    return { field: "slug", message: "Slug must be less than 100 characters" };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { field: "slug", message: "Slug must be lowercase letters, numbers, and hyphens only (e.g., my-post-title)" };
  }
  return null;
}

function validateTitle(title: string): ValidationError | null {
  if (!title || title.trim() === "") {
    return { field: "title", message: "Title is required" };
  }
  if (title.length > 200) {
    return { field: "title", message: "Title must be less than 200 characters" };
  }
  return null;
}

function validateDate(date: string): { error: ValidationError | null; parsed: Date | null } {
  if (!date || date.trim() === "") {
    return { error: { field: "date", message: "Date is required" }, parsed: null };
  }

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    return { error: { field: "date", message: "Invalid date format. Use a format like 'January 5, 2026' or '2026-01-05'" }, parsed: null };
  }

  // Check if date is reasonable (not before 2000 or more than 1 year in future)
  const minDate = new Date("2000-01-01");
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  if (parsed < minDate) {
    return { error: { field: "date", message: "Date seems too old. Please check the year." }, parsed: null };
  }

  return { error: null, parsed };
}

function validateContent(content: string): ValidationError | null {
  if (!content || content.trim() === "") {
    return { field: "content", message: "Content is required" };
  }
  if (content.trim().length < 10) {
    return { field: "content", message: "Content must be at least 10 characters" };
  }
  return null;
}

function validateDescription(description: string): ValidationError | null {
  if (description && description.length > 500) {
    return { field: "description", message: "Description must be less than 500 characters" };
  }
  return null;
}

async function parsePostFile(filename: string): Promise<PostMeta | null> {
  const filePath = `${POSTS_PATH}/${filename}`;
  const file = await getFileFromGitHub(filePath);

  if (!file) return null;

  const { data, content } = matter(file.content);
  const slug = filename.replace(".mdx", "");

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "",
    description: data.description || "",
    content,
    sha: file.sha,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authorization
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Check GitHub configuration
  if (!isGitHubConfigured()) {
    return res.status(500).json({
      error: "GitHub not configured. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables."
    });
  }

  const { method } = req;
  const { slug } = req.query;

  try {
    switch (method) {
      case "GET":
        if (slug && typeof slug === "string") {
          // Get single post
          const post = await parsePostFile(`${slug}.mdx`);
          if (!post) {
            return res.status(404).json({ error: "Post not found" });
          }
          return res.status(200).json(post);
        } else {
          // Get all posts
          const files = await listFilesFromGitHub(POSTS_PATH);
          const posts: PostMeta[] = [];

          for (const filename of files) {
            const post = await parsePostFile(filename);
            if (post) {
              // Don't include content in list view
              const { content, sha, ...meta } = post;
              posts.push(meta as PostMeta);
            }
          }

          // Sort by date (newest first)
          posts.sort((a, b) => {
            const dateA = new Date(a.date || "1970-01-01");
            const dateB = new Date(b.date || "1970-01-01");
            return dateB.getTime() - dateA.getTime();
          });

          return res.status(200).json(posts);
        }

      case "POST":
        // Create or update post
        const { slug: postSlug, title, date, description, content } = req.body;

        // Collect all validation errors
        const errors: ValidationError[] = [];

        const slugError = validateSlug(postSlug);
        if (slugError) errors.push(slugError);

        const titleError = validateTitle(title);
        if (titleError) errors.push(titleError);

        const { error: dateError, parsed: parsedDate } = validateDate(date);
        if (dateError) errors.push(dateError);

        const contentError = validateContent(content);
        if (contentError) errors.push(contentError);

        const descriptionError = validateDescription(description);
        if (descriptionError) errors.push(descriptionError);

        // Return all validation errors at once
        if (errors.length > 0) {
          return res.status(400).json({
            error: errors[0].message, // Primary error message
            errors // All field errors for the UI
          });
        }

        const filePath = `${POSTS_PATH}/${postSlug}.mdx`;
        const sortDate = parsedDate!.toISOString().split("T")[0];

        // Escape quotes in description for YAML
        const safeDescription = (description || "").replace(/"/g, '\\"');

        const fileContent = `---
title: ${title}
date: ${date}
author: Aaron Chan
description: "${safeDescription}"
sortDate: "${sortDate}"
tags: []
---

${content}`;

        // Check if file exists to get sha for update
        const existingFile = await getFileFromGitHub(filePath);
        const commitMessage = existingFile
          ? `Update post: ${title}`
          : `Add new post: ${title}`;

        await saveFileToGitHub(
          filePath,
          fileContent,
          commitMessage,
          existingFile?.sha
        );

        return res.status(200).json({ success: true, slug: postSlug });

      case "DELETE":
        if (!slug || typeof slug !== "string") {
          return res.status(400).json({ error: "Slug is required" });
        }

        const deleteFilePath = `${POSTS_PATH}/${slug}.mdx`;
        const fileToDelete = await getFileFromGitHub(deleteFilePath);

        if (!fileToDelete) {
          return res.status(404).json({ error: "Post not found" });
        }

        await deleteFileFromGitHub(
          deleteFilePath,
          fileToDelete.sha,
          `Delete post: ${slug}`
        );

        return res.status(200).json({ success: true });

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("Admin API error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error"
    });
  }
}
