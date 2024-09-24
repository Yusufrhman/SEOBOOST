"use client"
import { IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function TrendsInput({ className }) {
  return (
    <motion.div
      layoutId="trendsinput"
      className={
    className
      }
    >
      <input
        type="text"
        className="block w-[100%] pl-6 pr-12 py-2 rounded-full bg-transparent border-2 border-neutral-500 text-white focus:outline-none focus:border-custom-teal font-thingroup"
        required
        placeholder="Explore Hot Trendings..." 
      />
      <button type="button" aria-label="Search">
        <IconSearch
          stroke={2}
          className="absolute right-4 top-2 bottom-0 text-neutral-400"
        />
      </button>
    </motion.div>
  );
}
