"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERTISE_PILLARS } from "@/lib/data/expertise";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CONTACT_HREF } from "@/lib/nav";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PATH_D =
  "M 195 30 C 300 70, 380 160, 320 320 C 280 420, 40 460, 80 560 C 120 660, 360 700, 320 800 C 300 850, 260 880, 220 920";

export function ExpertiseTimeline() {
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
      start: "top 70%",
      end: "bottom 70%",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(path, { strokeDashoffset: length * (1 - self.progress) });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="relative w-full pb-[var(--section-v)] pt-36">
      <div className="px-[var(--edge)]">
        <span className="font-mono text-[var(--fs-eyebrow)] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Expertise
        </span>
        <h1 className="mt-3 max-w-3xl font-heading text-[var(--fs-hero)] font-bold leading-[1.05]">
          Construimos con estándares de grado de telecomunicaciones.
        </h1>
        <p className="mt-5 max-w-xl text-[var(--fs-body)] leading-relaxed text-[var(--text-muted)]">
          No decimos solamente &ldquo;desarrollamos software&rdquo;. Explicamos
          cómo lo construimos, lo aseguramos y lo escalamos.
        </p>
      </div>

      <section ref={sectionRef} className="relative mt-16 w-full px-[var(--edge)]">
        <div className="relative h-[380vh] w-full md:h-[320vh]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
            viewBox="0 0 400 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={pathRef}
              d={PATH_D}
              stroke="url(#expertiseGradient)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="expertiseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-a)" />
                <stop offset="100%" stopColor="var(--accent-b)" />
              </linearGradient>
            </defs>
          </svg>

          {EXPERTISE_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[88%] max-w-lg md:w-[46%]"
              style={{
                top: `${pillar.top}%`,
                left: pillar.align === "left" ? "0" : "auto",
                right: pillar.align === "right" ? "0" : "auto",
              }}
            >
              <div className="rounded-3xl border border-[var(--glass-border)] bg-[var(--bg)]/90 p-6 backdrop-blur-md md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-4xl font-light text-[var(--glass-border)]">
                    {pillar.index}
                  </span>
                  <div className="text-right">
                    <p className="font-mono text-xl text-[var(--accent-b)]">
                      {pillar.metric.value}
                    </p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                      {pillar.metric.label}
                    </p>
                  </div>
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold md:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {pillar.summary}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 font-mono text-xs leading-relaxed text-[var(--text-muted)]"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent-a)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mt-10 flex justify-center px-[var(--edge)]">
        <MagneticButton href={CONTACT_HREF}>
          Auditar mi infraestructura →
        </MagneticButton>
      </div>
    </div>
  );
}
