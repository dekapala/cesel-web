import type { Metadata } from "next";
import { WorkShowcase } from "@/components/work/WorkShowcase";

export const metadata: Metadata = {
  title: "Trabajo | Cisel",
  description:
    "Casos de estudio de ingeniería: HealthTech, dashboards en tiempo real y transformación operativa.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkShowcase />
    </main>
  );
}
