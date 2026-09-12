import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // `standalone` emits a self-contained server bundle, which is what makes the
  // runtime Docker stage small: node_modules is traced, not copied wholesale.
  output: "standalone",
  poweredByHeader: false,
  images: {
    // The only images are our own brand assets, served from /public.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default config;
