"use client";

import { motion } from "framer-motion";
import { ScrollRevealText } from "@/components/manifesto/ScrollRevealText";
import { MANIFESTO_PILLARS } from "@/lib/data/manifesto";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CONTACT_HREF } from "@/lib/nav";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ManifestoContent() {
  return (
    <div className="relative w-full">
      <section className="flex min-h-[100svh] w-full flex-col justify-center gap-10 px-[var(--edge)] pt-32">
        <span className="font-mono text-[var(--fs-eyebrow)] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Manifiesto
        </span>
        <ScrollRevealText
          text="No somos una agencia de marketing digital que escribe código."
          className="max-w-5xl font-heading text-[clamp(2.25rem,6.5vw,6rem)] font-bold leading-[1.02] tracking-tight"
        />
        <ScrollRevealText
          text="Somos ingenieros de infraestructura de red y arquitectos de producto."
          highlight="infraestructura arquitectos"
          className="max-w-5xl font-heading text-[clamp(2.25rem,6.5vw,6rem)] font-bold leading-[1.02] tracking-tight text-[var(--text-muted)]"
        />
      </section>

      <section className="w-full px-[var(--edge)] py-[var(--section-v)]">
        <div className="flex flex-col gap-16 md:gap-24">
          {MANIFESTO_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="grid grid-cols-1 gap-4 border-t border-[var(--glass-border)] pt-8 md:grid-cols-[auto_1fr] md:gap-16"
            >
              <span className="font-mono text-3xl font-light text-[var(--glass-border)] md:text-5xl">
                {pillar.index}
              </span>
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl font-bold md:text-4xl">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                  {pillar.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-8 px-[var(--edge)] pb-[var(--section-v)]">
        <p className="max-w-2xl font-heading text-2xl font-bold leading-tight md:text-4xl">
          Las plantillas genéricas resuelven una tarde.{" "}
          <span className="text-gradient">Nosotros construimos lo que sostiene la década siguiente.</span>
        </p>
        <MagneticButton href={CONTACT_HREF}>
          Hablar con ingeniería →
        </MagneticButton>
      </section>
    </div>
  );
}
