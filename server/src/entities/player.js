import * as schema from "@colyseus/schema";

export class Player extends schema.Schema {
  constructor({ name, userId, avatarUri, sessionId }) {
    super();
    this.sessionId = sessionId;
    this.userId = userId;
    this.avatarUri = avatarUri;
    this.name = name;
    this.talking = false;
		this.hp = 3;
  }
}

schema.defineTypes(Player, {
	sessionId: 'string',
	userId: 'string',
	avatarUri: 'string',
	name: 'string',
	talking: 'boolean',
	hp: 'number'
});
