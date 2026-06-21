"use server";

import { sendBookingEmail, sendContactEmail, type SendResult } from "@/lib/email";

/**
 * Server actions for form submissions.
 *
 * Validates input on the server, then delivers the lead via the email adapter
 * (Resend). When email isn't configured the submission is logged server-side
 * instead, so the form always works. See src/lib/email.ts for setup.
 */

export type ActionResult = { ok: boolean; error?: string };

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
};

export type BookingPayload = {
  service: string;
  date: string | null;
  time: string;
  instructor: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/** Record the lead server-side when email isn't configured, or log send errors. */
function record(tag: string, payload: object, res: SendResult) {
  if (res.delivered) return;
  if (res.error === "not-configured") {
    console.log(`[${tag}] email not configured, logged`, { ...payload, receivedAt: new Date().toISOString() });
  } else {
    console.error(`[${tag}] email delivery failed: ${res.error}`, { ...payload, receivedAt: new Date().toISOString() });
  }
}

export async function submitContact(payload: ContactPayload): Promise<ActionResult> {
  if (!payload.name?.trim()) return { ok: false, error: "Please enter your name." };
  if (!isEmail(payload.email)) return { ok: false, error: "Please enter a valid email." };
  if (!payload.message?.trim() || payload.message.trim().length < 5)
    return { ok: false, error: "Please add a short message." };

  const res = await sendContactEmail(payload);
  record("ideal:contact", payload, res);
  return { ok: true };
}

export async function submitBooking(payload: BookingPayload): Promise<ActionResult> {
  if (!payload.service) return { ok: false, error: "Please choose a service." };
  if (!payload.name?.trim()) return { ok: false, error: "Please enter your name." };
  if (!isEmail(payload.email)) return { ok: false, error: "Please enter a valid email." };
  if (!payload.phone?.trim()) return { ok: false, error: "Please enter a phone number." };

  const res = await sendBookingEmail(payload);
  record("ideal:booking", payload, res);
  return { ok: true };
}
