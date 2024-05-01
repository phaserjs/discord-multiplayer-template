import { Scene } from "phaser";
import { Room, Client } from "colyseus.js";

export class Game extends Scene {
  room: Room;

  constructor() {
    super("Game");
  }

  async create() {
    this.scene.launch("background");

    const grid = this.add.image(
      window.innerWidth / 2,
      window.innerHeight * 0.75,
      "grid"
    );
    grid.setScale(0.5);

    await this.connect();

    let c = 0;
    this.room.state.draggables.onAdd((draggable: any, draggableId: string) => {
      c++;
      console.log(c);
      const image = this.add
        .image(draggable.x, draggable.y, draggableId)
        .setInteractive();
      image.setScale(0.75);
      image.name = draggableId;

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
    const url =
      import.meta.env.MODE === "development"
        ? "ws://localhost:3001"
        : `wss://${location.host}:3001/api/colyseus`;
    const client = new Client(url);

    try {
      this.room = await client.joinOrCreate("game", {
        // Let's send our client screen dimensions to the server for initial positioning
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
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
