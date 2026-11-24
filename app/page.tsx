import { PageLoader } from "@/components/sections/PageLoader";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersStripSection } from "@/components/sections/PartnersStripSection";
import { AboutOverviewSection } from "@/components/sections/AboutOverviewSection";
import { BentoServicesSection } from "@/components/sections/BentoServicesSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { EngagementModelsSection } from "@/components/sections/EngagementModelsSection";
import { CtaContactSection } from "@/components/sections/CtaContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>
        <HeroSection />
        <PartnersStripSection />
        <AboutOverviewSection />
        <BentoServicesSection />
        <IndustriesSection />
        <ProcessSection />
        <TechStackSection />
        <PortfolioSection />
        <TestimonialsSection />
        <EngagementModelsSection />
        <CtaContactSection />
      </main>
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
