import { ProjectDetail } from '../types';

export const projectDetails: ProjectDetail[] = [
  {
    id: 'novatech',
    title: 'NovaTech Solutions',
    description: 'Corporate SaaS site simulation with dashboards, AI demos and scalable architecture.',
    longDescription:
      'NovaTech is a corporate SaaS simulation featuring protected routes, animated dashboards, a functional blog, and forms — wrapped in a polished UI with dark mode and motion UX.',
    image: {
      light: '/projects/novatech-light.png',
      dark: '/projects/novatech-dark.png',
    },
    preview: {
      light: '/previews/novatech-light.webm',
      dark: '/previews/novatech-dark.webm',
    },
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Zustand', 'EmailJS'],
    highlights: [
      'Multipage architecture with semantic routing',
      'Animated dashboards with real-time data',
      'Validated contact form with Yup + React Hook Form',
      'SEO-ready with Helmet + metadata',
      'Dark/light theme with persistence',
      'AI sentiment analysis demo',
    ],
    liveUrl: 'https://novatech.quimromero.com',
    githubUrl: 'https://github.com/quim-romero/novatech',
  },
];
