import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
    <div className="rounded-lg bg-gray-100 flex">
      <FontAwesomeIcon icon={faSearch} className="my-3 ml-2" />
      <input
        type="text"
        className="w-full h-10 px-2 focus:outline-none bg-gray-100 rounded-lg"
        placeholder="Search..."
      />
    </div>
  );
}
