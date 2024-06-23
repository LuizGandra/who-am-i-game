import colyseus from 'colyseus';
import { State } from '../entities/state.js';

const { Room } = colyseus;

export class StateHandlerRoom extends Room {
	maxClients = 10;
	roundTimerInterval;
	voteTimerInterval;

	onCreate(options) {
		this.setState(new State(options));

		// TODO: create onStart method
		this.clock.start();
		
		// TODO improve this interval for zero delay
		this.roundTimerInterval = this.clock.setInterval(() => {
			if (this.state.roundTimer === 0) this.state.updateCurrentPlayer();
			
			this.state.updateTimer('round');
		}, 1000);
		
		this.voteTimerInterval = this.clock.setInterval(() => {
			if (this.state.voteTimer === 0) {
				this.state.updateShowVote({}, '');
			} else {
				this.state.updateTimer('vote');
			}
		}, 1000);

		this.voteTimerInterval.pause();
		
		this.setSimulationInterval(() => this.update());

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

		// clues and guesses handlers
		this.onMessage('updateShowVote', (client, question) => {
			this.state.updateShowVote(client.sessionId, question);
		});

		this.onMessage('updatePlayerVote', (client, vote) => {
			this.state.updatePlayerVote(client.sessionId, vote);
		});
	}

	update() {
		if (this.state.showVote) {
			this.roundTimerInterval.pause();
			this.voteTimerInterval.resume();
		} else {
			this.voteTimerInterval.active && this.voteTimerInterval.pause();
			this.voteTimerInterval.paused && this.roundTimerInterval.resume();
		}
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