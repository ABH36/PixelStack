"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { OutlineLink } from "@/components/shared/OutlineLink";

const FEATURED_SLUGS = ["terra-shoppy", "linen-mantra", "leadbroo"];
const FEATURED = FEATURED_SLUGS.map(
  (slug) => PROJECTS.find((p) => p.slug === slug)!
);

function StackCard({
  project,
  index,
  total,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const [imgTopLeft, imgBottomLeft, imgLarge] = project.images ?? [
    project.image,
    project.image,
    project.image,
  ];

  const LinkComponent = project.link ? "a" : "div";
  const linkProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
        title: `Visit ${project.title} live website`,
      }
    : {};

  return (
    <div
      ref={ref}
      className="sticky top-24 flex h-[75vh] items-center justify-center md:top-28"
      style={{ paddingTop: `${index * 20}px` }}
    >
      <motion.div style={{ scale }} className="w-full">
        <LinkComponent
          {...linkProps}
          className="group block overflow-hidden rounded-[2.5rem] border-[1.5px] border-border bg-surface p-4 shadow-(--shadow-card-hover) transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-6 md:rounded-[3rem] md:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-display text-4xl font-black text-bg-soft sm:text-5xl md:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {project.category}
                </p>
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                  {project.title}
                </h3>
              </div>
            </div>

            {project.link ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                Visit Live Site
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            ) : (
              <span className="rounded-full border border-border px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-muted">
                Mobile App
              </span>
            )}
          </div>

          <div className="mt-5 grid h-64 grid-cols-[1fr_1.7fr] gap-3 sm:mt-6 sm:h-80 md:h-96">
            <div className="flex flex-col gap-3">
              <div className="relative flex-1 overflow-hidden rounded-2xl bg-surface-2">
                <Image
                  src={imgTopLeft}
                  alt={`${project.title} screenshot 1`}
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="relative flex-1 overflow-hidden rounded-2xl bg-surface-2">
                <Image
                  src={imgBottomLeft}
                  alt={`${project.title} screenshot 2`}
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-surface-2">
              <Image
                src={imgLarge}
                alt={`${project.title} screenshot 3`}
                fill
                sizes="(max-width: 768px) 60vw, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              {project.tagline}
            </p>
            {project.link && (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary transition-all duration-300 group-hover:text-primary-light group-hover:translate-x-1">
                Explore Live Project
                <ArrowUpRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </LinkComponent>
      </motion.div>
    </div>
  );
}

export function StackingProjects() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Featured Work"
          title="A closer look at what we ship"
        />
        <div className="mt-8 flex justify-center">
          <OutlineLink href="/projects">View All Work</OutlineLink>
        </div>

        <div className="mt-16">
          {FEATURED.map((project, i) => (
            <StackCard key={project.slug} project={project} index={i} total={FEATURED.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
