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
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    //this.aGrid.showNumbers();

    this.scene.launch("background");

    console.log(
      `${this.game.config.width} x ${this.game.config.height} - ${window.innerWidth} x ${window.innerHeight}`
    );

    const grid = this.add.image(
      window.innerWidth / 2,
      window.innerHeight * 0.35,
      "grid"
    );

    this.aGrid.placeAtIndex(49, grid);
    Align.scaleToGameW(grid, 0.4);

    await this.connect();

    this.room.state.draggables.onAdd((draggable: any, draggableId: string) => {
      const image = this.add
        .image(draggable.x, draggable.y, draggableId)
        .setInteractive();
      image.name = draggableId;
      this.aGrid.placeAtIndex(draggable.index, image);
      Align.scaleToGameW(image, 0.08);

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
    const client = new Client(`wss://${location.host}:3001/api/colyseus`);

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
