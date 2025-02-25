import { useEffect, useState } from 'react';

export default function NebulaTerminal() {
  const [booting, setBooting] = useState(true);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const bootMessages = [
      'booting nebulaOS...',
      'loading modules...',
      'mounting personality core...',
      'establishing interface...',
      'ready.',
    ];

    bootMessages.forEach((msg, i) => {
      setTimeout(() => {
        setLog((prev) => [...prev, msg]);
        if (i === bootMessages.length - 1) setBooting(false);
      }, 500 * (i + 1));
    });
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono p-6 rounded-xl shadow-inner min-h-[400px]">
      {log.map((line, i) => (
        <p key={i} className="leading-relaxed">
          {line}
        </p>
      ))}
      {!booting && <p className="mt-4">nebula&gt; <span className="text-white">|</span></p>}
    </div>
  );
}
