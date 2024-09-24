"use client"
import { IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
export default function Dashboard() {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <article className="w-full h-full flex flex-col items-center justify-center gap-[2rem]">
          <div>
            <h1 className="text-white text-center">TRENDING KEYWORDS</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
              <motion.section
                className="w-[15rem] h-[15rem] border border-neutral-500 bg-neutral-900 rounded-lg"
                whileHover={{ backgroundColor: "#0d0d0d" }}
              ></motion.section>
              <motion.section
                className="w-[15rem] h-[15rem] border border-neutral-500 bg-neutral-900 rounded-lg"
                whileHover={{ backgroundColor: "#0d0d0d" }}
              ></motion.section>
              <motion.section
                className="w-[15rem] h-[15rem] border border-neutral-500 bg-neutral-900 rounded-lg"
                whileHover={{ backgroundColor: "#0d0d0d" }}
              ></motion.section>
              <motion.section
                className="w-[15rem] h-[15rem] border border-neutral-500 bg-neutral-900 rounded-lg"
                whileHover={{ backgroundColor: "#0d0d0d" }}
              ></motion.section>
            </div>
          </div>
          <div className="relative w-[90%] max-w-[35rem]">
            <input
              type="text"
              className="block w-[100%] pl-6 pr-12 py-2 rounded-full bg-transparent border-2 border-neutral-500 text-white focus:outline-none focus:border-custom-teal font-thin text-xl group"
              required
              placeholder="Explore Hot Trendings..." // Optional placeholder for better UX
            />
            <button type="button" aria-label="Search">
              <IconSearch
                stroke={2}
                className="absolute right-4 top-3 bottom-0 text-neutral-400"
              />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
