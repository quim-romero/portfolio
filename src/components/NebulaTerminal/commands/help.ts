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

  return {
    newHistory: [
      { id: Date.now(), text: `$ ${raw}` },
      ...helpText.map((text) => ({
        id: Date.now() + Math.random(),
        text,
      })),
    ],
  };
}
