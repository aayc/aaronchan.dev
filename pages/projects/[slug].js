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

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("mdx", "projects"));
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
    path.join("mdx", "projects", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);
  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
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

const ProjectPage = ({
  frontMatter: { title, date, description },
  mdxSource,
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
          <header className="mb-10">
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
            <MDXRemote {...mdxSource} components={{ code, SyntaxHighlighter }} />
          </div>
        </article>
      </main>
    </div>
  );
};

export default ProjectPage;
