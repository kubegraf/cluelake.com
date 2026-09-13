import type { MetadataRoute } from "next";
import { site } from "@/lib/config/site";

/** ⚠ AUTHENTICATED AND UTILITY ROUTES ARE NOT LISTED. /login and /get-started
 *  are application entry points, not content; listing them invites indexing of
 *  pages that will move into the product. */
const paths = [
  "/", "/product", "/features", "/architecture", "/pricing",
  "/docs", "/security", "/company", "/contact", "/changelog",
  // ⚠ THE LEGAL PAGES BELONG HERE. They were missing while the footer links
  // both and neither is noIndex, so they were reachable, indexable and absent
  // from the sitemap — which is the combination that gets them indexed late or
  // not at all. The exclusion note above covers /login and /get-started only;
  // these were an omission rather than a decision.
  "/legal/privacy", "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((p) => ({
    url: new URL(p, site.url).toString(),
    lastModified: now,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
