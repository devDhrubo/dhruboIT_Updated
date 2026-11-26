"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";
import { agencyOverview } from "@/data/content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function AboutOverviewSection() {
  return (
    <section
      aria-labelledby="about-overview-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: Company Identity & Narrative */}
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
              className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl lg:text-[44px] lg:leading-[1.1]"
            >
              {agencyOverview.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#6B7280] sm:text-lg">
              {agencyOverview.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={agencyOverview.ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#0B0B0F] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1E1E26]"
              >
                <span>{agencyOverview.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#0B0B0F] transition-colors hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
              >
                <span>See Our Outcomes</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Editorial 2-Photo Engineering Studio Collage */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUpVariants}
            className="relative lg:col-span-6"
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 overflow-hidden rounded-[24px] border border-[#E5E7EB]/90 bg-[#F4F5F7] shadow-[0_24px_60px_-15px_rgba(11,11,15,0.12)]">
                <Image
                  src="/images/studio/team-collab.jpg"
                  alt="Dhrubo IT senior engineering team collaborating on architecture"
                  width={900}
                  height={720}
                  className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-80"
                />
              </div>
              <div className="col-span-5 flex flex-col justify-end gap-4">
                <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB]/90 bg-[#F4F5F7] shadow-[0_24px_60px_-15px_rgba(11,11,15,0.12)]">
                  <Image
                    src="/images/studio/engineering-desk.jpg"
                    alt="Modern software engineering workstation and code architecture"
                    width={700}
                    height={560}
                    className="h-44 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-56"
                  />
                </div>
                <div className="rounded-2xl border border-[#E5E7EB]/90 bg-[#FAFAFC] p-3.5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B0B0F]">
                    <Globe2 className="h-4 w-4 text-[#8B5CF6]" />
                    <span>Global Studio</span>
                  </div>
                  <p className="mt-1 text-[11px] font-medium text-[#6B7280]">
                    EU • US • APAC daily overlap
                  </p>
                </div>
              </div>
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
