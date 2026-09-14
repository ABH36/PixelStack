"use client";

import { useEffect, useRef } from "react";
import { PROJECTS } from "@/data/projects";
import { MarqueeTile } from "./MarqueeTile";

const ROW_1 = [...PROJECTS.slice(0, 5), ...PROJECTS.slice(0, 5), ...PROJECTS.slice(0, 5)];
const ROW_2 = [...PROJECTS.slice(4), ...PROJECTS.slice(4), ...PROJECTS.slice(4)];

const AUTO_SPEED = 0.5;
const RESUME_DELAY_MS = 1500;

function MarqueeRow({
  items,
  reverse,
  rowKey,
}: {
  items: typeof PROJECTS;
  reverse?: boolean;
  rowKey: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const positionRef = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dragRef = useRef<{ startX: number; startScrollLeft: number } | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const singleSetWidth = el.scrollWidth / 3;
    positionRef.current = singleSetWidth;
    el.scrollLeft = singleSetWidth;

    // Track our own float position instead of reading el.scrollLeft back each
    // frame — the browser rounds scrollLeft to whole pixels, so subtracting a
    // fractional step from an already-whole value can round straight back to
    // where it started and stall the reverse-direction row forever.
    let frame: number;
    function tick() {
      if (el && !pausedRef.current) {
        const width = el.scrollWidth / 3;
        positionRef.current += reverse ? -AUTO_SPEED : AUTO_SPEED;
        if (positionRef.current >= width * 2) {
          positionRef.current -= width;
        } else if (positionRef.current <= 0) {
          positionRef.current += width;
        }
        el.scrollLeft = positionRef.current;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reverse]);

  function pause() {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }

  function scheduleResume() {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (trackRef.current) positionRef.current = trackRef.current.scrollLeft;
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    pause();
    if (e.pointerType === "mouse" && trackRef.current) {
      e.preventDefault();
      dragRef.current = { startX: e.clientX, startScrollLeft: trackRef.current.scrollLeft };
      trackRef.current.setPointerCapture(e.pointerId);
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragRef.current && trackRef.current) {
      trackRef.current.scrollLeft = dragRef.current.startScrollLeft - (e.clientX - dragRef.current.startX);
    }
  }

  function handlePointerUp() {
    dragRef.current = null;
    scheduleResume();
  }

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
      className="no-scrollbar flex cursor-grab select-none gap-3 overflow-x-auto active:cursor-grabbing"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {items.map((project, i) => (
        <MarqueeTile key={`${project.slug}-${rowKey}-${i}`} project={project} />
      ))}
    </div>
  );
}

export function ScrollMarquee() {
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <div className="mb-8 text-center">
        <span className="sticker bg-surface">Selected Work</span>
      </div>

      <div className="flex flex-col gap-3">
        <MarqueeRow items={ROW_1} rowKey="r1" />
        <MarqueeRow items={ROW_2} rowKey="r2" reverse />
      </div>
    </section>
  );
}
