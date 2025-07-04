import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion } from "framer-motion";
import { useState } from "react";
import SocialIcon from "../components/SocialIcon";
import Footer from "../components/Footer";
import {
  AnimateUpReveal,
} from "../components/animations/AnimationToolkit";
import Link from "next/link";
import { PostMetadata } from "../components/PostTypes";

type HomePageProps = {
  posts: { metadata: PostMetadata; slug: string }[];
};

const Home = (props: HomePageProps) => {
  const [showFunFacts, setShowFunFacts] = useState(false);

  const viewFunFacts = () => {
    setShowFunFacts(true);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Head>
        <title>Aaron Chan</title>
        <meta name="description" content="Personal Website of Aaron Chan" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <AnimateUpReveal duration={0.5}>
        <NavBar></NavBar>
      </AnimateUpReveal>

      <div className="mt-20">
        <div className="px-4 md:px-0">
          <AnimateUpReveal duration={0.5}>
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src={"/profile3.jpeg"}
                alt={"Picture of Aaron Chan"}
                width={200}
                height={200}
              ></Image>
            </div>
          </AnimateUpReveal>
          <div className="flex justify-center m-auto py-12">
            <div className="">
              <div className="flex justify-center">
                <AnimateUpReveal delay={0.2} duration={0.5}>
                  <hr className="w-6 h-1 mr-3 mb-6 bg-black text-black"></hr>
                </AnimateUpReveal>
              </div>
              <div className="ml-8">
                <AnimateUpReveal delay={0.2} duration={0.5}>
                  <p className="max-w-lg text-lg">
                    Hi! My name is Aaron Chan, and I&rsquo;m all about machine learning
                    and software engineering, travel, performing and
                    appreciating music, and learning new things.
                  </p>
                  <br />
                  <p className="max-w-lg text-lg">
                    Currently I&rsquo;m on applied research at Harvey, where I
                    helped create the source citation engine and develop
                    algorithms for sophisticated legal research tasks such as
                    antitrust filings and full document drafting.
                  </p>
                  <br />
                  <p className="max-w-lg text-lg">
                    Previously, I built AI models and engineering platforms for Github
                    Copilot as part of Microsoft Research. In my spare time, I enjoy
                    playing piano and arranging music, practicing photography, and
                    traveling.
                  </p>
                  {showFunFacts && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="max-w-lg text-lg mt-8">
                        <b>Fun facts about me:</b>
                        <ul className="text-lg">
                          <li>I grew up in upstate New York.</li>
                          <li>
                            I started programming when I was 8 with Flash
                            Actionscript 2 (AS3 wasn&rsquo;t out yet).
                          </li>
                          <li>
                            I love fountains and running water - when I was a
                            kid, I used to stare at storm drains when it was
                            raining to see the water rushing in.
                          </li>
                          <li>
                            My favorite book series is the Dresden Files,
                            followed closely by the Stormlight Archives.
                          </li>
                        </ul>
                      </p>
                    </motion.div>
                  )}
                  <br />
                </AnimateUpReveal>
                <br />
                <AnimateUpReveal delay={1} duration={0.5}>
                  <div className="flex flex-col md:flex-row mt-3">
                    <p className="max-w-lg pr-2 mt-1 text-lg">
                      Check out what I&rsquo;ve been up to 👉
                    </p>
                    <div className="mt-4 md:mt-0">
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
                  </div>
                </AnimateUpReveal>
              </div>
            </div>
          </div>
        </div>

        {/*<code className={styles.code}>pages/index.tsx</code>*/}

        <div className="bg-black py-24">
          <div className="m-auto max-w-7xl text-white">
            <h2 className="text-center">What brings you here?</h2>
            <br />
            <div className="m-auto flex justify-center mt-8">
              <ol type="1" className="md:columns-2 text-xl">
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
                <li
                  onClick={viewFunFacts}
                  className="hover:underline-animation-white"
                >
                  I want to know more about you &rarr;
                </li>
                <br />
                <li
                  className="hover:underline-animation-white"
                  onClick={() => window.open("/files/resume.pdf")}
                >
                  I want to view your resume &rarr;
                </li>
                <br />
                <Link href="/projects" passHref>
                  <li className="hover:underline-animation-white">
                    I want to see what you&rsquo;ve worked on &rarr;
                  </li>
                </Link>
                <br />
                <Link href="/blog" passHref>
                  <li className="hover:underline-animation-white">
                    I want to read your blog &rarr;
                  </li>
                </Link>
                <br />
                <Link href="/contact" passHref>
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
