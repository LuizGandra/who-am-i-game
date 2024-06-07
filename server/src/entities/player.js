import * as schema from "@colyseus/schema";

export class Player extends schema.Schema {
  constructor({ name, userId, avatarUri, sessionId }) {
    super();
		
    this.sessionId = sessionId;
    this.userId = userId;
    this.avatarUri = avatarUri;
    this.name = name;
		this.health = new schema.ArraySchema();
    this.talking = false;

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
	talking: 'boolean',
	health: [ 'boolean' ]
});
