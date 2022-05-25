import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

type SocialIconProps = {
  href: string;
  className?: string;
  icon: "github" | "linkedin" | "twitter" | "instagram";
};

export default function SocialIcon(props: SocialIconProps) {
  const iconToUse =
    props.icon === "github"
      ? faGithub
      : props.icon === "linkedin"
      ? faLinkedin
      : props.icon === "twitter"
      ? faTwitter
      : faInstagram;

  const colorToUse =
    props.icon === "github"
      ? "text-gray-600"
      : props.icon === "linkedin"
      ? "text-blue-700"
      : props.icon === "twitter"
      ? "text-blue-400"
      : "text-gray-600";

  const hoverColorToUse =
    props.icon === "github"
      ? "hover:text-black"
      : props.icon === "linkedin"
      ? "hover:text-blue-800"
      : props.icon === "twitter"
      ? "hover:text-blue-500"
      : "hover:text-black";

  return (
    <div className={`pb-2 inline-block ${props.className ?? ""}`}>
      <a href={props.href}>
        <FontAwesomeIcon
          className={`rounded-full w-12 h-16 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 ${colorToUse} ${hoverColorToUse}`}
          icon={iconToUse}
          size={"2x"}
        />
      </a>
    </div>
  );
}
