export default {
  heading: "Servicios",
  metaTitle: "Servicios — Quim Romero (Frontend)",
  metaDescription:
    "Diseño e implemento interfaces en React/TypeScript: landings, e-commerce y dashboards. Paquetes claros, precios desde X, entrega medible.",
  intro:
    "Paquetes claros para que sepas qué recibes y cuándo: conversión, accesibilidad y rendimiento primero. Trabajo con métricas (Lighthouse, axe) y CI/CD.",
  ctas: {
    contact: "Pedir presupuesto",
    emailText: "¿Prefieres email directo? Escríbeme a",
  },
  packagesTitle: "Paquetes",
  from: "Desde",
  ui: {
    seeDetails: "Ver detalles",
    hideDetails: "Ocultar detalles",
    includes: "Incluye",
    deliverables: "Entregables",
    close: "Cerrar",
    currency: "Moneda",
  },
  packages: [
    {
      id: "landing",
      title: "Landing",
      desc: "1–3 secciones, animada y optimizada. Ideal para lanzamientos o validaciones rápidas.",
      priceFrom: "€950",
      timeline: "1–2 semanas",
      features: [
        "UX/copy review y estructura clara",
        "Animación sutil y microinteracciones",
        "SEO base (meta, OG), analítica y favicon",
        "Rendimiento 90+ en Lighthouse",
        "Accesibilidad base (teclado/foco)",
      ],
      deliverables: [
        "Repositorio y despliegue (Vercel/Netlify)",
        "Guía rápida de edición/contenido",
      ],
    },
    {
      id: "ecommerce",
      title: "E-commerce básico",
      desc: "Catálogo + Stripe Checkout. Base sólida para empezar a vender sin complejidad.",
      priceFrom: "€1.900",
      timeline: "2–3 semanas",
      features: [
        "Catálogo hasta 20 productos",
        "Carrito y pago con Stripe Checkout",
        "Páginas legales y emails básicos",
        "Analítica y SEO base",
        "Rendimiento y accesibilidad",
      ],
      deliverables: [
        "Repositorio y despliegue",
        "Documento de gestión de productos",
      ],
    },
    {
      id: "dashboard",
      title: "Dashboard",
      desc: "Datos, filtros y gráficos. Enfoque en claridad, accesibilidad y rendimiento.",
      priceFrom: "€1.700",
      timeline: "2–3 semanas",
      features: [
        "Tabla con filtros y estados vacíos",
        "Gráficos con Chart.js",
        "Atajos de teclado y foco visible",
        "Budgets de rendimiento",
      ],
      deliverables: [
        "Repositorio y despliegue",
        "Mock API o integración con tu fuente",
      ],
    },
  ],
  formTitle: "Cuéntame tu proyecto",
  form: {
    name: "Nombre",
    email: "Email",
    goal: "Objetivo / Qué necesitas",
    budget: "Presupuesto aproximado",
    budgetOptions: [
      "< €1.000",
      "€1.000 – €3.000",
      "€3.000 – €6.000",
      "€6.000 – €10.000",
      "> €10.000",
    ],
    submit: "Enviar",
    success: "¡Recibido! Te respondo pronto.",
  },
  breadcrumbHome: "Inicio",
};
