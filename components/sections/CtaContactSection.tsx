"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  Globe2,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  consultationSteps,
  contactContent,
  ctaContent,
  directContactPerson,
  siteConfig,
} from "@/data/content";
import { AGENCY_EASE, fadeUpVariants } from "@/lib/motion";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  privacy?: string;
  file?: string;
}

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

export function CtaContactSection() {
  const [copied, setCopied] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(contactContent.projectTypes[0]);
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directContactPerson.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is restricted
      window.location.href = `mailto:${directContactPerson.email}`;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setErrors((prev) => ({
        ...prev,
        file: "File size must be under 10 MB.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    setAttachedFile(file.name);
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
        "Please share a few details about your project (at least 15 characters).";
    }
    if (!privacyAccepted) {
      nextErrors.privacy = "Please agree to the Privacy Policy to continue.";
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setProjectType(contactContent.projectTypes[0]);
    setMessage("");
    setAttachedFile(null);
    setPrivacyAccepted(false);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top CTA Headline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUpVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-[#FEF2F2] px-3.5 py-1 text-xs font-semibold text-[#F0523D]">
            {ctaContent.eyebrow}
          </span>
          <h2
            id="cta-heading"
            className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[#0B0B0F] sm:text-5xl md:text-6xl"
          >
            {ctaContent.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] sm:text-lg">
            Book a 30-minute strategy call directly on our calendar or email our
            engineering desk — the fastest way to get architecture clarity and
            an estimate.
          </p>
        </motion.div>

        {/* PRIMARY TIER: Calendly & Direct Email Spotlight Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUpVariants}
          className="mt-12 grid gap-6 lg:grid-cols-12"
        >
          {/* Card 1: Featured Calendly Booking Card */}
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B0B0F] via-[#14141F] to-[#1F1738] p-8 text-white shadow-[0_28px_70px_-15px_rgba(11,11,15,0.35)] sm:p-10 lg:col-span-7 flex flex-col justify-between">
            {/* Ambient Violet & Coral Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#8B5CF6]/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#F0523D]/20 blur-3xl"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#C4B5FD]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Recommended • Fastest Way to Start</span>
              </div>

              <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Book a 30-Min Strategy Call
              </h3>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                Speak directly with our senior solutions engineering team. Pick
                a slot on Calendly and walk away with a clear technical roadmap.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>Live architecture, stack &amp; AI feasibility review</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>Milestone timeline &amp; transparent ballpark estimate</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>Direct engineers — zero sales scripts or hand-offs</span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F0523D] px-7 py-4 text-sm font-bold text-white shadow-[0_16px_34px_-10px_rgba(240,82,61,0.65)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#E0432F]"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule on Calendly</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/65">
                <Globe2 className="h-3.5 w-3.5 text-[#C4B5FD]" />
                {siteConfig.operations}
              </span>
            </div>
          </div>

          {/* Card 2: Direct Email Spotlight Card */}
          <div className="flex flex-col justify-between rounded-[28px] border-2 border-[#8B5CF6]/25 bg-gradient-to-b from-[#FAFAFC] to-white p-8 shadow-[0_24px_60px_-15px_rgba(139,92,246,0.12)] sm:p-10 lg:col-span-5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDE9FE] px-3.5 py-1 text-xs font-semibold text-[#8B5CF6]">
                <Mail className="h-3.5 w-3.5" />
                <span>Direct Engineering Desk</span>
              </span>

              <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[#0B0B0F] sm:text-3xl">
                Email us directly
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#6B7280]">
                Have an RFP, deck, or quick technical question? Send it straight
                from your inbox to our advisory desk.
              </p>

              {/* Highlighted Email Box */}
              <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                  Official Contact Email
                </p>
                <a
                  href={`mailto:${directContactPerson.email}?subject=Project%20Inquiry%20%E2%80%94%20Dhrubo%20IT`}
                  className="mt-1 block break-all text-lg font-extrabold tracking-tight text-[#0B0B0F] hover:text-[#8B5CF6] sm:text-xl"
                >
                  {directContactPerson.email}
                </a>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <a
                  href={`mailto:${directContactPerson.email}?subject=Project%20Inquiry%20%E2%80%94%20Dhrubo%20IT`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B5CF6] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-10px_rgba(139,92,246,0.5)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#7C3AED]"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-3.5 text-sm font-semibold text-[#0B0B0F] transition-colors hover:border-[#8B5CF6] hover:text-[#8B5CF6]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-[#10B981]" />
                      <span className="text-[#10B981]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-medium text-[#6B7280]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
                  Mutual NDA ready
                </span>
                <span>Reply within 24 hours</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Horizontal 4-Step "What Happens Next" Strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="mt-8 grid gap-4 rounded-[24px] border border-[#E5E7EB]/85 bg-[#F4F5F7]/70 p-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {consultationSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-[#8B5CF6] shadow-xs">
                {item.step}
              </span>
              <div>
                <p className="text-xs font-bold text-[#0B0B0F]">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B7280]">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* SECONDARY TIER: Lower-Emphasis Quick Project Brief Form */}
        <motion.div
          id="contact-form-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUpVariants}
          className="mx-auto mt-10 max-w-3xl rounded-[26px] border border-[#E5E7EB]/80 bg-[#FAFAFC] p-7 sm:p-9"
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
                Brief received
              </h3>
              <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-[#6B7280]">
                Thanks,{" "}
                <span className="font-semibold text-[#0B0B0F]">
                  {firstName} {lastName}
                </span>
                . For an even faster start, you can also{" "}
                <a
                  href={siteConfig.calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#8B5CF6] underline"
                >
                  lock a 30-min slot on Calendly
                </a>
                .
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 rounded-full border border-[#E5E7EB] bg-white px-6 py-2.5 text-sm font-semibold text-[#0B0B0F] hover:bg-[#F4F5F7]"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#E5E7EB] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                    Prefer a Quick Form?
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight text-[#0B0B0F]">
                    Or send us a project brief here
                  </h3>
                </div>
                <span className="text-xs text-[#6B7280]">
                  Reviewed by a senior engineer within 24h
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-first-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                  >
                    First Name *
                  </label>
                  <input
                    id="contact-first-name"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName)
                        setErrors((p) => ({ ...p, firstName: undefined }));
                    }}
                    placeholder="Alex"
                    aria-invalid={Boolean(errors.firstName)}
                    className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:outline-none"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs font-medium text-[#F0523D]">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-last-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                  >
                    Last Name *
                  </label>
                  <input
                    id="contact-last-name"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName)
                        setErrors((p) => ({ ...p, lastName: undefined }));
                    }}
                    placeholder="Morgan"
                    aria-invalid={Boolean(errors.lastName)}
                    className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:outline-none"
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
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                  >
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder="alex@company.com"
                    aria-invalid={Boolean(errors.email)}
                    className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-[#F0523D]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                  >
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-project-type"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                >
                  Service Needed
                </label>
                <select
                  id="contact-project-type"
                  name="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0B0B0F] focus:border-[#8B5CF6] focus:outline-none"
                >
                  {contactContent.projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0B0B0F]"
                >
                  Project Brief *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((p) => ({ ...p, message: undefined }));
                  }}
                  placeholder="Share your goals, target launch timeline, and any technical context..."
                  aria-invalid={Boolean(errors.message)}
                  className="mt-1.5 w-full resize-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0B0B0F] placeholder:text-[#9CA3AF] focus:border-[#8B5CF6] focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs font-medium text-[#F0523D]">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Optional RFP / Spec File Upload */}
              <div>
                <label
                  htmlFor="contact-file"
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-[#D1D5DB] bg-white px-4 py-2.5 text-xs text-[#6B7280] transition-colors hover:border-[#8B5CF6]"
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Paperclip className="h-4 w-4 shrink-0 text-[#8B5CF6]" />
                    <span className="truncate font-medium text-[#0B0B0F]">
                      {attachedFile
                        ? attachedFile
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
                    id="contact-file"
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

              {/* Privacy Policy Consent + Subtle Submit Button */}
              <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <label className="flex items-start gap-2 text-xs text-[#6B7280]">
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
                      I agree to the{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-[#0B0B0F] underline hover:text-[#8B5CF6]"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="mt-1 text-xs font-medium text-[#F0523D]">
                      {errors.privacy}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0B0B0F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E1E26]"
                >
                  <span>Send Project Brief</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
