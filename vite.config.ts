import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * ⚠ `base` IS "/" BECAUSE THE SITE HAS A DOMAIN NOW.
 *
 * It used to be "/cluelake.com/", which is correct for
 * kubegraf.github.io/cluelake.com/ and wrong for cluelake.com. Getting this
 * backwards does not fail the build: the deploy succeeds and the page loads
 * with no CSS, no fonts and no JavaScript, which reads as a broken product
 * rather than a wrong path.
 *
 * It is pinned to `public/CNAME`. If the custom domain is ever removed, this
 * has to go back to "/cluelake.com/" in the same change.
 */
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: { outDir: "dist", assetsDir: "assets" },
});
