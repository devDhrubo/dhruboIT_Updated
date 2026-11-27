import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Application email service is not configured yet. Please send your introduction directly to hello.dhruboit@gmail.com.",
        },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const roleTitle = String(
      formData.get("roleTitle") ?? "Business Development Partner (Remote)"
    ).trim();
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const linkedinUrl = String(formData.get("linkedinUrl") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const introduction = String(formData.get("introduction") ?? "").trim();
    const resume = formData.get("resume");

    if (fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (introduction.length < 20) {
      return NextResponse.json(
        {
          error:
            "Please share a short introduction and your relevant experience (at least 20 characters).",
        },
        { status: 400 }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    if (resume instanceof File && resume.size > 0) {
      if (resume.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: "Resume/CV file must be smaller than 10 MB." },
          { status: 400 }
        );
      }
      const arrayBuffer = await resume.arrayBuffer();
      attachments.push({
        filename: resume.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || "hello.dhruboit@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const subject = `[Dhrubo IT — Job Application] ${fullName} — ${roleTitle}`;

    const rows: [string, string][] = [
      ["Role", roleTitle],
      ["Candidate Name", fullName],
      ["Email", email],
      ...(location ? [["Country / Timezone", location] as [string, string]] : []),
      ...(linkedinUrl
        ? [["LinkedIn / Portfolio", linkedinUrl] as [string, string]]
        : []),
    ];

    const htmlRows = rows
      .map(
        ([label, val]) =>
          `<tr><td style="padding:8px 12px;font-weight:600;color:#6B7280;border-bottom:1px solid #F3F4F6;width:170px;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0B0B0F;border-bottom:1px solid #F3F4F6;">${escapeHtml(val)}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;color:#0B0B0F;">
        <h2 style="margin:0 0 16px;font-size:20px;">New Career Application — Dhrubo IT</h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;">
          <tbody>${htmlRows}</tbody>
        </table>
        <div style="margin-top:20px;padding:16px;background:#FAFAFC;border:1px solid #E5E7EB;border-radius:12px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;color:#8B5CF6;">Introduction &amp; Relevant Experience</p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(introduction)}</p>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      return NextResponse.json(
        {
          error:
            "Could not deliver your application right now. Please email hello.dhruboit@gmail.com directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unexpected error while submitting your application. Please email hello.dhruboit@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}
