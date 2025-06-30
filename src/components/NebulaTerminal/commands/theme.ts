import type { CommandContext } from "../commandRouter";

const supportedThemes = ["dark", "light", "matrix", "hacker", "vaporwave"];

export default function theme(raw: string, _ctx: CommandContext) {
  const id = Date.now();
  const parts = raw.trim().split(" ");
  const subcommand = parts[1];

  // If no subcommand → show theme options
  if (!subcommand) {
    const lines = [
      "🎨 Theme selection:",
      "",
      "Available themes:",
      ...supportedThemes.map((theme) => ` - ${theme}`),
      "",
      "To apply a theme, use: theme [mode]  → e.g. theme matrix",
    ];

    return {
      newHistory: [
        { id, text: `$ ${raw}` },
        ...lines.map((text, i) => ({ id: id + i + 1, text })),
      ],
    };
  }

  // If invalid theme
  if (!supportedThemes.includes(subcommand)) {
    return {
      newHistory: [
        { id, text: `$ ${raw}` },
        {
          id: id + 1,
          text: `❌ Unknown theme: "${subcommand}". Use just "theme" to see options.`,
        },
      ],
    };
  }

  // Dispatch valid theme
  const event = new CustomEvent("nebula-theme-change", {
    detail: { theme: subcommand },
  });
  window.dispatchEvent(event);

  return {
    newHistory: [
      { id, text: `$ ${raw}` },
      {
        id: id + 1,
        text: `🌈 Theme changed to "${subcommand}". Looking good!`,
      },
    ],
  };
}
