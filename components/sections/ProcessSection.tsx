"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { processSteps } from "@/data/content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUpVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-[#F4F5F7] px-3.5 py-1 text-xs font-semibold text-[#6B7280]">
            Our Process
          </span>
          <h2
            id="process-heading"
            className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl md:text-5xl"
          >
            From signal to shipped
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            A transparent, senior-led engineering workflow designed to remove
            delivery risk and ship production software every week.
          </p>
        </motion.div>

        {/* Cinematic Engineering Workflow Visual Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="relative mt-12 overflow-hidden rounded-[28px] border border-[#E5E7EB]/90 bg-[#0B0B0F] shadow-[0_24px_60px_-15px_rgba(11,11,15,0.12)]"
        >
          <div className="relative h-56 w-full sm:h-72">
            <Image
              src="/images/studio/workflow-banner.jpg"
              alt="Dhrubo IT agile product design and sprint planning workflow"
              fill
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B0B0F]/85 via-[#0B0B0F]/55 to-[#0B0B0F]/25"
            />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  Weekly Playable Demos
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  Direct Slack With Engineers
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  Zero Vendor Hand-Offs
                </span>
              </div>
              <p className="mt-3 max-w-xl text-lg font-bold tracking-tight text-white sm:text-2xl">
                Strategy, design, engineering, QA, and cloud operations working
                as one integrated pod.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {processSteps.map((item) => (
            <motion.article
              key={item.step}
              variants={fadeUpVariants}
              className="rounded-[24px] border border-[#E5E7EB]/85 bg-white p-7 shadow-[0_20px_60px_-15px_rgba(11,11,15,0.05)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE9FE] text-xs font-extrabold text-[#8B5CF6]">
                {item.step}
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-[#0B0B0F]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
