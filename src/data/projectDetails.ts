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
      "Productivity dashboard SaaS for task management, filters and weekly analytics.",
    longDescription:
      "TrackForge is a focused productivity dashboard built as a real SaaS demo. It supports full CRUD for tasks, dynamic filters, weekly performance charts, passwordless login and persistent user settings. Designed for small teams that need clarity, data visualization and a customizable UI.",
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
      "Full CRUD task management with Supabase backend",
      "Dynamic filters by status and priority",
      "Weekly analytics charts powered by Chart.js",
      "Passwordless authentication with Supabase Auth",
      "Persistent theme, density and motion preferences",
      "Clean, responsive and accessible UI with Framer Motion animations",
    ],
    liveUrl: "https://trackforge.quimromero.com",
    githubUrl: "https://github.com/quim-romero/trackforge",
  },
  {
    id: "nebulaos",
    title: "NebulaOS",
    description:
      "Experimental microsite featuring an interactive console and sleek, futuristic animations.",
    longDescription:
      "NebulaOS is a conceptual microsite that simulates a futuristic operating system. It combines GSAP and Framer Motion animations, an interactive console, animated modals and modular UI design. Perfect as a demo for creative landings or experimental SaaS presentations.",
    image: {
      light: "/projects/nebulaos-light.png",
      dark: "/projects/nebulaos-dark.png",
    },
    preview: {
      light: "/previews/nebulaos-light.webm",
      dark: "/previews/nebulaos-dark.webm",
    },
    tech: ["React", "GSAP", "Framer Motion", "Tailwind CSS", "localStorage"],
    highlights: [
      "GSAP-powered animations with directional transitions",
      "Interactive console simulation with output and gestures",
      "Animated modals with AnimatePresence",
      "Gesture-based navigation and responsive menu",
      "Modular interface with reusable UI components",
      "Futuristic style with glow effects and custom fonts",
    ],
    liveUrl: "https://nebulaos.quimromero.com",
    githubUrl: "https://github.com/quim-romero/nebulaos",
  },
  {
    id: "lumina",
    title: "Lumina",
    description:
      "Digital storefront SaaS with Stripe checkout, forms and animated UX.",
    longDescription:
      "Lumina is a modern e-commerce demo for digital products. It includes a real checkout flow with Stripe (test mode), validated contact forms with EmailJS, animated UI transitions, and persistent dark/light mode. Built to demonstrate production-ready UX and integrations.",
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
      "Stripe-powered checkout in test mode",
      "Validated contact form with Zod + EmailJS",
      "Smooth animations with Framer Motion and scroll effects",
      "Dark/light theme persistence",
      "Responsive design with microinteractions",
      "Scalable architecture oriented to production",
    ],
    liveUrl: "https://lumina.quimromero.com",
    githubUrl: "https://github.com/quim-romero/lumina",
  },
  {
    id: "clientflow",
    title: "ClientFlow",
    description:
      "Multi-step onboarding app with validation, uploads and progress persistence.",
    longDescription:
      "ClientFlow is an onboarding solution for agencies and freelancers to collect client data smoothly. It features a multi-step form with schema validation, file uploads with previews, progress persistence, and light/dark theme support. The experience is responsive, intuitive and designed for real-world workflows.",
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
      "Progressive multi-step form with validation on each step",
      "Schema validation using React Hook Form + Zod",
      "File upload with preview, metadata and visual feedback",
      "Persistent form state across sessions",
      "Dark/light theme with saved user preferences",
      "Responsive, accessible and animated interface",
    ],
    liveUrl: "https://clientflow.quimromero.com",
    githubUrl: "https://github.com/quim-romero/clientflow",
  },
  {
    id: "visionary-gallery",
    title: "Visionary Gallery",
    description:
      "Immersive gallery SPA with real-time filters, favorites and lightbox.",
    longDescription:
      "Visionary Gallery is a curated digital gallery experience. It supports real-time filtering, a persistent favorites system, accessible lightbox navigation and a responsive, theme-adaptive interface. Designed as a SaaS-style demo for catalogs, art platforms and marketplaces.",
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
      "Favorites system with Zustand + localStorage persistence",
      "Real-time filtering by category",
      "Accessible lightbox with keyboard navigation",
      "Curator mode for mock editing",
      "Dark/light mode with saved preferences",
      "Mobile-first responsive SPA with smooth transitions",
    ],
    liveUrl: "https://visionary.quimromero.com",
    githubUrl: "https://github.com/quim-romero/visionary",
  },
  {
    id: "novatech",
    title: "NovaTech Solutions",
    description:
      "Corporate SaaS platform demo with dashboards, forms and AI showcase.",
    longDescription:
      "NovaTech Solutions is a simulation of a corporate SaaS site for AI, cloud and security services. It includes animated dashboards, validated forms, protected routes, SEO-ready structure and even an AI demo for sentiment analysis. Built as a professional multipage SaaS showcase.",
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
      "Multipage architecture with protected routes",
      "Interactive dashboards with Chart.js and Recharts",
      "Validated forms with Yup + React Hook Form",
      "SEO optimization with React Helmet",
      "Dark/light mode with accessible UI",
      "AI demo: sentiment analysis with animated results",
    ],
    liveUrl: "https://novatech.quimromero.com",
    githubUrl: "https://github.com/quim-romero/novatech",
  },
];
