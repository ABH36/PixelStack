import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="sticker bg-surface">{eyebrow}</span>
        </Reveal>
      )}
      <TextReveal
        as="h2"
        text={title}
        delay={0.08}
        className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl"
      />
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "max-w-xl text-base text-muted sm:text-lg",
              align === "center" ? "mx-auto text-center text-balance" : ""
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
