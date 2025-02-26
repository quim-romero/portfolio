import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NebulaTerminal() {
  const [booting, setBooting] = useState(true);
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

    const commands: Record<string, () => void> = {
      help: () =>
        setLog((prev) => [
          ...prev,
          "Available commands:",
          "- about",
          "- projects",
          "- contact",
          "- clear",
          "- ascii",
          "- sudo",
        ]),
      clear: () => setLog([]),
      about: () => navigate("/about"),
      projects: () => navigate("/projects"),
      contact: () => navigate("/contact"),
    };

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
    <div className="bg-black text-green-400 font-mono p-6 rounded-xl shadow-inner min-h-[400px] relative">
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
