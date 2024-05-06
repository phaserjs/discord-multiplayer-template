import { Scene } from "phaser";
import { Room, Client } from "colyseus.js";
import AlignGrid from "../utils/alignGrid";
import Align from "../utils/align";

export class Game extends Scene {
  room: Room;
  aGrid: AlignGrid;

  constructor() {
    super("Game");
  }

  async create() {
    this.scene.launch("background");

    const grid = this.add.image(
      this.cameras.main.width * 0.5,
      this.cameras.main.height * 0.4,
      "grid"
    );
    grid.setScale(0.6);

    await this.connect();

    this.room.state.draggables.onAdd((draggable: any, draggableId: string) => {
      const image = this.add
        .image(draggable.x, draggable.y, draggableId)
        .setInteractive();
      image.name = draggableId;
      image.setScale(0.8);

      this.input.setDraggable(image);
      image.on("drag", (pointer, dragX, dragY) => {
        if (!this.room) {
          return;
        }

        // Clamp drag position to screen bounds
        image.x = Phaser.Math.Clamp(
          dragX,
          image.displayWidth / 2,
          Number(this.game.config.width) - image.displayWidth / 2
        );
        image.y = Phaser.Math.Clamp(
          dragY,
          image.displayHeight / 2,
          Number(this.game.config.height) - image.displayHeight / 2
        );

        // Send position update to the server
        this.room.send("move", {
          imageId: draggableId,
          x: image.x,
          y: image.y,
        });
      });

      draggable.onChange(() => {
        image.x = draggable.x;
        image.y = draggable.y;
      });
    });
  }

  async connect() {
    // For development on local: `ws://localhost:3001`
    // wss://${location.host}:3001/api/colyseus
    console.log(location.host);
    const client = new Client(`ws://localhost:3001`);

    try {
      this.room = await client.joinOrCreate("game", {
        // Let's send our client screen dimensions to the server for initial positioning
        screenWidth: this.game.config.width,
        screenHeight: this.game.config.height,
      });

      this.room.onMessage("move", (message) => {
        //console.log("Move message received:", message);
      });

      console.log("Successfully connected!");
    } catch (e) {
      console.log(`Could not connect with the server: ${e}`);
    }
  }
}
