import { Scene } from "phaser";

export class Background extends Scene {
  constructor() {
    super("background");
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff);
    this.scene.sendToBack();

    const fridge_bg = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "fridge_bg"
    );
    let scaleX = this.cameras.main.width / fridge_bg.width - 0.2;
    let scaleY = this.cameras.main.height / fridge_bg.height - 0.2;
    let scale = Math.max(scaleX, scaleY);
    fridge_bg.setScale(scale).setScrollFactor(0);
  }
}
