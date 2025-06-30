import type { CommandContext } from "../commandRouter";

export default function scanSkills(raw: string, ctx: CommandContext) {
  if (!ctx.missionMode) {
    return {
      newHistory: [
        { id: Date.now(), text: `$ ${raw}` },
        { id: Date.now() + 1, text: "⛔ This command requires: init mission" },
      ],
    };
  }

  const id = Date.now();
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
      { id, text: `$ ${raw}` },
      ...skillOutput.map((text, i) => ({
        id: id + i + 1,
        text,
      })),
    ],
  };
}
