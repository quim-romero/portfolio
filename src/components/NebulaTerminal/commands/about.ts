import type { CommandContext } from "../commandRouter";

export default function about(raw: string, ctx: CommandContext) {
  const id = Date.now();
  const open = raw.includes("--open");

  const intro = [
    "👋 Hola, soy Quim Romero.",
    "Frontend Engineer obsesionado con la experiencia de usuario, el diseño funcional y el detalle técnico.",
    "",
    "🚀 Actualmente trabajando en interfaces web que combinan velocidad, estética y accesibilidad.",
    "🧠 Fan del diseño de sistemas, animaciones con intención y codebase limpias.",
    "",
    "💡 Si quieres ver lo que hago: escribe `projects` o `scan skills`.",
  ];

  const history = [
    { id, text: `$ ${raw}` },
    ...intro.map((text, i) => ({
      id: id + i + 1,
      text,
    })),
  ];

  if (open) {
    setTimeout(() => {
      ctx.navigate("/about");
    }, 1200);

    history.push({
      id: id + intro.length + 1,
      text: "🌐 Abriendo: /about...",
    });
  }

  return {
    newHistory: history,
  };
}
