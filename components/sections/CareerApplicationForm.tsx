"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Copy,
  Mail,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import { siteConfig } from "@/data/content";
import { AGENCY_EASE } from "@/lib/motion";

interface FormErrors {
  fullName?: string;
  email?: string;
  introduction?: string;
  resume?: string;
}

const MAX_FILE_BYTES = 10 * 1024 * 1024;

export function CareerApplicationForm({ roleTitle }: { roleTitle: string }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setErrors((prev) => ({
        ...prev,
        resume: "Resume/CV file must be under 10 MB.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, resume: undefined }));
    setResumeFile(file);
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      next.fullName = "Please enter your full name.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!introduction.trim() || introduction.trim().length < 20) {
      next.introduction =
        "Please share a brief introduction and your relevant experience (at least 20 characters).";
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitError(null);
    if (Object.keys(validationErrors).length !== 0) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("roleTitle", roleTitle);
      payload.append("fullName", fullName.trim());
      payload.append("email", email.trim());
      if (linkedinUrl.trim()) payload.append("linkedinUrl", linkedinUrl.trim());
      if (location.trim()) payload.append("location", location.trim());
      payload.append("introduction", introduction.trim());
      if (resumeFile) payload.append("resume", resumeFile);

      const res = await fetch("/api/careers", {
        method: "POST",
        body: payload,
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSubmitError(
          data.error ||
            `Could not submit your application. Please email ${siteConfig.email} directly.`
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        `Network error while submitting. Please email ${siteConfig.email} directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setLinkedinUrl("");
    setLocation("");
    setIntroduction("");
    setResumeFile(null);
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
  };

  return (
    <div
      id="apply-now"
      className="min-w-0 rounded-[24px] border border-[#E5E7EB]/90 bg-white p-5 shadow-[0_24px_65px_-15px_rgba(11,11,15,0.08)] sm:rounded-[28px] sm:p-8"
    >
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: AGENCY_EASE }}
          className="py-8 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#10B981]">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#0B0B0F]">
            Application sent!
          </h3>
          <p className="mx-auto mt-2.5 text-sm leading-relaxed text-[#6B7280]">
            Thanks,{" "}
            <span className="font-semibold text-[#0B0B0F]">{fullName}</span>.
            Our team has received your application for{" "}
            <span className="font-semibold text-[#0B0B0F]">{roleTitle}</span>{" "}
            and will get back to you at{" "}
            <span className="font-semibold text-[#0B0B0F]">{email}</span>.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 rounded-full border border-[#E5E7EB] px-6 py-2.5 text-sm font-semibold text-[#0B0B0F] hover:bg-[#F4F5F7]"
          >
            Submit another application
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <span className="inline-block rounded-full bg-[#EDE9FE] px-3 py-1 text-[11px] font-bold text-[#8B5CF6]">
              Quick Apply
            </span>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-[#0B0B0F]">
              Apply for this Partnership
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">
              Send us a short introduction and your relevant experience. Direct
              applications go straight to our leadership team.
            </p>
          </div>

          <div>
            <label
              htmlFor="career-name"
              className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
            >
              Full Name *
            </label>
            <input
              id="career-name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName)
                  setErrors((p) => ({ ...p, fullName: undefined }));
              }}
              placeholder="Jordan Smith"
              className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-4 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs font-medium text-[#F0523D]">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="career-email"
              className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
            >
              Email Address *
            </label>
            <input
              id="career-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
              }}
              placeholder="jordan@email.com"
              className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-4 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-[#F0523D]">
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="career-linkedin"
                className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
              >
                LinkedIn / Profile
              </label>
              <input
                id="career-linkedin"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="linkedin.com/in/..."
                className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-3.5 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="career-location"
                className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
              >
                Country / Timezone
              </label>
              <input
                id="career-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. UK (GMT)"
                className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-3.5 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="career-intro"
              className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
            >
              Short Introduction &amp; Experience *
            </label>
            <textarea
              id="career-intro"
              rows={4}
              value={introduction}
              onChange={(e) => {
                setIntroduction(e.target.value);
                if (errors.introduction)
                  setErrors((p) => ({ ...p, introduction: undefined }));
              }}
              placeholder="Tell us about your lead generation or B2B sales experience, target markets, and how you approach international clients..."
              className="mt-1.5 w-full resize-none rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-4 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
            />
            {errors.introduction && (
              <p className="mt-1 text-xs font-medium text-[#F0523D]">
                {errors.introduction}
              </p>
            )}
          </div>

          {/* Optional CV / Resume Upload */}
          <div>
            <label
              htmlFor="career-resume"
              className="flex min-w-0 cursor-pointer items-center justify-between gap-2 rounded-xl border border-dashed border-[#D1D5DB] bg-[#FAFAFC] px-3.5 py-2.5 text-xs text-[#6B7280] transition-colors hover:border-[#8B5CF6] hover:bg-white"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Paperclip className="h-4 w-4 shrink-0 text-[#8B5CF6]" />
                <span className="truncate font-medium text-[#0B0B0F]">
                  {resumeFile
                    ? resumeFile.name
                    : "Attach CV / Resume (Optional, PDF/DOCX)"}
                </span>
              </span>
              {resumeFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setResumeFile(null);
                  }}
                  aria-label="Remove resume file"
                  className="rounded-full p-1 text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#0B0B0F]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <input
                id="career-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
            {errors.resume && (
              <p className="mt-1 text-xs font-medium text-[#F0523D]">
                {errors.resume}
              </p>
            )}
          </div>

          {submitError && (
            <p
              role="alert"
              className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-2.5 text-xs font-medium text-[#B91C1C]"
            >
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F0523D] px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-10px_rgba(240,82,61,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#E0432F] disabled:opacity-60"
          >
            <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
            <Send className="h-4 w-4" />
          </button>

          <p className="text-center text-[11px] text-[#6B7280]">
            By applying you agree to our{" "}
            <Link href="/privacy" className="underline hover:text-[#0B0B0F]">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Direct Email Option */}
          <div className="border-t border-[#F3F4F6] pt-4">
            <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Or email your introduction directly
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
              <a
                href={`mailto:${siteConfig.email}?subject=Application%3A%20${encodeURIComponent(roleTitle)}`}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#F4F5F7] px-3.5 py-2 text-xs font-semibold text-[#0B0B0F] hover:bg-[#EDE9FE] hover:text-[#8B5CF6] break-all"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{siteConfig.email}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-semibold text-[#0B0B0F] hover:border-[#8B5CF6]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#10B981]" />
                    <span className="text-[#10B981]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
