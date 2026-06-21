import { Resend } from "resend";
import { site } from "@/lib/site";
import type { BookingPayload, ContactPayload } from "@/app/actions";

/**
 * Email delivery adapter (Resend).
 *
 * Configure via environment variables:
 *   RESEND_API_KEY     — your Resend API key (required to actually send)
 *   CONTACT_TO_EMAIL   — where leads are delivered (defaults to site email)
 *   CONTACT_FROM_EMAIL — verified sender, e.g. "Ideal <hello@yourdomain.com>"
 *
 * Without RESEND_API_KEY the app still works — submissions are logged
 * server-side instead of emailed, so dev and previews never break.
 */

const apiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL || site.email;
const fromEmail = process.env.CONTACT_FROM_EMAIL || "Ideal Driving School <onboarding@resend.dev>";

export const emailConfigured = Boolean(apiKey);

export type SendResult = { delivered: boolean; error?: string };

const resend = apiKey ? new Resend(apiKey) : null;

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;color:#5f6675;font:600 12px/1.4 system-ui;text-transform:uppercase;letter-spacing:1px;width:140px;vertical-align:top">${label}</td>
    <td style="padding:8px 0;color:#131722;font:400 15px/1.5 system-ui">${value || "—"}</td>
  </tr>`;
}

function shell(title: string, body: string) {
  return `<div style="background:#f7f5f0;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e3ddd0;border-radius:18px;overflow:hidden">
      <div style="background:#080b14;padding:22px 28px">
        <span style="color:#f5a524;font:800 18px/1 system-ui;letter-spacing:.5px">Ideal Driving School</span>
        <div style="color:#9aa6bd;font:600 11px/1.4 system-ui;text-transform:uppercase;letter-spacing:2px;margin-top:4px">${title}</div>
      </div>
      <div style="padding:24px 28px">
        <table style="width:100%;border-collapse:collapse">${body}</table>
      </div>
    </div>
  </div>`;
}

export async function sendContactEmail(p: ContactPayload): Promise<SendResult> {
  if (!resend) return { delivered: false, error: "not-configured" };
  const html = shell(
    "New website inquiry",
    row("Name", p.name) +
      row("Email", p.email) +
      row("Phone", p.phone ?? "") +
      row("Interest", p.interest) +
      row("Message", p.message.replace(/\n/g, "<br>")),
  );
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: p.email,
    subject: `New inquiry — ${p.interest} (${p.name})`,
    html,
  });
  return error ? { delivered: false, error: error.message } : { delivered: true };
}

export async function sendBookingEmail(p: BookingPayload): Promise<SendResult> {
  if (!resend) return { delivered: false, error: "not-configured" };
  const when = p.date
    ? `${new Date(p.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}${p.time ? ` · ${p.time}` : ""}`
    : "To be confirmed";
  const html = shell(
    "New booking request",
    row("Service", p.service) +
      row("When", when) +
      row("Instructor", p.instructor) +
      row("Name", p.name) +
      row("Email", p.email) +
      row("Phone", p.phone) +
      row("Notes", (p.notes ?? "").replace(/\n/g, "<br>")),
  );
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: p.email,
    subject: `New booking — ${p.service} (${p.name})`,
    html,
  });
  return error ? { delivered: false, error: error.message } : { delivered: true };
}
