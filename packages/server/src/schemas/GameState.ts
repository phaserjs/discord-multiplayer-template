import { Schema, type, MapSchema } from "@colyseus/schema";

export class Draggables extends Schema {
  @type("string")
  imageId = "";

  @type("number")
  x = 0;

  @type("number")
  y = 0;
}

export class GameState extends Schema {
  @type({ map: Draggables })
  draggables = new MapSchema<Draggables>();
}
