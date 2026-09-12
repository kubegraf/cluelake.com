/**
 * Submission validation. Pure, so it is testable and so the client and the
 * server can share one definition of "valid" rather than drifting.
 */
export type Field = "name" | "email" | "company" | "message" | "form";
export type Errors = Partial<Record<Field, string>>;

export type RawSubmission = {
  name?: unknown; email?: unknown; company?: unknown; message?: unknown;
  /** ⚠ HONEYPOT. A field no human sees and no human fills. Anything in it is a
   *  bot, and the request is refused. Cheap, no third-party script, and no
   *  accessibility cost — it is hidden from assistive technology too. */
  website?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validate(raw: RawSubmission): { ok: true; value: { name: string; email: string; company: string; message: string } } | { ok: false; errors: Errors } {
  const name = str(raw.name);
  const email = str(raw.email);
  const company = str(raw.company);
  const message = str(raw.message);

  if (str(raw.website) !== "") return { ok: false, errors: { form: "This submission was rejected." } };

  const errors: Errors = {};
  if (name.length < 2) errors.name = "Please give a name we can reply to.";
  // Deliberately permissive: the only reliable test of an address is sending to
  // it, and an over-strict pattern rejects valid addresses people really have.
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) errors.email = "This does not look like an email address.";
  if (message.length < 10) errors.message = "A sentence or two about what you need.";
  if (message.length > 5000) errors.message = "This is longer than the form accepts. Please summarise.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { name, email, company, message } };
}
