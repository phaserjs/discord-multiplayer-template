import Phaser from "phaser";

class Align {
  public static scaleToGameW(obj: Phaser.GameObjects.Image, per: number): void {
    obj.displayWidth = (obj.scene.game.config.width as number) * per;
    obj.scaleY = obj.scaleX;
  }

  public static centerH(obj: Phaser.GameObjects.Image): void {
    obj.x = (obj.scene.game.config.width as number) / 2 - obj.displayWidth / 2;
  }

  public static centerV(obj: Phaser.GameObjects.Image): void {
    obj.y =
      (obj.scene.game.config.height as number) / 2 - obj.displayHeight / 2;
  }

  public static center2(obj: Phaser.GameObjects.Image): void {
    Align.centerH(obj);
    Align.centerV(obj);
  }

  public static center(obj: Phaser.GameObjects.Image): void {
    obj.x = (obj.scene.game.config.width as number) / 2;
    obj.y = (obj.scene.game.config.height as number) / 2;
  }
}

export default Align;
