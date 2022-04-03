import React from "react";
import NavLink from "./small/NavLink";

export default function SideBar() {
  return (
    <div className="pr-48">
      <NavLink href="/love">i ❤️</NavLink>
      <br />
      <br />
      <NavLink href="/believe">i believe in</NavLink>
      <br />
      <br />
      <NavLink href="/social-causes">social causes</NavLink>
    </div>
  );
}
