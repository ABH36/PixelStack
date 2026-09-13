import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/data/services";
import { Icon } from "@/components/shared/Icon";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GiantText } from "@/components/shared/GiantText";
import { Accordion } from "@/components/shared/Accordion";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, mobile apps, AI automation, DevOps, SEO, and security & maintenance — everything you need to ship a modern product.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16 sm:pt-48">
        <GiantText className="top-16 left-1/2 -translate-x-1/2">SERVICES</GiantText>
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="Services"
            title="Everything a modern product needs"
            description="Six specialists, one team — covering design, engineering, AI, infrastructure, SEO, and security under a single roof. Tap a service to see what's included."
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom max-w-4xl">
          <Accordion
            items={SERVICES.map((service) => ({
              title: service.title,
              content: (
                <div className="group grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-base leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-foreground"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                    >
                      Discuss this service
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
