"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING_SIZE = 18;
const RING_SIZE_HOVER = 46;

export function Cursor() {
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Lerp-style tracking (~0.15) approximated with a critically-tuned spring.
  const springX = useSpring(x, { damping: 22, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 22, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!ready) setReady(true);
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const labelEl = target.closest<HTMLElement>("[data-cursor-label]");
      const hoverEl = target.closest("[data-cursor-hover]");
      setLabel(labelEl?.dataset.cursorLabel ?? null);
      setHovering(Boolean(hoverEl || labelEl));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [ready, x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: ready ? 1 : 0,
      }}
    >
      <motion.div
        layout
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center overflow-hidden"
        style={
          label
            ? {
                borderRadius: 999,
                background: "var(--bg)",
                border: "1px solid var(--glass-border)",
                padding: "10px 16px",
              }
            : {
                width: hovering ? RING_SIZE_HOVER : RING_SIZE,
                height: hovering ? RING_SIZE_HOVER : RING_SIZE,
                borderRadius: 999,
                background: "var(--accent-gradient)",
                padding: 2,
              }
        }
      >
        {label ? (
          <span className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--accent-a)]">
            {label}
          </span>
        ) : (
          <span
            className="block h-full w-full rounded-full transition-colors duration-200"
            style={{ background: hovering ? "transparent" : "var(--bg)" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
