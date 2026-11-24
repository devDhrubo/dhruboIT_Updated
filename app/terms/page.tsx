import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${siteConfig.agencyName}`,
  description: `Terms & Conditions for ${siteConfig.agencyName}.`,
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0B0B0F]">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-[#6B7280]">Last updated: 2026</p>
          <p className="text-base leading-relaxed text-[#0B0B0F]">
            By accessing {siteConfig.url}, you agree to these terms governing
            the use of our website and pre-engagement inquiries.
          </p>
          <h2 className="text-xl font-bold text-[#0B0B0F]">
            1. Scope of Services
          </h2>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            All software engineering, UI/UX design, AI integration, and cloud
            services delivered by {siteConfig.agencyName} are governed by a
            separate Master Services Agreement (MSA) or Statement of Work (SOW)
            signed by both parties.
          </p>
          <h2 className="text-xl font-bold text-[#0B0B0F]">
            2. Intellectual Property
          </h2>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            Unless otherwise stated in an executed SOW, client-commissioned work
            and source code transfer 100% to the client upon full payment.
          </p>
          <h2 className="text-xl font-bold text-[#0B0B0F]">3. Contact</h2>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            Questions regarding these terms may be sent to{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-[#8B5CF6] underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
