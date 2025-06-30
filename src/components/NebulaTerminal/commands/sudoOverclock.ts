import type { CommandContext } from "../commandRouter";

export default function sudoOverclock(raw: string, _ctx: CommandContext) {
  const id = Date.now();

  const event = new CustomEvent("nebula-glitch-activate");
  window.dispatchEvent(event);

  const lines = [
    "⚡ Initiating overclock sequence...",
    "🔧 Bypassing animation throttle...",
    "💥 Visual override: enabled.",
    "",
    "⏱ Terminal speed boosted. Effects temporary.",
  ];

  return {
    newHistory: [
      { id, text: `$ ${raw}` },
      ...lines.map((text, i) => ({
        id: id + 1 + i,
        text,
      })),
    ],
  };
}
