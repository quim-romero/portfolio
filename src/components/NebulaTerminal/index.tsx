import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import TypedLine from "./TypedLine";
import { runCommand } from "./commandRouter";
import type { CommandResult } from "./commandRouter";

export default function NebulaTerminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [booting, setBooting] = useState(true);
  const [history, setHistory] = useState<{ id: number; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [missionMode, setMissionMode] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isGlitching, setIsGlitching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRecruiter = searchParams.get("recruiter") === "true";

  // Scroll to bottom
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  // Scroll on history change
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Boot messages
  useEffect(() => {
    if (!isOpen) return;
    setBooting(true);
    setHistory([]);

    const bootMessages = [
      "NOVA CHIPSET v3.9",
      "Memcheck... OK",
      "Mounting /nebula...",
      isRecruiter ? "👁️ Recruiter detected." : "User: Guest",
      "Loading UI modules...",
      "NebulaOS core ready.",
      "Type 'help' to begin.",
    ];

    bootMessages.forEach((line, i) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, { id: Date.now() + i, text: line }]);
        if (i === bootMessages.length - 1) setBooting(false);
      }, i * 700);
    });
  }, [isOpen]);

  // Focus input on history change
  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  // Theme listener
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const newTheme = e.detail.theme;
      if (typeof newTheme === "string") setTheme(newTheme);
    };
    window.addEventListener("nebula-theme-change", handler as EventListener);
    return () =>
      window.removeEventListener(
        "nebula-theme-change",
        handler as EventListener
      );
  }, []);

  // Glitch effect
  useEffect(() => {
    const handler = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 3000);
    };
    window.addEventListener("nebula-glitch-activate", handler);
    return () => window.removeEventListener("nebula-glitch-activate", handler);
  }, []);

  // Omega unlock
  useEffect(() => {
    const handler = () => {
      console.log("🔓 Omega Protocol Activated");
    };
    window.addEventListener("nebula-omega-unlock", handler);
    return () => window.removeEventListener("nebula-omega-unlock", handler);
  }, []);

  const appendHistoryWithDelay = (entries: { id: number; text: string }[]) => {
    let index = 0;
    const interval = setInterval(() => {
      setHistory((prev) => [...prev, entries[index]]);
      index++;
      if (index >= entries.length) clearInterval(interval);
    }, 120);
  };

  const handleCommand = (raw: string) => {
    const result: CommandResult = runCommand(raw, {
      missionMode,
      setMissionMode,
      navigate,
      closeTerminal: onClose,
    });

    appendHistoryWithDelay(result.newHistory);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) handleCommand(input);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={clsx(
          "w-full max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl border overflow-hidden flex flex-col font-mono",
          theme === "dark" && "bg-[#0d0d0d] text-green-400 border-green-700",
          theme === "light" && "bg-white text-black border-gray-300",
          theme === "matrix" && "bg-black text-[#00FF41] border-[#00FF41]",
          theme === "hacker" && "bg-gray-900 text-lime-400 border-lime-500",
          theme === "vaporwave" &&
            "bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white border-white",
          isGlitching && "animate-glitch"
        )}
      >
        {/* Terminal Output */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-2 text-sm sm:text-base"
        >
          <AnimatePresence initial={false}>
            {history.map((entry) => (
              <motion.div
                key={entry.id}
                className={`whitespace-pre-wrap ${
                  entry.text.includes("📜 Available commands")
                    ? "text-sm leading-tight"
                    : ""
                }`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <TypedLine text={entry.text} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Terminal Input */}
        {!booting && (
          <div className="border-t p-4 flex items-center">
            <span className="mr-2 text-green-500">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="bg-transparent outline-none flex-1 text-inherit caret-current"
            />
            <span className="ml-2 animate-pulse hidden sm:inline">|</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
