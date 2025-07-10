import type { CommandContext } from "../commandRouter";

export default function submitResume(raw: string, ctx: CommandContext) {
  const baseId = Date.now();

  if (!ctx.missionMode) {
    return {
      newHistory: [
        { id: baseId, text: `$ ${raw}` },
        { id: baseId + 1, text: "⛔ This command requires: init mission" },
      ],
    };
  }

  return {
    newHistory: [
      { id: baseId, text: `$ ${raw}` },
      { id: baseId + 1, text: "📤 Submitting resume..." },
      { id: baseId + 2, text: "✅ Resume uploaded successfully." },
      {
        id: baseId + 3,
        text: "📎 Download here: https://quimromero.com/about",
      },
    ],
  };
}
