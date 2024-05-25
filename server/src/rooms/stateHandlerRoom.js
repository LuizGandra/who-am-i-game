import colyseus from 'colyseus';
import { State } from '../entities/state.js';

const { Room } = colyseus;

export class StateHandlerRoom extends Room {
	maxClients = 4;

	onCreate(options) {
		this.setState(new State(options));

		// handlers for update the states
		this.onMessage('startTalking', (client, _data) => {
			this.state.startTalking(client.sessionId);
		});

		this.onMessage('stopTalking', (client, _data) => {
			this.state.stopTalking(client.sessionId);
		});
	}

	onAuth(_client, _options, _req) {
		return true;
	}

	onJoin(client, options) {
		this.state.createPlayer(client.sessionId, options);
	}

	onLeave(client) {
		this.state.removePlayer(client.sessionId);
	}

	// close room
	onDispose() {
		console.log('Dispose StateHandlerRoom');
	}
}