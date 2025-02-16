export type ProjectDetail = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: { light: string; dark: string };
  preview?: { light: string; dark: string };
  tech: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
};
