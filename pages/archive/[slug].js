import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Post.module.css";

function getAllArchivePosts() {
  const archiveDir = path.join(process.cwd(), "mdx", "archive");
  if (!fs.existsSync(archiveDir)) return [];

  const files = fs.readdirSync(archiveDir).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const filePath = path.join(archiveDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      sortDate: data.sortDate || data.date || "",
    };
  }).sort((a, b) => {
    const dateA = new Date(a.sortDate || "1970-01-01");
    const dateB = new Date(b.sortDate || "1970-01-01");
    return dateB.getTime() - dateA.getTime();
  });
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("mdx", "archive"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("mdx", "archive", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  // Get other archive posts
  const allPosts = getAllArchivePosts();
  const otherPosts = allPosts
    .filter((post) => post.slug !== slug)
    .slice(0, 5);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
      otherPosts,
    },
  };
};

function code({ className, ...props }) {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={atomOneDark}
      PreTag="div"
      {...props}
    />
  ) : (
    <code className={className} {...props} />
  );
}

const ArchivePage = ({
  frontMatter: { title, date, description },
  mdxSource,
  otherPosts,
}) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{`${title} — Aaron Chan`}</title>
        <meta name="description" content={description || title} />
      </Head>

      <main className="max-w-2xl mx-auto px-6 py-16 w-full">
        <Link href="/" className="text-sm text-muted hover:text-text transition-colors">
          ← Back
        </Link>

        <article className={`mt-12 ${styles.post}`}>
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted bg-[#e8dfd2] px-2 py-0.5 rounded">
                Archive
              </span>
            </div>
            <h1 className="text-2xl font-heading font-semibold tracking-tight">
              {title}
            </h1>
            {date && (
              <p className="mt-2 text-sm text-muted">
                {date}
              </p>
            )}
          </header>

          <div className="prose">
            <MDXRemote {...mdxSource} components={{ code }} />
          </div>
        </article>

        {otherPosts && otherPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-sm font-heading font-medium text-muted mb-4">
              More from the archive
            </h2>
            <ul className="space-y-3">
              {otherPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/archive/${post.slug}`}
                    className="group flex items-baseline justify-between gap-4"
                  >
                    <span className="font-heading text-[15px] group-hover:text-[var(--color-accent)] transition-colors">
                      {post.title}
                    </span>
                    <span className="text-xs text-muted shrink-0">
                      {post.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default ArchivePage;
