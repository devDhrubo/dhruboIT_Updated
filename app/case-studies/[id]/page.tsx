import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/content";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: `Case Study — ${siteConfig.agencyName}` };
  return {
    title: `${project.title} — ${siteConfig.agencyName}`,
    description: project.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-white pt-32 pb-24 sm:pt-36">
        <article className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#0B0B0F]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Case Studies</span>
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-bold text-[#8B5CF6]">
              {project.category}
            </span>
            <span className="rounded-full bg-[#F4F5F7] px-3.5 py-1 text-xs font-semibold text-[#0B0B0F]">
              Timeline: {project.timeline}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[#0B0B0F] sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
            {project.summary}
          </p>

          {/* Metrics Row */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {project.metricsGrid.map((m) => (
              <div
                key={m.label}
                className="rounded-[22px] border border-[#E5E7EB] bg-[#FAFAFC] p-6 text-center"
              >
                <p className="text-3xl font-extrabold text-[#0B0B0F]">
                  {m.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Preview Image */}
          <div className="mt-10 overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-[#F4F5F7]">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={800}
              height={540}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          {/* Challenge & Solution */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] border border-[#E5E7EB] bg-[#FAFAFC] p-7">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                The Challenge
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#0B0B0F] sm:text-base">
                {project.problem}
              </p>
            </div>

            <div className="rounded-[24px] border border-[#E5E7EB] bg-[#FAFAFC] p-7">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                Our Solution
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#0B0B0F] sm:text-base">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Services, Stack & Outcomes */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                Services &amp; Stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.servicesProvided.map((svc) => (
                  <span
                    key={svc}
                    className="rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-[#8B5CF6]"
                  >
                    {svc}
                  </span>
                ))}
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#F4F5F7] px-3 py-1 text-xs font-semibold text-[#0B0B0F]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                Measured Outcomes
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.outcome.map((item) => (
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
          </div>

          {/* CTA Banner */}
          <div className="mt-12 rounded-[26px] border border-[#E5E7EB] bg-[#F4F5F7] p-8 text-center">
            <h2 className="text-2xl font-extrabold text-[#0B0B0F]">
              Planning a similar build?
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              Share your goals and get a tailored architecture recommendation
              and estimate within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#F0523D] px-7 py-3 text-sm font-semibold text-white hover:bg-[#E0432F]"
              >
                <span>Build Something Similar</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#0B0B0F] px-7 py-3 text-sm font-semibold text-white hover:bg-[#1E1E26]"
              >
                Book 30-Min Call
              </a>
            </div>
          </div>
        </article>
      </main>
      <FooterSection />
      <BackToTopButton />
    </>
  );
}
