import type { CommandContext } from "../commandRouter";

export default function scanSkills(raw: string, ctx: CommandContext) {
  const baseId = Date.now();

  if (!ctx.missionMode) {
    return {
      newHistory: [
        { id: baseId, text: `$ ${raw}` },
        { id: baseId + 1, text: "⛔ This command requires: init mission" },
      ],
    };
  }

  const skillOutput = [
    "🔍 Scanning skillset...",
    "🧠 Core: JavaScript | TypeScript | React | Next.js",
    "🎨 UI: TailwindCSS | Framer Motion | CSS Architecture",
    "🧰 Tooling: Vite | Webpack | Git | ESLint | Prettier",
    "🌐 APIs: REST | GraphQL | Firebase",
    "🧪 Testing: Vitest | Cypress | Jest (basic)",
    "✅ Soft Skills: Communication, UX-thinking, Fast-learning",
    "✔️ Scan complete.",
  ];

  return {
    newHistory: [
      { id: baseId, text: `$ ${raw}` },
      ...skillOutput.map((text, i) => ({
        id: baseId + i + 1,
        text,
      })),
    ],
  };
}
