"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { PILLARS } from "@/data/pillars";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const AUTO_MS = 4500;

export function Pillars() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setActive((a) => (a + 1) % PILLARS.length);
    }, AUTO_MS);
    return () => clearTimeout(timer);
  }, [active, paused]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-custom">
        <SectionHeading
          eyebrow="What We Stand On"
          title="Four pillars behind every build"
          description="Every project we ship is measured against the same four standards — tap a pillar to explore it."
        />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mt-16 hidden h-105 gap-4 lg:flex lg:h-110"
        >
          {PILLARS.map((pillar, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={pillar.key}
                layout
                onClick={() => setActive(i)}
                transition={{ type: "spring", stiffness: 220, damping: 30 }}
                aria-pressed={isActive}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border border-border-soft text-left shadow-(--shadow-card) transition-shadow duration-300",
                  isActive && "shadow-(--shadow-card-hover)"
                )}
                style={{ flex: isActive ? "2.4 2.4 0%" : "1 1 0%" }}
              >
                {pillar.image && (
                  <>
                    <Image
                      src={pillar.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 0px, 40vw"
                      className="pointer-events-none object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/10" />
                  </>
                )}
                <div className="relative flex h-full flex-col p-5 sm:p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <AnimatePresence initial={false} mode="wait">
                    {isActive ? (
                      <motion.div
                        key="active"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.3 } }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="mt-auto"
                      >
                        <h3 className="font-display text-2xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-3xl">
                          {pillar.title}
                        </h3>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
                          {pillar.description}
                        </p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-primary-light">
                          {pillar.stat}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="inactive"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.3 } }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="flex flex-1 items-center justify-center"
                      >
                        <span
                          className="whitespace-nowrap font-display text-lg font-black uppercase tracking-[0.2em] text-white"
                          style={{ transform: "rotate(-90deg)" }}
                        >
                          {pillar.title}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="relative mt-16 flex flex-col gap-3 lg:hidden">
          {PILLARS.map((pillar, i) => {
            const isActive = i === active;
            return (
              <div
                key={pillar.key}
                className="relative overflow-hidden rounded-2xl border border-border-soft shadow-(--shadow-card)"
              >
                {pillar.image && (
                  <>
                    <Image
                      src={pillar.image}
                      alt=""
                      fill
                      sizes="100vw"
                      className="pointer-events-none object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />
                  </>
                )}
                <button
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="relative flex w-full items-center gap-4 p-4 text-left sm:p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 font-display text-base font-black uppercase tracking-tight text-white sm:text-lg">
                    {pillar.title}
                  </h3>
                  <Plus
                    className={cn(
                      "h-4 w-4 shrink-0 text-white/50 transition-transform duration-300",
                      isActive && "rotate-45 text-primary-light"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="relative overflow-hidden"
                    >
                      <div className="px-4 pb-5 pl-17 sm:px-5 sm:pl-19">
                        <p className="text-sm leading-relaxed text-white/70">
                          {pillar.description}
                        </p>
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-primary-light">
                          {pillar.stat}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
