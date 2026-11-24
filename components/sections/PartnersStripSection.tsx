"use client";

import { motion } from "framer-motion";
import { trustedClients, techPartners } from "@/data/content";
import { fadeUpVariants } from "@/lib/motion";

export function PartnersStripSection() {
  return (
    <section
      aria-label="Trusted clients and technology partners"
      className="border-y border-[#E5E7EB]/80 bg-[#F4F5F7]/65 py-12 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariants}
          className="space-y-8"
        >
          {/* Enterprise Clients */}
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B7280]">
              Trusted by Industry Leaders &amp; Enterprises
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
              {trustedClients.map((client) => (
                <span
                  key={client}
                  className="text-sm font-extrabold tracking-[0.12em] text-[#0B0B0F]/75 transition-colors hover:text-[#0B0B0F] sm:text-base"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Ecosystem Tech Partners */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 border-t border-[#E5E7EB]/80 pt-6">
            <span className="mr-2 text-xs font-semibold text-[#6B7280]">
              Ecosystem &amp; Cloud Partners:
            </span>
            {techPartners.map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1 text-xs font-semibold text-[#0B0B0F] shadow-xs"
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
