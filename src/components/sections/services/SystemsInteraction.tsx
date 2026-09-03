"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

const NODES = [
  { id: "erp", label: "ERP", x: 30, y: 30 },
  { id: "crm", label: "CRM", x: 30, y: 130 },
  { id: "api", label: "API", x: 200, y: 80 },
];

const HUB = { x: 115, y: 80 };

export function SystemsInteraction() {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});

  const toggle = (id: string) => {
    const next = !active[id];
    setActive((prev) => ({ ...prev, [id]: next }));

    const path = pathRefs.current[id];
    if (!path || !next) return;
    const length = path.getTotalLength();
    gsap.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" },
    );
  };

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6">
      <svg viewBox="0 0 240 170" className="w-full flex-1" fill="none">
        {NODES.map((node) => (
          <path
            key={node.id}
            ref={(el) => {
              pathRefs.current[node.id] = el;
            }}
            d={`M ${node.x} ${node.y} Q ${(node.x + HUB.x) / 2} ${node.y > HUB.y ? node.y + 20 : node.y - 20}, ${HUB.x} ${HUB.y}`}
            stroke={active[node.id] ? "url(#pulseGradient)" : "var(--glass-border)"}
            strokeWidth={2}
          />
        ))}
        <defs>
          <linearGradient id="pulseGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent-a)" />
            <stop offset="100%" stopColor="var(--accent-b)" />
          </linearGradient>
        </defs>
        <circle cx={HUB.x} cy={HUB.y} r={10} fill="var(--bg)" stroke="var(--text)" strokeWidth={1.5} />
        {NODES.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={7}
            fill={active[node.id] ? "var(--accent-a)" : "var(--bg)"}
            stroke="var(--text-muted)"
            strokeWidth={1.5}
          />
        ))}
      </svg>
      <div className="flex gap-2">
        {NODES.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => toggle(node.id)}
            data-cursor-hover
            className="flex-1 rounded-full border border-[var(--glass-border)] px-3 py-1.5 font-mono text-[0.65rem] tracking-tight transition-colors"
            style={{
              color: active[node.id] ? "var(--accent-a)" : "var(--text-muted)",
              borderColor: active[node.id] ? "var(--accent-a)" : "var(--glass-border)",
            }}
          >
            {node.label} {active[node.id] ? "· activo" : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
