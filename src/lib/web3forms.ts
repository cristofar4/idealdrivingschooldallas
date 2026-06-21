/**
 * Web3Forms — the no-account way to receive form messages by email.
 *
 * Setup (takes ~2 minutes):
 *   1. Go to https://web3forms.com, enter the email where you want messages,
 *      and copy the "Access Key" they show you.
 *   2. Paste that key below (replacing PASTE_YOUR_ACCESS_KEY_HERE), OR set the
 *      NEXT_PUBLIC_WEB3FORMS_KEY environment variable on your host.
 *
 * The access key is safe to make public — it only lets people send YOU mail.
 */

const FALLBACK_KEY = "PASTE_YOUR_ACCESS_KEY_HERE";

export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() || FALLBACK_KEY;

/** True once a real access key has been provided. */
export const formsConfigured = WEB3FORMS_ACCESS_KEY !== FALLBACK_KEY;

export type SubmitResult = { ok: boolean; error?: string };

export async function sendViaWeb3Forms(
  fields: Record<string, string | undefined>,
): Promise<SubmitResult> {
  if (!formsConfigured) {
    return {
      ok: false,
      error: "Messaging isn't connected yet — please call us and we'll help right away.",
    };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...fields,
      }),
    });
    const json = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (json?.success) return { ok: true };
    return { ok: false, error: json?.message || "Something went wrong. Please call us instead." };
  } catch {
    return { ok: false, error: "Network error. Please check your connection or call us." };
  }
}
