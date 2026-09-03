function hashSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  return hash;
}

export function AbstractPlaceholder({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const angle = hashSeed(seed);
  const flip = hashSeed(seed + "-flip") % 2 === 0;
  const [from, to] = flip
    ? ["var(--accent-a)", "var(--accent-b)"]
    : ["var(--accent-b)", "var(--accent-a)"];

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border border-[var(--glass-border)] ${className ?? ""}`}
      style={{ background: "var(--bg-raised)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          background: `linear-gradient(${angle}deg, ${from}, transparent 55%, ${to} 130%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--text) 0px, var(--text) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(0deg, var(--text) 0px, var(--text) 1px, transparent 1px, transparent 32px)",
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.14] blur-2xl"
        style={{
          width: "60%",
          height: "60%",
          top: flip ? "-10%" : "auto",
          bottom: flip ? "auto" : "-10%",
          left: flip ? "-10%" : "auto",
          right: flip ? "auto" : "-10%",
          background: from,
        }}
      />
    </div>
  );
}
