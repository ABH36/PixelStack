"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-20">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const totalChars = text.length;
  const words = text.split(" ").reduce<{ word: string; startIndex: number }[]>(
    (acc, word) => {
      const prev = acc[acc.length - 1];
      const startIndex = prev ? prev.startIndex + prev.word.length + 1 : 0;
      return [...acc, { word, startIndex }];
    },
    []
  );

  return (
    <p ref={ref} className={cn(className)}>
      {words.map(({ word, startIndex }, wordI) => {
        const wordChars = word.split("");

        return (
          <span key={wordI} className="inline-block whitespace-nowrap">
            {wordChars.map((char, i) => {
              const idx = startIndex + i;
              const start = idx / totalChars;
              const end = start + 1 / totalChars;
              return <Char key={i} char={char} progress={scrollYProgress} range={[start, end]} />;
            })}
            {wordI < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
