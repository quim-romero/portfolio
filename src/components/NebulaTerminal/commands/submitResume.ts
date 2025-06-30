import type { CommandContext } from "../commandRouter";

export default function submitResume(raw: string, ctx: CommandContext) {
  if (!ctx.missionMode) {
    return {
      newHistory: [
        { id: Date.now(), text: `$ ${raw}` },
        { id: Date.now() + 1, text: "⛔ This command requires: init mission" },
      ],
    };
  }

  const id = Date.now();

  return {
    newHistory: [
      { id, text: `$ ${raw}` },
      { id: id + 1, text: "📤 Submitting resume..." },
      { id: id + 2, text: "✅ Resume uploaded successfully." },
      {
        id: id + 3,
        text: "📎 Download here: https://quimromero.com/about",
      },
    ],
  };
}
