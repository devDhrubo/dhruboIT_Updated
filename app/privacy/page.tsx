import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteConfig.agencyName}`,
  description: `Privacy Policy for ${siteConfig.agencyName}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0B0B0F]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#6B7280]">Last updated: 2026</p>
          <p className="text-base leading-relaxed text-[#0B0B0F]">
            {siteConfig.agencyName} respects your privacy and protects any
            project briefs, contact details, or attachments you submit through
            our website.
          </p>
          <h2 className="text-xl font-bold text-[#0B0B0F]">
            1. Information We Collect
          </h2>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            When you submit our consultation form or book a call, we collect
            your name, email address, optional phone number, project brief, and
            any files you choose to share solely for the purpose of evaluating
            and responding to your inquiry.
          </p>
          <h2 className="text-xl font-bold text-[#0B0B0F]">
            2. Confidentiality &amp; Data Protection
          </h2>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            We never sell or rent your contact information or project documents
            to third parties. Mutual NDAs are available upon request prior to
            sharing sensitive technical documentation.
          </p>
          <h2 className="text-xl font-bold text-[#0B0B0F]">3. Contact</h2>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            For privacy or data removal requests, email us at{" "}
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
