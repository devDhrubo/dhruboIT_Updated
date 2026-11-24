import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { CtaContactSection } from "@/components/sections/CtaContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Contact Us — ${siteConfig.agencyName}`,
  description:
    "Connect with Dhrubo IT's Enterprise Solutions Desk. Share your project requirements or schedule a 30-minute consultation with our engineering team.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-12">
        <CtaContactSection />
      </main>
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
