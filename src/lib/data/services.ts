export type ServiceVertical = {
  slug: string;
  index: string;
  name: string;
  headline: string;
  body: string;
  tag: string;
};

export const SERVICES: ServiceVertical[] = [
  {
    slug: "sitios-web-a-medida",
    index: "01",
    name: "Sitios Web",
    headline: "Arquitecturas web interactivas que lideran el mercado.",
    body: "Combinamos diseño de interacción galardonado con optimización de rendimiento crítica. Sitios a medida construidos para carga instantánea, conversión óptima y posicionamiento impecable.",
    tag: "A Medida & Experienciales",
  },
  {
    slug: "apps-web-y-moviles",
    index: "02",
    name: "Apps Web y Móviles",
    headline: "Experiencias táctiles de alta fidelidad sin fricciones.",
    body: "Desarrollamos aplicaciones robustas que priorizan la fluidez visual y la eficiencia del motor de renderizado. Del prototipado rápido a infraestructuras para millones de usuarios activos.",
    tag: "Alta Fidelidad & Escala",
  },
  {
    slug: "sistemas-internos-y-automatizacion",
    index: "03",
    name: "Sistemas Internos",
    headline: "Erradica la fricción operativa. Maximiza el control.",
    body: "Diseñamos dashboards analíticos en tiempo real y automatizaciones de backend que integran tus sistemas críticos, reemplazando tareas manuales por flujos inteligentes de nivel corporativo.",
    tag: "Dashboards & Automatización",
  },
  {
    slug: "productos-potenciados-por-ia",
    index: "04",
    name: "Productos con IA",
    headline: "Cognición artificial integrada a tu modelo de negocio.",
    body: "No solo conectamos APIs; entrenamos y desplegamos agentes de IA y modelos optimizados para tus operaciones internas, automatizando decisiones complejas con precisión.",
    tag: "Modelos Propios & Automatización Cognitiva",
  },
];
