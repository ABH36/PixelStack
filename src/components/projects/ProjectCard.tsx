import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const cardContent = (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl card-surface border border-border transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-(--shadow-card-hover)">
      <div className="relative h-56 w-full overflow-hidden border-b border-border-soft bg-surface-2">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div
          className="sticker absolute right-3 top-3 bg-surface shadow-xs"
          style={{ color: project.accent }}
        >
          {project.category}
        </div>

        {project.link && (
          <div className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-foreground shadow-xs opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
            <ExternalLink className="h-3 w-3 text-primary" />
            <span>Live Site</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          {project.link && (
            <span className="shrink-0 rounded-full p-1 text-muted transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-soft bg-bg-soft/15 px-3 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border-soft pt-4">
          {project.link ? (
            <>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary group-hover:text-primary-light transition-colors">
                Live Website
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                Visit Site
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </>
          ) : (
            <span className="text-xs font-medium text-muted">
              Mobile App Project
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${project.title} (${project.link})`}
        className="block h-full cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
