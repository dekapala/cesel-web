"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

const SCREENS = [
  { label: "Onboarding", tint: "var(--accent-a)" },
  { label: "Dashboard", tint: "var(--accent-b)" },
  { label: "Checkout", tint: "var(--accent-a)" },
];

export function AppsInteraction() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 160], [-8, 8]);

  return (
    <div className="flex h-full w-full items-center justify-center rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6">
      <div
        className="relative h-full w-[62%] max-w-[220px] overflow-hidden rounded-[28px] border border-[var(--glass-border)]"
        style={{ perspective: 800 }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -160, right: 160 }}
          dragElastic={0.5}
          style={{ x, rotate }}
          className="flex h-full w-full cursor-grab items-center active:cursor-grabbing"
        >
          {SCREENS.map((screen) => (
            <div
              key={screen.label}
              className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center gap-2 px-4"
              style={{
                background: `linear-gradient(160deg, ${screen.tint}22, transparent 70%)`,
              }}
            >
              <span
                className="h-8 w-8 rounded-full"
                style={{ background: screen.tint, opacity: 0.8 }}
              />
              <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
                {screen.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      <span className="sr-only">Arrastrá para explorar las pantallas</span>
    </div>
  );
}
