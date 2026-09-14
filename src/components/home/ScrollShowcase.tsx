"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";

const T1_START = 0.3;
const T1_END = 0.42;
const T2_START = 0.62;
const T2_END = 0.74;

const STAGES = [
  {
    key: "web",
    label: "Web",
    badge: "Web Development",
    pre: "Every big brand started with ",
    highlight: "one website",
    post: ".",
    description:
      "Before Amazon became Amazon, it was just a website. Yours is the first impression customers judge you by.",
    src: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219503/pixelstack/showcase/showcase-laptop-website.png",
    alt: "PixelStack website project displayed on a floating laptop",
  },
  {
    key: "ai",
    label: "AI",
    badge: "AI Automation",
    pre: "Automate today. ",
    highlight: "Lead",
    post: " tomorrow.",
    description:
      "While you serve one customer, AI can serve a thousand — automatically, around the clock.",
    src: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219504/pixelstack/showcase/showcase-tablet-ai.png",
    alt: "AI automation dashboard displayed on a floating tablet",
  },
  {
    key: "app",
    label: "App",
    badge: "Mobile Apps",
    pre: "Your customers live on their phones. ",
    highlight: "Be there",
    post: ".",
    description:
      "A website gets found once. An app gets opened again and again — turning visitors into regulars.",
    src: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219505/pixelstack/showcase/showcase-phone-app.png",
    alt: "Mobile app displayed on a floating smartphone",
  },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9973.1) * 43758.5453;
  return x - Math.floor(x);
}

function useStageMotion(
  scrollYProgress: MotionValue<number>,
  index: number
) {
  const isFirst = index === 0;
  const isLast = index === STAGES.length - 1;

  const enterEnd = isFirst ? 0 : index === 1 ? T1_END : T2_END;
  const holdEnd = isFirst ? T1_START : index === 1 ? T2_START : 1;
  const exitStart = isFirst ? T1_START : index === 1 ? T2_START : 0.94;
  const exitEnd = isFirst ? T1_END - 0.02 : index === 1 ? T2_END - 0.02 : 1;

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, holdEnd, T1_END]
      : isLast
        ? [T2_START, enterEnd, 0.94, 1]
        : [T1_START, enterEnd, holdEnd, T2_END],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1, 0] : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.08, holdEnd, T1_END]
      : isLast
        ? [T2_START, enterEnd, 0.94, 1]
        : [T1_START, enterEnd, holdEnd, T2_END],
    isFirst ? [0.92, 1, 1, 1.06] : isLast ? [0.9, 1, 1, 1.05] : [0.9, 1, 1, 1.06]
  );

  const blur = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.08, exitStart, exitEnd]
      : [enterEnd - 0.02, enterEnd, exitStart, exitEnd],
    isFirst ? [6, 0, 0, 8] : [8, 0, 0, 8]
  );

  const filter = useMotionTemplate`blur(${blur}px)`;

  return { opacity, scale, filter };
}

function ParticleBurst({
  progress,
  seedOffset,
}: {
  progress: MotionValue<number>;
  seedOffset: number;
}) {
  const particles = Array.from({ length: 22 }, (_, i) => {
    const seed = i + seedOffset;
    const angle = seededRandom(seed) * Math.PI * 2;
    const distance = 60 + seededRandom(seed + 50) * 160;
    const size = 3 + seededRandom(seed + 100) * 5;
    const delay = seededRandom(seed + 150) * 0.35;
    return { angle, distance, size, delay };
  });

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((p, i) => (
        <Particle key={i} progress={progress} {...p} />
      ))}
    </div>
  );
}

function Particle({
  progress,
  angle,
  distance,
  size,
  delay,
}: {
  progress: MotionValue<number>;
  angle: number;
  distance: number;
  size: number;
  delay: number;
}) {
  const local = useTransform(progress, [delay, Math.min(1, delay + 0.65)], [0, 1]);
  const opacity = useTransform(local, [0, 0.2, 0.8, 1], [0, 1, 0.8, 0]);
  const x = useTransform(local, [0, 1], [0, Math.cos(angle) * distance]);
  const y = useTransform(local, [0, 1], [0, Math.sin(angle) * distance]);
  const scale = useTransform(local, [0, 1], [0.3, 1]);

  return (
    <motion.span
      style={{
        opacity,
        x,
        y,
        scale,
        width: size,
        height: size,
      }}
      className="absolute rounded-full bg-primary shadow-[0_0_12px_2px_rgba(254,87,57,0.55)]"
    />
  );
}

function ProgressTrack({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const rawX = useTransform(
    scrollYProgress,
    [0, (T1_START + T1_END) / 2, (T1_START + T1_END) / 2 + 0.001, (T2_START + T2_END) / 2, (T2_START + T2_END) / 2 + 0.001, 1],
    ["16.666%", "16.666%", "50%", "50%", "83.333%", "83.333%"]
  );
  const x = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.6 });

  const activeIndex = useTransform(scrollYProgress, (v): number => {
    if (v < (T1_START + T1_END) / 2) return 0;
    if (v < (T2_START + T2_END) / 2) return 1;
    return 2;
  });

  return (
    <div className="relative flex w-56 items-center sm:w-64">
      <div className="relative h-px w-full bg-border-soft">
        <motion.div
          style={{ left: x }}
          className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(254,87,57,0.6)]"
        />
      </div>
      <div className="absolute inset-x-0 top-3 flex justify-between">
        {STAGES.map((stage, i) => (
          <StageLabel key={stage.key} label={stage.label} index={i} activeIndex={activeIndex} />
        ))}
      </div>
    </div>
  );
}

function StageLabel({
  label,
  index,
  activeIndex,
}: {
  label: string;
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const opacity = useTransform(activeIndex, (v) => (v === index ? 1 : 0.4));
  const color = useTransform(activeIndex, (v) =>
    v === index ? "var(--color-primary)" : "var(--color-muted-2)"
  );
  return (
    <motion.span
      style={{ opacity, color }}
      className="text-[0.65rem] font-bold uppercase tracking-[0.2em]"
    >
      {label}
    </motion.span>
  );
}

function StageContent({
  stage,
  motionProps,
}: {
  stage: (typeof STAGES)[number];
  motionProps: { opacity: MotionValue<number> };
}) {
  return (
    <motion.div
      style={{ opacity: motionProps.opacity }}
      className="absolute inset-0 flex flex-col items-center text-center"
    >
      <span className="sticker bg-surface">{stage.badge}</span>
      <h3 className="mt-3 max-w-lg font-display text-2xl font-black uppercase leading-[1.05] tracking-tight text-foreground sm:mt-4 sm:text-3xl lg:text-4xl">
        {stage.pre}
        <span className="text-primary">{stage.highlight}</span>
        {stage.post}
      </h3>
      <p className="mt-3 max-w-md text-balance text-xs leading-relaxed text-muted sm:text-sm">
        {stage.description}
      </p>
    </motion.div>
  );
}

export function ScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Framer's experimental native scroll-timeline acceleration mishandles
  // clamping on plateau-then-drop keyframes. Routing through a plain
  // function-based transform strips the `.accelerate` marker so every
  // downstream useTransform below uses the reliable JS interpolation path.
  const scrollYProgress = useTransform(rawScrollYProgress, (v) => v);

  const t1Progress = useTransform(scrollYProgress, [T1_START, T1_END], [0, 1]);
  const t2Progress = useTransform(scrollYProgress, [T2_START, T2_END], [0, 1]);

  const glowScale = useTransform(
    scrollYProgress,
    [0, T1_START, T1_END, T2_START, T2_END, 1],
    [1, 1, 1.25, 1, 1.25, 1]
  );

  return (
    <section ref={sectionRef} className="relative h-[460vh] bg-surface">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-3 overflow-hidden sm:gap-4">
        {/* Background environment */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-soft) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 60% 55% at 50% 45%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 55% at 50% 45%, black 20%, transparent 75%)",
          }}
        />
        <motion.div
          style={{ scale: glowScale }}
          className="glow-orb pointer-events-none absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 opacity-40"
        />
        <div className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />
        <div className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />

        {/* Stage text (crossfading) */}
        <div className="relative z-10 h-36 w-full max-w-2xl px-6 sm:h-40">
          {STAGES.map((stage, i) => (
            <StageContentBound key={stage.key} stage={stage} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Device stage */}
        <div className="relative z-10 h-[30vh] min-h-64 w-full max-w-3xl px-6 sm:h-[36vh] lg:h-[44vh]">
          {STAGES.map((stage, i) => (
            <DeviceLayer key={stage.key} stage={stage} index={i} scrollYProgress={scrollYProgress} />
          ))}

          <ParticleBurst progress={t1Progress} seedOffset={0} />
          <ParticleBurst progress={t2Progress} seedOffset={37} />
        </div>

        {/* Progress indicator */}
        <div className="relative z-10">
          <ProgressTrack scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function StageContentBound({
  stage,
  index,
  scrollYProgress,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const { opacity } = useStageMotion(scrollYProgress, index);
  return <StageContent stage={stage} motionProps={{ opacity }} />;
}

function DeviceLayer({
  stage,
  index,
  scrollYProgress,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const { opacity, scale, filter } = useStageMotion(scrollYProgress, index);

  return (
    <motion.div
      style={{ opacity, filter }}
      className="absolute inset-0"
    >
      <motion.div style={{ scale }} className="relative h-full w-full">
        <div
          className="animate-float-y relative h-full w-full drop-shadow-2xl"
          style={{ animationDelay: `${index * 0.4}s` }}
        >
          <Image
            src={stage.src}
            alt={stage.alt}
            fill
            sizes="(max-width: 1024px) 82vw, 46vw"
            className="object-contain"
            priority={index === 0}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
