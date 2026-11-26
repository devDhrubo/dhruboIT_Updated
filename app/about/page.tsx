import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { PartnersStripSection } from "@/components/sections/PartnersStripSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { aboutPillars, agencyOverview, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `About Us — ${siteConfig.agencyName}`,
  description:
    "Meet Dhrubo IT — a senior product, design, and engineering studio building SaaS platforms, AI-native systems, and mobile apps for global teams.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white pt-32 pb-20 sm:pt-36">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
            <span className="inline-block rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
              About {siteConfig.agencyName}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] text-[#0B0B0F] sm:text-5xl md:text-6xl">
              A senior studio, building product for the whole world.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
              {agencyOverview.description}
            </p>

            {/* Editorial Studio Photography Banner */}
            <div className="mt-10 grid gap-4 sm:grid-cols-12">
              <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB] sm:col-span-7">
                <Image
                  src="/images/studio/team-collab.jpg"
                  alt="Dhrubo IT engineering and design collaboration"
                  width={1000}
                  height={650}
                  className="h-60 w-full object-cover sm:h-72"
                  priority
                />
              </div>
              <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB] sm:col-span-5">
                <Image
                  src="/images/studio/engineering-desk.jpg"
                  alt="Modern engineering workspace at Dhrubo IT"
                  width={800}
                  height={650}
                  className="h-60 w-full object-cover sm:h-72"
                  priority
                />
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {agencyOverview.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[22px] border border-[#E5E7EB] bg-[#FAFAFC] p-5 text-center"
                >
                  <p className="text-3xl font-extrabold text-[#0B0B0F]">
                    {stat.decimals > 0
                      ? stat.value.toFixed(stat.decimals)
                      : stat.value}
                    <span className="text-[#8B5CF6]">{stat.suffix}</span>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#6B7280]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PartnersStripSection />

        <section className="bg-[#F4F5F7] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aboutPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-[24px] border border-[#E5E7EB]/85 bg-white p-7 shadow-[0_20px_50px_-15px_rgba(11,11,15,0.05)]"
                >
                  <span className="text-xs font-bold text-[#8B5CF6]">
                    {pillar.label}
                  </span>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-[#0B0B0F]">
                    {pillar.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#6B7280]">
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#F0523D] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-10px_rgba(240,82,61,0.5)] hover:bg-[#E0432F]"
              >
                <span>Start a Project With Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <ProcessSection />
      </main>
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
