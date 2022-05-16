import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMetadata } from "../components/PostTypes";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSquareArrowUpRight,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";
import { MotionConfig } from "framer-motion";
import { AnimateUpReveal } from "../components/animations/AnimationToolkit";
import Link from "next/link";
import Footer from "../components/Footer";

function Tile() {
  const [isHovering, setIsHovering] = useState(false);
  return <div className="flex flex-col justify-center items-center"></div>;
}

type ProjectsProps = {
  projects: { metadata: PostMetadata; slug: string }[];
};

/*
Write articles about all of these??
- Paper about stroke detection - Archibald 2x1
    - post
- Az Powershell extension release 2x1
    - just link to their post
- MAgpie Labs project 1x1
    - post siamese networks
*/

function Projects(props: ProjectsProps) {
  const [isHovering, setIsHovering] = useState(
    props.projects.map((_) => false)
  );

  const viewProject = (index: number) => {
    const project = props.projects[index];
    window.open(project.slug.replace("mdx/", ""), "_blank");
  };

  return (
    <div>
      <div className="m-auto max-w-7xl">
        <NavBar></NavBar>

        <div className="mt-12">
          <h2>Projects</h2>
          <p className="mt-8 text-md">
            <i>"Whatever good things we build end up building us"</i> - Jim Rohn
          </p>

          {/* Build a grid of project tiles TODO Change this to grid instead of flex.. */}
          <div className="mt-8 grid gap-4 grid-cols-1 lg:grid-cols-3 mdsm:grid-cols-2">
            {props.projects.map((project, i) => (
              <div
                key={project.metadata.title}
                className="w-96 h-96 mt-8 shadow-md transition ease-in-out hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundImage: `url('${project.metadata.thumbnailUrl}')`,
                  backgroundSize: "contain",
                }}
              >
                <div className="h-full flex flex-col justify-between">
                  <span></span>
                  <AnimateUpReveal>
                    <div className="bg-black p-4 text-white flex flex-row justify-between">
                      <div>
                        <p>{project.metadata.title}</p>
                        <p className="text-sm mt-2">
                          {project.metadata.description}
                        </p>
                      </div>
                      <Link href={project.slug.replace("mdx/", "")}>
                        <FontAwesomeIcon
                          icon={faSquareArrowUpRight}
                          className="transition ease-in-out hover:scale-110 hover:animate-pulse cursor-pointer"
                          size="2x"
                        ></FontAwesomeIcon>
                      </Link>
                    </div>
                  </AnimateUpReveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("mdx", "projects"));
  const projects = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("mdx", "projects", filename),
      "utf-8"
    );
    const { data: metadata } = matter(markdownWithMeta);
    return {
      metadata,
      slug: path.join("mdx", "projects", filename.split(".")[0]),
    };
  });
  projects.sort((a, b) =>
    moment(a.metadata.sortDate).isAfter(moment(b.metadata.sortDate)) ? -1 : 1
  );
  return {
    props: {
      projects,
    },
  };
};

export default Projects;
