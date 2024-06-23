import * as schema from "@colyseus/schema";

export class Vote extends schema.Schema {
  constructor({ isActive = false, vote = false }) {
			super();
			
			this.isActive = isActive;
			this.vote = vote;
	}
}

schema.defineTypes(Vote, {
	isActive: 'boolean',
	vote: 'boolean'
});
