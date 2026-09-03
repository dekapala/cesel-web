"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/data/services";
import { WebsitesInteraction } from "@/components/sections/services/WebsitesInteraction";
import { AppsInteraction } from "@/components/sections/services/AppsInteraction";
import { SystemsInteraction } from "@/components/sections/services/SystemsInteraction";
import { AIInteraction } from "@/components/sections/services/AIInteraction";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INTERACTIONS = [
  WebsitesInteraction,
  AppsInteraction,
  SystemsInteraction,
  AIInteraction,
];

export function Services() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");

      ScrollTrigger.matchMedia({
        "(min-width: 900px)": () => {
          gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: pinRef.current,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              end: () => "+=" + (trackRef.current?.scrollWidth ?? 0),
            },
          });
        },
      });
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" className="relative w-full py-[var(--section-v)]">
      <div className="px-[var(--edge)]">
        <span className="font-mono text-[var(--fs-eyebrow)] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Matriz de Servicios
        </span>
        <h2 className="mt-3 max-w-2xl font-heading text-[var(--fs-h2)] font-bold leading-tight">
          Un ecosistema de entrega, no un catálogo de tareas.
        </h2>
      </div>

      <div ref={pinRef} className="relative mt-16 h-[100svh] w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${SERVICES.length * 100}%` }}
        >
          {SERVICES.map((service, i) => {
            const Interaction = INTERACTIONS[i];
            return (
              <div
                key={service.slug}
                className="service-panel flex h-full w-screen flex-shrink-0 items-center px-[var(--edge)]"
              >
                <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                  <div>
                    <span className="font-mono text-6xl font-light text-[var(--glass-border)] md:text-8xl">
                      {service.index}
                    </span>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-a)]">
                      {service.tag}
                    </p>
                    <h3 className="mt-4 font-heading text-2xl font-bold leading-tight md:text-4xl">
                      {service.headline}
                    </h3>
                    <p className="font-body mt-4 max-w-md text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                      {service.body}
                    </p>
                  </div>
                  <div className="h-[280px] w-full md:h-[360px]">
                    <Interaction />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
