import { Client, Room } from "colyseus";
import { GameState, Letters } from "../schemas/GameState";

export class GameRoom extends Room<GameState> {
  maxClients = 25; // Current Discord limit is 25

  onCreate(options: any): void | Promise<any> {
    this.setState(new GameState());

    const alphabet = "abcde"; // fghijklmnopqrstuvwxyz
    alphabet.split("").forEach((letter, index) => {
      const letterObject = new Letters();

      const offset = 100;
      const minWidth = offset;
      const maxWidth = options.screenWidth - offset;
      const minHeight = offset;
      const maxHeight = options.screenHeight - offset;

      letterObject.x =
        Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
      letterObject.y =
        Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
      letterObject.imageId = letter;

      this.state.letters.set(letter, letterObject);
    });

    this.onMessage("move", (client, message) => {
      // Update image position based on data received
      const image = this.state.letters.get(message.imageId);
      if (image) {
        image.x = message.x;
        image.y = message.y;
        this.broadcast("move", this.state.letters);
      }
    });
  }

  onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
    console.log(`Client joined: ${client.sessionId}`);
  }

  onLeave(client: Client, consented: boolean): void | Promise<any> {
    console.log(`Client left: ${client.sessionId}`);
  }
}
