import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GiantText } from "@/components/shared/GiantText";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ServicesShowcase } from "@/components/services/ServicesShowcase";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, mobile apps, AI automation, DevOps, SEO, and security & maintenance — everything you need to ship a modern product.",
};

const STATS = [
  { value: 6, suffix: "", label: "Core Services" },
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 4, suffix: "", label: "Focus Pillars" },
  { value: 100, suffix: "%", label: "Work Kept In-House" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
        <GiantText className="top-16 left-1/2 -translate-x-1/2">SERVICES</GiantText>
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="Services"
            title="Everything a modern product needs"
            description="Six specialists, one team — covering design, engineering, AI, infrastructure, SEO, and security under a single roof."
          />

          <Reveal delay={0.2}>
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 rounded-3xl card-surface p-8 sm:grid-cols-4 sm:gap-4">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-black text-primary sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.1} />
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.15em] text-muted sm:mb-12">
            Hover or tap a card to see what&apos;s included
          </p>
          <ServicesShowcase />
        </div>
      </section>

      <CTASection />
    </>
  );
}
