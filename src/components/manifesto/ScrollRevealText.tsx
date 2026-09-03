"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollRevealText({
  text,
  className,
  highlight,
}: {
  text: string;
  className?: string;
  highlight?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>(".char");
    gsap.set(chars, { opacity: 0.08, filter: "blur(6px)" });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "top 25%",
      scrub: 0.4,
      onUpdate: (self) => {
        const revealCount = Math.floor(self.progress * chars.length);
        chars.forEach((char, i) => {
          gsap.to(char, {
            opacity: i < revealCount ? 1 : 0.08,
            filter: i < revealCount ? "blur(0px)" : "blur(6px)",
            duration: 0.25,
            overwrite: "auto",
          });
        });
      },
    });

    return () => st.kill();
  }, []);

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => (
            <span
              key={ci}
              className="char"
              style={
                highlight?.includes(word)
                  ? { color: "var(--accent-a)" }
                  : undefined
              }
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
