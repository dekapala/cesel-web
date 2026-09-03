"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, CONTACT_HREF } from "@/lib/nav";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-[var(--edge)] py-6">
        <Link
          href="/"
          data-cursor-hover
          className="font-mono text-[0.95rem] tracking-tight"
        >
          <span className="text-gradient">&gt;_</span> Cisel
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={cn(
                  "font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                  active
                    ? "text-[var(--accent-a)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <MagneticButton href={CONTACT_HREF} variant="outline" className="px-5 py-2 text-xs">
            Hablemos
          </MagneticButton>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              data-cursor-hover
              aria-label="Abrir menú"
              className={cn(
                "flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden",
                open && "invisible",
              )}
            >
              <span className="h-px w-6 bg-[var(--text)]" />
              <span className="h-px w-6 bg-[var(--text)]" />
            </button>
          </Dialog.Trigger>
          <AnimatePresence>
            {open && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-xl"
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="fixed inset-0 z-50 flex flex-col items-start justify-center gap-6 px-[var(--edge)]"
                  >
                    <Dialog.Title className="sr-only">
                      Menú de navegación
                    </Dialog.Title>
                    {NAV_LINKS.map((link) => (
                      <Dialog.Close asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="font-heading text-4xl font-bold tracking-tight"
                        >
                          {link.label}
                        </Link>
                      </Dialog.Close>
                    ))}
                    <Dialog.Close asChild>
                      <Link
                        href={CONTACT_HREF}
                        className="font-heading text-4xl font-bold tracking-tight text-gradient"
                      >
                        Contacto
                      </Link>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Cerrar menú"
                        className="absolute right-[var(--edge)] top-6 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]"
                      >
                        Cerrar ✕
                      </button>
                    </Dialog.Close>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </div>
    </header>
  );
}
