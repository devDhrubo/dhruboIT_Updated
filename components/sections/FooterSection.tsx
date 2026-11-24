"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { footerContent, siteConfig } from "@/data/content";

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const wordmarkFilter = useTransform(
    scrollYProgress,
    [0.25, 0.9],
    ["blur(12px)", "blur(0px)"]
  );
  const wordmarkOpacity = useTransform(scrollYProgress, [0.2, 0.85], [0.35, 1]);
  const wordmarkY = useTransform(scrollYProgress, [0.25, 0.95], [24, 0]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#F4F5F7] pt-16 sm:pt-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* White Rounded Container */}
        <div className="rounded-[28px] border border-[#E5E7EB]/85 bg-white p-8 shadow-[0_20px_60px_-15px_rgba(11,11,15,0.06)] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left: Agency Blurb */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-[#0B0B0F]"
              >
                <Image
                  src="/images/logo.png"
                  alt={`${siteConfig.agencyName} Logo`}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span>{siteConfig.agencyName}</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6B7280]">
                {footerContent.blurb}
              </p>
              <p className="mt-6 text-xs font-medium text-[#9CA3AF]">
                © 2026 {siteConfig.agencyName}. All rights reserved.
              </p>
            </div>

            {/* Right: 3 Structured Link Columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
              {footerContent.columns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B0B0F]">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => {
                      const isExternal =
                        link.href.startsWith("http") ||
                        link.href.startsWith("mailto:");
                      return (
                        <li key={link.label}>
                          {isExternal ? (
                            <a
                              href={link.href}
                              target={
                                link.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                link.href.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0B0B0F]"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0B0B0F]"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gigantic Coral Agency Wordmark Cropped at Bottom Edge */}
      <div className="mt-10 overflow-hidden select-none">
        <motion.p
          style={
            prefersReducedMotion
              ? undefined
              : {
                  filter: wordmarkFilter,
                  opacity: wordmarkOpacity,
                  y: wordmarkY,
                }
          }
          className="-mb-[0.22em] text-center text-[13vw] font-extrabold leading-[0.85] tracking-[-0.045em] text-[#F0523D] whitespace-nowrap"
        >
          {siteConfig.shortName}
        </motion.p>
      </div>
    </footer>
  );
}
