import type { CommandContext } from "../commandRouter";

export default function initMission(raw: string, ctx: CommandContext) {
  ctx.setMissionMode(true);

  return {
    newHistory: [
      { id: Date.now(), text: `$ ${raw}` },
      { id: Date.now() + 1, text: "🎮 MISSION: Convince the recruiter." },
      { id: Date.now() + 2, text: "Commands enabled:" },
      {
        id: Date.now() + 3,
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
