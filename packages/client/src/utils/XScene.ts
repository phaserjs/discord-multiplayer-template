import { ScaleFlow } from "./ScaleFlow";

export class XScene extends Phaser.Scene {
  constructor(key: string) {
    super(key);
  }

  init() {
    ScaleFlow.addCamera(this.cameras.main);

    this.events.on("shutdown", this.shutdown, this);
  }

  shutdown() {
    ScaleFlow.removeCamera(this.cameras.main);
  }
}
