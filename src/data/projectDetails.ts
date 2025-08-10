export type ProjectDetail = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: {
    light: string;
    dark: string;
  };
  preview?: {
    light: string;
    dark: string;
  };
  tech: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projectDetails: ProjectDetail[] = [
  {
    id: "trackforge",
    title: "TrackForge",
    description:
      "Productivity dashboard with TypeScript logic and persistent state.",
    longDescription:
      "TrackForge is a robust task management dashboard focused on productivity and real-world frontend architecture. Built entirely with TypeScript and Zustand, it supports full CRUD, dynamic filters, weekly stats via Chart.js, form validation with Zod, and persistent user preferences — all in a clean, responsive, and accessible UI.",
    image: {
      light: "/projects/trackforge-light.png",
      dark: "/projects/trackforge-dark.png",
    },
    preview: {
      light: "/previews/trackforge-light.webm",
      dark: "/previews/trackforge-dark.webm",
    },
    tech: ["React", "TypeScript", "Zustand", "Chart.js", "Tailwind CSS", "Zod"],
    highlights: [
      "Typed global state with Zustand + localStorage persistence",
      "Real-time filters by priority and status",
      "Weekly productivity charts with Chart.js",
      "Persistent theme and density preferences",
      "Framer Motion animations with toggle settings",
      "Editable profile form with validation via Zod",
    ],
    liveUrl: "https://trackforge.quimromero.com",
    githubUrl: "https://github.com/quim-romero/trackforge",
  },
  {
    id: "nebulaos",
    title: "NebulaOS",
    description:
      "Experimental microsite with animated console and modular design.",
    longDescription:
      "NebulaOS is a conceptual landing page that simulates the launch of a futuristic operating system. It integrates advanced animations with GSAP and Framer Motion, a simulated interactive console, animated modals using AnimatePresence, and highly styled UI components. Its modular design, responsive navigation, and glow/scroll effects showcase modern animation, visual storytelling, and frontend precision.",
    image: {
      light: "/projects/nebulaos-light.png",
      dark: "/projects/nebulaos-dark.png",
    },
    preview: {
      light: "/previews/nebulaos-light.webm",
      dark: "/previews/nebulaos-dark.webm",
    },
    tech: [
      "React",
      "GSAP",
      "Framer Motion",
      "Lenis",
      "Tailwind CSS",
      "localStorage",
    ],
    highlights: [
      "Smooth animations with GSAP and directional transitions via Framer Motion",
      "Interactive console with simulated output and gesture support",
      "Animated modals powered by AnimatePresence",
      "Gesture-based navigation and animated mobile menu",
      "Modular interface with reusable UI components",
      "Futuristic aesthetic with glow effects and custom typography (Orbitron, Inter)",
    ],
    liveUrl: "https://nebulaos.quimromero.com",
    githubUrl: "https://github.com/quim-romero/nebulaos",
  },
  {
    id: "lumina",
    title: "Lumina",
    description:
      "E-commerce moderno para productos digitales con checkout real y animaciones fluidas.",
    longDescription:
      "Lumina es una experiencia de tienda digital premium con scroll animado, checkout funcional con Stripe en modo test, validación en formularios con Zod y envío de mensajes con EmailJS. Todo envuelto en una interfaz pulida con scroll suave, dark mode persistente y arquitectura real.",
    image: {
      dark: "/projects/lumina-dark.png",
      light: "/projects/lumina-light.png",
    },
    preview: {
      light: "/previews/lumina-light.webm",
      dark: "/previews/lumina-dark.webm",
    },
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "EmailJS",
      "Stripe",
    ],
    highlights: [
      "Formulario de contacto funcional con validación Zod + EmailJS",
      "Checkout con Stripe (modo test)",
      "Animaciones suaves con Framer Motion y scroll smoothing con Lenis",
      "Modo claro/oscuro persistente",
      "Diseño responsive y microinteracciones personalizadas",
      "Arquitectura modular orientada a producción",
    ],
    liveUrl: "https://lumina.quimromero.com",
    githubUrl: "https://github.com/quim-romero/lumina",
  },
  {
    id: "clientflow",
    title: "ClientFlow",
    description:
      "Multi-step onboarding flow with validation, file uploads, and theme support.",
    longDescription:
      "ClientFlow is a minimal and focused onboarding app for agencies, freelancers, and digital teams who need to gather client input with clarity and zero friction. It includes a progressive multi-step form with schema validation, file upload with previews and metadata, dark/light theme support, and persistent form state. Designed to feel smooth and intuitive across all devices.",
    image: {
      light: "/projects/clientflow-light.png",
      dark: "/projects/clientflow-dark.png",
    },
    preview: {
      light: "/previews/clientflow-light.webm",
      dark: "/previews/clientflow-dark.webm",
    },
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "React Hook Form",
      "Zustand",
    ],
    highlights: [
      "Multi-step form flow with progress tracking and validation",
      "Robust schema validation using Zod + React Hook Form",
      "File upload with preview, metadata, and responsive feedback",
      "Light/dark theme support with persistent user preferences",
      "Modular architecture using Zustand for state management",
      "Responsive and accessible UI with smooth animations",
    ],
    liveUrl: "https://clientflow.quimromero.com",
    githubUrl: "https://github.com/quim-romero/clientflow",
  },
  {
    id: "visionary-gallery",
    title: "Visionary Gallery",
    description: "Curated SPA gallery for immersive digital art experiences.",
    longDescription:
      "Visionary Gallery is a modern single-page app simulating an elegant digital art gallery. It supports real-time category filters, a favorites system with localStorage persistence, a lightbox-style modal with soft animations, and a responsive, theme-adaptive interface. Artworks range from glitch loops to atmospheric 3D renders — all displayed within a clean architecture and smooth navigation flow.",
    image: {
      light: "/projects/gallery-light.png",
      dark: "/projects/gallery-dark.png",
    },
    preview: {
      light: "/previews/visionary-light.webm",
      dark: "/previews/visionary-dark.webm",
    },
    tech: [
      "React",
      "Zustand",
      "Framer Motion",
      "Tailwind CSS",
      "React Router",
      "Helmet",
    ],
    highlights: [
      "Persistent favorites system using Zustand + localStorage",
      "Real-time category filtering with reactive UI",
      "Expanded artwork modal with soft Framer Motion animations",
      "Dark/light theme support with local preference storage",
      "Mobile-first responsive design with animated scroll",
      "Clear component architecture with UI/logic separation",
    ],
    liveUrl: "https://visionary.quimromero.com",
    githubUrl: "https://github.com/quim-romero/visionary",
  },
  {
    id: "novatech",
    title: "NovaTech Solutions",
    description:
      "Corporate SaaS site with real dashboards and interactive visualizations.",
    longDescription:
      "NovaTech Solutions is a realistic simulation of a corporate SaaS product focused on AI, cloud, and cybersecurity. It features a multipage architecture with protected routes, animated dashboards, a functional blog, and validated forms — all wrapped in a polished UI with dark mode, responsive design, and motion UX. This project emphasizes product presentation, accessibility, and professional frontend structure.",
    image: {
      light: "/projects/novatech-light.png",
      dark: "/projects/novatech-dark.png",
    },
    preview: {
      light: "/previews/novatech-light.webm",
      dark: "/previews/novatech-dark.webm",
    },
    tech: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Chart.js",
      "Recharts",
      "React Hook Form",
      "Yup",
      "Helmet",
      "TypeAnimation",
    ],
    highlights: [
      "Multipage architecture with semantic routes and independent layouts",
      "Animated dashboards with real-time data (CPU, threats, activity)",
      "Validated contact form with Yup + React Hook Form",
      "Persistent dark/light theme with accessible UX",
      "SEO-ready with React Helmet and per-page metadata",
      "AI demo: sentiment analysis with animated feedback",
    ],
    liveUrl: "https://novatech.quimromero.com",
    githubUrl: "https://github.com/quim-romero/novatech",
  },
];
