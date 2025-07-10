import type { CommandContext } from "../commandRouter";

export default function help(raw: string, _ctx: CommandContext) {
  const helpText = [
    "📜 Available commands:\n",
    "─ Navigation:",
    "   open nebulaos     open novatech",
    "   open visionary    open trackforge",
    "",
    "─ General:",
    "   help              about",
    "   projects          contact",
    "   exit              theme",
    "",
    "─ Terminal only:",
    "   sudo hire-quim    sudo overclock",
    "",
    "─ Mission mode (after init mission):",
    "   init mission      scan skills",
    "   submit resume     ascii quim",
    "   sudo hack-recruiter",
  ];

  const baseId = Date.now();

  return {
    newHistory: [
      { id: baseId, text: `$ ${raw}` },
      ...helpText.map((text, i) => ({
        id: baseId + i + 1,
        text,
      })),
    ],
  };
}
