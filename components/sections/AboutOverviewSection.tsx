"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { agencyOverview } from "@/data/content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function AboutOverviewSection() {
  return (
    <section
      aria-labelledby="about-overview-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUpVariants}
            className="lg:col-span-6"
          >
            <span className="inline-block rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
              {agencyOverview.eyebrow}
            </span>
            <h2
              id="about-overview-heading"
              className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl lg:text-[42px] lg:leading-[1.12]"
            >
              {agencyOverview.headline}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUpVariants}
            className="lg:col-span-6"
          >
            <p className="text-base leading-relaxed text-[#6B7280] sm:text-lg">
              {agencyOverview.description}
            </p>
            <div className="mt-6">
              <Link
                href={agencyOverview.ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#0B0B0F] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1E1E26]"
              >
                <span>{agencyOverview.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 5-Metric Credibility Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {agencyOverview.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariants}
              className="rounded-[22px] border border-[#E5E7EB]/85 bg-[#FAFAFC] p-5 text-center shadow-[0_14px_35px_-15px_rgba(11,11,15,0.05)] sm:p-6"
            >
              <p className="text-3xl font-extrabold tracking-tight text-[#0B0B0F] sm:text-4xl">
                {stat.decimals > 0 ? stat.value.toFixed(stat.decimals) : stat.value}
                <span className="text-[#8B5CF6]">{stat.suffix}</span>
              </p>
              <p className="mt-1.5 text-xs font-semibold text-[#6B7280] sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
