"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const SHOWCASE = [
  {
    src: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219500/pixelstack/hero/hero-showcase-ecommerce-app.png",
    category: "Mobile App",
    name: "E-Commerce Experience",
  },
  {
    src: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219501/pixelstack/hero/hero-showcase-restaurant-website.png",
    category: "Web Design",
    name: "Restaurant Website",
  },
  {
    src: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219502/pixelstack/hero/hero-showcase-fitness-app.png",
    category: "Mobile & Web",
    name: "Fitness Platform",
  },
  {
    src: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219502/pixelstack/hero/hero-showcase-ai-automation.png",
    category: "AI Automation",
    name: "Workflow Platform",
  },
];

const AUTO_ADVANCE_MS = 4500;

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SHOWCASE.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const active = SHOWCASE[index];

  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      <div className="animate-float-y relative">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-square w-full"
          style={{ perspective: 1400 }}
        >
          <div className="pointer-events-none absolute inset-6 rounded-full bg-linear-to-br from-primary-light/30 via-primary/20 to-transparent blur-3xl sm:inset-10" />

          <motion.div
            style={{ rotateX, rotateY }}
            className="relative h-full w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.src}
                initial={{ opacity: 0, rotateY: 50, scale: 0.88 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -50, scale: 0.88 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={active.src}
                  alt={active.name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 85vw, 42vw"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="glass-panel flex items-center gap-3 rounded-full px-5 py-2.5"
            >
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wide text-foreground">
                {active.category}
              </span>
              <span className="hidden text-xs text-muted sm:inline">
                {active.name}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-1">
            {SHOWCASE.map((item, i) => (
              <button
                key={item.src}
                aria-label={`Show ${item.name}`}
                onClick={() => setIndex(i)}
                className="flex h-6 w-6 shrink-0 items-center justify-center"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-border-soft hover:bg-muted-2"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
