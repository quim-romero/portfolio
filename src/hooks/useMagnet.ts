import { useRef } from 'react';

export function useMagnet<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);

  const handleMouseMove = (e: React.MouseEvent<T>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: reset,
  };
}
