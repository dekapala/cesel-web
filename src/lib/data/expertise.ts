export type ExpertisePillar = {
  index: string;
  title: string;
  summary: string;
  points: string[];
  metric: { label: string; value: string };
  top: number;
  align: "left" | "right";
};

export const EXPERTISE_PILLARS: ExpertisePillar[] = [
  {
    index: "01",
    title: "DevSecOps & Infraestructura como Código",
    summary:
      "Modelamos entornos en AWS y GCP con Terraform para que toda la infraestructura sea replicable, versionada y autodeclarativa — nunca configurada a mano en un panel.",
    points: [
      "Entornos de staging idénticos a producción, generados desde el mismo módulo Terraform.",
      "Rollbacks de infraestructura en minutos, no en tickets.",
      "Pipelines de CI/CD con gates de seguridad automáticos antes de cada despliegue.",
    ],
    metric: { label: "Infra como código", value: "100%" },
    top: 8,
    align: "left",
  },
  {
    index: "02",
    title: "Seguridad desde el Diseño",
    summary:
      "La seguridad no se agrega al final: se diseña primero. Autenticación robusta, control de acceso estricto y auditoría continua de dependencias.",
    points: [
      "Autenticación OAuth2 / JWT con rotación de tokens y sesiones de vida corta.",
      "Control de acceso basado en roles (RBAC) en cada endpoint sensible.",
      "Protección activa contra inyecciones SQL, CSRF y dependencias vulnerables.",
    ],
    metric: { label: "Auditorías automáticas", value: "24/7" },
    top: 32,
    align: "right",
  },
  {
    index: "03",
    title: "Bases de Datos y Rendimiento",
    summary:
      "Los datos son el activo más costoso de mover mal. Indexamos, cacheamos y optimizamos consultas para que la latencia nunca sea el cuello de botella.",
    points: [
      "Indexación inteligente en PostgreSQL para consultas complejas a escala.",
      "Caching predictivo con Redis en las rutas de lectura más críticas.",
      "Tiempos de respuesta objetivo inferiores a 100ms en producción.",
    ],
    metric: { label: "Latencia objetivo", value: "<100ms" },
    top: 56,
    align: "left",
  },
  {
    index: "04",
    title: "Automatización Corporativa",
    summary:
      "Erradicamos la intervención manual redundante conectando ERPs, CRMs y sistemas propietarios mediante colas de mensajes distribuidas con tolerancia a fallas.",
    points: [
      "Orquestación de eventos con RabbitMQ y Kafka entre sistemas heterogéneos.",
      "Reintentos y colas muertas (DLQ) para que ningún proceso se pierda silenciosamente.",
      "Integraciones a medida entre ERP, CRM y herramientas internas sin intervención humana.",
    ],
    metric: { label: "Procesos automatizados", value: "+40" },
    top: 80,
    align: "right",
  },
];
