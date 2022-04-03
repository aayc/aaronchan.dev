import React from "react";
import NavLink from "./small/NavLink";

export default function NavBar() {
  return (
    <div className="flex justify-between mt-8">
      <div>
        <NavLink href="/">Your Blog Name Here</NavLink>
      </div>
      <div>
        <NavLink href="/signin">option</NavLink>
      </div>
    </div>
  );
}
