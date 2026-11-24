"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { AGENCY_EASE } from "@/lib/motion";

export function BackToTopButton() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: AGENCY_EASE }}
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/95 text-[#0B0B0F] shadow-[0_14px_35px_-10px_rgba(11,11,15,0.18)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white"
        >
          <ArrowUp className="h-4 w-4 stroke-[2.25]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
