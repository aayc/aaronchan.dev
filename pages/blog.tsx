import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMetadata } from "../components/PostTypes";
import moment from "moment";
import Link from "next/link";
import mixpanelTracker from "../utils/mixpanel";

type BlogPageProps = {
  posts: { metadata: PostMetadata; slug: string }[];
};

function unique(arr: string[]) {
  return [...new Set(arr)];
}

function Blog(props: BlogPageProps) {
  const topics = unique(
    props.posts
      .filter((x) => x.metadata.topic !== "hidden")
      .map((x) => x.metadata.topic)
  );
  const tags = unique(
    props.posts
      .filter((x) => x.metadata.topic !== "hidden")
      .map((x) => x.metadata.tags)
      .flat()
  );
  topics.sort();
  tags.sort();
  const [page, setPage] = useState(1);
  const [includeTopics, setIncludeTopics] = useState(topics.map((_) => true));
  const [includeTags, setIncludeTags] = useState(tags.map((_) => true));

  const posts = props.posts.filter(
    (x) =>
      x.metadata.topic !== "hidden" &&
      includeTopics[topics.indexOf(x.metadata.topic)] &&
      tags.some(
        (tag) => x.metadata.tags.includes(tag) && includeTags[tags.indexOf(tag)]
      )
  );

  const monthYears = unique(
    posts.map((x) => x.metadata.sortDate.split("-").slice(0, 2).join("-"))
  );
  monthYears.sort().reverse();

  const handlePostClick = (postTitle: string, postSlug: string) => {
    mixpanelTracker.trackAction("Blog Post Click", {
      title: postTitle,
      slug: postSlug
    });
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="m-auto max-w-7xl px-4">
        <div className="mt-12">
          <h2>Blog</h2>
        </div>
        <div className="mt-12">
          {posts
            .sort((a, b) =>
              b.metadata.sortDate.localeCompare(a.metadata.sortDate)
            )
            .map((post) => {
              return (
                <div className="text-xl" key={post.slug}>
                  <Link
                    href={`/${post.slug.replace("mdx/", "")}`}
                    passHref={true}
                    key={post.slug}
                  >
                    <span 
                      className="ml-8 mt-4 inline-block transition ease-in-out hover:opacity-50 duration-1 cursor-pointer"
                      onClick={() => handlePostClick(post.metadata.title, post.slug)}
                    >
                      <b>-</b> {post.metadata.title}
                    </span>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

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

export default Blog;
