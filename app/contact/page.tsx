import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Talk to the team building ClueLake about evaluating it on your infrastructure.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us."
        lede="Evaluating ClueLake, or want to know whether it fits what you run? Tell us what you need and we will reply ourselves — there is no sales team to route you through."
      />
      <Section>
        <ContactForm />
      </Section>
    </>
  );
}
