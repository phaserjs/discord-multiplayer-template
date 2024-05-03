import Phaser from "phaser";

export default class AlignGrid {
  private scene: Phaser.Scene;

  private config: any;
  private graphics: Phaser.GameObjects.Graphics;
  private cw: number;
  private ch: number;

  constructor(config: {
    scene: Phaser.Scene;
    rows?: number;
    cols?: number;
    height?: number | string;
    width?: number | string;
  }) {
    this.config = config;
    if (!config.scene) {
      console.log("missing scene");
      return;
    }
    if (!config.rows) {
      config.rows = 5;
    }
    if (!config.cols) {
      config.cols = 5;
    }

    this.scene = config.scene;

    //cell width
    this.cw = Number(this.scene.game.config.width) / config.cols;
    //cell height
    this.ch = Number(this.scene.game.config.height) / config.rows;

    console.log(this.scene);
    console.log(config.width, config.height);
    console.log(this.cw, this.ch);
  }

  show(): void {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);

    for (let i = 0; i < Number(this.scene.game.config.width); i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, Number(this.scene.game.config.height));
    }

    for (let i = 0; i < Number(this.scene.game.config.height); i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(Number(this.scene.game.config.width), i);
    }

    this.graphics.strokePath();
  }

  placeAt(xx: number, yy: number, obj: Phaser.GameObjects.Image): void {
    //calc position based upon the cellwidth and cellheight
    const x2 = this.cw * xx + this.cw / 2;
    const y2 = this.ch * yy + this.ch / 2;

    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index: number, obj: any): void {
    const yy = Math.floor(index / Number(this.config.cols));
    const xx = index - yy * Number(this.config.cols);

    this.placeAt(xx, yy, obj);
  }

  showNumbers(): void {
    this.show();
    let count = 0;
    for (let i = 0; i < Number(this.config.rows); i++) {
      for (let j = 0; j < Number(this.config.cols); j++) {
        const numText = this.scene.add.text(0, 0, `${count}`, {
          color: "#ff0000",
        });
        numText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numText);

        count++;
      }
    }
  }
}
