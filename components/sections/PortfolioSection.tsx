"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectFilterCategory,
} from "@/data/projects";
import { AGENCY_EASE, fadeUpVariants, staggerContainer } from "@/lib/motion";

export function PortfolioSection({
  showArchiveCta = true,
}: {
  showArchiveCta?: boolean;
}) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectFilterCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.filterCategory === activeCategory);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="work"
      aria-labelledby="portfolio-heading"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUpVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-[#F4F5F7] px-3.5 py-1 text-xs font-semibold text-[#6B7280]">
            Selected Case Studies
          </span>
          <h2
            id="portfolio-heading"
            className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#0B0B0F] sm:text-4xl md:text-5xl"
          >
            Outcomes, not just deliverables
          </h2>
          <p className="mt-4 text-base text-[#6B7280] sm:text-lg">
            Filter by vertical or open any case study to explore the
            architecture, timeline, and measurable business outcome.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter case studies by category"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {projectCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  isActive
                    ? "bg-[#0B0B0F] text-white shadow-sm"
                    : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#8B5CF6] hover:text-[#0B0B0F]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={fadeUpVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: AGENCY_EASE },
              }}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB]/85 bg-white shadow-[0_20px_60px_-15px_rgba(11,11,15,0.06)] transition-shadow hover:shadow-[0_28px_70px_-15px_rgba(11,11,15,0.1)]"
            >
              <button
                type="button"
                data-cursor="view"
                onClick={() => setSelectedProject(project)}
                className="flex h-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-inset rounded-[24px]"
              >
                {/* Thumbnail with subtle zoom on hover */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F4F5F7]">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={800}
                    height={540}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute right-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#8B5CF6] shadow-sm backdrop-blur-sm">
                    {project.metric}
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                        {project.category}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#9CA3AF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#8B5CF6]" />
                    </div>
                    <h3 className="mt-2 text-lg font-bold tracking-tight text-[#0B0B0F] group-hover:text-[#8B5CF6] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#F4F5F7] px-2.5 py-1 text-[11px] font-semibold text-[#0B0B0F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </motion.div>

        {showArchiveCta && (
          <div className="mt-12 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#0B0B0F] transition-colors hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Case Study Quick-View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="case-study-backdrop"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0F]/55 p-4 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: AGENCY_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-2xl"
            >
              {/* Fixed Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#F3F4F6] px-6 py-5 sm:px-8 sm:py-6">
                <div>
                  <span className="inline-block rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-bold text-[#8B5CF6]">
                    {selectedProject.category} • {selectedProject.metric}
                  </span>
                  <h3
                    id="modal-project-title"
                    className="mt-2.5 text-xl font-extrabold tracking-tight text-[#0B0B0F] sm:text-2xl"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-[#6B7280] sm:text-sm">
                    Client: {selectedProject.client} • Timeline:{" "}
                    {selectedProject.timeline}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close case study modal"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0B0B0F] transition-colors hover:bg-[#F4F5F7]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div
                data-lenis-prevent
                className="modal-scroll flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8"
              >
                <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F4F5F7]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.imageAlt}
                    width={800}
                    height={540}
                    className="h-auto max-h-64 w-full object-cover sm:max-h-72"
                  />
                </div>

                {/* Headline KPIs */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {selectedProject.metricsGrid.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-[#E5E7EB]/80 bg-[#FAFAFC] p-3.5 text-center"
                    >
                      <p className="text-lg font-extrabold text-[#0B0B0F] sm:text-xl">
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-[#6B7280]">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#F3F4F6] bg-[#FAFAFC] p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                      The Problem
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#0B0B0F]">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#F3F4F6] bg-[#FAFAFC] p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                      Our Solution
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#0B0B0F]">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                    Tech Stack
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#E5E7EB] bg-[#FAFAFC] px-3 py-1 text-xs font-semibold text-[#0B0B0F]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                    Measured Outcome
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {selectedProject.outcome.map((item) => (
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

              {/* Fixed Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F3F4F6] bg-[#FAFAFC] px-6 py-4 sm:px-8">
                <Link
                  href={`/case-studies/${selectedProject.id}`}
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8B5CF6] hover:underline"
                >
                  <span>Open Full Case Study</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B0B0F] hover:bg-[#F4F5F7]"
                  >
                    Close
                  </button>
                  <Link
                    href="/#contact"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-[#F0523D] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#E0432F]"
                  >
                    Build Something Similar
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
