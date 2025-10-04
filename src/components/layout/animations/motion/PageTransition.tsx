"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: React.StyleHTMLAttributes<HTMLDivElement>["className"];
}

const PageTransition = ({ children, className }: Props) => {
  const pathname = usePathname();
  const [displayedPathname, setDisplayedPathname] = useState(pathname);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedPathname(pathname);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={displayedPathname}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
