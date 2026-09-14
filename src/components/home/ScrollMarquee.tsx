"use client";

import { useCallback, useEffect, useRef } from "react";
import { PROJECTS } from "@/data/projects";
import { MarqueeTile } from "./MarqueeTile";

const ROW_1 = [...PROJECTS.slice(0, 5), ...PROJECTS.slice(0, 5), ...PROJECTS.slice(0, 5)];
const ROW_2 = [...PROJECTS.slice(4), ...PROJECTS.slice(4), ...PROJECTS.slice(4)];

type RowKey = "row1" | "row2";

export function ScrollMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const baseOffsetRef = useRef(0);
  const manualOffsetRef = useRef<Record<RowKey, number>>({ row1: 0, row2: 0 });
  const dragRef = useRef<{ row: RowKey; startX: number; startManual: number } | null>(null);

  const rowEl = useCallback(
    (row: RowKey) => (row === "row1" ? row1Ref.current : row2Ref.current),
    []
  );

  // Positions each row from the scroll-linked base offset plus whatever the
  // user has manually dragged, wrapped modulo one tile-set width so the
  // tripled list loops seamlessly no matter how far either offset travels.
  const applyTransform = useCallback(
    (row: RowKey, sign: 1 | -1) => {
      const el = rowEl(row);
      if (!el) return;
      const singleSetWidth = el.scrollWidth / 3 || 1;
      const raw = sign * baseOffsetRef.current + manualOffsetRef.current[row];
      let wrapped = raw % singleSetWidth;
      if (wrapped > 0) wrapped -= singleSetWidth;
      el.style.transform = `translateX(${wrapped - singleSetWidth}px)`;
    },
    [rowEl]
  );

  const applyAll = useCallback(() => {
    applyTransform("row1", 1);
    applyTransform("row2", -1);
  }, [applyTransform]);

  useEffect(() => {
    let ticking = false;

    function update() {
      const el = sectionRef.current;
      if (!el) {
        ticking = false;
        return;
      }
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      baseOffsetRef.current = (window.scrollY - sectionTop + window.innerHeight) * 0.3 - 200;
      applyAll();
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [applyAll]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const row: RowKey = e.currentTarget === row1Ref.current ? "row1" : "row2";
    dragRef.current = { row, startX: e.clientX, startManual: manualOffsetRef.current[row] };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    manualOffsetRef.current[drag.row] = drag.startManual + (e.clientX - drag.startX);
    applyAll();
  }

  function handlePointerUp() {
    dragRef.current = null;
  }

  return (
    <section ref={sectionRef} className="overflow-hidden py-12 sm:py-16">
      <div className="mb-8 text-center">
        <span className="sticker bg-surface">Selected Work</span>
      </div>

      <div className="flex flex-col gap-3">
        <div
          ref={row1Ref}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex cursor-grab touch-pan-y select-none gap-3 active:cursor-grabbing"
          style={{ willChange: "transform" }}
        >
          {ROW_1.map((project, i) => (
            <MarqueeTile key={`${project.slug}-r1-${i}`} project={project} />
          ))}
        </div>
        <div
          ref={row2Ref}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex cursor-grab touch-pan-y select-none gap-3 active:cursor-grabbing"
          style={{ willChange: "transform" }}
        >
          {ROW_2.map((project, i) => (
            <MarqueeTile key={`${project.slug}-r2-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
