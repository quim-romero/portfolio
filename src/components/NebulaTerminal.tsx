import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/LanguageProvider";
import { t } from "../i18n/translations";

type CommandMap = Record<string, () => void>;

const createCommands = (
  setLog: React.Dispatch<React.SetStateAction<string[]>>,
  navigate: ReturnType<typeof useNavigate>,
  lang: string
): CommandMap => ({
  help: () =>
    setLog((prev) => [
      ...prev,
      t("terminal", "helpIntro", lang),
      "- about",
      "- projects",
      "- contact",
      "- clear",
      "- ascii",
      "- sudo",
      "- whoami",
    ]),
  clear: () => setLog([]),
  about: () => navigate("/about"),
  projects: () => navigate("/projects"),
  contact: () => navigate("/contact"),
  sudo: () =>
    setLog((prev) => [
      ...prev,
      "Nice try. That only works in real terminals 🫠",
    ]),
  ascii: () => {
    const art = [
      " _   _      _          _           ",
      "| \\ | | ___| |__   ___| | ___  ___ ",
      "|  \\| |/ _ \\ '_ \\ / _ \\ |/ _ \\/ __|",
      "| |\\  |  __/ |_) |  __/ |  __/\\__ \\",
      "|_| \\_|\\___|_.__/ \\___|_|\\___||___/",
    ];
    setLog((prev) => [...prev, ...art]);
  },
  whoami: () => setLog((prev) => [...prev, t("terminal", "whoami", lang)]),
});

export default function NebulaTerminal() {
  const [booting, setBooting] = useState(true);
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<"default" | "hacker">("default");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const commands = createCommands(setLog, navigate, lang);

  useEffect(() => {
    const bootMessages = [
      "booting nebulaOS...",
      "loading modules...",
      "mounting personality core...",
      "establishing interface...",
      "ready.",
    ];

    bootMessages.forEach((msg, i) => {
      setTimeout(() => {
        setLog((prev) => [...prev, msg]);
        if (i === bootMessages.length - 1) setBooting(false);
      }, 500 * (i + 1));
    });
  }, []);

  useEffect(() => {
    if (!booting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [booting]);

  function handleCommand(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    setLog((prev) => [...prev, `nebula> ${cmd}`]);

    if (commands[trimmed]) {
      commands[trimmed]();
    } else {
      setLog((prev) => [
        ...prev,
        `Unknown command: "${trimmed}" (type 'help')`,
      ]);
    }
  }

  return (
    <div
      className={`font-mono p-6 rounded-xl shadow-inner min-h-[400px] overflow-y-auto ${
        theme === "hacker"
          ? "bg-black text-green-400"
          : "bg-zinc-900 text-white border border-zinc-700"
      }`}
    >
      {log.map((line, i) => (
        <p key={i} className="leading-relaxed">
          {line}
        </p>
      ))}
      {!booting && (
        <p className="mt-4">
          nebula&gt; <span className="text-white">{input}</span>
          <span className="animate-pulse">█</span>
        </p>
      )}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
          }
        }}
        className="absolute opacity-0 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
