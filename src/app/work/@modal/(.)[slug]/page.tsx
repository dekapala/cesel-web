import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/data/work";
import { CaseStudyModalShell } from "@/components/work/CaseStudyModalShell";

export default async function CaseStudyModalRoute(
  props: PageProps<"/work/[slug]">,
) {
  const { slug } = await props.params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  return <CaseStudyModalShell cs={cs} />;
}
