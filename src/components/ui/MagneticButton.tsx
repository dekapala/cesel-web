"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  variant?: "solid" | "outline";
};

export function MagneticButton({
  href,
  children,
  className,
  external,
  variant = "solid",
}: MagneticButtonProps) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic(0.35);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x, y }}
      className="inline-block"
      data-cursor-hover
    >
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(
          "group relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm tracking-tight transition-colors",
          "font-mono",
          variant === "solid" &&
            "bg-[var(--text)] text-[var(--bg)] hover:bg-[var(--accent-b)]",
          variant === "outline" &&
            "border border-[var(--glass-border)] text-[var(--text)] hover:border-[var(--accent-b)]",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
