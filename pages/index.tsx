import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HeroAnimation from "../components/animations/HeroAnimation";
import CircleAnimation from "../components/animations/CircleAnimation";
import { useState } from "react";
import SocialIcon from "../components/SocialIcon";
import Footer from "../components/Footer";

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

type SectionHeaderProps = {
  title: string;
};

const Home = (props: HomePageProps) => {
  const topics = [...new Set(props.posts.map((x) => x.metadata.topic))];
  const actions = [
    "Building",
    "Doing",
    "Learning",
    "Discovering",
    "Sharing",
    "Making",
  ];
  const descriptors = [
    "new",
    "fun",
    "exciting",
    "thought provoking",
    "profound",
  ];
  const [actionIndex, setActionIndex] = useState(0);
  const [descriptorIndex, setDescriptorIndex] = useState(0);

  const getRandomInt = (max: number, dontMatch: number) => {
    let result: number = 0;
    do {
      result = Math.floor(Math.random() * Math.floor(max));
    } while (result === dontMatch);
    return result;
  };

  const changeHeader = () => {
    setActionIndex(getRandomInt(actions.length, actionIndex));
    setDescriptorIndex(getRandomInt(descriptors.length, descriptorIndex));
  };

  // On a timer, make them wiggle and then "pop" into the new words

  return (
    <div>
      <Head>
        <title>Aaron Chan</title>
        <meta name="description" content="Learn Deep Learning Simply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar></NavBar>

      <div className="mt-8">
        <div className="flex justify-between max-w-7xl m-auto w-full py-24">
          <div className="w-50">
            <h1>
              <span className="text-purple-500 block mb-3">Learning</span>{" "}
              something <br />
              <span className="text-purple-500 mt-2">new</span> every day.
            </h1>
            <br />
            <hr className="w-6 h-1 mr-3 mt-3 mb-6 bg-black text-black"></hr>
            <p className="max-w-lg">
              Hi, I'm Aaron Chan! Thanks for dropping by ☺️, stay awhile and
              find out how I can help you, what I've been working on, and much
              more.
            </p>
            <br />
            <br />
            <div className="flex mt-3">
              <p className="max-w-lg pr-2 mt-1">
                Check out what I've been up to 👉
              </p>
              <SocialIcon
                href="https://github.com/aayc"
                icon="github"
              ></SocialIcon>
              <SocialIcon
                href="https://twitter.com"
                icon="twitter"
              ></SocialIcon>
              <SocialIcon
                href="https://linkedin.com/in/aaron-y-chan"
                icon="linkedin"
              ></SocialIcon>
              <SocialIcon
                href="https://instagram.com"
                icon="instagram"
              ></SocialIcon>
            </div>
          </div>
          <div className="w-50 mt-8">
            <Image
              className="rounded-full"
              src={"/profile.jpg"}
              width={400}
              height={400}
            ></Image>
          </div>
        </div>

        {/*<code className={styles.code}>pages/index.tsx</code>*/}

        <div className="bg-black py-24">
          <div className="m-auto max-w-7xl text-white">
            <h2 className="text-center">What brings you here?</h2>
            <br />
            <div className="m-auto flex justify-center mt-8">
              <ol type="1" className="columns-2 text-xl">
                <a
                  href="https://forms.gle/pwRjqyJNwBH3eA8NA"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  className="text-inherit focus:text-inherit visited:text-inherit hover:text-inherit"
                >
                  <li className="hover:underline-animation-white">
                    I want consulting help with a project &rarr;
                  </li>
                </a>
                <br />
                <li className="hover:underline-animation-white">
                  I want to know more about you &rarr;
                </li>
                <br />
                <li
                  className="hover:underline-animation-white"
                  onClick={() => window.open("/resume.pdf")}
                >
                  I want to see your resume &rarr;
                </li>
                <br />
                <li className="hover:underline-animation-white">
                  I want to hear about what you're working on &rarr;
                </li>
                <br />
                <li className="hover:underline-animation-white">
                  I want to read your blog &rarr;
                </li>
                <br />
                <li className="hover:underline-animation-white">
                  I want some advice &rarr;
                </li>
              </ol>
            </div>

            {/*<div className="flex justify-between">
              <div className="w-1/2 leading-8 pr-8">
                <p>
                  My expertise is in software: deep learning, performance
                  optimization, full stack web development, mobile app
                  development, visualization, and infrastructure pipelines.
                </p>
                <br />
                <p>
                  Off the computer, I enjoy playing the piano and the cello;
                  studying Mandarin Chinese; refining my best homecooked dishes;
                  and practicing jiu jitsu.
                </p>
              </div>
              <div className="w-1/2">Videos</div>
</div>*/}
          </div>
        </div>

        <Footer></Footer>

        {/*
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
                  </div>*/}
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
