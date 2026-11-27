import type { Metadata } from "next";
import {
  Briefcase,
  CheckCircle2,
  DollarSign,
  Globe2,
  Sparkles,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { CareerApplicationForm } from "@/components/sections/CareerApplicationForm";
import { jobOpenings } from "@/data/careers";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: `Careers — ${siteConfig.agencyName}`,
  description:
    "Join Dhrubo IT. We're hiring a Commission-Based Business Development Partner (100% Remote, 10–15% commission per closed project).",
};

export default function CareersPage() {
  const featuredJob = jobOpenings[0];

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: featuredJob.title,
    description: `${featuredJob.about} Compensation: ${featuredJob.compensation}`,
    datePosted: "2026-11-27",
    employmentType: "CONTRACTOR",
    jobLocationType: "TELECOMMUTE",
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.agencyName,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}/images/logo.png`,
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Worldwide",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingJsonLd),
        }}
      />
      <Navbar />
      <main className="bg-[#F4F5F7] pt-30 pb-24 sm:pt-34">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Page Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>We&apos;re Hiring • {jobOpenings.length} Open Role</span>
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[#0B0B0F] sm:text-5xl">
              Grow together with {siteConfig.agencyName}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] sm:text-lg">
              Partner with a senior global software &amp; AI engineering agency
              delivering high-impact digital products to international clients.
            </p>
          </div>

          {/* 2-Column Job Detail + Sticky Application Form */}
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
            {/* Left: Structured Job Listing */}
            <article className="space-y-8 rounded-[28px] border border-[#E5E7EB]/90 bg-white p-7 shadow-[0_20px_60px_-15px_rgba(11,11,15,0.06)] sm:p-10 lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#10B981]">
                    <Globe2 className="h-3.5 w-3.5" />
                    {featuredJob.workType}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F7] px-3 py-1 text-xs font-semibold text-[#0B0B0F]">
                    <Briefcase className="h-3.5 w-3.5 text-[#8B5CF6]" />
                    {featuredJob.employmentMode}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#0B0B0F] sm:text-3xl">
                  {featuredJob.title}
                </h2>

                {/* Highlighted Compensation Banner */}
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#8B5CF6]/25 bg-[#F5F3FF]/70 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6] text-white">
                    <DollarSign className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#8B5CF6]">
                      Compensation
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-[#0B0B0F]">
                      {featuredJob.compensation}
                    </p>
                  </div>
                </div>
              </div>

              {/* About Dhrubo IT */}
              <div className="border-t border-[#F3F4F6] pt-6">
                <h3 className="text-base font-bold tracking-tight text-[#0B0B0F]">
                  About {featuredJob.company}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#6B7280] sm:text-base">
                  {featuredJob.about}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="border-t border-[#F3F4F6] pt-6">
                <h3 className="text-base font-bold tracking-tight text-[#0B0B0F]">
                  Responsibilities
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {featuredJob.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#0B0B0F]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8B5CF6]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="border-t border-[#F3F4F6] pt-6">
                <h3 className="text-base font-bold tracking-tight text-[#0B0B0F]">
                  Requirements
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {featuredJob.requirements.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#0B0B0F]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0B0B0F]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compensation & Benefits */}
              <div className="border-t border-[#F3F4F6] pt-6">
                <h3 className="text-base font-bold tracking-tight text-[#0B0B0F]">
                  Compensation &amp; Benefits
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {featuredJob.benefits.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#0B0B0F]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who Should Apply */}
              <div className="border-t border-[#F3F4F6] pt-6">
                <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-[#0B0B0F]">
                  <Users className="h-4 w-4 text-[#8B5CF6]" />
                  <span>Who Should Apply?</span>
                </h3>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {featuredJob.whoShouldApply.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-[#F3F4F6] bg-[#FAFAFC] px-4 py-3 text-sm font-medium text-[#0B0B0F]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Note */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFC] p-5">
                <p className="text-sm font-semibold text-[#0B0B0F]">
                  Interested?
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {featuredJob.closingNote}
                </p>
              </div>
            </article>

            {/* Right: Sticky Resend Application Form */}
            <div className="lg:sticky lg:top-24 lg:col-span-5">
              <CareerApplicationForm roleTitle={featuredJob.title} />
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
