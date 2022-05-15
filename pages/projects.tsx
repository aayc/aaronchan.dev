import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Tile() {
  const [isHovering, setIsHovering] = useState(false);
  return <div className="flex flex-col justify-center items-center"></div>;
}

/*
Write articles about all of these??
- MSFT Research
- Tiedye
- WhatsApp
- Matchmaker
- Google Foobar
- Elon Microfinance Seed Effect
- Paper about stroke detection - Archibald
- Az Powershell extension release
- NASA Project
- MAgpie Labs project
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
