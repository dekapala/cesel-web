"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import type { CaseStudy } from "@/lib/data/work";
import { CaseStudyDetail } from "@/components/work/CaseStudyDetail";

export function CaseStudyModalShell({ cs }: { cs: CaseStudy }) {
  const router = useRouter();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => router.back()}
        className="fixed inset-0 bg-[var(--bg)]/90 backdrop-blur-lg"
      />

      <div className="relative mx-auto max-w-4xl px-[var(--edge)] py-28">
        <button
          type="button"
          onClick={() => router.back()}
          data-cursor-hover
          className="fixed right-[var(--edge)] top-6 z-10 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] hover:text-[var(--text)]"
        >
          Cerrar ✕
        </button>

        <CaseStudyDetail cs={cs} />
      </div>
    </div>
  );
}
