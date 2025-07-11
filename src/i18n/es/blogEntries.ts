import portfolioDesignContent from './blog/portfolio-design';
import freelanceServicesContent from './blog/freelance-services';
import myProcessContent from './blog/my-process-from-start-to-finish';
import whatToExpectContent from './blog/what-to-expect-working-with-me';

export type BlogEntry = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
};

export const esBlogEntries: Record<string, BlogEntry> = {
  'portfolio-design': {
    title: 'Diseñado para impactar: decisiones detrás de mi portafolio',
    description: 'El porqué detrás de cada decisión de diseño en mi portafolio como desarrollador.',
    date: '2025-07-21',
    tags: ['portafolio', 'diseño', 'pensamiento de producto', 'ux'],
    content: portfolioDesignContent,
  },
  'freelance-services': {
    title: 'Servicios freelance: qué ofrezco y cómo trabajar conmigo',
    description:
      '¿Buscas apoyo frontend? Aquí explico qué servicios ofrezco, cómo suelo trabajar y cómo podemos colaborar.',
    date: '2025-07-22',
    tags: ['freelance', 'servicios', 'colaboración', 'clientes'],
    content: freelanceServicesContent,
  },
  'my-process-from-start-to-finish': {
    title: 'Mi proceso real: cómo enfrento un proyecto de principio a fin',
    description: 'Un vistazo a cómo trabajo cuando construyo un proyecto frontend como freelance.',
    date: '2025-07-23',
    tags: ['freelance', 'flujo de trabajo', 'producto', 'cliente'],
    content: myProcessContent,
  },
  'what-to-expect-working-with-me': {
    title: 'Qué esperar al trabajar conmigo: foco, calidad y claridad',
    description:
      'Una mirada honesta sobre cómo trabajo, qué valoro y qué puedes esperar si colaboramos.',
    date: '2025-07-24',
    tags: ['freelance', 'mentalidad', 'colaboración', 'soft-skills'],
    content: whatToExpectContent,
  },
};
