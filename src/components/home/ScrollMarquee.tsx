"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";
import { MarqueeTile } from "./MarqueeTile";

const ROW_1 = [...PROJECTS.slice(0, 5), ...PROJECTS.slice(0, 5), ...PROJECTS.slice(0, 5)];
const ROW_2 = [...PROJECTS.slice(4), ...PROJECTS.slice(4), ...PROJECTS.slice(4)];

export function ScrollMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(raw);
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
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden py-16 sm:py-20">
      <div className="mb-8 text-center">
        <span className="sticker bg-surface">Selected Work</span>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}
        >
          {ROW_1.map((project, i) => (
            <MarqueeTile key={`${project.slug}-r1-${i}`} project={project} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}
        >
          {ROW_2.map((project, i) => (
            <MarqueeTile key={`${project.slug}-r2-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
