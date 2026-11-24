"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type CursorVariant = "default" | "pointer" | "view" | "text";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring trails with a crisp, smooth spring
  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const isFinePointer = window.matchMedia(
      "(pointer: fine) and (hover: hover)"
    ).matches;
    if (!isFinePointer) return;

    // Defer state update out of synchronous effect body
    const rafEnable = requestAnimationFrame(() => {
      setEnabled(true);
      document.documentElement.classList.add("custom-cursor-active");
    });

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setVariant("default");
        return;
      }

      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        setVariant("text");
      } else if (target.closest("[data-cursor='view']")) {
        setVariant("view");
      } else if (
        target.closest("a, button, [role='button'], label[for]")
      ) {
        setVariant("pointer");
      } else {
        setVariant("default");
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      cancelAnimationFrame(rafEnable);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  const isText = variant === "text";
  const isView = variant === "view";
  const isPointer = variant === "pointer";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Trailing Outer Ring / View Pill */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible && !isText ? 1 : 0,
          width: isView ? 88 : isPointer ? 48 : 34,
          height: isView ? 34 : isPointer ? 48 : 34,
          scale: pressed ? 0.85 : 1,
          backgroundColor: isView
            ? "rgba(139, 92, 246, 0.95)"
            : isPointer
              ? "rgba(139, 92, 246, 0.12)"
              : "rgba(11, 11, 15, 0)",
          borderColor: isView
            ? "rgba(139, 92, 246, 1)"
            : isPointer
              ? "rgba(139, 92, 246, 0.7)"
              : "rgba(11, 11, 15, 0.28)",
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border-[1.5px] shadow-[0_6px_20px_-6px_rgba(139,92,246,0.3)] backdrop-blur-[1px]"
      >
        {isView && (
          <span className="text-[11px] font-bold tracking-wide text-white">
            View Case
          </span>
        )}
      </motion.div>

      {/* Precision Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible && !isText && !isView ? 1 : 0,
          scale: pressed ? 1.5 : isPointer ? 0.6 : 1,
          backgroundColor: isPointer ? "#8B5CF6" : "#0B0B0F",
        }}
        transition={{ duration: 0.12 }}
        className="fixed left-0 top-0 h-2 w-2 rounded-full"
      />
    </div>
  );
}
