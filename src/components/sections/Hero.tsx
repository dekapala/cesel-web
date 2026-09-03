"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroRings } from "@/components/three/HeroRings";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-10 px-[var(--edge)] pb-12 pt-28 lg:grid-cols-[30%_1fr_25%] lg:gap-4">
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          className="order-2 flex flex-col gap-6 lg:order-1"
        >
          <motion.span
            variants={item}
            className="font-mono text-[var(--fs-eyebrow)] uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            Estrategia · Producto · Diseño
          </motion.span>
          <motion.h1
            variants={item}
            className="font-heading text-[var(--fs-hero)] font-bold leading-[1.05] tracking-tight"
          >
            Estrategia en la base.{" "}
            <span className="text-gradient">Diseño en la superficie.</span>{" "}
            Ingeniería en el núcleo.
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-md text-[var(--fs-body)] leading-relaxed text-[var(--text-muted)]"
          >
            No nos limitamos a escribir líneas de código. Integramos
            estrategia de negocio y pensamiento crítico de producto para
            esculpir sitios web memorables, aplicaciones de alta fidelidad y
            sistemas corporativos automatizados con IA.
          </motion.p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="relative order-1 h-[46vh] min-h-[320px] w-full lg:order-2 lg:h-[62vh]"
        >
          <HeroRings />
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          className="order-3 flex flex-col items-start gap-5 lg:items-end lg:text-right"
        >
          <motion.div
            variants={item}
            className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-4 backdrop-blur-md"
          >
            <p className="font-mono text-xs leading-relaxed text-[var(--text-muted)]">
              Status: operando con cupos limitados de desarrollo para Q4.
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--accent-a)]">
              1 slot de ingeniería disponible
            </p>
          </motion.div>
          <motion.div variants={item}>
            <MagneticButton href="#servicios">
              Explorar Ingeniería →
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <span className="font-mono text-xs tracking-wide text-[var(--text-muted)]">
          Desplázate para explorar ↓
        </span>
      </motion.div>
    </section>
  );
}
