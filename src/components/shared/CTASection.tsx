import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SpinBadge } from "./SpinBadge";

export function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-custom">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-2 px-8 py-16 text-center shadow-(--shadow-dark) sm:px-16">
            <span
              aria-hidden
              className="giant-text pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 text-[15vw] opacity-[0.08] sm:text-[10vw]"
              style={{ WebkitTextStroke: "1.5px #f8f7f4" }}
            >
              LET&apos;S TALK
            </span>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full glow-orb opacity-30" />

            <h2 className="relative font-display text-3xl font-black uppercase leading-[0.95] text-surface sm:text-4xl md:text-5xl">
              Let&apos;s build something{" "}
              <span className="text-primary-light">extraordinary</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-base text-surface/70 sm:text-lg">
              Tell us about your idea — we&apos;ll bring the engineering,
              design, AI, and strategy to make it real.
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 rounded-full border-white/20! px-7 py-3.5 text-sm font-bold text-white"
              >
                Get a Free Consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <SpinBadge text="Available Now" variant="dark" className="hidden sm:flex" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
