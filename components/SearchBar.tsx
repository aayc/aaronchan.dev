import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

export default function SearchBar() {
  const [searchResults, setSearchResults]: any = useState([]);
  const searchTerms: { [key: string]: string } = {
    projects: "/projects",
    blog: "/blog",
    contact: "/contact",
    home: "/",
  };

  const search = (text: string) => {
    if (text.trim().length == 0) {
      setSearchResults([]);
      return;
    }
    const searchKeys = Object.keys(searchTerms);
    const results = searchKeys.filter((key) =>
      key.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(results.map((key: string) => [key, searchTerms[key]]));
  };
  return (
    <div className="relative" style={{ perspective: "2000px" }}>
      <div className="rounded-lg bg-gray-100 flex">
        <FontAwesomeIcon icon={faSearch} className="my-3 ml-2" />
        <input
          type="text"
          className="w-full h-10 px-2 focus:outline-none bg-gray-100 rounded-lg"
          placeholder="Search..."
          onChange={(e) => search(e.target.value)}
        />
      </div>
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="origin-top-right absolute left-0 mt-2 bg-gray-100 w-full rounded-lg px-4 py-2 text-md">
              {searchResults.map(([key, value]: [string, string]) => (
                <a key={key} href={value} className="block p-2 text-black">
                  {key}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
