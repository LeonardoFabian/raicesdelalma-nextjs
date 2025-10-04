"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const PageTransition = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 40,
          duration: 0.2,
        }}
        className="w-full max-w-screen-xl mx-auto"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
