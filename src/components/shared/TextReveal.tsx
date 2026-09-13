"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function TextReveal({
  text,
  delay = 0,
  stagger = 0.03,
  as: Tag = "span",
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h2" | "h3" | "p";
  className?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const words = text.split(" ");

  return (
    <Tag ref={containerRef as React.Ref<never>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            marginRight: i < words.length - 1 ? "0.28em" : undefined,
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
