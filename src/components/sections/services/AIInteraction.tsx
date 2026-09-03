"use client";

import { useEffect, useRef, useState } from "react";

const PROMPT = "automatiza ";
const SUGGESTION = "el reporte semanal de ventas";

export function AIInteraction() {
  const [typed, setTyped] = useState("");
  const [focused, setFocused] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!focused) return;
    let i = 0;
    const step = () => {
      i += 1;
      setTyped(SUGGESTION.slice(0, i));
      if (i < SUGGESTION.length) {
        timeout.current = setTimeout(step, 45);
      }
    };
    timeout.current = setTimeout(step, 400);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [focused]);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6">
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
        <span className="h-2 w-2 rounded-full bg-[var(--accent-a)]" />
        agente · en línea
      </div>
      <button
        type="button"
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTyped("");
        }}
        onMouseEnter={() => setFocused(true)}
        onMouseLeave={() => {
          setFocused(false);
          setTyped("");
        }}
        data-cursor-hover
        className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--bg)] px-4 py-3 text-left font-mono text-sm"
      >
        <span className="text-[var(--text)]">{PROMPT}</span>
        <span className="text-[var(--accent-b)]">{typed}</span>
        <span className="animate-pulse text-[var(--accent-a)]">▍</span>
      </button>
    </div>
  );
}
