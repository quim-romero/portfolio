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
    id: "novatech",
    title: "NovaTech Solutions",
    description:
      "Corporate SaaS site simulation with dynamic dashboards, real AI demos, and scalable architecture.",
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
  {
    id: "nebulaos",
    title: "NebulaOS",
    description:
      "Experimental microsite with GSAP, interactive console demo, and futuristic animations.",
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
    id: "visionary-gallery",
    title: "Visionary Gallery",
    description:
      "Immersive SPA for digital art with real-time filters, persistent favorites, and theme support.",
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
    id: "trackforge",
    title: "TrackForge",
    description:
      "Typed task management dashboard with real-time filters, productivity charts, and persistent settings.",
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
    id: "lumina",
    title: "Lumina",
    description:
      "Premium digital storefront with smooth animations, real Stripe checkout, and a validated contact form.",
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
];
