"use server";

/**
 * Server actions for form submissions.
 *
 * These validate input on the server and return a typed result. To deliver
 * the data, plug your provider into the marked TODO (e.g. Resend/SendGrid for
 * email, or a CRM/webhook). Submissions are logged server-side until then.
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

export async function submitContact(payload: ContactPayload): Promise<ActionResult> {
  if (!payload.name?.trim()) return { ok: false, error: "Please enter your name." };
  if (!isEmail(payload.email)) return { ok: false, error: "Please enter a valid email." };
  if (!payload.message?.trim() || payload.message.trim().length < 5)
    return { ok: false, error: "Please add a short message." };

  // TODO: forward to your email service / CRM here.
  console.log("[ideal:contact]", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  return { ok: true };
}

export async function submitBooking(payload: BookingPayload): Promise<ActionResult> {
  if (!payload.service) return { ok: false, error: "Please choose a service." };
  if (!payload.name?.trim()) return { ok: false, error: "Please enter your name." };
  if (!isEmail(payload.email)) return { ok: false, error: "Please enter a valid email." };
  if (!payload.phone?.trim()) return { ok: false, error: "Please enter a phone number." };

  // TODO: forward to your scheduling system / email / CRM here.
  console.log("[ideal:booking]", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  return { ok: true };
}
