import { useDarkMode } from '../hooks/DarkModeContext';

export default function HeroBackground() {
  const [isDark] = useDarkMode();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-30 animate-pulse
        -translate-x-1/2 -translate-y-1/2 transition-colors duration-700
        ${isDark ? 'bg-teal-400' : 'bg-sky-300'}`}
      />
    </div>
  );
}
