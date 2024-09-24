"use client";
import { motion } from "framer-motion";

export default function TrendsTitle({ className }) {
  return (
    <motion.h1 className={className} style={{originY: 0, originX: 0, originZ: 0}}>
      TRENDING KEYWORDS
    </motion.h1>
  );
}
