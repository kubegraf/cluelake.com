/**
 * Where a contact submission goes.
 *
 * ⚠ SERVER-ONLY. This module reads secrets and must never be imported from a
 * client component — a provider key in the browser bundle is a key that is
 * public. The route handler is the only caller.
 *
 * ⚠ AND THERE IS NO DEFAULT PROVIDER. With none configured, submissions are
 * REFUSED rather than silently accepted: a form that returns success and drops
 * the message is worse than a form that is honestly unavailable, because
 * nobody finds out.
 */

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error" };

export async function deliver(submission: ContactSubmission): Promise<DeliveryResult> {
  const provider = process.env.CONTACT_PROVIDER;
  const to = process.env.CONTACT_TO;

  if (!provider || !to) return { ok: false, reason: "not_configured" };

  try {
    if (provider === "resend") {
      const key = process.env.RESEND_API_KEY;
      if (!key) return { ok: false, reason: "not_configured" };
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "ClueLake <noreply@cluelake.com>",
          to: [to],
          reply_to: submission.email,
          subject: `ClueLake enquiry — ${submission.company || submission.name}`,
          text: renderPlain(submission),
        }),
      });
      return res.ok ? { ok: true } : { ok: false, reason: "provider_error" };
    }

    // An unknown provider name is a misconfiguration, not a reason to invent a
    // delivery path.
    return { ok: false, reason: "not_configured" };
  } catch {
    return { ok: false, reason: "provider_error" };
  }
}

/** Plain text, deliberately. The submission is untrusted input and there is no
 *  reason to render it as HTML in somebody's mail client. */
function renderPlain(s: ContactSubmission): string {
  return [
    `Name:    ${s.name}`,
    `Email:   ${s.email}`,
    `Company: ${s.company || "—"}`,
    "",
    s.message,
  ].join("\n");
}
