"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AmbientBackground() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(root.current, {
        rotate: 6,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div ref={root} className="absolute inset-[-10%]">
        <div className="ambient-blob ambient-blob-a" />
        <div className="ambient-blob ambient-blob-b" />
        <div className="ambient-blob ambient-blob-c" />
      </div>
    </div>
  );
}
