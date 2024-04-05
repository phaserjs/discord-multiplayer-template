import { DiscordSDK } from "@discord/embedded-app-sdk";

import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

// Instantiate the SDK
// Uncomment this once your work is done on browser, it will ONLY work on Discord Activities
/* const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
setupDiscordSdk().then(() => {
  console.log("Discord SDK is ready");
}).catch((error) => {
  console.log(error);
});
async function setupDiscordSdk() {
  await discordSdk.ready();
} */

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
      Boot,
      Preloader,
      MainMenu,
      Game,
      GameOver
    ]
};

new Phaser.Game(config);