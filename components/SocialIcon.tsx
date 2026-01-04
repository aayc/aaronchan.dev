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
      className="social-icon"
      aria-label={icon}
    >
      <FontAwesomeIcon icon={iconMap[icon]} className="w-5 h-5" />
    </a>
  );
}
