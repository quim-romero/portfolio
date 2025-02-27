export default {
  helpIntro: 'Available commands:',
  denied: '⛔ Access denied. You are not root.',
  notFound: (cmd: string) => `Unknown command: "${cmd}" (type 'help')`,
  whoami: 'I’m Quim Romero, frontend developer with product focus. ✨',
  themeChanged: (mode: string) => `Theme changed to: ${mode}`,
  unknownTheme: 'Unknown theme. Try "theme hacker" or "theme default".',
  ascii: ['____   ___', '\\__ \\ / _ \\', ' /_/ / (_) |', '|____/\\___/', ''],
};
