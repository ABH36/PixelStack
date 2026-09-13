import { TEAM } from "@/data/team";
import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";

export function TeamGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {TEAM.map((member, i) => (
        <Reveal key={member.role + i} delay={i * 0.06}>
          <div className="group relative overflow-hidden rounded-2xl card-surface p-7 transition-transform duration-300 hover:-translate-y-1.5">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full glow-orb opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105">
              <Icon name={member.icon} className="h-7 w-7" />
            </div>
            <h3 className="relative mt-5 font-display text-lg font-black uppercase tracking-tight text-foreground">
              {member.role}
            </h3>
            <p className="relative mt-1 text-sm font-semibold text-primary">{member.focus}</p>
            <div className="relative mt-4 flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border-soft bg-bg-soft/15 px-3 py-1 text-xs font-medium text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
