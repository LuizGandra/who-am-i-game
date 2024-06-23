import * as schema from "@colyseus/schema";
import { CardItem } from './cardItem.js';
import { Vote } from './vote.js';

export class Player extends schema.Schema {
  constructor({ name, userId, avatarUri, sessionId }) {
    super();
		
    this.sessionId = sessionId;
    this.userId = userId;
    this.avatarUri = avatarUri;
    this.name = name;
		this.health = new schema.ArraySchema();
    this.talking = false;
		this.clues = new schema.ArraySchema();
		this.guesses = new schema.ArraySchema();
		this.voteStatus = new Vote({ activeVote: false, vote: false });

		for (let i = 0; i < 3; i++) {
			this.health.push(true);
		}
  }
}

schema.defineTypes(Player, {
	sessionId: 'string',
	userId: 'string',
	avatarUri: 'string',
	name: 'string',
	health: [ 'boolean' ],
	talking: 'boolean',
	clues: [ CardItem ],
	guesses: [ CardItem ],
	voteStatus: Vote
});
