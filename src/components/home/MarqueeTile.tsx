import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function MarqueeTile({ project }: { project: Project }) {
  const content = (
    <div className="group relative h-45 w-70 shrink-0 overflow-hidden rounded-2xl border border-border-soft shadow-(--shadow-card) transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 sm:h-56 sm:w-84 md:h-67.5 md:w-105">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="420px"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-white/70">
            {project.category}
          </span>
          {project.link && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Live <ArrowUpRight className="h-3 w-3" />
            </span>
          )}
        </div>
        <span className="font-display text-xl font-black uppercase leading-tight text-white transition-colors group-hover:text-primary-light sm:text-2xl">
          {project.title}
        </span>
      </div>
    </div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${project.title} live website`}
        className="shrink-0 cursor-pointer focus:outline-hidden"
      >
        {content}
      </a>
    );
  }

  return content;
}
