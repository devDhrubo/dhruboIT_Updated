"use client";

import { motion } from "framer-motion";
import { trustedClients, techPartners } from "@/data/content";
import { fadeUpVariants } from "@/lib/motion";

function PartnerMark({ name }: { name: string }) {
  switch (name) {
    case "Vercel":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
          <path d="M12 3L22 20H2L12 3Z" />
        </svg>
      );
    case "AWS":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path d="M4 16.5C8 19.5 16 19.5 20 16" fill="none" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M7 12L9 6L11 12M13 6L14.5 12L16 8L17.5 12L19 6" fill="none" stroke="#0B0B0F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Stripe":
      return (
        <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-[#635BFF] text-[10px] font-black text-white">
          S
        </span>
      );
    case "OpenAI":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path d="M13 3L5 14H12L11 21L19 10H12L13 3Z" fill="#3ECF8E" />
        </svg>
      );
    case "Cloudflare":
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path d="M6.5 17H18a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8.9 8.5 3.5 3.5 0 0 0 6.5 17Z" fill="#F38020" />
        </svg>
      );
  }
}

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
          {/* Enterprise Clients with Architectural Monogram Badges */}
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B7280]">
              Trusted by Industry Leaders &amp; Enterprises
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {trustedClients.map((client) => {
                const initials = client
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("");
                return (
                  <div
                    key={client}
                    className="inline-flex items-center gap-2.5 rounded-2xl border border-[#E5E7EB]/90 bg-white px-4 py-2.5 shadow-xs transition-all hover:border-[#8B5CF6]/40"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0B0B0F] text-[10px] font-extrabold tracking-wider text-white">
                      {initials}
                    </span>
                    <span className="text-xs font-extrabold tracking-[0.12em] text-[#0B0B0F]/85 sm:text-sm">
                      {client}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ecosystem Tech Partners with Brand Marks */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 border-t border-[#E5E7EB]/80 pt-6">
            <span className="mr-2 text-xs font-semibold text-[#6B7280]">
              Ecosystem &amp; Cloud Partners:
            </span>
            {techPartners.map((partner) => (
              <span
                key={partner}
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0B0B0F] shadow-xs"
              >
                <PartnerMark name={partner} />
                <span>{partner}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
