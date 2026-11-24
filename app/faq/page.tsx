import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `FAQ — ${siteConfig.agencyName}`,
  description:
    "Answers to common questions about engagement models, timelines, IP ownership, AI security, and post-launch SLA support at Dhrubo IT.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F4F5F7] pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
              Frequently Asked Questions
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] text-[#0B0B0F] sm:text-5xl">
              Clear answers before we build
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] sm:text-lg">
              Everything founders and enterprise leaders ask about our delivery
              model, IP ownership, security, and timelines.
            </p>
          </div>

          <div className="mt-12">
            <FaqAccordion />
          </div>

          <div className="mt-12 rounded-[26px] border border-[#E5E7EB] bg-white p-8 text-center shadow-[0_20px_50px_-15px_rgba(11,11,15,0.06)]">
            <h2 className="text-xl font-bold text-[#0B0B0F]">
              Still have a specific technical question?
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              Talk directly with a senior engineer — no obligation, written
              estimate within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#F0523D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#E0432F]"
              >
                <span>Request Estimation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#0B0B0F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1E1E26]"
              >
                Book 30-Min Call
              </a>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
