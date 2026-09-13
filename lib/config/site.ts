/**
 * Site-wide configuration.
 *
 * ⚠ NO DOMAIN IS HARDCODED IN A COMPONENT. Canonical URLs, sitemap entries and
 * OpenGraph tags all read `siteUrl`, which comes from the environment. A site
 * that hardcodes its own hostname breaks the moment it is served from a preview
 * deployment, a staging domain or a container behind a different ingress.
 */
export const site = {
  name: "ClueLake",
  tagline: "Know what changed.",
  /** ⚠ THIS IS THE META DESCRIPTION AND BOTH SOCIAL CARDS. It is the hero's
   *  lede, kept in step with it deliberately: when the hero was rewritten this
   *  was left behind, so Google and every Slack unfurl went on describing the
   *  product in copy the site no longer used. If the lede changes, change this. */
  description:
    "ClueLake connects logs, metrics, traces and Kubernetes deployments so you can monitor your systems, investigate performance changes, and trace regressions back to the deployment, image, build or commit behind them.",
  /** Set NEXT_PUBLIC_SITE_URL in every environment. The fallback is the
   *  production hostname so a misconfigured preview is obvious, not silent. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cluelake.com",
  company: "Orkastor Ltd",
} as const;

/** Primary navigation. One source, used by the header and the mobile drawer, so
 *  the two can never disagree about what exists. */
export const primaryNav = [
  { href: "/product", label: "Product" },
  { href: "/features", label: "Features" },
  { href: "/architecture", label: "Architecture" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
] as const;

/**
 * ⚠ EVERY LINK HERE IS FIRST-PARTY, and the Footer is written on that
 * assumption — it renders each entry with `next/link` and has no branch for an
 * outbound one. Adding an external link back means restoring that branch, with
 * `rel="noreferrer noopener"` and `target="_blank"`, rather than dropping an
 * absolute URL into this list and finding it routed as a path.
 */
export const footerNav = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "Product" },
      { href: "/features", label: "Features" },
      { href: "/architecture", label: "Architecture" },
      { href: "/pricing", label: "Pricing" },
      { href: "/docs", label: "Docs" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company", label: "Company" },
      { href: "/contact", label: "Contact" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
] as const;
