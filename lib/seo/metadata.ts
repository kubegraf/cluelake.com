import type { Metadata } from "next";
import { site } from "@/lib/config/site";

/**
 * Per-page metadata.
 *
 * ⚠ EVERY PAGE PASSES ITS OWN `path`, WHICH BECOMES THE CANONICAL URL. A site
 * whose pages all share one canonical tells search engines they are the same
 * page, and the ones that are not the canonical quietly stop being indexed.
 *
 * ⚠ THE SOCIAL IMAGE IS SET HERE, AND IT HAS TO BE. `app/opengraph-image.tsx`
 * generates the card, and Next wires it up by file convention — but only for a
 * route that does NOT declare its own `openGraph`. This helper declares one for
 * every page, which REPLACES the inherited block rather than merging into it.
 *
 * The result was a site where `/` had a social card and every other page had
 * none, while all of them still advertised `summary_large_image`. Sharing
 * /pricing or /product rendered the same blank rectangle the card was added to
 * fix. Naming the image here is what makes the fix reach more than one page.
 */
export function pageMetadata({
  title, description, path, noIndex = false,
}: {
  title: string; description: string; path: string; noIndex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();
  // Absolute, because `metadataBase` is not set on this site and a relative
  // image in an og: tag is not resolvable by the crawlers that read it.
  const image = new URL("/opengraph-image", site.url).toString();
  const images = [{ url: image, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }];
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
      images,
    },
    // twitter:image is set explicitly rather than left to fall back from
    // openGraph, so the card this file promises is the card it supplies.
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
