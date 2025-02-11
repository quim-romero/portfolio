import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-light text-text-base dark:bg-dark dark:text-text-light transition-colors duration-300">
      <main className="relative z-10">{children}</main>
    </div>
  );
}
