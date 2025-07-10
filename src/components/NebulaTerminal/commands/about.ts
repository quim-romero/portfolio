import type { CommandContext } from "../commandRouter";

export default function about(raw: string, ctx: CommandContext) {
  const baseId = Date.now();
  const open = raw.includes("--open");

  const intro = [
    "👋 Hey, I'm Quim Romero.",
    "Frontend Engineer obsessed with UX, functional design, and technical detail.",
    "",
    "🚀 Currently building interfaces that combine speed, aesthetics, and accessibility.",
    "🧠 Fan of design systems, intentional animation, and clean codebases.",
    "",
    "💡 Want to see what I do? Try `projects` or `scan skills`.",
  ];

  const history = [
    { id: baseId, text: `$ ${raw}` },
    ...intro.map((text, i) => ({
      id: baseId + i + 1,
      text,
    })),
  ];

  if (open) {
    setTimeout(() => {
      ctx.navigate("/about");
    }, 1200);

    history.push({
      id: baseId + intro.length + 1,
      text: "🌐 Opening: /about...",
    });
  }

  return {
    newHistory: history,
  };
}
