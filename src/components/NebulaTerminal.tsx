import { useEffect, useState, useRef } from "react";

export default function NebulaTerminal() {
  const [booting, setBooting] = useState(true);
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleCommand = (command: string) => {
    setLog((prev) => [...prev, `nebula> ${command}`]);
  };

  return (
    <div className="bg-black text-green-400 font-mono p-6 rounded-xl shadow-inner min-h-[400px] relative">
      {log.map((line, i) => (
        <p key={i} className="leading-relaxed">
          {line}
        </p>
      ))}
      {!booting && (
        <p className="mt-4">
          nebula&gt; <span className="text-white">{input}_</span>
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
