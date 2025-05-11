import { useDarkMode } from "../hooks/DarkModeContext";

export default function HeroBackground() {
  const [isDark] = useDarkMode();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-30 animate-pulse 
        -translate-x-1/2 -translate-y-1/2 transition-colors duration-700
        ${isDark ? "bg-teal-400" : "bg-sky-300"}`}
      />

      <div
        className={`absolute top-[20%] left-[-100px] w-[300px] h-[300px] rounded-full blur-[120px] opacity-20 
        animate-float transition-colors duration-700
        ${isDark ? "bg-indigo-500" : "bg-rose-300"}`}
      />

      <div
        className={`absolute bottom-[10%] right-[-80px] w-[280px] h-[280px] rounded-full blur-[120px] opacity-20 
        animate-float-reverse transition-colors duration-700
        ${isDark ? "bg-purple-600" : "bg-orange-300"}`}
      />
    </div>
  );
}
