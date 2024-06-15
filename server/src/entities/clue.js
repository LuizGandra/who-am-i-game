import * as schema from "@colyseus/schema";

export class Clue extends schema.Schema {
  constructor({ description = '', correctVotes = 0, wrongVotes = 0 }) {
			super();
			
			this.description = description;
			this.correctVotes = correctVotes;
			this.wrongVotes = wrongVotes;
	}
}

schema.defineTypes(Clue, {
	description: 'string',
	correctVotes: 'number',
	wrongVotes: 'number'
});
