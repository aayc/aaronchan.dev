import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Tile() {
  const [isHovering, setIsHovering] = useState(false);
  return <div className="flex flex-col justify-center items-center"></div>;
}

/*
Write articles about all of these??
- MSFT Research 2x1
- Tiedye 1x1
    - the journey of tiedye
- WhatsApp 1x1
    - experience at facebook
- Matchmaker 1x1
    - post
- Google Foobar 2x1
- Elon Microfinance Seed Effect 1x1
    - post
- Paper about stroke detection - Archibald 2x1
    - post
- Az Powershell extension release 2x1
    - just link to their post
- NASA Project 2x1
    - post
- MAgpie Labs project 1x1
    - post siamese networks
*/

export default function Projects() {
  return (
    <div>
      <div className="m-auto max-w-7xl">
        <NavBar></NavBar>

        <div className="mt-12">
          <h2>Projects</h2>
          <p className="mt-8 text-md">
            <i>"Whatever good things we build end up building us"</i> - Jim Rohn
          </p>
        </div>
      </div>
    </div>
  );
}
