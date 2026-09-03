import type { Metadata } from "next";
import { Syne, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { HashScrollSync } from "@/components/providers/HashScrollSync";
import { Cursor } from "@/components/ui/Cursor";
import { AmbientBackground } from "@/components/background/AmbientBackground";
import { Navbar } from "@/components/layout/Navbar";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cisel | Ingeniería & Diseño Digital",
  description:
    "Cisel: socios de ingeniería para sitios web de alta fidelidad, aplicaciones, sistemas internos y productos potenciados por IA.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScrollProvider>
          <AmbientBackground />
          <div className="noise-overlay" />
          <Cursor />
          <Navbar />
          <HashScrollSync />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
