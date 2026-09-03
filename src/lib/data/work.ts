export type CaseStudy = {
  slug: string;
  index: string;
  category: string;
  name: string;
  client: string;
  year: string;
  challenge: string;
  architecture: string[];
  stack: string[];
  kpis: { label: string; value: string }[];
  image: string;
  gallery: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "medily-architecture",
    index: "01",
    category: "HealthTech",
    name: "Medily Architecture",
    client: "Red de clínicas privadas — LATAM",
    year: "2025",
    challenge:
      "Digitalizar operaciones clínicas críticas y la ingesta masiva de documentación médica bajo estricta seguridad de datos, sin interrumpir la operación diaria de más de 40 consultorios.",
    architecture: [
      "Aplicación móvil híbrida construida en React Native para el paciente y el personal de campo, integrada con una SPA de alto rendimiento en Next.js para el portal de administración clínica.",
      "Base de datos e hilos en tiempo real sobre Firebase para notificaciones síncronas entre consultorio, laboratorio y farmacia.",
      "Pipeline de procesamiento automático de documentos mediante OCR potenciado por modelos de lenguaje en el backend, que extrae diagnósticos y dosis de recetas escaneadas, automatizando la entrada de datos en un 92%.",
      "Redundancia multi-zona y encriptación de extremo a extremo tanto en reposo como en tránsito, bajo cumplimiento HIPAA.",
    ],
    stack: ["React Native", "Next.js", "Firebase", "OCR / LLM", "HIPAA"],
    kpis: [
      { label: "Precisión OCR", value: "92%" },
      { label: "Uptime", value: "99.9%" },
      { label: "Onboarding clínico", value: "< 48h" },
      { label: "Zonas redundantes", value: "3" },
    ],
    image: "https://picsum.photos/seed/medily-hero/1600/1000?grayscale",
    gallery: [
      "https://picsum.photos/seed/medily-1/900/700?grayscale",
      "https://picsum.photos/seed/medily-2/900/700?grayscale",
      "https://picsum.photos/seed/medily-3/900/700?grayscale",
    ],
  },
  {
    slug: "operaciones-en-tiempo-real",
    index: "02",
    category: "Dashboards & Operaciones",
    name: "Operaciones en Tiempo Real",
    client: "Torneo deportivo multi-sede",
    year: "2025",
    challenge:
      "Centralizar la telemetría y los flujos de trabajo de una operación logística de torneo con miles de actualizaciones por segundo entre sedes, árbitros y mesas de control.",
    architecture: [
      "Portal web basado en Next.js con Server-Side Rendering dinámico para paneles de control por sede y para la mesa central.",
      "Integración directa con Supabase para el manejo de esquemas PostgreSQL, persistencia de datos y websockets de tiempo real entre todas las mesas de juego.",
      "Lógicas CRUD complejas controladas mediante transacciones atómicas de base de datos para evitar colisiones de datos cuando varias mesas actualizan resultados simultáneamente.",
      "Interfaz reactiva optimizada para una latencia de renderizado inferior a 16ms, manteniendo 60 FPS estables incluso con streams de datos concurrentes.",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Realtime / WebSockets"],
    kpis: [
      { label: "Latencia de consulta", value: "400ms" },
      { label: "Render frame time", value: "< 16ms" },
      { label: "Uptime en vivo", value: "99.97%" },
      { label: "Updates concurrentes", value: "3.2k/min" },
    ],
    image: "https://picsum.photos/seed/ops-hero/1600/1000?grayscale",
    gallery: [
      "https://picsum.photos/seed/ops-1/900/700?grayscale",
      "https://picsum.photos/seed/ops-2/900/700?grayscale",
      "https://picsum.photos/seed/ops-3/900/700?grayscale",
    ],
  },
  {
    slug: "ecosistemas-corporativos",
    index: "03",
    category: "Branding & Operación",
    name: "Ecosistemas Corporativos",
    client: "Cadena hotelera boutique",
    year: "2024",
    challenge:
      "Rediseñar la identidad de marca, el modelo operativo y la infraestructura digital de un grupo hotelero tradicional para adaptarlo a la era de la reserva directa y la operación asistida por IA.",
    architecture: [
      "Auditoría de marca y consultoría de diseño integral, unificando la identidad visual de 6 propiedades bajo un mismo sistema de diseño.",
      "Rediseño completo de la infraestructura digital, migrando sistemas legacy de reservas hacia microservicios desacoplados.",
      "Automatización de flujos de trabajo internos (check-in, housekeeping, facturación) mediante pipelines de CI/CD avanzados y despliegues sin downtime.",
      "Nuevo motor de reservas directo integrado con el sistema de identidad renovado, reduciendo la dependencia de OTAs externas.",
    ],
    stack: ["Design System", "Next.js", "Microservicios", "CI/CD"],
    kpis: [
      { label: "Reserva directa", value: "+61%" },
      { label: "Propiedades unificadas", value: "6" },
      { label: "Downtime en migración", value: "0h" },
      { label: "Tiempo de despliegue", value: "-70%" },
    ],
    image: "https://picsum.photos/seed/hospitality-hero/1600/1000?grayscale",
    gallery: [
      "https://picsum.photos/seed/hospitality-1/900/700?grayscale",
      "https://picsum.photos/seed/hospitality-2/900/700?grayscale",
      "https://picsum.photos/seed/hospitality-3/900/700?grayscale",
    ],
  },
];
