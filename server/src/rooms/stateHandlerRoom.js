import colyseus from 'colyseus';
import { State } from '../entities/state.js';

const { Room, Delayed } = colyseus;

export class StateHandlerRoom extends Room {
	maxClients = 10;
	roundInterval;

	onCreate(options) {
		this.setState(new State(options));

		// TODO: create onStart method
		// round timer
		this.clock.start();
		
		this.roundInterval = this.clock.setInterval(() => {
    	console.log(`O intervalo durou ${this.roundInterval.elapsedTime} milissegundos.`);
			
			this.state.updateCurrentPlayer();
		}, this.state.timer * 1000);

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
		});

		this.onMessage('moveToLobby', (client) => {
			this.state.moveToLobby(client.sessionId);
		});

		this.onMessage('updateCurrentPlayer', () => {
			this.state.updateCurrentPlayer();
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
		console.log('Dispose StateHandlerRoom');
	}
}