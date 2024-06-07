import * as schema from "@colyseus/schema";
import { Player } from './player.js';

export class Queue extends schema.Schema {
  constructor() {
			super();
			
			this.players = new schema.MapSchema();
			this.lobby = new schema.MapSchema();
	}
}

schema.defineTypes(Queue, {
	players: { map: Player },
	lobby: { map: Player }
});
