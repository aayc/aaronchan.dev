import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMetadata } from "../components/PostTypes";
import moment from "moment";
import Tag from "../components/small/Tag";
import Link from "next/link";
import Dropdown from "../components/Dropdown";
import MultipleSelect from "../components/MultipleSelect";
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

  const toggleTag = (tag: string) => {
    const tagIndex = tags.indexOf(tag);
    setIncludeTags([
      ...includeTags.slice(0, tagIndex),
      !includeTags[tagIndex],
      ...includeTags.slice(tagIndex + 1),
    ]);
  };

  const filterByTopic = (topic: string) => {};

  return (
    <div>
      <NavBar></NavBar>
      <div className="m-auto max-w-7xl px-4">
        <div className="mt-12">
          <h2>Blog</h2>
        </div>

        {/*
        <div className="mt-12 flex">
          <MultipleSelect placeholder="By Topic" options={topics} onChange={filterByTopic} />
          <MultipleSelect className="ml-2" placeholder="By Tag" options={topics} onChange={filterByTopic} />
          <MultipleSelect className="ml-2" placeholder="By Year" options={topics} onChange={filterByTopic} />
        </div>

        <div className="mt-12">
          <div
            className="md:max-w-2xl shadow-md p-8 min-w-fit"
            style={{ minWidth: 300 }}
          >
            <h4>By Topic</h4>
            <div className="mt-4">
              {topics.map((topic, index) => (
                <div key={index}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={includeTopics[index]}
                      onChange={(e) => {
                        const newIncludeTopics = [...includeTopics];
                        newIncludeTopics[index] = e.target.checked;
                        setIncludeTopics(newIncludeTopics);
                      }}
                    />
                    <span className="ml-2">{topic}</span>
                  </label>
                </div>
              ))}
            </div>
            <br />

            <br />
            <h4>By Tag</h4>
            <div className="mt-4">
              {tags.map((tag, index) => (
                <Tag
                  className="mr-2"
                  isSelected={includeTags[index]}
                  onClick={toggleTag}
                  key={index}
                  text={tag}
                ></Tag>
              ))}
            </div>
              </div>*/}
        <div className="mt-12">
          {monthYears.map((monthYear) => {
            const postsForMonth = posts.filter(
              (x) =>
                x.metadata.sortDate.split("-").slice(0, 2).join("-") ===
                monthYear
            );
            return (
              <div key={monthYear} className="flex flex-col mb-10">
                <h4>{moment(monthYear, "YYYY-MM").format("MMMM, YYYY")}</h4>
                {postsForMonth.map((post) => {
                  return (
                    <div className="inline" key={post.slug}>
                      <Link
                        href={`/${post.slug.replace("mdx/", "")}`}
                        passHref={true}
                        key={post.slug}
                      >
                        <span className="ml-8 mt-4 inline-block transition ease-in-out hover:-translate-y-1 duration-1 cursor-pointer">
                          <b>-</b> {post.metadata.title}
                        </span>
                      </Link>
                    </div>
                  );
                })}
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
