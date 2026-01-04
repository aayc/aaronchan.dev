// GitHub API utilities for managing MDX files in the repository

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "aayc";
const GITHUB_REPO = process.env.GITHUB_REPO || "aaronchan.dev";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

interface GitHubFile {
  path: string;
  content: string;
  sha?: string;
}

interface GitHubFileResponse {
  name: string;
  path: string;
  sha: string;
  content?: string;
  encoding?: string;
}

// Check if GitHub API is configured
export function isGitHubConfigured(): boolean {
  return !!GITHUB_TOKEN && !!GITHUB_OWNER && !!GITHUB_REPO;
}

// Get file content from GitHub
export async function getFileFromGitHub(filePath: string): Promise<{ content: string; sha: string } | null> {
  if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN not configured");

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data: GitHubFileResponse = await response.json();
  const content = Buffer.from(data.content || "", "base64").toString("utf-8");
  
  return { content, sha: data.sha };
}

// List files in a directory from GitHub
export async function listFilesFromGitHub(dirPath: string): Promise<string[]> {
  if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN not configured");

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dirPath}?ref=${GITHUB_BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data: GitHubFileResponse[] = await response.json();
  return data
    .filter((file) => file.name.endsWith(".mdx"))
    .map((file) => file.name);
}

// Create or update a file on GitHub
export async function saveFileToGitHub(
  filePath: string,
  content: string,
  message: string,
  sha?: string
): Promise<void> {
  if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN not configured");

  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch: GITHUB_BRANCH,
  };

  // If updating an existing file, include the sha
  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub API error: ${error.message || response.status}`);
  }
}

// Delete a file from GitHub
export async function deleteFileFromGitHub(
  filePath: string,
  sha: string,
  message: string
): Promise<void> {
  if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN not configured");

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sha,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub API error: ${error.message || response.status}`);
  }
}

