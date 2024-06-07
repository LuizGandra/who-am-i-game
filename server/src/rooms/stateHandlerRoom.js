import colyseus from 'colyseus';
import { State } from '../entities/state.js';

const { Room, Delayed } = colyseus;

export class StateHandlerRoom extends Room {
	maxClients = 10;
	roundInterval = Delayed;

	onCreate(options) {
		this.setState(new State(options));

		// TODO: create onStart method
		// round timer
		this.clock.start();
		console.log('time:', this.clock.currentTime);

		this.roundInterval = this.clock.setInterval(() => {
			this.state.updateCurrentPlayer();
			this.broadcast('updateCurrentPlayer');
			this.roundInterval.reset();
		}, this.state.timer)

		// player's handlers
		this.onMessage('removeHealth', (client) => {
			this.state.removeHealth(client.sessionId);
		});

		this.onMessage('startTalking', (client) => {
			this.state.startTalking(client.sessionId);
		});

		this.onMessage('stopTalking', (client) => {
			this.state.stopTalking(client.sessionId);
		});

		// queue's handlers
		this.onMessage('enqueue', (client) => {
			this.state.enqueue(client.sessionId);
			this.broadcast('enqueue');
		});

		this.onMessage('moveToLobby', (client) => {
			this.state.moveToLobby(client.sessionId);
			this.broadcast('moveToLobby');
		});

		this.onMessage('updateCurrentPlayer', () => {
			this.state.updateCurrentPlayer();
			this.broadcast('updateCurrentPlayer');
		});
	}

	onAuth(_client, _options, _req) {
		return true;
	}

	onJoin(client, options) {
		this.state.createPlayer(client.sessionId, options);
		// TODO: update queue here?
	}

	onLeave(client) {
		this.state.removePlayer(client.sessionId);
	}

	// close room
	onDispose() {
		this.clock.clear();
		console.log('Dispose StateHandlerRoom');
	}
}