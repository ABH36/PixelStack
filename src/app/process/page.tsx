import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GiantText } from "@/components/shared/GiantText";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How PixelStack Technologies builds a project — from discovery and design through development, testing, launch, and ongoing support.",
};

export default function ProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
        <GiantText className="top-16 left-1/2 -translate-x-1/2">PROCESS</GiantText>
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="Our Process"
            title="How we turn an idea into a shipped product"
            description="Six deliberate stages, refined across every engagement — transparent, predictable, and built for quality."
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom">
          <ProcessTimeline />
        </div>
      </section>

      <CTASection />
    </>
  );
}
