import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * ⚠ `base` IS RELATIVE, AND THAT IS THE FIX FOR A REAL OUTAGE.
 *
 * It was "/cluelake.com/" (correct for kubegraf.github.io/cluelake.com/, wrong
 * for cluelake.com), then "/" (correct for cluelake.com, wrong for the Pages
 * subpath). Each absolute value is right for exactly one of the two URLs this
 * site is reachable at, and wrong for the other — so during the window between
 * "the site is built for the domain" and "the domain resolves", the live page
 * served a 200 with a 404 on every asset. A blank screen, not an error.
 *
 * "./" makes every asset reference relative to the document, so the same build
 * works at BOTH:
 *
 *   kubegraf.github.io/cluelake.com/  ->  ./assets/…  ->  /cluelake.com/assets/…
 *   cluelake.com/                     ->  ./assets/…  ->  /assets/…
 *
 * This removes the coupling between `base` and `public/CNAME` entirely. There is
 * no longer a pair of files that must be changed together, which is better than
 * documenting that there is.
 *
 * ⚠ IT RELIES ON THERE BEING NO DEEP SERVER PATHS. Routing is hash-based
 * (`/#/brand`), so the document is always served from the site root and a
 * relative reference always resolves from there. Introducing real nested paths
 * — /docs/x/ served as its own document — would break this, and would need
 * absolute `base` plus the CNAME coupling back.
 */
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: { outDir: "dist", assetsDir: "assets" },
});
