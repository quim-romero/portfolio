import { ReactNode } from 'react';
import Header from '../components/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-light text-text-base dark:bg-dark dark:text-text-light transition-colors duration-300">
      <Header />
      <main className="relative z-10 flex-grow">{children}</main>
    </div>
  );
}
