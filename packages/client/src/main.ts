import { DiscordSDK } from "@discord/embedded-app-sdk";

import { ScaleFlow } from "./utils/ScaleFlow";

import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Background } from "./scenes/Background";

// Instantiate the SDK
// Uncomment this once your work is done on browser, it will ONLY work on Discord Activities
/* const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
setupDiscordSdk()
  .then(() => {
    console.log("Discord SDK is ready");
  })
  .catch((error) => {
    console.log(error);
  });
async function setupDiscordSdk() {
  await discordSdk.ready();
} */

(async () => {
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
