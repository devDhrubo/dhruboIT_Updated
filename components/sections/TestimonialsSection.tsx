"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Award } from "lucide-react";
import { testimonials, upworkBadges } from "@/data/content";
import { AGENCY_EASE, fadeUpVariants } from "@/lib/motion";

function getInitials(name: string) {
  const cleaned = name.replace(/^(Engr\.|Dr\.|Mr\.|Ms\.)\s+/i, "").trim();
  const parts = cleaned.split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // White card slides up out of the violet envelope as section scrolls into view
  const cardSlideY = useTransform(scrollYProgress, [0.15, 0.85], [88, 0]);

  const total = testimonials.length;
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const active = testimonials[activeIndex];
  const prevItem = testimonials[prevIndex];
  const nextItem = testimonials[nextIndex];

  const handlePrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const handleNext = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-[#F4F5F7] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUpVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
            Client Reviews
          </span>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl md:text-5xl"
          >
            Words of Appreciation
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            Verified feedback from enterprise leaders, founders, and CTOs
            worldwide.
          </p>
        </motion.div>

        {/* Envelope + Peeking Side Cards Stage */}
        <div className="relative mx-auto mt-16 flex max-w-4xl items-center justify-center">
          {/* Left Peeking Blurred & Tilted Card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-8 top-12 hidden w-72 -rotate-6 rounded-[24px] border border-[#E5E7EB] bg-white/80 p-6 opacity-65 shadow-lg blur-[2px] lg:block"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-xs font-extrabold text-[#8B5CF6]">
                {getInitials(prevItem.name)}
              </span>
              <div>
                <p className="text-sm font-bold text-[#0B0B0F]">
                  {prevItem.name}
                </p>
                <p className="text-xs text-[#6B7280]">{prevItem.company}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-3 text-xs text-[#6B7280]">
              &ldquo;{prevItem.quote}&rdquo;
            </p>
          </div>

          {/* Right Peeking Blurred & Tilted Card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 top-12 hidden w-72 rotate-6 rounded-[24px] border border-[#E5E7EB] bg-white/80 p-6 opacity-65 shadow-lg blur-[2px] lg:block"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-xs font-extrabold text-[#8B5CF6]">
                {getInitials(nextItem.name)}
              </span>
              <div>
                <p className="text-sm font-bold text-[#0B0B0F]">
                  {nextItem.name}
                </p>
                <p className="text-xs text-[#6B7280]">{nextItem.company}</p>
              </div>
            </div>
            <p className="mt-3 line-clamp-3 text-xs text-[#6B7280]">
              &ldquo;{nextItem.quote}&rdquo;
            </p>
          </div>

          {/* Center Violet Envelope + Sliding White Card */}
          <div className="relative z-10 w-full max-w-xl pt-6">
            {/* Back Flap of Violet Envelope */}
            <div
              aria-hidden="true"
              className="mx-auto h-12 w-[92%] rounded-t-[24px] bg-[#7C3AED]"
            />

            {/* Sliding White Testimonial Card */}
            <motion.div
              style={prefersReducedMotion ? undefined : { y: cardSlideY }}
              className="relative z-20 -mt-6 mx-auto w-[96%] rounded-[24px] border border-[#E5E7EB]/90 bg-white p-7 shadow-[0_24px_60px_-15px_rgba(11,11,15,0.12)] sm:p-9"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? undefined : { opacity: 0, y: -12 }
                  }
                  transition={{ duration: 0.35, ease: AGENCY_EASE }}
                >
                  {/* Rating Stars */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${active.rating} out of 5 stars`}
                    >
                      {Array.from({ length: active.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]"
                        />
                      ))}
                      <span className="ml-1.5 text-xs font-bold text-[#0B0B0F]">
                        5.0
                      </span>
                    </div>
                    <span className="rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[11px] font-semibold text-[#8B5CF6]">
                      {active.projectTag}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="mt-5 text-base leading-relaxed font-medium text-[#0B0B0F] sm:text-lg">
                    &ldquo;{active.quote}&rdquo;
                  </blockquote>

                  {/* Author with Executive Monogram */}
                  <div className="mt-6 flex items-center gap-3.5 border-t border-[#F3F4F6] pt-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0B0B0F] to-[#2E1065] text-sm font-extrabold tracking-wide text-white shadow-sm">
                      {getInitials(active.name)}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#0B0B0F]">
                        {active.name}
                      </p>
                      <p className="text-xs font-medium text-[#6B7280]">
                        {active.role} • {active.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Front Pocket of Violet Envelope */}
            <div
              aria-hidden="true"
              className="relative z-30 -mt-8 h-16 w-full rounded-b-[28px] rounded-t-xl bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] shadow-[0_24px_50px_-12px_rgba(139,92,246,0.45)]"
            >
              <div className="absolute inset-x-0 top-0 mx-auto h-1.5 w-16 rounded-b-full bg-white/30" />
            </div>
          </div>
        </div>

        {/* Left / Right Circular Arrow Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0B0B0F] shadow-sm transition-all hover:-translate-x-0.5 hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-xs font-semibold text-[#6B7280]">
            {activeIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0B0B0F] shadow-sm transition-all hover:translate-x-0.5 hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Credibility Badge Row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {upworkBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-[#0B0B0F] shadow-sm"
            >
              <Award className="h-3.5 w-3.5 text-[#8B5CF6]" />
              <span>{badge}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
