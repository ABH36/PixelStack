"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICE_CARDS, type ServiceCard } from "@/data/serviceCards";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHoverCapability(callback: () => void) {
  const mql = window.matchMedia(HOVER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getHoverCapability() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function getServerHoverCapability() {
  return false;
}

function useHoverCapable() {
  return useSyncExternalStore(
    subscribeHoverCapability,
    getHoverCapability,
    getServerHoverCapability
  );
}

function ServiceFlipCard({ card, index }: { card: ServiceCard; index: number }) {
  const hoverCapable = useHoverCapable();
  const [flipped, setFlipped] = useState(false);
  const isComingSoon = card.status === "coming-soon";

  const interactionProps = hoverCapable
    ? {
        onMouseEnter: () => setFlipped(true),
        onMouseLeave: () => setFlipped(false),
      }
    : {
        onClick: () => setFlipped((f) => !f),
      };

  return (
    <Reveal delay={(index % 4) * 0.07}>
      <div
        {...interactionProps}
        className="relative aspect-3/4 w-full cursor-pointer select-none"
        style={{ perspective: 1400 }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front — title only */}
          <div
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-surface-2 p-5 shadow-(--shadow-dark)"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full bg-primary/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]"
            >
              <Icon name={card.icon} className="h-32 w-32 text-white" />
            </div>

            <div className="relative flex items-start justify-between">
              <span className="font-display text-xs font-bold text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              {isComingSoon && (
                <span className="rounded-full border border-white/20 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white/60">
                  Soon
                </span>
              )}
            </div>

            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta)">
                <Icon name={card.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-black uppercase leading-tight tracking-tight text-white sm:text-lg">
                {card.title}
              </h3>
            </div>
          </div>

          {/* Back — full detail */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-border-soft bg-surface p-5 shadow-(--shadow-card-hover)"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {isComingSoon ? (
              <>
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
                  <Sparkles className="h-3 w-3" />
                  Coming Soon
                </span>
                <h3 className="mt-3 font-display text-base font-black uppercase leading-tight tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-muted">
                  {card.teaser}
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  Get notified
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </>
            ) : (
              <>
                <h3 className="font-display text-base font-black uppercase leading-tight tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  {card.summary}
                </p>
                <ul className="mt-2.5 flex-1 space-y-2">
                  {card.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-1.5 text-[11px] font-medium leading-snug text-foreground"
                    >
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex w-fit items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  Discuss this service
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export function ServicesShowcase() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {SERVICE_CARDS.map((card, i) => (
        <ServiceFlipCard key={card.slug} card={card} index={i} />
      ))}
    </div>
  );
}
