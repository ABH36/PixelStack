import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GiantText } from "@/components/shared/GiantText";
import { SpinBadge } from "@/components/shared/SpinBadge";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { Magnet } from "@/components/shared/Magnet";
import { TeamGrid } from "@/components/about/TeamGrid";
import { PILLARS } from "@/data/pillars";
import { Icon } from "@/components/shared/Icon";
import { CTASection } from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet PixelStack Technologies — a 6-person studio building performant, secure, SEO-ready websites, mobile apps, and AI products.",
};

const DIFFERENTIATORS = [
  "One accountable team — no outsourced pieces, no hand-offs between agencies.",
  "AI woven into products from day one, not added as an afterthought.",
  "Security and maintenance included in how we build, not sold separately later.",
  "SEO and performance are engineering requirements, not a final checklist item.",
];

const STATS = [
  ["06", "Specialists on the team"],
  ["04", "Core focus pillars"],
  ["100%", "Work kept in-house"],
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
        <GiantText className="top-16 left-1/2 -translate-x-1/2">ABOUT</GiantText>
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="About PixelStack"
            title="A small studio built to move like a full agency"
            description="PixelStack Technologies is a 6-person team of engineers, an ML specialist, a DevOps engineer, an SEO expert, and a QA specialist — building modern digital products end to end."
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom flex flex-col items-center gap-10 text-center sm:gap-14">
          <AnimatedText
            text="With a team spanning engineering, design, AI, and growth, we focus on shipping products that perform, rank, and stay secure. We genuinely enjoy working with founders who want to stand out and build something that lasts."
            className="max-w-2xl text-lg font-medium leading-relaxed text-muted sm:text-xl"
          />
          <Magnet padding={80} strength={5}>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Magnet>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-10 rounded-3xl card-surface p-8 sm:flex-row sm:p-10">
              <div className="flex flex-wrap items-center gap-8 sm:gap-12">
                {STATS.map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-4xl font-black text-primary sm:text-5xl">
                      {value}
                    </p>
                    <p className="mt-1 max-w-28 text-xs font-medium text-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <SpinBadge text="PixelStack Studio" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
              Why we exist
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Most agencies split a project across freelancers who never talk
              to each other — a designer here, a developer there, SEO
              bolted on at the end. We built PixelStack to close that gap:
              one tight team that designs, builds, automates, secures, and
              markets the same product together, from the first sketch to
              the day it&apos;s live and growing.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              That&apos;s why every engagement is measured against the same
              four pillars — performance, SEO, security, and maintenance
              — regardless of whether we&apos;re shipping a
              marketing site, a mobile app, or an AI-powered product.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {DIFFERENTIATORS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl card-surface p-5 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Standards"
            title="The four pillars we build on"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.key} delay={i * 0.06}>
                <div className="rounded-2xl card-surface p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105">
                    <Icon name={pillar.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-black uppercase tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom">
          <SectionHeading
            eyebrow="The Studio"
            title="Meet the team behind the work"
            description="Six specialists, one accountable team."
          />
          <div className="mt-14">
            <TeamGrid />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
