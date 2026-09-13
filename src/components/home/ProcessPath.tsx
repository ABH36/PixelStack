"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { PROCESS_STEPS } from "@/data/process";
import { Icon } from "@/components/shared/Icon";

const EYEBROWS = [
  "THE BEGINNING",
  "LOOK & FEEL",
  "BUILDING IT",
  "QUALITY CHECK",
  "GOING LIVE",
  "HERE TO HELP",
];

const BLURBS = [
  "Understanding your goals and mapping the right roadmap.",
  "Turning ideas into wireframes and interactive prototypes.",
  "Clean, scalable code — sprint by sprint, feature by feature.",
  "Rigorous QA and security checks across every device.",
  "Zero-downtime deployment — smooth, stress-free go-live.",
  "Ongoing monitoring, updates, and growth after launch.",
];

type Node = {
  number: string;
  title: string;
  icon: string;
  eyebrow: string;
  blurb: string;
  x: number;
  y: number;
};

type Segment = { x1: number; y1: number; x2: number; y2: number; length: number };
type PointPair = [[number, number], [number, number]];

const BASE_NODES: Omit<Node, "x" | "y">[] = PROCESS_STEPS.map((step, i) => ({
  number: step.number,
  title: step.title,
  icon: step.icon,
  eyebrow: EYEBROWS[i],
  blurb: BLURBS[i],
}));

function buildSegments(pairs: PointPair[]): Segment[] {
  return pairs.map(([[x1, y1], [x2, y2]]) => ({
    x1,
    y1,
    x2,
    y2,
    length: Math.hypot(x2 - x1, y2 - y1),
  }));
}

function getPointOnRoute(segments: Segment[], totalLength: number, v: number) {
  const target = Math.max(0, Math.min(1, v)) * totalLength;
  let acc = 0;
  for (const seg of segments) {
    if (target <= acc + seg.length) {
      const t = seg.length === 0 ? 0 : (target - acc) / seg.length;
      return { x: seg.x1 + (seg.x2 - seg.x1) * t, y: seg.y1 + (seg.y2 - seg.y1) * t };
    }
    acc += seg.length;
  }
  const last = segments[segments.length - 1];
  return { x: last.x2, y: last.y2 };
}

function usePathMotion(segmentPairs: PointPair[], progress: MotionValue<number>) {
  const segments = buildSegments(segmentPairs);
  const totalLength = segments.reduce((sum, s) => sum + s.length, 0);

  const fractions = segments.reduce<{ startFrac: number; endFrac: number }[]>((result, s) => {
    const prevEnd = result.length > 0 ? result[result.length - 1].endFrac : 0;
    const startFrac = prevEnd;
    const endFrac = prevEnd + s.length / totalLength;
    return [...result, { startFrac, endFrac }];
  }, []);

  const markerPoint = useTransform(progress, (v) => getPointOnRoute(segments, totalLength, v));
  const markerX = useTransform(markerPoint, (p) => p.x);
  const markerY = useTransform(markerPoint, (p) => p.y);
  const markerOpacity = useTransform(progress, [0, 0.02, 0.96, 1], [0, 1, 1, 0]);

  return { segments, fractions, markerX, markerY, markerOpacity };
}

function SegmentLine({
  seg,
  startFrac,
  endFrac,
  progress,
}: {
  seg: Segment;
  startFrac: number;
  endFrac: number;
  progress: MotionValue<number>;
}) {
  const segProgress = useTransform(progress, (v) => {
    if (endFrac === startFrac) return v >= startFrac ? 1 : 0;
    return Math.max(0, Math.min(1, (v - startFrac) / (endFrac - startFrac)));
  });
  return (
    <motion.line
      x1={seg.x1}
      y1={seg.y1}
      x2={seg.x2}
      y2={seg.y2}
      stroke="var(--color-primary)"
      strokeWidth={2.5}
      style={{ pathLength: segProgress }}
    />
  );
}

function BaseAndProgressLines({
  segments,
  fractions,
  progress,
}: {
  segments: Segment[];
  fractions: { startFrac: number; endFrac: number }[];
  progress: MotionValue<number>;
}) {
  return (
    <>
      {segments.map((seg, i) => (
        <line
          key={`base-${i}`}
          x1={seg.x1}
          y1={seg.y1}
          x2={seg.x2}
          y2={seg.y2}
          stroke="var(--color-border-soft)"
          strokeWidth={2}
          strokeDasharray="6 6"
        />
      ))}
      {segments.map((seg, i) => (
        <SegmentLine
          key={`fg-${i}`}
          seg={seg}
          startFrac={fractions[i].startFrac}
          endFrac={fractions[i].endFrac}
          progress={progress}
        />
      ))}
    </>
  );
}

function RocketMarker({
  x,
  y,
  opacity,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.g style={{ x, y, opacity }}>
      <circle
        r={20}
        fill="var(--color-primary)"
        stroke="var(--color-surface)"
        strokeWidth={3}
        style={{ filter: "drop-shadow(0 4px 10px var(--color-primary-glow))" }}
      />
      <foreignObject x={-10} y={-10} width={20} height={20}>
        <div className="flex h-5 w-5 items-center justify-center text-white">
          <Icon name="Rocket" className="h-3.5 w-3.5" />
        </div>
      </foreignObject>
    </motion.g>
  );
}

function GoalFlag({ x, y }: { x: number; y: number }) {
  return (
    <foreignObject x={x - 70} y={y - 16} width={140} height={32}>
      <div className="flex items-center justify-center gap-1.5 text-primary-dark">
        <Icon name="Flag" className="h-4 w-4" />
        <span className="font-display text-sm font-black uppercase tracking-tight">Goal!</span>
      </div>
    </foreignObject>
  );
}

// ---------- Desktop: card with icon badge centered on its top edge ----------

const CARD_W = 230;
const CARD_H = 160;
const HALF_W = CARD_W / 2;
const HALF_H = CARD_H / 2;

// Extra room around each card's foreignObject so the icon badge (which
// overlaps the card's top edge) isn't clipped by the SVG boundary.
const CARD_PAD_TOP = 36;
const CARD_PAD_X = 10;
const CARD_PAD_BOTTOM = 8;

function DesktopCard({ node }: { node: Node }) {
  return (
    <div className="group relative flex h-full w-full flex-col overflow-visible rounded-2xl border border-border bg-linear-to-br from-surface to-white p-4 pt-5 shadow-(--shadow-card) transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-card-hover)">
      <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-linear-to-r from-primary-light to-primary-dark" />

      <div className="absolute left-1/2 -top-6 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105">
        <Icon name={node.icon} className="h-5 w-5" />
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface bg-primary-dark text-[10px] font-black text-white shadow-(--shadow-ghost)">
          {node.number}
        </span>
      </div>
      <div className="mt-7 text-center">
        <h3 className="font-display text-base font-black uppercase tracking-tight text-foreground">
          {node.title}
        </h3>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
          {node.eyebrow}
        </p>
        <p className="mt-2 text-xs leading-snug text-muted">{node.blurb}</p>
      </div>
    </div>
  );
}

const DESKTOP_COLS = [160, 610, 1060];
const DESKTOP_ROW1_Y = 120;
const DESKTOP_ROW2_Y = 430;

const DESKTOP_NODES: Node[] = BASE_NODES.map((n, i) => {
  const col = i < 3 ? i : 5 - i;
  const row = i < 3 ? 0 : 1;
  return { ...n, x: DESKTOP_COLS[col], y: row === 0 ? DESKTOP_ROW1_Y : DESKTOP_ROW2_Y };
});

const DESKTOP_GOAL = { x: DESKTOP_COLS[0], y: DESKTOP_ROW2_Y + HALF_H + 70 };

const DESKTOP_SEGMENT_PAIRS: PointPair[] = [
  [[DESKTOP_COLS[0] + HALF_W, DESKTOP_ROW1_Y], [DESKTOP_COLS[1] - HALF_W, DESKTOP_ROW1_Y]],
  [[DESKTOP_COLS[1] + HALF_W, DESKTOP_ROW1_Y], [DESKTOP_COLS[2] - HALF_W, DESKTOP_ROW1_Y]],
  [[DESKTOP_COLS[2], DESKTOP_ROW1_Y + HALF_H], [DESKTOP_COLS[2], DESKTOP_ROW2_Y - HALF_H]],
  [[DESKTOP_COLS[2] - HALF_W, DESKTOP_ROW2_Y], [DESKTOP_COLS[1] + HALF_W, DESKTOP_ROW2_Y]],
  [[DESKTOP_COLS[1] - HALF_W, DESKTOP_ROW2_Y], [DESKTOP_COLS[0] + HALF_W, DESKTOP_ROW2_Y]],
  [[DESKTOP_COLS[0], DESKTOP_ROW2_Y + HALF_H], [DESKTOP_GOAL.x, DESKTOP_GOAL.y]],
];

const DESKTOP_VIEWBOX = `0 0 1220 ${DESKTOP_GOAL.y + 60}`;

function DesktopDiagram({ progress }: { progress: MotionValue<number> }) {
  const { segments, fractions, markerX, markerY, markerOpacity } = usePathMotion(
    DESKTOP_SEGMENT_PAIRS,
    progress
  );

  return (
    <svg viewBox={DESKTOP_VIEWBOX} className="h-auto w-full" style={{ overflow: "visible" }}>
      <BaseAndProgressLines segments={segments} fractions={fractions} progress={progress} />

      {DESKTOP_NODES.map((node, i) => (
        <motion.g
          key={node.number}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <foreignObject
            x={node.x - HALF_W - CARD_PAD_X}
            y={node.y - HALF_H - CARD_PAD_TOP}
            width={CARD_W + CARD_PAD_X * 2}
            height={CARD_H + CARD_PAD_TOP + CARD_PAD_BOTTOM}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "100%",
                height: "100%",
                padding: `${CARD_PAD_TOP}px ${CARD_PAD_X}px ${CARD_PAD_BOTTOM}px`,
              }}
            >
              <DesktopCard node={node} />
            </div>
          </foreignObject>
        </motion.g>
      ))}

      <GoalFlag x={DESKTOP_GOAL.x} y={DESKTOP_GOAL.y} />
      <RocketMarker x={markerX} y={markerY} opacity={markerOpacity} />
    </svg>
  );
}

// ---------- Mobile: icons on a central spine, cards alternating left/right ----------

const M_CENTER_X = 210;
const M_VB_W = 430;
const M_ICON_R = 20;
const M_GAP = 14;
const M_CARD_W = 165;
const M_CARD_H = 158;
const M_HALF_CARD_H = M_CARD_H / 2;
const M_START_Y = 100;
const M_STEP_Y = 210;

const MOBILE_NODES: Node[] = BASE_NODES.map((n, i) => ({
  ...n,
  x: M_CENTER_X,
  y: M_START_Y + i * M_STEP_Y,
}));

const MOBILE_GOAL = {
  x: M_CENTER_X,
  y: MOBILE_NODES[MOBILE_NODES.length - 1].y + M_ICON_R + 60,
};

const MOBILE_SEGMENT_PAIRS: PointPair[] = MOBILE_NODES.map((node, i) => {
  const nextY = i === MOBILE_NODES.length - 1 ? MOBILE_GOAL.y : MOBILE_NODES[i + 1].y;
  return [
    [M_CENTER_X, node.y + M_ICON_R],
    [M_CENTER_X, nextY - (i === MOBILE_NODES.length - 1 ? 0 : M_ICON_R)],
  ];
});

const MOBILE_VIEWBOX = `0 0 ${M_VB_W} ${MOBILE_GOAL.y + 50}`;

function MobileCard({ node, side }: { node: Node; side: "left" | "right" }) {
  return (
    <div className="relative flex h-full w-full flex-col rounded-2xl border border-border bg-linear-to-br from-surface to-white p-3.5 shadow-(--shadow-card)">
      <div
        className={
          side === "left"
            ? "absolute inset-y-0 right-0 w-1 rounded-r-2xl bg-linear-to-b from-primary-light to-primary-dark"
            : "absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-linear-to-b from-primary-light to-primary-dark"
        }
      />
      <h3 className="font-display text-sm font-black uppercase leading-tight tracking-tight text-foreground">
        {node.title}
      </h3>
      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
        {node.eyebrow}
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-muted">{node.blurb}</p>
    </div>
  );
}

function SpineIcon({ node }: { node: Node }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta)">
      <Icon name={node.icon} className="h-4.5 w-4.5" />
      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-surface bg-primary-dark text-[8px] font-black text-white">
        {node.number}
      </span>
    </div>
  );
}

function MobileDiagram({ progress }: { progress: MotionValue<number> }) {
  const { segments, fractions, markerX, markerY, markerOpacity } = usePathMotion(
    MOBILE_SEGMENT_PAIRS,
    progress
  );

  return (
    <svg viewBox={MOBILE_VIEWBOX} className="h-auto w-full" style={{ overflow: "visible" }}>
      <BaseAndProgressLines segments={segments} fractions={fractions} progress={progress} />

      {MOBILE_NODES.map((node, i) => {
        const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
        const cardX =
          side === "left"
            ? M_CENTER_X - M_ICON_R - M_GAP - M_CARD_W
            : M_CENTER_X + M_ICON_R + M_GAP;
        const connectorX1 = side === "left" ? M_CENTER_X - M_ICON_R : M_CENTER_X + M_ICON_R;
        const connectorX2 = side === "left" ? cardX + M_CARD_W : cardX;

        return (
          <motion.g
            key={node.number}
            initial={{ opacity: 0, x: side === "left" ? -14 : 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <line
              x1={connectorX1}
              y1={node.y}
              x2={connectorX2}
              y2={node.y}
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
            <foreignObject x={cardX} y={node.y - M_HALF_CARD_H} width={M_CARD_W} height={M_CARD_H}>
              <MobileCard node={node} side={side} />
            </foreignObject>
            <foreignObject
              x={M_CENTER_X - M_ICON_R}
              y={node.y - M_ICON_R}
              width={M_ICON_R * 2}
              height={M_ICON_R * 2}
            >
              <SpineIcon node={node} />
            </foreignObject>
          </motion.g>
        );
      })}

      <GoalFlag x={MOBILE_GOAL.x} y={MOBILE_GOAL.y} />
      <RocketMarker x={markerX} y={markerY} opacity={markerOpacity} />
    </svg>
  );
}

export function ProcessPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  // Route through a plain function transform to strip Framer's experimental
  // native scroll-acceleration marker, which mishandles some interpolations.
  const progress = useTransform(rawProgress, (v) => v);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-6xl">
      <div className="hidden lg:block">
        <DesktopDiagram progress={progress} />
      </div>
      <div className="lg:hidden">
        <MobileDiagram progress={progress} />
      </div>
    </div>
  );
}
