import { Scene } from "phaser";
import { Room, Client, getStateCallbacks } from "colyseus.js";
import { getUserName } from "../utils/discordSDK";

export class Game extends Scene {
  room: Room;

  constructor() {
    super("Game");
  }

  async create() {
    this.scene.launch("background");

    const grid = this.add.image(this.cameras.main.width * 0.5, this.cameras.main.height * 0.4, "grid");
    grid.setScale(0.6);

    await this.connect();

    const $ = getStateCallbacks(this.room);

    $(this.room.state).draggables.onAdd((draggable: any, draggableId: string) => {
      const image = this.add.image(draggable.x, draggable.y, draggableId).setInteractive();
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

      $(draggable).onChange(() => {
        image.x = draggable.x;
        image.y = draggable.y;
      });
    });

    this.add
      .text(this.cameras.main.width * 0.5, this.cameras.main.height * 0.95, `Connected as: ${getUserName()}`, {
        font: "14px Arial",
        color: "#000000",
      })
      .setOrigin(0.5);
  }

  async connect() {
    const url =
      location.host === "localhost:3000" ? `ws://localhost:3001` : `wss://${location.host}/.proxy/api/colyseus`;

    const client = new Client(`${url}`);

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
