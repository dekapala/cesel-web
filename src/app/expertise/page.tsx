import type { Metadata } from "next";
import { ExpertiseTimeline } from "@/components/expertise/ExpertiseTimeline";

export const metadata: Metadata = {
  title: "Expertise | Cisel",
  description:
    "DevSecOps, seguridad desde el diseño, rendimiento de bases de datos y automatización corporativa.",
};

export default function ExpertisePage() {
  return (
    <main>
      <ExpertiseTimeline />
    </main>
  );
}
