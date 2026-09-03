import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Methodology } from "@/components/sections/Methodology";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Methodology />
      <Contact />
    </main>
  );
}
