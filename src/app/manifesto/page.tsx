import type { Metadata } from "next";
import { ManifestoContent } from "@/components/manifesto/ManifestoContent";

export const metadata: Metadata = {
  title: "Manifiesto | Cisel",
  description:
    "No somos una agencia de marketing digital que escribe código. Somos ingenieros de infraestructura de red y arquitectos de producto.",
};

export default function ManifestoPage() {
  return (
    <main>
      <ManifestoContent />
    </main>
  );
}
