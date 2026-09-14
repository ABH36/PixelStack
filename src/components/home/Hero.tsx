"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { Magnet } from "@/components/shared/Magnet";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { HeroShowcase } from "./HeroShowcase";

const EYEBROW = ["Ideas", "Interfaces", "Intelligence"];

const STATS = [
  { value: 6, suffix: "", label: "Specialists" },
  { value: 4, suffix: "", label: "Focus Pillars" },
  { value: 20, suffix: "+", label: "Projects" },
];

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(254, 87, 57, 0.55), transparent 68%)`;
    }
  }

  function handleMouseEnter() {
    if (glowRef.current) glowRef.current.style.opacity = "1";
  }

  function handleMouseLeave() {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }

  return (
    <section className="relative overflow-hidden pb-16 pt-24 sm:pt-28 lg:pb-20 lg:pt-32">
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/zxmmvaju/image/upload/v1789219499/pixelstack/hero/hero-bg-podium.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-70 sm:opacity-80"
        />
        <div className="absolute inset-0 bg-bg/55" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-bg via-bg/75 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-bg via-bg/70 to-transparent" />

      <div className="container-custom relative grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-8">
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <div
            aria-hidden
            className="animate-pulse-glow pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full glow-orb"
          />
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 opacity-0 blur-xl transition-opacity duration-500"
          />

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
            {EYEBROW.map((part, i) => (
              <span key={part} className="flex items-center gap-2">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                >
                  {part}
                </motion.span>
                {i < EYEBROW.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.12 + 0.08 }}
                    className="text-primary"
                  >
                    <ArrowUpRight className="h-3 w-3 rotate-45" />
                  </motion.span>
                )}
              </span>
            ))}
          </div>

          <div className="mt-5 overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl font-black leading-[1.05] text-foreground sm:text-5xl md:text-6xl"
            >
              Turning Ideas Into
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="relative font-display text-4xl font-black leading-[1.05] text-foreground sm:text-5xl md:text-6xl"
            >
              Digital{" "}
              <span className="relative text-primary">
                <span className="relative inline-block overflow-hidden">
                  Reality
                  <motion.span
                    aria-hidden
                    initial={{ x: "-130%" }}
                    animate={{ x: "230%" }}
                    transition={{ duration: 1, delay: 1.3, ease: "easeInOut" }}
                    className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/80 to-transparent"
                    style={{ mixBlendMode: "overlay" }}
                  />
                </span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1.15 }}
                  viewBox="0 0 200 12"
                  className="absolute -bottom-1 left-0 h-3 w-full"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 8 Q 100 -2 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            We design, develop, and scale websites, mobile applications,
            and AI-powered products for ambitious brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78 }}
            className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-4"
          >
            <Magnet padding={70} strength={4}>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2.5 text-[11px] font-bold text-white sm:gap-2 sm:px-6 sm:py-3.5 sm:text-sm"
              >
                Start Your Project
                <ArrowUpRight className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
              </Link>
            </Magnet>
            <Link
              href="/projects"
              className="btn-ghost inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2.5 text-[11px] font-bold text-foreground sm:gap-2 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <PlayCircle className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
              View Our Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border-soft pt-5"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label}>
                <p className="font-display text-xl font-black text-foreground sm:text-2xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={0.95 + i * 0.1} />
                </p>
                <p className="mt-1 text-xs font-medium text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroShowcase />
        </motion.div>
      </div>

      <div
        className="animate-float-y-sm absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted lg:flex"
      >
        Scroll
        <span className="h-px w-8 bg-border" />
      </div>
    </section>
  );
}
