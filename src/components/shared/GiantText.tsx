import { cn } from "@/lib/utils";

export function GiantText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "giant-text pointer-events-none absolute select-none text-[18vw] sm:text-[14vw] lg:text-[11vw]",
        className
      )}
    >
      {children}
    </span>
  );
}
