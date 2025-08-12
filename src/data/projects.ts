export type Project = {
  id: string;
  title: string;
  description: string;
  image: {
    light: string;
    dark: string;
  };
  preview: {
    light: string;
    dark: string;
  };
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "trackforge",
    title: "TrackForge",
    description:
      "Productivity dashboard SaaS with task CRUD, weekly analytics, and persistent user preferences.",
    image: {
      light: "/projects/trackforge-light.png",
      dark: "/projects/trackforge-dark.png",
    },
    preview: {
      light: "/previews/trackforge-light.webm",
      dark: "/previews/trackforge-dark.webm",
    },
    liveUrl: "https://trackforge.quimromero.com",
    githubUrl: "https://github.com/quim-romero/trackforge",
  },
  {
    id: "nebulaos",
    title: "NebulaOS",
    description:
      "Conceptual microsite with interactive console, GSAP animations, and futuristic design.",
    image: {
      light: "/projects/nebulaos-light.png",
      dark: "/projects/nebulaos-dark.png",
    },
    preview: {
      light: "/previews/nebulaos-light.webm",
      dark: "/previews/nebulaos-dark.webm",
    },
    liveUrl: "https://nebulaos.quimromero.com",
    githubUrl: "https://github.com/quim-romero/nebulaos",
  },
  {
    id: "lumina",
    title: "Lumina",
    description:
      "Premium digital storefront with Stripe checkout, validated forms, and polished motion.",
    image: {
      light: "/projects/lumina-light.png",
      dark: "/projects/lumina-dark.png",
    },
    preview: {
      light: "/previews/lumina-light.webm",
      dark: "/previews/lumina-dark.webm",
    },
    liveUrl: "https://lumina.quimromero.com",
    githubUrl: "https://github.com/quim-romero/lumina",
  },
  {
    id: "clientflow",
    title: "ClientFlow",
    description:
      "Onboarding flow app with multi-step forms, schema validation, and file uploads.",
    image: {
      light: "/projects/clientflow-light.gif",
      dark: "/projects/clientflow-dark.gif",
    },
    preview: {
      light: "/previews/clientflow-light.webm",
      dark: "/previews/clientflow-dark.webm",
    },
    liveUrl: "https://clientflow.quimromero.com",
    githubUrl: "https://github.com/quim-romero/clientflow",
  },
  {
    id: "visionary-gallery",
    title: "Visionary Gallery",
    description:
      "Immersive gallery SPA with category filters, persistent favorites, and accessible lightbox.",
    image: {
      light: "/projects/visionary-light.png",
      dark: "/projects/visionary-dark.png",
    },
    preview: {
      light: "/previews/visionary-light.webm",
      dark: "/previews/visionary-dark.webm",
    },
    liveUrl: "https://visionary.quimromero.com",
    githubUrl: "https://github.com/quim-romero/visionary",
  },
  {
    id: "novatech",
    title: "NovaTech Solutions",
    description:
      "Corporate SaaS demo with interactive dashboards, validated forms, and an AI showcase.",
    image: {
      light: "/projects/novatech-light.gif",
      dark: "/projects/novatech-dark.gif",
    },
    preview: {
      light: "/previews/novatech-light.webm",
      dark: "/previews/novatech-dark.webm",
    },
    liveUrl: "https://novatech.quimromero.com",
    githubUrl: "https://github.com/quim-romero/novatech",
  },
];
