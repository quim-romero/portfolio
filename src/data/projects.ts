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
    id: 'novatech',
    title: 'NovaTech Solutions',
    description: 'Corporate SaaS site simulation with dynamic dashboards, real AI demos, and scalable architecture.',
    image: {
      light: '/projects/novatech-light.png',
      dark: '/projects/novatech-dark.png',
    },
    preview: {
      light: '/previews/novatech-light.webm',
      dark: '/previews/novatech-dark.webm',
    },
    liveUrl: 'https://novatech.quimromero.com',
    githubUrl: 'https://github.com/quim-romero/novatech',
  },
  {
    id: 'visionary-gallery',
    title: 'Visionary Gallery',
    description: 'Immersive SPA for digital art with real-time filters, persistent favorites, and theme support.',
    image: {
      light: '/projects/visionary-light.png',
      dark: '/projects/visionary-dark.png',
    },
    preview: {
      light: '/previews/visionary-light.webm',
      dark: '/previews/visionary-dark.webm',
    },
    liveUrl: 'https://visionary.quimromero.com',
    githubUrl: 'https://github.com/quim-romero/visionary',
  },
];
