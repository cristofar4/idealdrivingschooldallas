"use client";

import { motion } from "framer-motion";

/**
 * Page transition wrapper. Re-mounts on each navigation.
 * Opacity-only (no transform) so it never breaks `position: sticky` children.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
