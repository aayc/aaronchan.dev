import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SocialIcon from "../components/SocialIcon";
import { getLatestPost, PostMeta } from "../lib/posts";

interface HomeProps {
  latestPost: PostMeta | null;
}

export async function getStaticProps() {
  const latestPost = getLatestPost();
  return {
    props: {
      latestPost,
    },
    revalidate: 60,
  };
}

const Home = ({ latestPost }: HomeProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Aaron Chan</title>
        <meta name="description" content="Aaron Chan - ML Researcher" />
      </Head>

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/profile2.jpeg"
            alt="Aaron Chan"
            width={88}
            height={88}
            className="rounded-full mb-6 shadow-sm"
            priority
          />
          <h1 className="text-[26px] font-heading font-semibold tracking-tight">
            Aaron Chan
          </h1>
          
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-lg">
            Research engineering at Cursor on the{" "}
            <a 
              href="https://cursor.com/blog/composer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-accent"
            >
              Composer model series
            </a>.
          </p>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-lg">
            Previously built AI systems for legal work at{" "}
            <a
              href="https://harvey.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
            >
              Harvey
            </a>, and developed AI models for bug detection at Microsoft Research.
          </p>

          {latestPost && (
            <p className="mt-6 text-base text-muted">
              Recently wrote about{" "}
              <Link href={`/posts/${latestPost.slug}`} className="link-accent">
                {latestPost.title}
              </Link>.
            </p>
          )}

          <div className="mt-8 flex items-center gap-5">
            <a
              href="/files/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon group relative"
              aria-label="Resume"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-heading bg-[#4A4036] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Resume
              </span>
            </a>
            <SocialIcon href="https://github.com/aayc" icon="github" />
            <SocialIcon href="https://linkedin.com/in/aaron-y-chan" icon="linkedin" />
            <SocialIcon href="https://twitter.com/aaronychan" icon="twitter" />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
