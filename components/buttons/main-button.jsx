import { motion } from "framer-motion";
export default function MainButton({ children, classes = "", ...props }) {
  const baseClasses =
    "w-40 h-10 rounded-xl border-none bg-gradient-to-r from-custom-teal to-custom-darkerTeal text-white text-sm hover:shadow-[0_0_10px_0_#36BFB1] transition-shadow";

  return (
    <motion.button className={`${baseClasses} ${classes}`} {...props}>
      {children}
    </motion.button>
  );
}
