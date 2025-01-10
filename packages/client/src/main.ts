import { ScaleFlow } from "./utils/ScaleFlow";
import { initiateDiscordSDK } from "./utils/discordSDK";

import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Background } from "./scenes/Background";

(async () => {
  initiateDiscordSDK();

  new ScaleFlow({
    type: Phaser.AUTO,
    parent: "gameParent",
    width: 1280, // this must be a pixel value
    height: 720, // this must be a pixel value
    backgroundColor: "#000000",
    roundPixels: false,
    pixelArt: false,
    scene: [Boot, Preloader, MainMenu, Game, Background],
  });
})();
