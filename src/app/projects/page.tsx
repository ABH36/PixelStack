import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GiantText } from "@/components/shared/GiantText";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Websites, mobile apps, and AI products & templates built by PixelStack Technologies.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
        <GiantText className="top-16 left-1/2 -translate-x-1/2">WORK</GiantText>
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="Our Work"
            title="Websites, apps & AI products in the wild"
            description="A look at the kind of work we do — filter by category to see what's relevant to you."
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom">
          <ProjectsGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
