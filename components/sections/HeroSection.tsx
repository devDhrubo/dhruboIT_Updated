"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { agencyOverview, heroContent } from "@/data/content";
import { AGENCY_EASE } from "@/lib/motion";

const InteractiveGlobe = dynamic(
  () =>
    import("@/components/ui/InteractiveGlobe").then(
      (mod) => mod.InteractiveGlobe
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[380px] w-full max-w-[520px] items-center justify-center sm:h-[480px] lg:h-[520px]">
        <div className="h-64 w-64 animate-pulse rounded-full bg-gradient-to-tr from-[#E0F2FE] via-[#EDE9FE] to-[#DCFCE7] sm:h-80 sm:w-80" />
      </div>
    ),
  }
);

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-34 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      {/* Subtle Architectural Grid Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0B0B0F07_1px,transparent_1px),linear-gradient(to_bottom,#0B0B0F07_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_55%,transparent_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Big Company Positioning & Enterprise CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: AGENCY_EASE }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            {/* Enterprise Brand Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#FAFAFC] px-3.5 py-1.5 text-xs font-semibold text-[#0B0B0F] shadow-xs">
              <span className="inline-block h-2 w-2 rounded-full bg-[#10B981]" />
              <span>DHRUBO IT</span>
              <span className="text-[#D1D5DB]">|</span>
              <span className="text-[#6B7280]">Global Software &amp; AI Engineering</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-[-0.04em] text-[#0B0B0F] sm:text-5xl lg:text-[58px] lg:leading-[1.06]">
              Building Digital Products That{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#F0523D] bg-clip-text text-transparent">
                Drive Growth
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#6B7280] sm:text-lg lg:mx-0">
              {heroContent.initialSubtext}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <Link
                href="/request-estimation"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#F0523D] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_-10px_rgba(240,82,61,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#E0432F]"
              >
                <span>Request Estimation</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#E5E7EB] bg-white px-7 py-3.5 text-sm font-semibold text-[#0B0B0F] transition-colors hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
              >
                <span>View Case Studies</span>
              </Link>
            </div>

            {/* Enterprise Proof Metrics Strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#E5E7EB]/85 pt-7 max-w-lg mx-auto lg:mx-0">
              {agencyOverview.stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold tracking-tight text-[#0B0B0F] sm:text-3xl">
                    {stat.decimals > 0
                      ? stat.value.toFixed(stat.decimals)
                      : stat.value}
                    <span className="text-[#8B5CF6]">{stat.suffix}</span>
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#6B7280]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive WebGL 3D Rotating Earth Globe */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: AGENCY_EASE }}
            className="flex items-center justify-center lg:col-span-6"
          >
            <InteractiveGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
