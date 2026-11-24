import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectEstimatorSection } from "@/components/sections/ProjectEstimatorSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Request an Estimation — ${siteConfig.agencyName}`,
  description:
    "Get a tailored architecture recommendation, milestone plan, and written project estimation from Dhrubo IT within 24 hours.",
};

export default function RequestEstimationPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjectEstimatorSection />
        <ProcessSection />
      </main>
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
