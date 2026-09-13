import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function OutlineLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "btn-ghost inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-foreground",
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
