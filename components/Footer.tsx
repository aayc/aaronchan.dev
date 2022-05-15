import React from "react";

export default function Footer() {
  return (
    <div className="bg-black w-full pt-24 pb-16">
      <div className="flex justify-center mt-8 m-auto max-w-7xl text-white">
        Copyright {new Date().getFullYear()} Aaron Chan
      </div>
    </div>
  );
}
