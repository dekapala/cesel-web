"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitLead } from "@/app/actions/contact";
import { PROJECT_TYPES, type LeadInput } from "@/lib/validations/lead";

type Step = "type" | "message" | "channel" | "value" | "done";

type HistoryLine = { role: "system" | "user"; text: string };

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const [step, setStep] = useState<Step>("type");
  const [history, setHistory] = useState<HistoryLine[]>([
    { role: "system", text: "¿Qué deberíamos construir juntos?" },
  ]);
  const [draft, setDraft] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [answers, setAnswers] = useState<Partial<LeadInput>>({});
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const push = (role: HistoryLine["role"], text: string) =>
    setHistory((prev) => [...prev, { role, text }]);

  const chooseType = (value: LeadInput["projectType"], label: string) => {
    setAnswers((prev) => ({ ...prev, projectType: value }));
    push("user", label);
    push(
      "system",
      "Contanos más — ¿cuál es el cuello de botella o la métrica que querés multiplicar?",
    );
    setStep("message");
  };

  const submitMessage = () => {
    if (draft.trim().length < 10) {
      setError("Contanos un poco más — al menos 10 caracteres.");
      return;
    }
    setError(null);
    setAnswers((prev) => ({ ...prev, message: draft.trim() }));
    push("user", draft.trim());
    setDraft("");
    push("system", "¿Dónde te enviamos nuestro análisis de viabilidad técnica?");
    setStep("channel");
  };

  const chooseChannel = (channel: LeadInput["contactChannel"]) => {
    setAnswers((prev) => ({ ...prev, contactChannel: channel }));
    push("user", channel === "email" ? "Email" : "WhatsApp");
    push(
      "system",
      channel === "email" ? "Dejanos tu email:" : "Dejanos tu número de WhatsApp:",
    );
    setStep("value");
  };

  const submitValue = () => {
    if (draft.trim().length < 3) {
      setError("Falta un dato de contacto válido.");
      return;
    }
    setError(null);
    const finalAnswers: LeadInput = {
      projectType: answers.projectType!,
      message: answers.message!,
      contactChannel: answers.contactChannel!,
      contactValue: draft.trim(),
    };
    push("user", draft.trim());
    setDraft("");

    startTransition(async () => {
      const result = await submitLead({ ...finalAnswers, honeypot });
      if (result.success) {
        push(
          "system",
          "Recibido. Analizamos la viabilidad técnica y te respondemos en menos de 24 horas.",
        );
        setStep("done");
      } else {
        setError(result.error);
      }
    });
  };

  const handleEnter = (action: () => void) => (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      action();
    }
  };

  return (
    <section id="contacto" className="relative w-full py-[var(--section-v)]">
      <div className="mx-auto max-w-2xl px-[var(--edge)]">
        <span className="font-mono text-[var(--fs-eyebrow)] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Cierre Consultivo
        </span>
        <h2 className="mt-3 font-heading text-[var(--fs-h2)] font-bold leading-tight">
          Optimicemos tu infraestructura digital.
        </h2>

        <div className="relative mt-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 backdrop-blur-md md:p-8">
          <p className="font-mono text-xs text-[var(--text-muted)]">
            user@cisel:~$
          </p>

          <div className="mt-4 flex flex-col gap-3 font-mono text-sm">
            {history.map((line, i) => (
              <p
                key={i}
                className={
                  line.role === "system"
                    ? "text-[var(--text)]"
                    : "pl-4 text-[var(--accent-a)]"
                }
              >
                {line.role === "system" ? "> " : "» "}
                {line.text}
              </p>
            ))}
          </div>

          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <AnimatePresence mode="wait">
            {step === "type" && (
              <motion.div
                key="type"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {PROJECT_TYPES.filter((p) => p.value !== "otro").map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    data-cursor-hover
                    onClick={() => chooseType(p.value, p.label)}
                    className="rounded-full border border-[var(--glass-border)] px-4 py-2 font-mono text-xs tracking-tight text-[var(--text)] transition-colors hover:border-[var(--accent-b)] hover:text-[var(--accent-b)]"
                  >
                    [{p.label}]
                  </button>
                ))}
              </motion.div>
            )}

            {step === "message" && (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-5"
              >
                <textarea
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleEnter(submitMessage)}
                  rows={3}
                  placeholder="Escribí acá — Enter para enviar"
                  className="w-full resize-none rounded-xl border border-[var(--glass-border)] bg-[var(--bg)] px-4 py-3 font-mono text-sm text-[var(--text)] outline-none focus:border-[var(--accent-b)]"
                />
                <button
                  type="button"
                  data-cursor-hover
                  onClick={submitMessage}
                  className="mt-2 rounded-full bg-[var(--text)] px-5 py-2 font-mono text-xs text-[var(--bg)] hover:bg-[var(--accent-b)]"
                >
                  Enviar →
                </button>
              </motion.div>
            )}

            {step === "channel" && (
              <motion.div
                key="channel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-5 flex gap-2"
              >
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => chooseChannel("email")}
                  className="rounded-full border border-[var(--glass-border)] px-4 py-2 font-mono text-xs text-[var(--text)] hover:border-[var(--accent-b)] hover:text-[var(--accent-b)]"
                >
                  [Email]
                </button>
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => chooseChannel("whatsapp")}
                  className="rounded-full border border-[var(--glass-border)] px-4 py-2 font-mono text-xs text-[var(--text)] hover:border-[var(--accent-b)] hover:text-[var(--accent-b)]"
                >
                  [WhatsApp]
                </button>
              </motion.div>
            )}

            {step === "value" && (
              <motion.div
                key="value"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-5 flex flex-col gap-2 sm:flex-row"
              >
                <input
                  autoFocus
                  type={answers.contactChannel === "email" ? "email" : "tel"}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleEnter(submitValue)}
                  placeholder={
                    answers.contactChannel === "email"
                      ? "vos@empresa.com"
                      : "+54 9 11 ..."
                  }
                  disabled={isPending}
                  className="flex-1 rounded-xl border border-[var(--glass-border)] bg-[var(--bg)] px-4 py-3 font-mono text-sm text-[var(--text)] outline-none focus:border-[var(--accent-b)]"
                />
                <button
                  type="button"
                  data-cursor-hover
                  onClick={submitValue}
                  disabled={isPending}
                  className="rounded-full bg-[var(--text)] px-5 py-2 font-mono text-xs text-[var(--bg)] hover:bg-[var(--accent-b)] disabled:opacity-50"
                >
                  {isPending ? "Enviando…" : "Confirmar →"}
                </button>
              </motion.div>
            )}

            {step === "done" && (
              <motion.p
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 font-mono text-xs text-[var(--accent-a)]"
              >
                ✓ consulta registrada
              </motion.p>
            )}
          </AnimatePresence>

          {error && (
            <p className="mt-3 font-mono text-xs text-[#ff6b6b]">{error}</p>
          )}
        </div>

        <a
          href="mailto:hello@cisel.tech"
          className="mt-6 inline-block font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-b)]"
        >
          o escribinos directo a hello@cisel.tech
        </a>
      </div>
    </section>
  );
}
