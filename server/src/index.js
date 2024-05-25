import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

import { createServer } from 'http';
import path from 'path';

// colyseus
import colyseus from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';

import { GAME_NAME } from './store/constants.js';
import { StateHandlerRoom } from './rooms/stateHandlerRoom.js';

dotenv.config({ path: '../.env' });

const { Server } = colyseus;

const app = express();
const router = express.Router();
const port = 3001;

// colyseus web socket
const server = new Server({
	transport: new WebSocketTransport({
		server: createServer(app)
	})
});

// game rooms
server.define(GAME_NAME, StateHandlerRoom).filterBy(['channelId']);

app.use(express.json());

// for production
if (process.env.NODE_ENV === 'production') {
	const clientBuildPath = path.join(__dirname, '../../client/dist')
	app.use(express.static(clientBuildPath));
}

router.post('/token', async (req, res) => {
	try {
		const response = await axios.post(`https://discord.com/api/oauth2/token`, new URLSearchParams({
			client_id: process.env.VITE_DISCORD_CLIENT_ID,
			client_secret: process.env.DISCORD_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code: req.body.code,
		}, {
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}));

	const { access_token } = response.data;
	
	res.send({ access_token });
	} catch (error) {
		console.error('Connection error:', error);
	}
});

// route for production
app.use(process.env.NODE_ENV === 'production' ? '/api' : '/', router);

server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});