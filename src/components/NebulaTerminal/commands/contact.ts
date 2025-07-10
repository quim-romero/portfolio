import type { CommandContext } from "../commandRouter";

export default function contact(raw: string, _ctx: CommandContext) {
  const baseId = Date.now();

  const contactLines = [
    "📬 Let’s connect!",
    "",
    "📧 Email: quim@quimromero.com",
    "🔗 LinkedIn: https://linkedin.com/in/quimromero",
    "🐙 GitHub: https://github.com/quim-romero",
    "🌐 Portfolio: https://quimromero.com",
    "",
    "💬 Tip: You can also run `submit resume` or `sudo hire-quim` if you’re a recruiter.",
  ];

  return {
    newHistory: [
      { id: baseId, text: `$ ${raw}` },
      ...contactLines.map((text, i) => ({
        id: baseId + i + 1,
        text,
      })),
    ],
  };
}
