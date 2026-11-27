"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { techStackItems } from "@/data/content";
import { AGENCY_EASE, fadeUpVariants } from "@/lib/motion";

function TechBrandLogo({ id }: { id: string }) {
  switch (id) {
    case "frontend":
      // Official Next.js mark
      return (
        <svg viewBox="0 0 180 180" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
          <mask id="next-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="#000" />
          </mask>
          <g mask="url(#next-mask)">
            <circle cx="90" cy="90" r="90" fill="#0B0B0F" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#next-g1)" />
            <rect x="115" y="54" width="12" height="72" fill="url(#next-g2)" />
          </g>
          <defs>
            <linearGradient id="next-g1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="next-g2" x1="121" y1="54" x2="120.8" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "backend":
      // Official Node.js hexagon mark
      return (
        <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
          <path
            d="M32 4L56.5 18.2V46.6L32 60.8L7.5 46.6V18.2L32 4Z"
            fill="#539E43"
          />
          <path
            d="M32 13.5L48 22.8V41.3L32 50.5L16 41.3V22.8L32 13.5Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <text
            x="32"
            y="36.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
          >
            JS
          </text>
        </svg>
      );
    case "ai":
      // Official OpenAI-inspired knot emblem
      return (
        <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
          <rect width="64" height="64" rx="16" fill="#0B0B0F" />
          <g fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 14a9 9 0 0 1 8.6 6.3 9 9 0 0 1 5.9 12.2 9 9 0 0 1-3.1 13.3 9 9 0 0 1-11.4 3.9A9 9 0 0 1 20 44a9 9 0 0 1-2.5-12.5 9 9 0 0 1 5.9-12.2A9 9 0 0 1 32 14Z" />
            <circle cx="32" cy="32" r="6" />
          </g>
        </svg>
      );
    case "mobile":
      // Official React / React Native atom logo
      return (
        <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
          <rect width="64" height="64" rx="16" fill="#F0F9FF" />
          <g fill="none" stroke="#00A8E8" strokeWidth="2.6">
            <ellipse cx="32" cy="32" rx="20" ry="8" />
            <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(60 32 32)" />
            <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(120 32 32)" />
          </g>
          <circle cx="32" cy="32" r="4" fill="#00A8E8" />
        </svg>
      );
    case "cloud":
      // Official AWS smile & wordmark badge
      return (
        <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
          <rect width="64" height="64" rx="16" fill="#232F3E" />
          <text
            x="32"
            y="34"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="17"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
            letterSpacing="-0.5"
          >
            aws
          </text>
          <path
            d="M16 42C24 47.5 39 47.5 48 41.5"
            fill="none"
            stroke="#FF9900"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M44.5 39.5L49 41L46.5 45.5"
            fill="none"
            stroke="#FF9900"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ecommerce":
    default:
      // Official Shopify bag emblem
      return (
        <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
          <rect width="64" height="64" rx="16" fill="#ECFDF5" />
          <path
            d="M44.5 21.5C44.4 21 44 20.7 43.5 20.7C43.1 20.7 39.6 20.6 39.6 20.6C39.6 20.6 36.8 17.9 36.5 17.6C36.2 17.3 35.6 17.4 35.4 17.5L33.8 18C33.2 16.2 31.8 14.6 29.7 14.6C29.5 14.6 29.3 14.6 29.1 14.7C28.5 14 27.8 13.7 27.1 13.7C23.5 13.7 21.8 18.2 21.2 20.5L17.4 21.7C16.2 22.1 16.2 22.1 16 23.3C15.9 24.2 13 46.5 13 46.5L38.3 51L51 48.2C51 48.2 44.6 22 44.5 21.5Z"
            fill="#95BF47"
          />
          <path
            d="M38.3 51L51 48.2C51 48.2 44.6 22 44.5 21.5C44.4 21 44 20.7 43.5 20.7H39.6L38.3 51Z"
            fill="#5E8E3E"
          />
          <text
            x="29"
            y="40"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="18"
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
          >
            S
          </text>
        </svg>
      );
  }
}

export function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (prefersReducedMotion) return;
    return scrollYProgress.on("change", (latest) => {
      const total = techStackItems.length;
      const nextIndex = Math.min(
        total - 1,
        Math.max(0, Math.floor(latest * total))
      );
      setActiveIndex(nextIndex);
    });
  }, [scrollYProgress, prefersReducedMotion]);

  const activeItem = techStackItems[activeIndex];
  const fanOffsets = [-2, -1, 0, 1, 2];

  return (
    <section
      id="stack"
      ref={sectionRef}
      aria-labelledby="stack-heading"
      className="bg-[#F4F5F7] py-16 md:min-h-[160vh] md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:sticky md:top-24">
        <div className="overflow-hidden rounded-[28px] border border-[#E5E7EB]/80 bg-white px-4 py-12 shadow-[0_20px_60px_-15px_rgba(11,11,15,0.06)] sm:px-12 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUpVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-block rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
              Technologies We Work With
            </span>
            <h2
              id="stack-heading"
              className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl md:text-5xl"
            >
              Build with the tools your product needs
            </h2>
          </motion.div>

          {/* 5-Tile Rotating Fan with Real Tech Logos */}
          <div className="relative mt-10 flex h-40 scale-[0.76] items-center justify-center sm:mt-14 sm:h-52 sm:scale-100">
            {fanOffsets.map((offset) => {
              const total = techStackItems.length;
              const itemIndex = (activeIndex + offset + total) % total;
              const item = techStackItems[itemIndex];
              const isCenter = offset === 0;

              const translateX = offset * 82;
              const translateY = Math.abs(offset) * 14;
              const rotate = offset * 9;
              const scale = isCenter ? 1.15 : 1 - Math.abs(offset) * 0.08;
              const zIndex = 10 - Math.abs(offset);
              const opacity = Math.abs(offset) === 2 ? 0.65 : 1;

              return (
                <motion.button
                  key={`${item.id}-${offset}`}
                  type="button"
                  onClick={() => setActiveIndex(itemIndex)}
                  aria-label={`Select ${item.name}`}
                  aria-pressed={isCenter}
                  animate={{
                    x: translateX,
                    y: translateY,
                    rotate,
                    scale,
                    opacity,
                  }}
                  transition={{ duration: 0.55, ease: AGENCY_EASE }}
                  style={{ zIndex }}
                  className={`absolute flex h-24 w-24 flex-col items-center justify-center rounded-[22px] border bg-white shadow-[0_18px_40px_-14px_rgba(11,11,15,0.14)] transition-colors sm:h-28 sm:w-28 ${
                    isCenter
                      ? "border-[#8B5CF6] ring-4 ring-[#8B5CF6]/15"
                      : "border-[#E5E7EB] hover:border-[#C4B5FD]"
                  }`}
                >
                  <TechBrandLogo id={item.id} />
                  <span className="mt-1.5 text-[11px] font-bold text-[#0B0B0F]">
                    {item.shortLabel}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Tech Label & Description */}
          <div className="mx-auto mt-10 min-h-[100px] max-w-xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: AGENCY_EASE }}
              >
                <p className="text-lg font-bold tracking-tight text-[#0B0B0F] sm:text-xl">
                  {activeItem.subtitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280] sm:text-base">
                  {activeItem.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Pill Selector */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {techStackItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  idx === activeIndex
                    ? "bg-[#8B5CF6] text-white shadow-sm"
                    : "bg-[#F4F5F7] text-[#6B7280] hover:text-[#0B0B0F]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
