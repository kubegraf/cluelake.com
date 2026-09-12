import { NextResponse } from "next/server";

/**
 * Liveness and readiness.
 *
 * ⚠ IT CHECKS NOTHING BUT ITSELF, DELIBERATELY. This site has no database and
 * no upstream it cannot render without — the contact route degrades on its own.
 * A health check that reaches a dependency turns that dependency's outage into
 * a rolling restart of a site that was serving perfectly well.
 *
 * ⚠ AND IT IS NOT CACHED. A cached 200 keeps reporting healthy after the
 * process stops being able to render.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(
    { status: "ok" },
    { headers: { "cache-control": "no-store" } },
  );
}
