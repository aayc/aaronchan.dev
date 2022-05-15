import React from "react";
import SearchBar from "./SearchBar";
import NavLink from "./small/NavLink";

export default function NavBar() {
  return (
    <div className="flex justify-between mt-8 m-auto max-w-7xl">
      <div className="w-56">
        <NavLink href="/">Aaron's Space</NavLink>
      </div>
      <div>
        <NavLink href="/">about</NavLink>
        <NavLink href="/">opinions</NavLink>
        <NavLink href="/">projects</NavLink>
        <NavLink href="/">contact</NavLink>
      </div>
      <div>
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}
