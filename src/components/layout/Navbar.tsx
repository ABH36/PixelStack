"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/nav";
import { Magnet } from "@/components/shared/Magnet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border-soft" : "bg-transparent"
      )}
    >
      <nav className="container-custom flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="https://res.cloudinary.com/zxmmvaju/image/upload/v1789219497/pixelstack/brand/pixelstack-mark-transparent.png"
            alt="PixelStack Technologies"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-display text-lg font-black uppercase tracking-tight text-foreground">
            PixelStack
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border-[1.5px] border-border bg-surface px-1.5 py-1.5 shadow-(--shadow-ghost) lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active ? "text-white" : "text-muted hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-linear-to-br from-primary-light to-primary-dark shadow-[0_2px_8px_-1px_var(--color-primary-glow)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <Magnet padding={50} strength={5} className="hidden lg:inline-block">
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Magnet>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-border bg-surface text-foreground shadow-(--shadow-ghost) lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border-soft bg-surface lg:hidden"
          >
            <div className="container-custom flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-semibold",
                    pathname === link.href
                      ? "bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta)"
                      : "text-muted hover:bg-bg/40 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-base font-bold text-white"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
