import { Section, SectionHeading } from "@/components/ui/Section";
import { QueryEditor } from "@/components/product/QueryEditor";

export function QuerySection() {
  return (
    <Section id="query">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <SectionHeading
          eyebrow="Query"
          title="Know what a query will read before you run it."
          lede="PromQL for the supported query set, log and trace search, and read-only SQL for everything else. Each query is costed first, so an expensive one is a decision rather than a surprise."
        />
        <QueryEditor />
      </div>
    </Section>
  );
}
