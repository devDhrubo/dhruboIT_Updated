"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Layers } from "lucide-react";
import { audienceCards } from "@/data/content";
import { AGENCY_EASE, fadeUpVariants, staggerContainer } from "@/lib/motion";

export function BuiltForEveryoneSection() {
  return (
    <section
      aria-labelledby="built-for-everyone-heading"
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
            Built for Everyone
          </span>
          <h2
            id="built-for-everyone-heading"
            className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl md:text-5xl"
          >
            Tailored engineering for every growth stage
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            Whether you are validating an idea or modernizing a global platform,
            our team adapts to your velocity and standards.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {audienceCards.map((card) => (
            <motion.article
              key={card.id}
              variants={fadeUpVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: AGENCY_EASE },
              }}
              className="flex flex-col justify-between rounded-[24px] border border-[#E5E7EB]/80 bg-white p-7 shadow-[0_20px_60px_-15px_rgba(11,11,15,0.06)]"
            >
              {/* Mini UI Preview */}
              <div className="mb-8 flex h-40 items-center justify-center rounded-2xl border border-[#F3F4F6] bg-[#FAFAFC] p-5">
                {card.previewType === "chart" && (
                  <div className="w-full max-w-[220px]">
                    <div className="mb-3 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#6B7280]">
                        {card.metricLabel}
                      </span>
                      <span className="rounded-full bg-[#EDE9FE] px-2 py-0.5 font-bold text-[#8B5CF6]">
                        {card.metricValue}
                      </span>
                    </div>
                    <div className="flex h-20 items-end gap-2.5">
                      {[38, 56, 48, 74, 92, 100].map((height, idx) => (
                        <div
                          key={idx}
                          className="flex-1 rounded-t-lg transition-all"
                          style={{
                            height: `${height}%`,
                            backgroundColor:
                              idx >= 4 ? "#8B5CF6" : "#E5E7EB",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {card.previewType === "popover" && (
                  <div className="w-full max-w-[230px] rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#8B5CF6]">
                        <TrendingUp className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#0B0B0F]">
                          Sprint Velocity
                        </p>
                        <p className="text-[11px] text-[#6B7280]">
                          White-label QA passed
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-[#F4F5F7] px-3 py-2 text-xs">
                      <span className="text-[#6B7280]">{card.metricLabel}</span>
                      <span className="font-extrabold text-[#10B981]">
                        {card.metricValue}
                      </span>
                    </div>
                  </div>
                )}

                {card.previewType === "tile" && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B5CF6] text-white shadow-[0_14px_30px_-8px_rgba(139,92,246,0.55)]">
                      <ShieldCheck className="h-7 w-7" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#0B0B0F]">
                      <Layers className="h-3.5 w-3.5 text-[#8B5CF6]" />
                      <span>
                        {card.metricLabel}: {card.metricValue}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-[#0B0B0F]">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#6B7280]">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
