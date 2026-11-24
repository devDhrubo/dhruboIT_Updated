import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CtaContactSection } from "@/components/sections/CtaContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Case Studies — ${siteConfig.agencyName}`,
  description:
    "Explore Dhrubo IT's featured case studies across headless e-commerce, FinTech SaaS, enterprise AI RAG agents, and mobile banking.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <PortfolioSection showArchiveCta={false} />
        <CtaContactSection />
      </main>
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
