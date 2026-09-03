import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data/work";
import { CaseStudyDetail } from "@/components/work/CaseStudyDetail";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return {};

  return {
    title: `${cs.name} | Cisel`,
    description: cs.challenge,
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <main className="relative mx-auto max-w-4xl px-[var(--edge)] pb-[var(--section-v)] pt-32">
      <Link
        href="/work"
        data-cursor-hover
        className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] hover:text-[var(--text)]"
      >
        ← Volver a Trabajo
      </Link>
      <div className="mt-8">
        <CaseStudyDetail cs={cs} />
      </div>
    </main>
  );
}
