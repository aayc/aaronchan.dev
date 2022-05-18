import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SocialIcon from "../components/SocialIcon";
import Footer from "../components/Footer";
import {
  AnimateUpReveal,
  TransitioningText,
} from "../components/animations/AnimationToolkit";
import { useInterval } from "../components/Hooks";
import Link from "next/link";
import { PostMetadata } from "../components/PostTypes";

type HomePageProps = {
  posts: { metadata: PostMetadata; slug: string }[];
};

const getRandomInt = (max: number, dontMatch: number) => {
  let result: number = 0;
  do {
    result = Math.floor(Math.random() * Math.floor(max));
  } while (result == dontMatch);
  return result;
};

const Home = (props: HomePageProps) => {
  const topics = [...new Set(props.posts.map((x) => x.metadata.topic))];
  const actions = [
    "Building",
    "Learning",
    "Designing",
    "Solving",
    "Discovering",
    "Sharing",
    "Making",
  ];
  const descriptors = [
    "for fun",
    "new",
    "exciting",
    "just 'cause",
    "to understand",
    "profound",
    "interesting",
  ];

  const [indexes, setIndexes] = useState({
    actionIndex: 0,
    descriptorIndex: 0,
  });

  const changeHeader = () => {
    setIndexes({
      actionIndex: getRandomInt(actions.length, indexes.actionIndex),
      descriptorIndex: getRandomInt(
        descriptors.length,
        indexes.descriptorIndex
      ),
    });
  };

  useInterval(() => {
    changeHeader();
  }, 8000);

  return (
    <div>
      <Head>
        <title>Aaron Chan</title>
        <meta name="description" content="Learn Deep Learning Simply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimateUpReveal>
        <NavBar></NavBar>
      </AnimateUpReveal>

      <div className="mt-8">
        <div className="flex justify-between max-w-7xl m-auto w-full py-24">
          <div className="w-50">
            <h1>
              <TransitioningText
                text={actions[indexes.actionIndex]}
                key={"action" + indexes.actionIndex}
              />
              <AnimateUpReveal>something </AnimateUpReveal>
              <TransitioningText
                text={descriptors[indexes.descriptorIndex] + "."}
                key={"descriptor" + indexes.descriptorIndex}
              />
            </h1>
            <br />
            <AnimateUpReveal delay={0.5}>
              <hr className="w-6 h-1 mr-3 mt-3 mb-6 bg-black text-black"></hr>
            </AnimateUpReveal>
            <AnimateUpReveal delay={0.7}>
              <p className="max-w-lg">
                Hi, I&rsquo;m Aaron Chan! I&rsquo;m a software engineer,
                consultant, data scientist, loyal friend, musician, and much
                more.
              </p>
              <br />
              <p className="max-w-lg">
                Thanks for dropping by ☺️, stay awhile and find out how I can
                help you, what I&rsquo;ve been working on, and much more.
              </p>
            </AnimateUpReveal>
            <br />
            <AnimateUpReveal delay={1}>
              <div className="flex mt-3">
                <p className="max-w-lg pr-2 mt-1">
                  Check out what I&rsquo;ve been up to 👉
                </p>
                <SocialIcon
                  href="https://github.com/aayc"
                  icon="github"
                ></SocialIcon>
                <SocialIcon
                  href="https://twitter.com/aaronychan"
                  icon="twitter"
                ></SocialIcon>
                <SocialIcon
                  href="https://linkedin.com/in/aaron-y-chan"
                  icon="linkedin"
                ></SocialIcon>
                <SocialIcon
                  href="https://instagram.com/aaronychan"
                  icon="instagram"
                ></SocialIcon>
              </div>
            </AnimateUpReveal>
          </div>
          <AnimateUpReveal>
            <div className="w-50 mt-8">
              <Image
                className="rounded-full"
                src={"/profile.jpg"}
                width={400}
                height={400}
              ></Image>
            </div>
          </AnimateUpReveal>
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
                  rel="noopener noreferrer"
                  className="text-inherit focus:text-inherit visited:text-inherit hover:text-inherit"
                >
                  <li className="hover:underline-animation-white">
                    I want consulting help with a project &rarr;
                  </li>
                </a>
                <br />
                <Link href="/posts/about">
                  <li className="hover:underline-animation-white">
                    I want to know more about you &rarr;
                  </li>
                </Link>
                <br />
                <li
                  className="hover:underline-animation-white"
                  onClick={() => window.open("/resume.pdf")}
                >
                  I want to see your resume &rarr;
                </li>
                <br />
                <Link href="/blog">
                  <li className="hover:underline-animation-white">
                    I want to hear about what you&rsquo;re working on &rarr;
                  </li>
                </Link>
                <br />
                <Link href="/blog">
                  <li className="hover:underline-animation-white">
                    I want to read your blog &rarr;
                  </li>
                </Link>
                <br />
                <Link href="/contact">
                  <li className="hover:underline-animation-white">
                    I want some advice &rarr;
                  </li>
                </Link>
              </ol>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("mdx", "posts"));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("mdx", "posts", filename),
      "utf-8"
    );
    const { data: metadata } = matter(markdownWithMeta);
    return {
      metadata,
      slug: path.join("mdx", "posts", filename.split(".")[0]),
    };
  });
  return {
    props: {
      posts,
    },
  };
};

export default Home;
