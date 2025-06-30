import type { CommandContext } from "../commandRouter";

export default function sudoHackRecruiter(raw: string, ctx: CommandContext) {
  const id = Date.now();

  if (!ctx.missionMode) {
    return {
      newHistory: [
        { id, text: `$ ${raw}` },
        {
          id: id + 1,
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
      { id, text: `$ ${raw}` },
      ...output.map((line, i) => ({
        id: id + i + 1,
        text: line,
      })),
    ],
  };
}
