"use client";

import { useRef, useState } from "react";

export function WebsitesInteraction() {
  const [active, setActive] = useState(false);
  const [metrics, setMetrics] = useState({ fps: 0, ttfb: 0 });
  const raf = useRef<number | null>(null);

  const start = () => {
    setActive(true);
    const startTime = performance.now();
    const tick = (t: number) => {
      const progress = Math.min((t - startTime) / 900, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setMetrics({ fps: Math.round(eased * 120), ttfb: Math.round(eased * 38) });
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    setActive(false);
    if (raf.current) cancelAnimationFrame(raf.current);
    setMetrics({ fps: 0, ttfb: 0 });
  };

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={stop}
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6"
    >
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background:
            "repeating-linear-gradient(115deg, rgba(245,245,247,0.06) 0px, rgba(245,245,247,0.06) 1px, transparent 1px, transparent 8px)",
          transform: active ? "translateY(-6%) scale(1.04)" : "translateY(0) scale(1)",
        }}
      />
      <div
        className="absolute left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[rgba(245,245,247,0.08)] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: active ? "translateX(340%)" : "translateX(-50%)" }}
      />
      <p className="relative font-mono text-xs text-[var(--text-muted)]">
        render preview
      </p>
      <div className="relative mt-2 flex items-baseline gap-4 font-mono">
        <span className="text-2xl text-[var(--accent-a)]">{metrics.fps}</span>
        <span className="text-xs text-[var(--text-muted)]">fps</span>
        <span className="text-2xl text-[var(--accent-b)]">{metrics.ttfb}</span>
        <span className="text-xs text-[var(--text-muted)]">ms ttfb</span>
      </div>
    </div>
  );
}
