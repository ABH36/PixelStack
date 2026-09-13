"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, PROJECTS, type Category } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

export function ProjectsGrid() {
  const [active, setActive] = useState<Category | "All">("All");

  const filtered = useMemo(
    () =>
      active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-bold uppercase tracking-tight transition-all duration-300",
              active === cat
                ? "border-transparent bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta)"
                : "border-border-soft bg-surface text-muted shadow-(--shadow-ghost) hover:-translate-y-0.5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
