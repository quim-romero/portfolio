import type { CommandContext } from "../commandRouter";
import { projectDetails } from "../../../data/projectDetails";

export default function projects(raw: string, _ctx: CommandContext) {
  const id = Date.now();
  const [command, param] = raw.trim().split(" ");

  // General list of projects
  if (command === "projects") {
    const header = "📁 Available Projects:\n";

    const projectLines = projectDetails.map((project) => {
      return `- ${project.title} → open ${project.id}`;
    });

    return {
      newHistory: [
        { id, text: `$ ${raw}` },
        { id: id + 1, text: header },
        ...projectLines.map((text, i) => ({
          id: id + 2 + i,
          text,
        })),
      ],
    };
  }

  // Open specific project
  if (command === "open" && param) {
    const project = projectDetails.find((p) => p.id === param);

    if (!project) {
      return {
        newHistory: [
          { id, text: `$ ${raw}` },
          { id: id + 1, text: `❌ Project not found: "${param}"` },
        ],
      };
    }

    const lines = [
      `🔍 ${project.title}`,
      "",
      project.longDescription,
      "",
      `🛠 Tech: ${project.tech.join(", ")}`,
      `✨ Highlights:\n  - ${project.highlights.join("\n  - ")}`,
    ];

    if (project.liveUrl) {
      lines.push(`🌐 Live: ${project.liveUrl}`);
    }
    if (project.githubUrl) {
      lines.push(`📦 Code: ${project.githubUrl}`);
    }

    return {
      newHistory: [
        { id, text: `$ ${raw}` },
        ...lines.map((text, i) => ({
          id: id + 1 + i,
          text,
        })),
      ],
    };
  }

  return {
    newHistory: [
      { id, text: `$ ${raw}` },
      { id: id + 1, text: "❓ Command not recognized inside `projects`." },
    ],
  };
}
