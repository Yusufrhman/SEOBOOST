"use client";
import { motion } from "framer-motion";
export default function TrendsContainer({ children, className, ...props }) {
  return (
      <motion.section
          initial={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 100 }}
      transition={{duration: 0.5}}
      {...props}
      className={
        "w-[15rem] h-[15rem] border border-neutral-500 bg-neutral-900 rounded-lg " +
        className
      }
      whileHover={{ backgroundColor: "#0d0d0d" }}
    >
      {children}
    </motion.section>
  );
}
