import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type PostMetadata = {
  title: string;
  author: string;
  date: string;
  topic: string;
  id: string;
  tags: string[];
  thumbnailUrl: string;
  description: string;
  level: number;
};

type HomePageProps = {
  posts: { metadata: PostMetadata; slug: string }[];
};

const Home = (props: HomePageProps) => {
  const topics = [...new Set(props.posts.map((x) => x.metadata.topic))];

  return (
    <div className={styles.container}>
      <Head>
        <title>Casual Deep Learning 😎</title>
        <meta name="description" content="Learn Deep Learning Simply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar></NavBar>

      <div className="mt-24">
        <h1 className="text-5xl">Your Blog Name here.</h1>

        {/*<code className={styles.code}>pages/index.tsx</code>*/}
        <div className="text-xl mt-4">
          <p>Concepts explained in three levels of complexity.</p>
          <p className="my-2">Every article for free.</p>
        </div>

        <hr className="my-8"></hr>

        <div className="text-center text-3xl mt-8">Get started by topic</div>

        <div className={styles.grid}>
          {topics.map((topic) => (
            <div key={topic} className={styles.card}>
              <h2>{topic}</h2>
              <ul>
                {props.posts
                  .filter(
                    (post) =>
                      post.metadata.topic === topic && post.metadata.level == 1
                  )
                  .map((post) => (
                    <li key={topic + post.metadata.title}>
                      <a href={`/${post.slug}`}>{post.metadata.title} &rarr;</a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: metadata } = matter(markdownWithMeta);
    return {
      metadata,
      slug: path.join("posts", filename.split(".")[0]),
    };
  });
  return {
    props: {
      posts,
    },
  };
};

export default Home;
