export default {
  helpIntro: 'Comandos disponibles:',
  denied: '⛔ Acceso denegado. No eres root.',
  notFound: (cmd: string) => `Comando desconocido: "${cmd}" (escribe 'help')`,
  whoami: 'Soy Quim Romero, frontend product-focused. ✨',
  themeChanged: (mode: string) => `Tema cambiado a: ${mode}`,
  unknownTheme: 'Tema no reconocido. Usa "theme hacker" o "theme default"',
  ascii: ['██████╗ ', '██╔══██╗', '██████╔╝', '██╔═══╝ ', '██║     ', '╚═╝     '],
};
