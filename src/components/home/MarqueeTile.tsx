import Image from "next/image";
import type { Project } from "@/data/projects";

export function MarqueeTile({ project }: { project: Project }) {
  return (
    <div className="relative h-45 w-70 shrink-0 overflow-hidden rounded-2xl border border-border-soft shadow-(--shadow-card) sm:h-56 sm:w-84 md:h-67.5 md:w-105">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="420px"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-white/70">
          {project.category}
        </span>
        <span className="font-display text-xl font-black uppercase leading-tight text-white sm:text-2xl">
          {project.title}
        </span>
      </div>
    </div>
  );
}
