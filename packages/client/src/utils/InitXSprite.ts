import { LoadAtlas } from "./LoadAtlas";
import { LoadImage } from "./LoadImage";
import { LoadSpriteSheet } from "./LoadSpriteSheet";
import { ScaleFlow } from "./ScaleFlow";
import { XSprite } from "./XSprite";

export function InitXSprite() {
  Phaser.GameObjects.GameObjectFactory.register(
    "xsprite",
    function (
      x: number | string,
      y: number | string,
      texture: DynamicTextureConfig
    ) {
      const scene = this.scene;
      const sprite = new XSprite(scene, x, y, "__WHITE");

      ScaleFlow.addSprite(sprite);

      //  Does the texture exist in the Texture Manager?
      if (scene.textures.exists(texture.key)) {
        sprite.setTexture(texture.key, texture.frame);

        return this.displayList.add(sprite);
      } else {
        this.displayList.add(sprite);

        //  Load it
        const type = texture.type || "image";
        const key = texture.key;
        const frame = texture.frame;
        const url = texture.url;

        if (type === "image") {
          LoadImage(scene, key, `${url}`).then(() => {
            sprite.setTexture(key, frame);
          });
        } else if (type === "atlas") {
          LoadAtlas(scene, key, `${url}`, `${texture.atlasURL}`).then(() => {
            sprite.setTexture(key, frame);
          });
        } else if (type === "spritesheet") {
          LoadSpriteSheet(
            scene,
            key,
            `${url}`,
            texture.frameConfig as Phaser.Types.Loader.FileTypes.ImageFrameConfig
          ).then(() => {
            sprite.setTexture(key, frame);
          });
        }

        return sprite;
      }
    }
  );
}

export type DynamicTextureConfig = {
  key: string;
  type?: "image" | "atlas" | "spritesheet";
  url?: string;
  atlasURL?: string;
  frame?: string | number;
  frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
};
