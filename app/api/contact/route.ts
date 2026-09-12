import { NextResponse } from "next/server";
import { validate } from "@/lib/contact/validate";
import { deliver } from "@/lib/contact/provider";

export const runtime = "nodejs";

/**
 * ⚠ ERRORS ARE SHAPED AND CARRY A REQUEST ID, AND NEVER A STACK TRACE. A
 * visitor who cannot send a message needs something to quote; an attacker
 * should learn nothing about what is running.
 */
export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { code: "invalid_body", message: "The submission could not be read.", request_id: requestId },
      { status: 400 },
    );
  }

  const parsed = validate(body as Record<string, unknown>);
  if (!parsed.ok) {
    return NextResponse.json(
      { code: "invalid_submission", message: "Some fields need attention.", details: parsed.errors, request_id: requestId },
      { status: 400 },
    );
  }

  const result = await deliver(parsed.value);
  if (!result.ok) {
    // ⚠ 503, NOT 200. The message was not delivered, so the caller must not be
    // told it was. `not_configured` is an operator error and is logged as one.
    console.error(JSON.stringify({
      level: "error", msg: "contact delivery failed",
      reason: result.reason, request_id: requestId,
    }));
    return NextResponse.json(
      {
        code: "delivery_failed",
        message: "Your message couldn't be sent. Please try again, or email us directly.",
        request_id: requestId,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, request_id: requestId }, { status: 202 });
}
