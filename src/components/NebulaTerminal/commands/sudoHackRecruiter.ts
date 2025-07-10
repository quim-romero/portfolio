import type { CommandContext } from "../commandRouter";

export default function sudoHackRecruiter(raw: string, ctx: CommandContext) {
  const baseId = Date.now();

  if (!ctx.missionMode) {
    return {
      newHistory: [
        { id: baseId, text: `$ ${raw}` },
        {
          id: baseId + 1,
          text: "⛔ This command requires: init mission",
        },
      ],
    };
  }

  const output = [
    "🧠 Establishing recruiter network connection...",
    "📡 Spoofing LinkedIn authentication...",
    "🕶️ Injecting custom CV payload...",
    "",
    "🎯 Targets acquired:",
    " - Meta recruiter → responding with 🚀 emoji",
    " - Spotify recruiter → typing...",
    " - Vercel recruiter → sent confetti",
    "",
    "💌 Incoming offers:",
    ' - "We loved your portfolio!"',
    ' - "How soon can you start?"',
    "",
    "✅ Operation successful. Recruiters mildly hacked 😎",
  ];

  return {
    newHistory: [
      { id: baseId, text: `$ ${raw}` },
      ...output.map((line, i) => ({
        id: baseId + i + 1,
        text: line,
      })),
    ],
  };
}
