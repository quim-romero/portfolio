import type { CommandContext } from "../commandRouter";

export default function initMission(raw: string, ctx: CommandContext) {
  ctx.setMissionMode(true);

  const baseId = Date.now();

  return {
    newHistory: [
      { id: baseId, text: `$ ${raw}` },
      { id: baseId + 1, text: "🎮 MISSION: Convince the recruiter." },
      { id: baseId + 2, text: "Commands enabled:" },
      {
        id: baseId + 3,
        text: [
          "- scan skills",
          "- submit resume",
          "- ascii quim",
          "- sudo hack-recruiter",
        ].join("\n"),
      },
    ],
  };
}
