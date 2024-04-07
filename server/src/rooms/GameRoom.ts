import { Client, Room } from "colyseus";
import { GameState, Letters } from "../schemas/GameState";

export class GameRoom extends Room<GameState> {
  maxClients = 25; // Current Discord limit is 25

  onCreate(options: any): void | Promise<any> {
    this.setState(new GameState());

    this.onMessage("move", (client, message) => {
      // Update image position based on data received
      // For simplicity, data contains {imageId, x, y}
      const image = this.state.letters.get(client.imageId); // client.sessionId
      if (image) {
        image.x = message.x;
        image.y = message.y;
        this.broadcast("update", this.state.letters);
      }
    });
  }

  onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
    const letter = new Letters();
    letter.x = Math.random() * 400;
    letter.y = Math.random() * 400;

    this.state.letters.set(client.sessionId, letter);
  }
}
