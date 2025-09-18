"use client";

import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowUp, MdArrowUpward } from "react-icons/md";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollTotop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollTotop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 p-3 flex items-center justify-center w-12 h-12 cursor-pointer text-white bg-primary rounded-full hover:bg-primary-hover shadow-2xl transition-opacity duration-300"
    >
      <MdArrowUpward size={24} className="animate-bounce" />
    </button>
  );
};
