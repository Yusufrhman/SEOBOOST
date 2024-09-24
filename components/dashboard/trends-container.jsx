"use client";
import { motion } from "framer-motion";
export default function TrendsContainer({ children, className }) {
  return (
    <motion.section
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
