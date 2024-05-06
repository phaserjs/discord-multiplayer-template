import { Scene } from "phaser";

export class Background extends Scene {
  constructor() {
    super("background");
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);
    this.scene.sendToBack();

    const fridge_bg = this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      "fridge_bg"
    );
    fridge_bg.setScale(0.4);
  }
}
