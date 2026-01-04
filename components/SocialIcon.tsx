import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

type SocialIconProps = {
  href: string;
  icon: "github" | "linkedin" | "twitter";
};

export default function SocialIcon({ href, icon }: SocialIconProps) {
  const iconMap = {
    github: faGithub,
    linkedin: faLinkedin,
    twitter: faTwitter,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 text-muted hover:text-text transition-colors duration-150"
    >
      <FontAwesomeIcon icon={iconMap[icon]} className="w-5 h-5" />
    </a>
  );
}
