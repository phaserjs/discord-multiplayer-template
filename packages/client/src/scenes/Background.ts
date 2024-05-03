import { Scene } from "phaser";
import AlignGrid from "../utils/alignGrid";
import Align from "../utils/align";

export class Background extends Scene {
  aGrid: AlignGrid;
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

    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    this.aGrid.placeAtIndex(60, fridge_bg);
    Align.scaleToGameW(fridge_bg, 0.75);
  }
}
