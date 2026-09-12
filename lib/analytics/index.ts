/**
 * A deliberately small analytics abstraction.
 *
 * ⚠ NO VENDOR IS IMPORTED HERE, AND NO SCRIPT IS LOADED BY DEFAULT. Components
 * call `track()`; whether anything happens is a deployment decision made through
 * `NEXT_PUBLIC_ANALYTICS`. That keeps a third-party script off the page for
 * anybody who has not opted into one, and means swapping Plausible for PostHog
 * touches this file and nothing else.
 *
 * ⚠ AND IT CARRIES NO PERSONAL DATA. Events are a name and a small set of
 * enumerated properties. Never an email, never form contents, never a URL with
 * a query string in it.
 */

export type AnalyticsEvent =
  | { name: "cta_click"; props: { cta: string; location: string } }
  | { name: "demo_interaction"; props: { demo: string; action: string } }
  | { name: "nav_click"; props: { to: string } };

type Provider = "plausible" | "posthog" | "ga4" | "none";

function provider(): Provider {
  const v = process.env.NEXT_PUBLIC_ANALYTICS;
  return v === "plausible" || v === "posthog" || v === "ga4" ? v : "none";
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const p = provider();
  if (p === "none") return;

  // Each branch is a thin call into a global the corresponding script defines.
  // If the script is absent the call is skipped rather than throwing — an
  // analytics failure must never break a page.
  try {
    const w = window as unknown as Record<string, unknown>;
    if (p === "plausible" && typeof w.plausible === "function") {
      (w.plausible as (n: string, o?: unknown) => void)(event.name, { props: event.props });
    } else if (p === "posthog" && w.posthog && typeof (w.posthog as Record<string, unknown>).capture === "function") {
      ((w.posthog as Record<string, unknown>).capture as (n: string, o?: unknown) => void)(event.name, event.props);
    } else if (p === "ga4" && typeof w.gtag === "function") {
      (w.gtag as (c: string, n: string, o?: unknown) => void)("event", event.name, event.props);
    }
  } catch {
    /* Analytics is never load-bearing. */
  }
}
