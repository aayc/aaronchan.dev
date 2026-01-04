import Head from "next/head";
import { motion } from "framer-motion";
import SocialIcon from "../components/SocialIcon";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Head>
        <title>Aaron Chan</title>
        <meta name="description" content="Aaron Chan - ML Researcher" />
      </Head>

      <main className="max-w-2xl mx-auto px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[26px] font-heading font-semibold tracking-tight">
            Aaron Chan
          </h1>
          
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-lg">
            Research engineering at Cursor on the{" "}
            <a 
              href="https://cursor.com/blog/composer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text underline decoration-stone-300 underline-offset-2 hover:decoration-stone-500 transition-colors"
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
              className="text-text underline decoration-stone-300 underline-offset-2 hover:decoration-stone-500 transition-colors"
            >
              Harvey
            </a>, and developed AI models for bug detection at Microsoft Research.
          </p>

          <div className="mt-12 flex items-center gap-1">
            <a
              href="/files/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center w-10 h-10 text-muted hover:text-text transition-colors duration-150"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
                <path d="M8 12h8v2H8zm0 4h8v2H8z"/>
              </svg>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-heading bg-stone-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
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
