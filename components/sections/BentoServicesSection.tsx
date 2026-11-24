"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Cloud,
  Code2,
  Layers,
  Smartphone,
} from "lucide-react";
import { servicesList } from "@/data/content";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";

const serviceIcons: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  "web-development": {
    icon: <Code2 className="h-5 w-5" />,
    bg: "#EDE9FE",
    color: "#8B5CF6",
  },
  "saas-development": {
    icon: <Layers className="h-5 w-5" />,
    bg: "#EFF6FF",
    color: "#2563EB",
  },
  "ai-solutions": {
    icon: <Bot className="h-5 w-5" />,
    bg: "#FEF2F2",
    color: "#F0523D",
  },
  "mobile-apps": {
    icon: <Smartphone className="h-5 w-5" />,
    bg: "#ECFDF5",
    color: "#10B981",
  },
  "cloud-devops": {
    icon: <Cloud className="h-5 w-5" />,
    bg: "#F4F5F7",
    color: "#0B0B0F",
  },
};

export function BentoServicesSection() {
  const [featuredService, ...otherServices] = servicesList;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-[#E5E7EB]/70 bg-white py-24 sm:py-32"
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
            Core Capabilities
          </span>
          <h2
            id="services-heading"
            className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl md:text-5xl"
          >
            Integrated engineering from MVP to enterprise scale
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            One senior studio across web platforms, multi-tenant SaaS, AI
            automation, mobile apps, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Asymmetric 5-Service Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 lg:grid-cols-12"
        >
          {/* Featured Large Card: Web & Full-Stack Development */}
          <motion.article
            variants={fadeUpVariants}
            className="group lg:col-span-6 flex flex-col justify-between rounded-[26px] border border-[#E5E7EB]/85 bg-white p-7 shadow-[0_20px_60px_-15px_rgba(11,11,15,0.06)] transition-all hover:-translate-y-1 hover:border-[#8B5CF6]/40 sm:p-9"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: serviceIcons[featuredService.slug].bg,
                    color: serviceIcons[featuredService.slug].color,
                  }}
                >
                  {serviceIcons[featuredService.slug].icon}
                </span>
                <span className="rounded-full bg-[#F4F5F7] px-3 py-1 text-xs font-semibold text-[#6B7280]">
                  {featuredService.timeline}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#0B0B0F]">
                {featuredService.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#6B7280] sm:text-base">
                {featuredService.description}
              </p>

              {/* Performance Preview */}
              <div className="mt-7 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFC] p-4 sm:p-5">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F0523D]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                    <span className="ml-2 text-xs font-semibold text-[#6B7280]">
                      dhruboit.tech / edge-core
                    </span>
                  </div>
                  <span className="rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#10B981]">
                    99+ Lighthouse
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-3">
                    <p className="text-[11px] font-medium text-[#6B7280]">LCP</p>
                    <p className="mt-1 text-base font-extrabold text-[#0B0B0F]">
                      0.38s
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-3">
                    <p className="text-[11px] font-medium text-[#6B7280]">SEO</p>
                    <p className="mt-1 text-base font-extrabold text-[#8B5CF6]">
                      100/100
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-3">
                    <p className="text-[11px] font-medium text-[#6B7280]">SLA</p>
                    <p className="mt-1 text-base font-extrabold text-[#10B981]">
                      99.9%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-[#F3F4F6] pt-5">
              <div className="flex flex-wrap gap-1.5">
                {featuredService.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#F4F5F7] px-2.5 py-1 text-[11px] font-semibold text-[#0B0B0F]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={`/services/${featuredService.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#8B5CF6] hover:underline"
              >
                <span>Explore</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>

          {/* Right 2x2 Grid: Remaining 4 Enterprise Services */}
          <div className="lg:col-span-6 grid gap-6 sm:grid-cols-2">
            {otherServices.map((service) => {
              const style = serviceIcons[service.slug] ?? {
                icon: <Code2 className="h-5 w-5" />,
                bg: "#EDE9FE",
                color: "#8B5CF6",
              };
              return (
                <motion.article
                  key={service.slug}
                  variants={fadeUpVariants}
                  className="group flex flex-col justify-between rounded-[24px] border border-[#E5E7EB]/85 bg-white p-6 shadow-[0_20px_55px_-15px_rgba(11,11,15,0.06)] transition-all hover:-translate-y-1 hover:border-[#8B5CF6]/40"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                        style={{
                          backgroundColor: style.bg,
                          color: style.color,
                        }}
                      >
                        {style.icon}
                      </span>
                      <span className="text-[11px] font-semibold text-[#6B7280]">
                        {service.timeline}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold tracking-tight text-[#0B0B0F]">
                      {service.shortTitle}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
                      {service.tagline}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#F3F4F6] pt-4">
                    <span className="text-[11px] font-semibold text-[#0B0B0F]">
                      {service.stack.slice(0, 2).join(" • ")}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B5CF6] group-hover:underline"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
