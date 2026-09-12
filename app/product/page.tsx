import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { WhatChanged } from "@/components/sections/WhatChanged";
import { Signals } from "@/components/sections/Signals";
import { QuerySection } from "@/components/sections/QuerySection";
import { Differentiator } from "@/components/sections/Differentiator";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Product",
  description:
    "ClueLake observability for Kubernetes — logs, metrics, traces and deployment context in one investigation.",
  path: "/product",
});

export default function ProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="One backend for logs, metrics and traces."
        lede="ClueLake stores telemetry with the deployment context already attached, so an investigation starts from the change rather than ending at it."
      />
      <Differentiator />
      <WhatChanged />
      <Signals />
      <QuerySection />
      <FinalCta />
    </>
  );
}
