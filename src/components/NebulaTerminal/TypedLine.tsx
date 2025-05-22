import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  onDone?: () => void;
  stepMs?: number;
};

export default function TypedLine({ text, onDone, stepMs = 8 }: Props) {
  const [visibleText, setVisibleText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const doneCalledRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  if (!text) return null;

  const callDoneOnce = () => {
    if (!doneCalledRef.current) {
      doneCalledRef.current = true;
      onDone?.();
    }
  };

  useEffect(() => {
    setVisibleText("");
    setIsDone(false);
    doneCalledRef.current = false;

    if (text.startsWith("$")) {
      setVisibleText(text);
      setIsDone(true);
      callDoneOnce();
      return;
    }

    let index = 0;
    intervalRef.current = window.setInterval(() => {
      if (index < text.length) {
        setVisibleText((prev) => prev + text.charAt(index));
        index++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsDone(true);
        callDoneOnce();
      }
    }, stepMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, stepMs]);

  return (
    <div className="whitespace-pre-wrap">
      {visibleText}
      {!isDone && <span className="animate-pulse">|</span>}
    </div>
  );
}
