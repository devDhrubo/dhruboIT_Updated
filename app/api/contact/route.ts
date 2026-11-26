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
            "Email service is not configured yet. Please email hello.dhruboit@gmail.com directly or book on Calendly.",
        },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const formType = String(formData.get("formType") ?? "Contact Brief").trim();
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const timeline = String(formData.get("timeline") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const file = formData.get("file");

    if (firstName.length < 2 || lastName.length < 2) {
      return NextResponse.json(
        { error: "Please provide both your first and last name." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid work email address." },
        { status: 400 }
      );
    }

    if (message.length < 15) {
      return NextResponse.json(
        { error: "Please include at least 15 characters in your project brief." },
        { status: 400 }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: "Attached file must be smaller than 10 MB." },
          { status: 400 }
        );
      }
      const arrayBuffer = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || "hello.dhruboit@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const fullName = `${firstName} ${lastName}`;
    const subject = `[Dhrubo IT — ${formType}] ${fullName}${service ? ` (${service.split("(")[0].trim()})` : ""}`;

    const rows: [string, string][] = [
      ["Inquiry Type", formType],
      ["Name", fullName],
      ["Email", email],
      ...(company ? [["Company", company] as [string, string]] : []),
      ...(phone ? [["Phone / WhatsApp", phone] as [string, string]] : []),
      ...(service ? [["Service", service] as [string, string]] : []),
      ...(budget ? [["Estimated Budget", budget] as [string, string]] : []),
      ...(timeline ? [["Target Timeline", timeline] as [string, string]] : []),
    ];

    const htmlRows = rows
      .map(
        ([label, val]) =>
          `<tr><td style="padding:8px 12px;font-weight:600;color:#6B7280;border-bottom:1px solid #F3F4F6;width:160px;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0B0B0F;border-bottom:1px solid #F3F4F6;">${escapeHtml(val)}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;color:#0B0B0F;">
        <h2 style="margin:0 0 16px;font-size:20px;">New ${escapeHtml(formType)} — Dhrubo IT</h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;">
          <tbody>${htmlRows}</tbody>
        </table>
        <div style="margin-top:20px;padding:16px;background:#FAFAFC;border:1px solid #E5E7EB;border-radius:12px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;color:#8B5CF6;">Project Brief</p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
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
        { error: "Could not deliver your message right now. Please email hello.dhruboit@gmail.com directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while sending your inquiry. Please email hello.dhruboit@gmail.com directly." },
      { status: 500 }
    );
  }
}
