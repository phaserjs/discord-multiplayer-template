import { Scene } from "phaser";
import { Room, Client } from "colyseus.js";

export class Game extends Scene {
  room: Room;

  constructor() {
    super("Game");
  }

  async create() {
    this.cameras.main.setBackgroundColor(0x514f5a);

    await this.connect();

    this.room.state.letters.onAdd((letter: any, letterId: string) => {
      const image = this.add
        .image(letter.x, letter.y, letterId)
        .setInteractive();
      image.name = letterId;

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
        this.room.send("move", { imageId: letterId, x: image.x, y: image.y });
      });

      letter.onChange(() => {
        image.x = letter.x;
        image.y = letter.y;
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
