"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AGENCY_EASE } from "@/lib/motion";

export function PageLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 550);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  const shouldRender = visible && !prefersReducedMotion;

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          key="page-loader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: AGENCY_EASE } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: [0.85, 1.04, 1], opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.45, ease: AGENCY_EASE }}
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0_18px_45px_-10px_rgba(11,11,15,0.14)]"
          >
            <Image
              src="/images/logo.png"
              alt="Dhrubo IT"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
