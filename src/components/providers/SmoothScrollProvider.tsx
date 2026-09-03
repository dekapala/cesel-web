"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;
    // Lenis caches its scrollable limit at construction; since it lives in
    // the root layout it never re-initializes on client-side navigation, so
    // after a route change it's still clamped to the previous page's height
    // until told to re-measure.
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      lenis.resize();
    });
    return () => cancelAnimationFrame(raf);
  }, [lenis, pathname]);

  useEffect(() => {
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove((time) => {
        lenis?.raf(time * 1000);
      });
    };
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, autoRaf: false }}>
      {children}
    </ReactLenis>
  );
}
