import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { servicesList, siteConfig } from "@/data/content";

export function generateStaticParams() {
  return servicesList.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesList.find((s) => s.slug === slug);
  if (!service) return { title: `Service — ${siteConfig.agencyName}` };
  return {
    title: `${service.title} — ${siteConfig.agencyName}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesList.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white pt-32 pb-20 sm:pt-36">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#0B0B0F]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>All Services</span>
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
                {service.shortTitle}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F7] px-3.5 py-1 text-xs font-semibold text-[#0B0B0F]">
                <Clock className="h-3.5 w-3.5 text-[#8B5CF6]" />
                Typical Timeline: {service.timeline}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] text-[#0B0B0F] sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#F0523D] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-10px_rgba(240,82,61,0.5)] hover:bg-[#E0432F]"
              >
                <span>Request an Estimation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#E5E7EB] bg-white px-7 py-3.5 text-sm font-semibold text-[#0B0B0F] hover:bg-[#F4F5F7]"
              >
                Book 30-Min Call
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F5F7] py-20">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2">
            <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-sm">
              <h2 className="text-lg font-bold text-[#0B0B0F]">
                What&apos;s Included
              </h2>
              <ul className="mt-4 space-y-3">
                {service.deliverables.map((item) => (
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

            <div className="flex flex-col gap-6">
              <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-sm">
                <h2 className="text-lg font-bold text-[#0B0B0F]">
                  Target Outcomes
                </h2>
                <ul className="mt-4 space-y-3">
                  {service.outcomes.map((item) => (
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

              <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-sm">
                <h2 className="text-lg font-bold text-[#0B0B0F]">
                  Core Stack
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[#F4F5F7] px-3.5 py-1.5 text-xs font-semibold text-[#0B0B0F]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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
