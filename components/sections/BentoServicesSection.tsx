"use client";

import Image from "next/image";
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
    icon: <Code2 className="h-4 w-4" />,
    bg: "#EDE9FE",
    color: "#8B5CF6",
  },
  "saas-development": {
    icon: <Layers className="h-4 w-4" />,
    bg: "#EFF6FF",
    color: "#2563EB",
  },
  "ai-solutions": {
    icon: <Bot className="h-4 w-4" />,
    bg: "#FEF2F2",
    color: "#F0523D",
  },
  "mobile-apps": {
    icon: <Smartphone className="h-4 w-4" />,
    bg: "#ECFDF5",
    color: "#10B981",
  },
  "cloud-devops": {
    icon: <Cloud className="h-4 w-4" />,
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

        {/* Asymmetric 5-Service Photo-Backed Bento Grid */}
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
            className="group lg:col-span-6 flex flex-col overflow-hidden rounded-[26px] border border-[#E5E7EB]/85 bg-white shadow-[0_20px_60px_-15px_rgba(11,11,15,0.06)] transition-all hover:-translate-y-1 hover:border-[#8B5CF6]/40"
          >
            {/* Full-Bleed Visual Header with Floating Performance Pills */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0B0F]">
              <Image
                src={featuredService.image}
                alt={featuredService.imageAlt}
                width={1000}
                height={625}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/75 via-[#0B0B0F]/20 to-transparent"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0B0B0F] shadow-sm backdrop-blur-sm">
                {featuredService.timeline}
              </span>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/25 bg-[#0B0B0F]/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                  0.38s Edge LCP
                </span>
                <span className="rounded-full border border-white/25 bg-[#0B0B0F]/75 px-3 py-1 text-[11px] font-bold text-[#34D399] backdrop-blur-md">
                  99+ Lighthouse
                </span>
                <span className="rounded-full border border-white/25 bg-[#0B0B0F]/75 px-3 py-1 text-[11px] font-bold text-[#C4B5FD] backdrop-blur-md">
                  99.9% SLA
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: serviceIcons[featuredService.slug].bg,
                      color: serviceIcons[featuredService.slug].color,
                    }}
                  >
                    {serviceIcons[featuredService.slug].icon}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-[#0B0B0F]">
                    {featuredService.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280] sm:text-base">
                  {featuredService.description}
                </p>
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
            </div>
          </motion.article>

          {/* Right 2x2 Grid: 4 Photo-Header Enterprise Service Cards */}
          <div className="lg:col-span-6 grid gap-6 sm:grid-cols-2">
            {otherServices.map((service) => {
              const style = serviceIcons[service.slug] ?? {
                icon: <Code2 className="h-4 w-4" />,
                bg: "#EDE9FE",
                color: "#8B5CF6",
              };
              return (
                <motion.article
                  key={service.slug}
                  variants={fadeUpVariants}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB]/85 bg-white shadow-[0_20px_55px_-15px_rgba(11,11,15,0.06)] transition-all hover:-translate-y-1 hover:border-[#8B5CF6]/40"
                >
                  {/* Visual Photo Banner */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0B0F]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/65 via-transparent to-transparent"
                    />
                    <span
                      className="absolute left-3.5 top-3.5 inline-flex h-8 w-8 items-center justify-center rounded-xl shadow-sm"
                      style={{
                        backgroundColor: style.bg,
                        color: style.color,
                      }}
                    >
                      {style.icon}
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-[#0B0B0F]/75 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                      {service.timeline}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-[#0B0B0F]">
                        {service.shortTitle}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
                        {service.tagline}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#F3F4F6] pt-3.5">
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
