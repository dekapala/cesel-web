"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/data/work";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WorkShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full pb-[var(--section-v)] pt-36">
      <div className="px-[var(--edge)]">
        <span className="font-mono text-[var(--fs-eyebrow)] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Casos de Estudio
        </span>
        <h1 className="mt-3 max-w-3xl font-heading text-[var(--fs-hero)] font-bold leading-[1.05]">
          Arquitectura, no capturas de pantalla.
        </h1>
        <p className="mt-5 max-w-xl text-[var(--fs-body)] leading-relaxed text-[var(--text-muted)]">
          Cada proyecto es un caso de ingeniería: desafío de negocio, decisiones
          de arquitectura y las métricas que efectivamente se movieron.
        </p>
      </div>

      <div className="mt-20 flex flex-col gap-24 px-[var(--edge)]">
        {CASE_STUDIES.map((cs, i) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            data-cursor-label="VER ARQUITECTURA"
            className="group block"
          >
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="grid w-full grid-cols-1 items-center gap-8 text-left md:grid-cols-2 md:gap-14"
            >
              <motion.div
                layoutId={`image-${cs.slug}`}
                className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] ${
                  i % 2 === 1 ? "md:order-2" : "md:order-1"
                }`}
              >
                <Image
                  src={cs.image}
                  alt={cs.name}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-70" />
              </motion.div>

              <div className={i % 2 === 1 ? "md:order-1" : "md:order-2"}>
                <span className="font-mono text-6xl font-light text-[var(--glass-border)] md:text-8xl">
                  {cs.index}
                </span>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-a)]">
                  {cs.category}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-4xl">
                  {cs.name}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                  {cs.challenge}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cs.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[var(--glass-border)] px-3 py-1 font-mono text-[0.65rem] text-[var(--text-muted)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
