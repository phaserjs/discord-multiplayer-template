import { Schema, type, MapSchema } from '@colyseus/schema';

export class Letters extends Schema {
  @type('string')
  imageId = '';

  @type('number') 
  x = 0;

  @type('number')
  y = 0;
}

export class GameState extends Schema {
  @type({map: Letters})
  letters = new MapSchema<Letters>();
}