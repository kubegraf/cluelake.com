import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Differentiator } from "@/components/sections/Differentiator";
import { WhatChanged } from "@/components/sections/WhatChanged";
import { Signals } from "@/components/sections/Signals";
import { CostControl } from "@/components/sections/CostControl";
import { QuerySection } from "@/components/sections/QuerySection";
import { Platform } from "@/components/sections/Platform";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/config/site";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Know What Changed`,
  description: site.description,
  path: "/",
});

/**
 * ⚠ EVERY SECTION IS ITS OWN COMPONENT. The page is a running order, not a
 * two-thousand-line file — which is what makes a section reusable on /product
 * or /features without being copied.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Differentiator />
      <WhatChanged />
      <Signals />
      <CostControl />
      <QuerySection />
      <Platform />
      <SecuritySection />
      <FinalCta />
    </>
  );
}
