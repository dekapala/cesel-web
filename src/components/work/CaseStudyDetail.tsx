"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/data/work";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AbstractPlaceholder } from "@/components/ui/AbstractPlaceholder";
import { CONTACT_HREF } from "@/lib/nav";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <motion.div
        layoutId={`image-${cs.slug}`}
        className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem]"
      >
        <AbstractPlaceholder seed={cs.image} className="absolute inset-0" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
      >
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-a)]">
          {cs.category} · {cs.client} · {cs.year}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold md:text-5xl">
          {cs.name}
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cs.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4"
            >
              <p className="font-mono text-xl text-[var(--accent-b)] md:text-2xl">
                {kpi.value}
              </p>
              <p className="mt-1 font-mono text-[0.65rem] text-[var(--text-muted)]">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            El Desafío
          </h2>
          <p className="font-body mt-3 max-w-2xl leading-relaxed text-[var(--text)]">
            {cs.challenge}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            La Arquitectura
          </h2>
          <ul className="mt-3 flex flex-col gap-3">
            {cs.architecture.map((point, i) => (
              <li
                key={i}
                className="font-body flex gap-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base"
              >
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-a)]" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {cs.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--glass-border)] px-3 py-1 font-mono text-[0.65rem] text-[var(--text-muted)]"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cs.gallery.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <AbstractPlaceholder seed={src} className="absolute inset-0" />
            </div>
          ))}
        </div>

        <div className="mt-14">
          <MagneticButton href={CONTACT_HREF}>
            Consultar viabilidad de un proyecto similar →
          </MagneticButton>
        </div>
      </motion.div>
    </>
  );
}
