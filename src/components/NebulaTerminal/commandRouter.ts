import help from "./commands/help";
import initMission from "./commands/initMission";
import scanSkills from "./commands/scanSkills";
import submitResume from "./commands/submitResume";
import about from "./commands/about";
import projects from "./commands/projects";
import contact from "./commands/contact";
import sudoHireQuim from "./commands/sudoHireQuim";
import theme from "./commands/theme";
import sudoOverclock from "./commands/sudoOverclock";
import sudoHackRecruiter from "./commands/sudoHackRecruiter";

export type CommandResult = {
  newHistory: { id: number; text: string }[];
};

export type CommandContext = {
  missionMode: boolean;
  setMissionMode: (val: boolean) => void;
  navigate: (path: string) => void;
  closeTerminal: () => void;
};

type CommandHandler = (raw: string, ctx: CommandContext) => CommandResult;

export function runCommand(
  raw: string,
  context: CommandContext
): CommandResult {
  const command = raw.trim().toLowerCase();

  const commands: Record<string, CommandHandler> = {
    help,
    about,
    projects,
    contact,
    "sudo hire-quim": sudoHireQuim,
    "init mission": initMission,
    "scan skills": scanSkills,
    "submit resume": submitResume,
    "sudo overclock": sudoOverclock,
    "sudo hack-recruiter": sudoHackRecruiter,
    theme,
    exit: (raw, ctx) => {
      setTimeout(() => ctx.closeTerminal(), 1000);
      return {
        newHistory: [
          { id: Date.now(), text: `$ ${raw}` },
          {
            id: Date.now() + 1,
            text: "🛑 Exiting terminal. Returning to safe mode...",
          },
        ],
      };
    },
  };

  if (command.startsWith("open ")) {
    return projects(raw, context);
  }

  if (command.startsWith("theme ")) {
    return theme(raw, context);
  }

  if (commands[command]) {
    return commands[command](raw, context);
  }

  return {
    newHistory: [
      { id: Date.now(), text: `$ ${raw}` },
      { id: Date.now() + 1, text: `❌ Unknown command: "${raw}"` },
    ],
  };
}
