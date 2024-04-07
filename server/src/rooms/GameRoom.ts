import { Client, ClientArray, Room } from "colyseus";
import { GameState, Letters } from "../schemas/GameState";

export class GameRoom extends Room<GameState> {
  maxClients = 25; // Current Discord limit is 25

  onCreate(options: any): void | Promise<any> {
    this.setState(new GameState());

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet.split("").forEach((letter, index) => {
      const letterObject = new Letters();
      letterObject.x = Math.random() * 400;
      letterObject.y = Math.random() * 400;
      letterObject.imageId = letter;

      this.state.letters.set(letter, letterObject);
    });

    this.onMessage("move", (client, message) => {
      // Update image position based on data received
      // For simplicity, data contains {imageId, x, y}
      const image = this.state.letters.get(message.imageId); // client.sessionId
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
