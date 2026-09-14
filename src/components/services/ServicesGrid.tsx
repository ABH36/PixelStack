"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/data/services";
import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";

export function ServicesGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {SERVICES.map((service, i) => (
        <Reveal key={service.slug} delay={(i % 2) * 0.1}>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-soft bg-surface p-7 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-card-hover) sm:p-8"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 -right-2 select-none font-display text-8xl font-black text-bg/40 transition-colors duration-300 group-hover:text-primary/10 sm:text-9xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Icon name={service.icon} className="h-7 w-7" />
            </div>

            <h3 className="relative mt-6 font-display text-xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-2xl">
              {service.title}
            </h3>
            <p className="relative mt-1.5 text-sm font-bold text-primary">
              {service.summary}
            </p>
            <p className="relative mt-4 text-sm leading-relaxed text-muted">
              {service.description}
            </p>

            <ul className="relative mt-5 grid gap-2.5 border-t border-border-soft pt-5 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-xs font-medium text-foreground sm:text-sm"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="relative mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-primary transition-colors duration-300 group-hover:text-primary-dark"
            >
              Discuss this service
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}
