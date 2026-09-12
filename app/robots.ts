import type { MetadataRoute } from "next";
import { site } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/login", "/get-started"] }],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
