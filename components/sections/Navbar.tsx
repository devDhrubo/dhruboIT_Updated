"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, servicesList, siteConfig } from "@/data/content";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#E5E7EB]/85 bg-white/90 px-4 py-2.5 shadow-[0_12px_40px_-12px_rgba(11,11,15,0.1)] backdrop-blur-md sm:px-6"
      >
        {/* Left: Agency Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-[#0B0B0F] sm:text-base whitespace-nowrap"
        >
          <Image
            src="/images/logo.png"
            alt={`${siteConfig.agencyName} Logo`}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span>{siteConfig.agencyName}</span>
        </Link>

        {/* Center: Nav Links + Services Dropdown (Desktop) */}
        <ul className="hidden items-center gap-6 md:flex">
          <li ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0B0B0F]"
            >
              <span>Services</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180 text-[#8B5CF6]" : ""
                }`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full mt-4 w-80 -translate-x-1/2 rounded-[22px] border border-[#E5E7EB] bg-white p-2.5 shadow-[0_24px_60px_-15px_rgba(11,11,15,0.16)]">
                <ul className="space-y-1">
                  {servicesList.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-start justify-between gap-2 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-[#F4F5F7]"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#0B0B0F] group-hover:text-[#8B5CF6]">
                            {service.shortTitle}
                          </p>
                          <p className="mt-0.5 text-xs text-[#6B7280] line-clamp-1">
                            {service.tagline}
                          </p>
                        </div>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9CA3AF] group-hover:text-[#8B5CF6]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0B0B0F]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/request-estimation"
            className="text-sm font-semibold text-[#0B0B0F] transition-colors hover:text-[#8B5CF6] whitespace-nowrap"
          >
            Request Estimation
          </Link>
          <a
            href={siteConfig.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#0B0B0F] px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1E1E26] whitespace-nowrap"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#0B0B0F] md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-6xl rounded-[24px] border border-[#E5E7EB] bg-white/95 p-5 shadow-[0_20px_60px_-15px_rgba(11,11,15,0.12)] backdrop-blur-md md:hidden">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#8B5CF6]">
            Services
          </p>
          <ul className="mt-1.5 grid grid-cols-1 gap-1">
            {servicesList.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-[#0B0B0F] hover:bg-[#F4F5F7]"
                >
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-3 border-t border-[#E5E7EB]" />

          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2 text-base font-medium text-[#0B0B0F] hover:bg-[#F4F5F7]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2 border-t border-[#E5E7EB] pt-4">
            <Link
              href="/request-estimation"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-full border border-[#E5E7EB] py-2.5 text-center text-sm font-semibold text-[#0B0B0F]"
            >
              Request Estimation
            </Link>
            <a
              href={siteConfig.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-full bg-[#0B0B0F] py-2.5 text-center text-sm font-semibold text-white"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
