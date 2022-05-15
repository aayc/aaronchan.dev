import React from "react";
import { motion } from "framer-motion";

type CircleAnimationProps = {
  width: number;
  height: number;
  className?: string;
  style?: any;
  strokeWidth?: number;
  color?: string;
  delay?: number;
};

const computeDraw = (delay: number) => {
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };
};

export default function CircleAnimation(props: CircleAnimationProps) {
  return (
    <div style={props.style ?? ""} className={props.className ?? ""}>
      <motion.svg
        className={props.className ?? ""}
        width={props.width}
        height={props.height}
        viewBox={`0 0 ${props.width} ${props.height}`}
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx={(props.width / 10) * 3}
          cy={(props.height / 10) * 3}
          r={props.width / 10}
          stroke={props.color ?? "#ff0055"}
          strokeWidth={props.strokeWidth ?? 10}
          variants={computeDraw(props.delay ?? 0)}
          custom={1}
        />
      </motion.svg>
    </div>
  );
}
