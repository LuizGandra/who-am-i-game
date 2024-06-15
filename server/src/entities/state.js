import * as schema from "@colyseus/schema";
import { Player } from './player.js';
import { Queue } from './queue.js';
import { Clue } from './clue.js';

export class State extends schema.Schema {
	constructor(attributes) {
    super();
    this.players = new schema.MapSchema();
		this.currentPlayer = new Player("", "", "", "");
		this.queue = new Queue({ players: [], queue: [] });
		this.round = 1;
		this.lastRound = 20;
		this.roundDuration = 10;
		this.roundTimer = this.roundDuration;
		this.showVote = false;
    this.roomName = attributes.roomName;
    this.channelId = attributes.channelId;
  }
	
	// player's methods
	getPlayer = (sessionId) => {
		return Array.from(this.players.values()).find(p => p.sessionId === sessionId);
	};

	checkHealth = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			let falseCount = 0;

			for (const h of player.health) {
				if (!h) falseCount++;
			}

			if (falseCount < 3) {
				return true;
			}

			return false;
		}
	}

	findInQueue = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			if (this.checkHealth(sessionId)) {
				return Array.from(this.queue.players.values()).find(p => p.sessionId === sessionId);
			} else {
				return Array.from(this.queue.lobby.values()).find(p => p.sessionId === sessionId);
			}
		}
	}

	createPlayer = (sessionId, playerOptions) => {
		const existingPlayer = this.getPlayer(sessionId);

		if (!existingPlayer) {
			const newPlayer = new Player({...playerOptions, sessionId});

			this.players.set(playerOptions.userId, newPlayer);

			if (this.players.size === 1) {
				this.currentPlayer = this.players.get(playerOptions.userId);
			} else {
				this.queue.players.set(playerOptions.userId, newPlayer);
			}

		}
	}

	removePlayer = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			if (this.findInQueue(sessionId)) {
				this.checkHealth(sessionId) ? this.queue.players.delete(player.userId) : this.queue.lobby.delete(player.userId);
			}

			this.players.delete(player.userId);
		}
	}

	startTalking = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			player.talking = true;
		}
	}

	stopTalking = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			player.talking = false;
		}
	}

	removeHealth = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			for(const value of player.health.values()) {
				if (value) {
					player.health.pop();
					player.health.unshift(false);
					break;
				}
			}
		}
	}

	// queue's methods
	enqueue = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			const isAlive = this.checkHealth(sessionId);
			const isQueued = this.findInQueue(sessionId);
			
			if (!isQueued && isAlive) {
				this.queue.players.set(player.userId, player);
			}
		}
	}

	moveToLobby = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			const isAlive = this.checkHealth(sessionId);
			const isQueued = this.findInQueue(sessionId);
			
			if (!isQueued && !isAlive) {
				if (this.currentPlayer.sessionId !== sessionId)
					this.queue.players.delete(player.userId);

				this.queue.lobby.set(player.userId, player);
			}
		}
	}

	updateCurrentPlayer = () => {
		if (this.queue.players.size >= 1) {
			const player = Array.from(this.queue.players.values())[0];
		
			if (player) {
				const currentPlayer = this.getPlayer(player.sessionId);
				
				this.queue.players.set(this.currentPlayer.userId, this.currentPlayer);
				this.currentPlayer = currentPlayer;
				
				this.queue.players.delete(currentPlayer.userId);
				
				if (this.round < this.lastRound) {
					this.round++;
				}
			}
		}
	}

	updateTimer = () => {
		if (this.roundTimer === 0) {
			this.roundTimer = this.roundDuration;
		} else {
			this.roundTimer--;
		}
	}

	// clues and guesses
	addClue = (sessionId, clue) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			player.clues.push(new Clue(clue));
		}
	}

	updateShowVote = (sessionId) => {
		const player = this.getPlayer(sessionId);

		if (player) {
			this.showVote = !this.showVote;
		}
	}
}

schema.defineTypes(State, {
	players: { map: Player },
	currentPlayer: Player,
	queue: Queue,
	round: 'number',
	lastRound: 'number',
	roundTimer: 'number',
	roundDuration: 'number',
	showVote: 'boolean',
	roomName: 'string',
	channelId: 'string'
});