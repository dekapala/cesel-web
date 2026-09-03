"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NODES = [
  {
    label: "01 — Estrategia & Negocio",
    title: "Business Discovery",
    body: "Validación financiera, mapeo de procesos empresariales y análisis de viabilidad técnica.",
    top: 12,
    align: "left" as const,
  },
  {
    label: "02 — Pensamiento de Producto",
    title: "Product Thinking",
    body: "Definición de experiencia de alta fidelidad, flujos lógicos y diseño de interacción táctil y visual.",
    top: 48,
    align: "right" as const,
  },
  {
    label: "03 — Diseño e Ingeniería",
    title: "Tech Stack & Craft",
    body: "Código limpio, micro-interacciones pulidas y despliegue automatizado de sistemas resilientes con IA.",
    top: 84,
    align: "left" as const,
  },
];

const PATH_D =
  "M 60 0 C 260 60, 340 140, 200 240 C 60 340, -20 420, 200 480 C 420 540, 340 640, 200 720 C 60 800, 20 860, 140 1000";

export function Methodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!path || !section) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 70%",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(path, { strokeDashoffset: length * (1 - self.progress) });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="metodologia"
      ref={sectionRef}
      className="relative w-full py-[var(--section-v)]"
    >
      <div className="px-[var(--edge)]">
        <span className="font-mono text-[var(--fs-eyebrow)] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          El Puente Tripartito
        </span>
        <h2 className="mt-3 max-w-2xl font-heading text-[var(--fs-h2)] font-bold leading-tight">
          Construimos con pensamiento de producto, no con especificaciones
          ciegas.
        </h2>
      </div>

      <div className="relative mt-10 h-[300vh] w-full px-[var(--edge)] md:h-[260vh]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 400 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            ref={pathRef}
            d={PATH_D}
            stroke="url(#methodologyGradient)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="methodologyGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="var(--accent-a)" />
              <stop offset="100%" stopColor="var(--accent-b)" />
            </linearGradient>
          </defs>
        </svg>

        {NODES.map((node) => (
          <motion.div
            key={node.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[85%] max-w-md md:w-[42%]"
            style={{
              top: `${node.top}%`,
              left: node.align === "left" ? "0" : "auto",
              right: node.align === "right" ? "0" : "auto",
            }}
          >
            <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--bg)]/90 p-6 backdrop-blur-md">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-a)]">
                {node.label}
              </p>
              <h3 className="mt-2 font-heading text-xl font-bold md:text-2xl">
                {node.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {node.body}
              </p>
              <p className="mt-4 font-mono text-[0.65rem] tracking-wide text-[var(--text-muted)]">
                ✓ checkpoint validado
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
