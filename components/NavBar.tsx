import React from "react";
import SearchBar from "./SearchBar";
import NavLink from "./small/NavLink";

export default function NavBar() {
  return (
    <div className="flex flex-col md:flex-row justify-between mt-8 m-auto max-w-7xl px-4">
      <div className="w-56">
        <NavLink href="/">Aaron Chan</NavLink>
      </div>
      <div>
        {/*<NavLink href="/posts/about">about</NavLink>*/}
        <NavLink href="/blog">blog</NavLink>
        <NavLink href="/projects">projects</NavLink>
        <NavLink href="/contact">contact</NavLink>
      </div>
      <div>
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}
