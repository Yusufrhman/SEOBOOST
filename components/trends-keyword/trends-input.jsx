"use client";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useRouter } from "nextjs-toploader/app";

export default function TrendsInput({ className }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    // Redirect to the trends page with the query in the URL
    router.push(`/dashboard/trends/${encodeURIComponent(query)}`);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      layoutId="trendsinput"
      className={className}
    >
      <input
        type="text"
        className="block w-[100%] pl-6 pr-12 py-2 rounded-full bg-transparent border-2 border-neutral-500 text-white focus:outline-none focus:border-custom-teal font-thingroup"
        required
        placeholder="Explore Hot Trendings..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" aria-label="Search">
        <IconSearch
          stroke={2}
          className="absolute right-4 top-2 bottom-0 text-neutral-400"
        />
      </button>
    </motion.form>
  );
}
