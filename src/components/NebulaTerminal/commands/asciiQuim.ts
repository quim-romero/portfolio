import type { CommandContext } from "../commandRouter";

export default function asciiQuim(raw: string, ctx: CommandContext) {
  if (!ctx.missionMode) {
    return {
      newHistory: [
        { id: Date.now(), text: `$ ${raw}` },
        { id: Date.now() + 1, text: "⛔ This command requires: init mission" },
      ],
    };
  }

  const id = Date.now();

  /* eslint-disable no-useless-escape */
  const asciiArt = `

 $$$$$$\            $$\                     $$$$$$$\                                                        
$$  __$$\           \__|                    $$  __$$\                                                       
$$ /  $$ |$$\   $$\ $$\ $$$$$$\$$$$\        $$ |  $$ | $$$$$$\  $$$$$$\$$$$\   $$$$$$\   $$$$$$\   $$$$$$\  
$$ |  $$ |$$ |  $$ |$$ |$$  _$$  _$$\       $$$$$$$  |$$  __$$\ $$  _$$  _$$\ $$  __$$\ $$  __$$\ $$  __$$\ 
$$ |  $$ |$$ |  $$ |$$ |$$ / $$ / $$ |      $$  __$$< $$ /  $$ |$$ / $$ / $$ |$$$$$$$$ |$$ |  \__|$$ /  $$ |
$$ $$\$$ |$$ |  $$ |$$ |$$ | $$ | $$ |      $$ |  $$ |$$ |  $$ |$$ | $$ | $$ |$$   ____|$$ |      $$ |  $$ |
\$$$$$$ / \$$$$$$  |$$ |$$ | $$ | $$ |      $$ |  $$ |\$$$$$$  |$$ | $$ | $$ |\$$$$$$$\ $$ |      \$$$$$$  |
 \___$$$\  \______/ \__|\__| \__| \__|      \__|  \__| \______/ \__| \__| \__| \_______|\__|       \______/ 
     \___|                                                                                                  


    Frontend Strategist
  `;
  /* eslint-disable no-useless-escape */

  return {
    newHistory: [
      { id, text: `$ ${raw}` },
      { id: id + 1, text: asciiArt },
    ],
  };
}
