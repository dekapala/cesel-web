"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HashScrollSync() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !lenis) return;

    let cancelled = false;
    let attempts = 0;

    const trySync = () => {
      if (cancelled) return;
      attempts += 1;

      // Sections (Services, Methodology) create GSAP ScrollTriggers with
      // pin-spacers on mount, which changes total document height after
      // first paint. Refresh before measuring so the target's offset is
      // computed against final layout, not the pre-pin one.
      ScrollTrigger.refresh();
      // Lenis caches its scrollable limit and clamps scrollTo() to it; since
      // Lenis lives in the root layout and survives client-side navigation,
      // that cache is stale for the newly-rendered page until resize() runs.
      lenis.resize();

      const target = document.querySelector(hash) as HTMLElement | null;
      if (target) {
        lenis.scrollTo(target, { offset: -20 });
      } else if (attempts < 10) {
        requestAnimationFrame(trySync);
      }
    };

    // Two rAFs: let React commit all section effects (which create the
    // ScrollTriggers) before the first refresh/measure pass.
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(trySync));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
    };
  }, [pathname, lenis]);

  return null;
}
