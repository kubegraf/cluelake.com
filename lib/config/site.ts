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
  description:
    "ClueLake connects logs, metrics, traces and Kubernetes context so teams can move from production regressions to the changes that caused them.",
  /** Set NEXT_PUBLIC_SITE_URL in every environment. The fallback is the
   *  production hostname so a misconfigured preview is obvious, not silent. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cluelake.com",
  company: "Orkastor Ltd",
  github: "https://github.com/kubegraf",
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
      { href: site.github, label: "GitHub", external: true },
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
