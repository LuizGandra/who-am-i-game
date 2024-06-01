import * as schema from "@colyseus/schema";
import { Player } from './player.js';

export class State extends schema.Schema {
	constructor(attributes) {
    super();
    this.players = new schema.MapSchema();
		this.queue = new schema.MapSchema();
    this.roomName = attributes.roomName;
    this.channelId = attributes.channelId;
  }

	getPlayer = (sessionId) => {
		return Array.from(this.players.values()).find(p => p.sessionId === sessionId);
	};

	createPlayer = (sessionId, playerOptions) => {
		const existingPlayer = this.getPlayer(sessionId);
		if (!existingPlayer) {
			this.players.set(playerOptions.userId, new Player({...playerOptions, sessionId}));
		}
	}

	removePlayer = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			this.players.delete(player.userId);
		}
	}

	startTalking = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player !== null) {
			player.talking = true;
		}
	}

	stopTalking = (sessionId) => {
		const player = this.getPlayer(sessionId);
		if (player !== null) {
			player.talking = false;
		}
	}

	removeHealth = (sessionId) => {
		const player = this.getPlayer(sessionId);
		if (player !== null) {
			for(const value of player.health.values()) {
				if (value) {
					player.health.pop();
					player.health.unshift(false);
					break;
				}
			}
		}
	}
}

schema.defineTypes(State, {
	players: { map: Player },
	queue: { map: Player },
	roomName: 'string',
	channelId: 'string'
});