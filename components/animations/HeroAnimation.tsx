import React from "react";
import { motion } from "framer-motion";
import CircleAnimation from "./CircleAnimation";

export default function HeroAnimation() {
  const pointWidth = 8;
  const pointSize = 40;
  const lineWidth = 3;
  const axisDuration = 3;

  const points = [
    ["10%", "10%", "#205375"],
    ["12%", "70%", "#F66B0E"],
    ["22%", "40%", "#F66B0E"],
    ["28%", "15%", "#205375"],
    ["42%", "62%", "#F66B0E"],
    ["55%", "32%", "#205375"],
    ["67%", "45%", "#F66B0E"],
    ["72%", "17%", "#205375"],
    ["90%", "83%", "#F66B0E"],
  ];

  return (
    <div style={{ width: "100%", height: 500 }} className="relative mt-12">
      <motion.div
        initial={{ width: 0, height: lineWidth }}
        animate={{ width: "100%", height: lineWidth }}
        style={{ transform: "translateY(-100%)" }}
        className="bg-black absolute bottom-4"
        transition={{ duration: axisDuration }}
      ></motion.div>
      <motion.div
        initial={{ width: lineWidth, height: 0 }}
        animate={{ width: lineWidth, height: 520 }}
        style={{ transform: "" }}
        className="bg-black absolute bottom-0 left-8"
        transition={{ duration: axisDuration }}
      ></motion.div>
      {points.map(([left, top, color], i) => (
        <CircleAnimation
          key={`${left}-${top}-${color}`}
          width={pointSize}
          height={pointSize}
          delay={i * Math.random() * 0.25 + 2}
          strokeWidth={pointWidth}
          color={color}
          style={{ position: "absolute", left, top }}
        ></CircleAnimation>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="absolute right-8 rounded-lg bg-white p-4 shadow-md"
      >
        <div className="flex justify-between m-auto max-w-2xl ">
          <div className="">
            <img
              className="rounded-full"
              src={"/profile.jpg"}
              width={80}
              height={80}
            ></img>
          </div>
          <div className=" ml-6">
            <h1 className="text-xl">Aaron Chan</h1>
            <br />
            <h5 className="text-md code">ABOUT ME</h5>
            <p>Lorem ipsum dolor...</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
