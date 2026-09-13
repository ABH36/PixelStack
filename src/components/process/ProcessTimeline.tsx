"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/process";
import { Icon } from "@/components/shared/Icon";

export function ProcessTimeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ originY: 0 }}
        className="absolute left-6 top-2 hidden h-full w-0.5 bg-linear-to-b from-primary via-border to-transparent sm:block"
      />

      <div className="space-y-10">
        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
            className="group relative flex gap-6 sm:gap-8"
          >
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105">
              <Icon name={step.icon} className="h-5 w-5" />
            </div>

            <div className="flex-1 rounded-2xl card-surface p-6 sm:p-7">
              <span className="font-display text-sm font-black uppercase tracking-wide text-primary">
                Step {step.number}
              </span>
              <h3 className="mt-2 font-display text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
