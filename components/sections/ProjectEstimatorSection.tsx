"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  Globe2,
  Mail,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import {
  consultationSteps,
  contactContent,
  directContactPerson,
  siteConfig,
} from "@/data/content";
import { AGENCY_EASE } from "@/lib/motion";

const budgetOptions = [
  "$5K – $15K",
  "$15K – $35K",
  "$35K – $75K",
  "$75K+",
];

const timelineOptions = [
  "ASAP (< 1 month)",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible",
];

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  privacy?: string;
  file?: string;
}

const MAX_FILE_BYTES = 10 * 1024 * 1024;

export function ProjectEstimatorSection() {
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState(
    contactContent.projectTypes[0]
  );
  const [selectedBudget, setSelectedBudget] = useState(budgetOptions[1]);
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[1]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directContactPerson.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${directContactPerson.email}`;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setErrors((prev) => ({ ...prev, file: "File size must be under 10 MB." }));
      return;
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    setAttachedFile(file);
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!firstName.trim() || firstName.trim().length < 2) {
      nextErrors.firstName = "Please enter your first name.";
    }
    if (!lastName.trim() || lastName.trim().length < 2) {
      nextErrors.lastName = "Please enter your last name.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid work email.";
    }
    if (!message.trim() || message.trim().length < 15) {
      nextErrors.message =
        "Please share a few details about your scope (at least 15 characters).";
    }
    if (!privacyAccepted) {
      nextErrors.privacy = "Please agree to the Privacy Policy to continue.";
    }
    return nextErrors;
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
      payload.append("formType", "Project Estimation");
      payload.append("firstName", firstName.trim());
      payload.append("lastName", lastName.trim());
      payload.append("email", email.trim());
      if (company.trim()) payload.append("company", company.trim());
      payload.append("service", selectedService);
      payload.append("budget", selectedBudget);
      payload.append("timeline", selectedTimeline);
      payload.append("message", message.trim());
      if (attachedFile) payload.append("file", attachedFile);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSubmitError(
          data.error ||
            "Could not send your estimation request. Please email hello.dhruboit@gmail.com directly."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Network error while sending. Please email hello.dhruboit@gmail.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setAttachedFile(null);
    setPrivacyAccepted(false);
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
  };

  return (
    <section className="bg-[#F4F5F7] pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Single Compact Page Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
            Project Estimation
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-[#0B0B0F] sm:text-5xl">
            Request a tailored project estimation
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#6B7280] sm:text-base">
            Want the fastest answer? Book a 30-minute call or email us directly
            — or configure your scope below for a written milestone estimate.
          </p>

          {/* Direct Fast-Track Bar (Calendly + Direct Email Spotlight) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#F0523D] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-10px_rgba(240,82,61,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#E0432F]"
            >
              <Calendar className="h-4 w-4" />
              <span>Book 30-Min Call on Calendly</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${directContactPerson.email}?subject=Project%20Estimation%20%E2%80%94%20Dhrubo%20IT`}
              className="inline-flex items-center gap-2 rounded-full bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#7C3AED]"
            >
              <Mail className="h-4 w-4" />
              <span>{directContactPerson.email}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-3 text-xs font-semibold text-[#0B0B0F] hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#10B981]" />
                  <span className="text-[#10B981]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Two-Column Estimator Layout (Immediately Visible) */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          {/* Left: Interactive Estimator Form */}
          <div className="lg:col-span-7 rounded-[28px] border border-[#E5E7EB]/85 bg-white p-6 shadow-[0_24px_65px_-15px_rgba(11,11,15,0.08)] sm:p-9">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: AGENCY_EASE }}
                className="py-10 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#10B981]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#0B0B0F]">
                  Estimation request received
                </h2>
                <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-[#6B7280]">
                  Thanks,{" "}
                  <span className="font-semibold text-[#0B0B0F]">
                    {firstName} {lastName}
                  </span>
                  . Our solutions architects are reviewing your{" "}
                  <span className="font-semibold text-[#0B0B0F]">
                    {selectedService}
                  </span>{" "}
                  scope ({selectedBudget}, {selectedTimeline}) and will send a
                  written estimate to{" "}
                  <span className="font-semibold text-[#0B0B0F]">{email}</span>{" "}
                  within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-7 rounded-full border border-[#E5E7EB] px-6 py-2.5 text-sm font-semibold text-[#0B0B0F] hover:bg-[#F4F5F7]"
                >
                  Submit another estimate
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Step 1: Service Scope */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0B0B0F]">
                    1. What are we building?
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {contactContent.projectTypes.map((type) => {
                      const active = selectedService === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedService(type)}
                          className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                            active
                              ? "bg-[#0B0B0F] text-white shadow-xs"
                              : "border border-[#E5E7EB] bg-[#FAFAFC] text-[#6B7280] hover:border-[#8B5CF6] hover:text-[#0B0B0F]"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Budget & Timeline */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0B0B0F]">
                      2. Estimated Budget
                    </p>
                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      {budgetOptions.map((option) => {
                        const active = selectedBudget === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedBudget(option)}
                            className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                              active
                                ? "bg-[#8B5CF6] text-white shadow-xs"
                                : "border border-[#E5E7EB] bg-[#FAFAFC] text-[#0B0B0F] hover:border-[#8B5CF6]"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0B0B0F]">
                      3. Target Timeline
                    </p>
                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      {timelineOptions.map((option) => {
                        const active = selectedTimeline === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedTimeline(option)}
                            className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                              active
                                ? "bg-[#8B5CF6] text-white shadow-xs"
                                : "border border-[#E5E7EB] bg-[#FAFAFC] text-[#0B0B0F] hover:border-[#8B5CF6]"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 3: Contact Details */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="est-first-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                    >
                      First Name *
                    </label>
                    <input
                      id="est-first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName)
                          setErrors((p) => ({ ...p, firstName: undefined }));
                      }}
                      placeholder="Alex"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-4 py-3 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs font-medium text-[#F0523D]">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="est-last-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                    >
                      Last Name *
                    </label>
                    <input
                      id="est-last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName)
                          setErrors((p) => ({ ...p, lastName: undefined }));
                      }}
                      placeholder="Morgan"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-4 py-3 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs font-medium text-[#F0523D]">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="est-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                    >
                      Work Email *
                    </label>
                    <input
                      id="est-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder="alex@company.com"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-4 py-3 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-medium text-[#F0523D]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="est-company"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                    >
                      Company (Optional)
                    </label>
                    <input
                      id="est-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-4 py-3 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="est-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                  >
                    Project Brief &amp; Requirements *
                  </label>
                  <textarea
                    id="est-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message)
                        setErrors((p) => ({ ...p, message: undefined }));
                    }}
                    placeholder="Describe key features, integrations, or link any reference products..."
                    className="mt-2 w-full resize-none rounded-xl border border-[#E5E7EB] bg-[#FAFAFC] px-4 py-3 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:bg-white focus:outline-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs font-medium text-[#F0523D]">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label
                    htmlFor="est-file"
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-[#D1D5DB] bg-[#FAFAFC] px-4 py-3 text-xs text-[#6B7280] transition-colors hover:border-[#8B5CF6] hover:bg-white"
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <Paperclip className="h-4 w-4 shrink-0 text-[#8B5CF6]" />
                      <span className="truncate font-medium text-[#0B0B0F]">
                        {attachedFile
                          ? attachedFile.name
                          : "Attach RFP, spec, or wireframe (PDF, PNG, DOCX up to 10 MB)"}
                      </span>
                    </span>
                    {attachedFile && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setAttachedFile(null);
                        }}
                        aria-label="Remove attached file"
                        className="rounded-full p-1 text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#0B0B0F]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <input
                      id="est-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  {errors.file && (
                    <p className="mt-1 text-xs font-medium text-[#F0523D]">
                      {errors.file}
                    </p>
                  )}
                </div>

                {/* Privacy Consent */}
                <div>
                  <label className="flex items-start gap-2.5 text-xs text-[#6B7280]">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => {
                        setPrivacyAccepted(e.target.checked);
                        if (errors.privacy)
                          setErrors((p) => ({ ...p, privacy: undefined }));
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-[#D1D5DB] accent-[#8B5CF6]"
                    />
                    <span>
                      I agree to {siteConfig.agencyName}&apos;s{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-[#0B0B0F] underline hover:text-[#8B5CF6]"
                      >
                        Privacy Policy
                      </Link>{" "}
                      (Mutual NDA available on request).
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="mt-1 text-xs font-medium text-[#F0523D]">
                      {errors.privacy}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p role="alert" className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-xs font-medium text-[#B91C1C]">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F0523D] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-10px_rgba(240,82,61,0.5)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#E0432F] disabled:opacity-60"
                >
                  <span>{isSubmitting ? "Sending Estimate Request..." : "Get Written Estimate"}</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right: Live Scope Summary + What Happens Next + Enterprise Desk */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Selected Scope Summary */}
            <div className="rounded-[26px] border border-[#8B5CF6]/25 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                Selected Scope Summary
              </p>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-[#6B7280]">Service</dt>
                  <dd className="font-semibold text-[#0B0B0F] text-right">
                    {selectedService.split("(")[0].trim()}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-[#6B7280]">Budget Range</dt>
                  <dd className="font-semibold text-[#0B0B0F]">{selectedBudget}</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-[#6B7280]">Target Timeline</dt>
                  <dd className="font-semibold text-[#0B0B0F]">
                    {selectedTimeline}
                  </dd>
                </div>
              </dl>
            </div>

            {/* What Happens Next */}
            <div className="rounded-[26px] border border-[#E5E7EB]/85 bg-white p-7 shadow-sm">
              <h2 className="text-lg font-bold tracking-tight text-[#0B0B0F]">
                What happens next?
              </h2>
              <ol className="mt-5 space-y-4">
                {consultationSteps.map((item) => (
                  <li key={item.step} className="flex items-start gap-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-xs font-extrabold text-[#8B5CF6]">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#0B0B0F]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#6B7280]">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Enterprise Solutions Desk */}
            <div className="rounded-[26px] border border-[#E5E7EB]/85 bg-white p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
                Prefer to Talk Directly?
              </p>
              <div className="mt-4 flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EDE9FE] text-[#8B5CF6]">
                  <Building2 className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-base font-bold text-[#0B0B0F]">
                    {directContactPerson.name}
                  </p>
                  <p className="text-xs font-medium text-[#6B7280]">
                    {directContactPerson.role}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <a
                  href={`mailto:${directContactPerson.email}`}
                  className="flex items-center gap-2.5 font-medium text-[#0B0B0F] hover:text-[#8B5CF6]"
                >
                  <Mail className="h-4 w-4 text-[#8B5CF6]" />
                  <span>{directContactPerson.email}</span>
                </a>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#6B7280]">
                  <Globe2 className="h-4 w-4 text-[#8B5CF6]" />
                  <span>{directContactPerson.responseTime}</span>
                </div>
              </div>
              <div className="mt-5">
                <a
                  href={siteConfig.calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0B0B0F] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1E1E26]"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book a 30-Min Meeting</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
