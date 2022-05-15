import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SyntaxHighlighter from "react-syntax-highlighter";
import PostFooter from "../../components/PostFooter";
import NavBar from "../../components/NavBar";
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

const PostPage = ({
  frontMatter: { title, author, date, description, tags },
  mdxSource,
}) => {
  return (
    <div>
      <div className="m-auto max-w-7xl">
        <NavBar></NavBar>
        <div className={`m-auto max-w-3xl ${styles.post}`}>
          <h1 className="mt-8 text-center">{title}</h1>
          <p className="mt-2 text-center">
            <i>
              {author}
              {date == "" ? "" : ", " + date}
            </i>
          </p>
          <p className="mt-2 text-center">
            <i>{description}</i>
          </p>
          <div className={`my-8`}>
            <MDXRemote {...mdxSource} components={{ SyntaxHighlighter }} />
          </div>
        </div>
      </div>
      <PostFooter></PostFooter>
    </div>
  );
};

export default PostPage;
