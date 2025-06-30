import { useEffect, useState } from "react";

export default function TypedLine({
  text,
  onDone,
}: {
  text: string;
  onDone?: () => void;
}) {
  const [visibleText, setVisibleText] = useState("");
  const [isDone, setIsDone] = useState(false);

  if (!text) return null;

  if (text.startsWith("$")) {
    if (!isDone) {
      setTimeout(() => {
        setIsDone(true);
        onDone?.();
      }, 10);
    }
    return <div className="whitespace-pre-wrap">{text}</div>;
  }

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setVisibleText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsDone(true);
        onDone?.();
      }
    }, 8);

    return () => clearInterval(interval);
  }, [text, onDone]);

  return (
    <div className="whitespace-pre-wrap">
      {visibleText}
      {!isDone && <span className="animate-pulse">|</span>}
    </div>
  );
}
