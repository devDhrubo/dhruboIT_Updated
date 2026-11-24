"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

const models = [
  {
    id: "fixed",
    badge: "Clear Milestones",
    title: "Fixed-Scope Delivery",
    subtitle: "Best for MVPs, redesigns, and well-defined product launches.",
    timeline: "3 – 12 weeks",
    featured: false,
    points: [
      "Documented architecture & milestone roadmap",
      "Fixed budget with predictable delivery dates",
      "Weekly playable demos & full source IP transfer",
    ],
    ctaLabel: "Request Estimation",
    ctaHref: "/request-estimation",
    external: false,
  },
  {
    id: "pod",
    badge: "Most Popular",
    title: "Dedicated Engineering Pod",
    subtitle:
      "An embedded senior team scaling your SaaS or enterprise roadmap continuously.",
    timeline: "Monthly Retainer",
    featured: true,
    points: [
      "Senior Full-Stack, AI & UI/UX engineers on Slack",
      "Weekly production releases & CI/CD ownership",
      "EU, US & APAC overlap hours with 99.9% SLA",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: siteConfig.calUrl,
    external: true,
  },
  {
    id: "sprint",
    badge: "Rapid Validation",
    title: "AI & Architecture Sprint",
    subtitle:
      "Fast-track a production RAG prototype, cloud audit, or system modernization plan.",
    timeline: "2 – 4 weeks",
    featured: false,
    points: [
      "Working AI/RAG proof-of-production or audit",
      "Security, RBAC & cloud cost optimization plan",
      "Actionable blueprint your team can execute immediately",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: siteConfig.calUrl,
    external: true,
  },
];

export function EngagementModelsSection() {
  return (
    <section
      id="engagement"
      aria-labelledby="engagement-heading"
      className="border-b border-[#E5E7EB]/70 bg-white py-24 sm:py-32"
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
            Ways to Work Together
          </span>
          <h2
            id="engagement-heading"
            className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl md:text-5xl"
          >
            Flexible engagement models built for velocity
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            Whether you need a fixed-scope launch or a long-term engineering
            partner, we structure engagements around measurable outcomes.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {models.map((model) => (
            <motion.article
              key={model.id}
              variants={fadeUpVariants}
              className={`flex flex-col justify-between rounded-[26px] p-7 sm:p-8 ${
                model.featured
                  ? "border border-[#8B5CF6]/40 bg-gradient-to-b from-[#0B0B0F] to-[#1A1630] text-white shadow-[0_28px_65px_-15px_rgba(11,11,15,0.3)]"
                  : "border border-[#E5E7EB]/85 bg-[#FAFAFC] text-[#0B0B0F] shadow-[0_20px_50px_-15px_rgba(11,11,15,0.05)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      model.featured
                        ? "bg-white/10 text-[#C4B5FD]"
                        : "bg-white text-[#8B5CF6] border border-[#E5E7EB]"
                    }`}
                  >
                    {model.featured && <Sparkles className="h-3 w-3" />}
                    {model.badge}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      model.featured ? "text-white/65" : "text-[#6B7280]"
                    }`}
                  >
                    {model.timeline}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-extrabold tracking-tight">
                  {model.title}
                </h3>
                <p
                  className={`mt-2.5 text-sm leading-relaxed ${
                    model.featured ? "text-white/75" : "text-[#6B7280]"
                  }`}
                >
                  {model.subtitle}
                </p>

                <ul className="mt-6 space-y-3">
                  {model.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          model.featured ? "text-[#10B981]" : "text-[#8B5CF6]"
                        }`}
                      />
                      <span
                        className={
                          model.featured ? "text-white/90" : "text-[#0B0B0F]"
                        }
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                {model.external ? (
                  <a
                    href={model.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${
                      model.featured
                        ? "bg-[#F0523D] text-white shadow-[0_14px_30px_-10px_rgba(240,82,61,0.55)] hover:bg-[#E0432F]"
                        : "bg-[#0B0B0F] text-white hover:bg-[#1E1E26]"
                    }`}
                  >
                    <span>{model.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={model.ctaHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-6 py-3.5 text-sm font-semibold text-[#0B0B0F] transition-colors hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
                  >
                    <span>{model.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
