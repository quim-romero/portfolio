import type { CommandContext } from "../commandRouter";

export default function sudoOverclock(raw: string, _ctx: CommandContext) {
  const baseId = Date.now();

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
      { id: baseId, text: `$ ${raw}` },
      ...lines.map((text, i) => ({
        id: baseId + i + 1,
        text,
      })),
    ],
  };
}
