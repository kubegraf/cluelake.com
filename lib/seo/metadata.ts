import type { Metadata } from "next";
import { site } from "@/lib/config/site";

/**
 * Per-page metadata.
 *
 * ⚠ EVERY PAGE PASSES ITS OWN `path`, WHICH BECOMES THE CANONICAL URL. A site
 * whose pages all share one canonical tells search engines they are the same
 * page, and the ones that are not the canonical quietly stop being indexed.
 */
export function pageMetadata({
  title, description, path, noIndex = false,
}: {
  title: string; description: string; path: string; noIndex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
