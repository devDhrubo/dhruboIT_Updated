"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/content";
import { AGENCY_EASE, fadeUpVariants } from "@/lib/motion";

export function IndustriesSection() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const prefersReducedMotion = useReducedMotion();
  const active = industries.find((item) => item.id === activeId) ?? industries[0];

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="bg-[#F4F5F7] py-24 sm:py-32"
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
            Industries We Serve
          </span>
          <h2
            id="industries-heading"
            className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl md:text-5xl"
          >
            Domain expertise across high-growth verticals
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            Every industry comes with its own operational constraints. We pair
            modern engineering with research-driven product design to deliver
            measurable business value.
          </p>
        </motion.div>

        {/* Interactive Industry Tabs */}
        <div
          role="tablist"
          aria-label="Industries"
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {industries.map((item) => {
            const isSelected = item.id === active.id;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveId(item.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-[#0B0B0F] text-white shadow-sm"
                    : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#8B5CF6] hover:text-[#0B0B0F]"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Active Industry Panel */}
        <div className="mt-8 rounded-[28px] border border-[#E5E7EB]/85 bg-white p-7 shadow-[0_20px_60px_-15px_rgba(11,11,15,0.06)] sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              role="tabpanel"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: AGENCY_EASE }}
              className="grid items-center gap-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                  {active.name}
                </span>
                <h3 className="mt-2.5 text-2xl font-extrabold tracking-tight text-[#0B0B0F] sm:text-3xl">
                  {active.headline}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-[#6B7280] sm:text-base">
                  {active.description}
                </p>
                <div className="mt-6">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5CF6] hover:underline"
                  >
                    <span>Discuss your {active.name.toLowerCase()} roadmap</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
                {active.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-2xl border border-[#F3F4F6] bg-[#FAFAFC] p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                      {kpi.label}
                    </p>
                    <p className="mt-2 text-lg font-extrabold tracking-tight text-[#0B0B0F]">
                      {kpi.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
