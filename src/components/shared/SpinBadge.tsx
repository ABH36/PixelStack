import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SpinBadge({
  text,
  variant = "light",
  className,
}: {
  text: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const repeated = `${text} • `.repeat(4);
  const textFill = variant === "dark" ? "#f8f7f4" : "var(--color-border)";

  return (
    <div className={cn("relative flex h-28 w-28 items-center justify-center", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fill={textFill} fontSize="7.2" fontWeight={700} letterSpacing="0.5">
          <textPath href="#circlePath">{repeated}</textPath>
        </text>
      </svg>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
        <ArrowUpRight className="h-5 w-5" />
      </div>
    </div>
  );
}
