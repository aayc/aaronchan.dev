import { motion, AnimatePresence } from "framer-motion";

function AnimateUpReveal({
  children,
  key = undefined,
  delay = 0,
  duration = 1,
}: any) {
  return (
    <motion.div
      key={key}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

function TransitioningText({ text, index }: any) {
  return (
    <AnimatePresence>
      <motion.div
        key={index}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 1, delay: 0 }}
      >
        <span className="text-purple-500 block mb-3">{text}</span>
      </motion.div>
    </AnimatePresence>
  );
}

export { AnimateUpReveal, TransitioningText };
