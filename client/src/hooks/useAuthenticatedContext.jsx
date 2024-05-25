import { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { GAME_NAME } from './../../../server/src/store/constants';

import { discordSdk } from '../discordSdk';
import { Client } from 'colyseus.js';

import LoadingScreen from '../components/LoadingScreen/loadingScreen'

import getUserAvatarUrl from '../utils/getUserAvatarUrl';
import getUserDisplayName from '../utils/getUserDisplayName';

const AuthenticatedContext = createContext({
	user: {
    id: '',
    username: '',
    discriminator: '',
    avatar: null,
    public_flags: 0,
  },
  access_token: '',
  scopes: [],
  expires: '',
  application: {
    rpc_origins: undefined,
    id: '',
    name: '',
    icon: null,
    description: '',
  },
	guildMember: null,
	client: undefined,
	room: undefined
});

const AuthenticatedContextProvider = ({ children }) => {
	const authenticatedContext = useAuthenticatedContextSetup();

	if (authenticatedContext === null) {
		return <LoadingScreen />;
	} else {
		return <AuthenticatedContext.Provider value={authenticatedContext}>{children}</AuthenticatedContext.Provider>;
	}
}

const useAuthenticatedContext = () => {
	return useContext(AuthenticatedContext);
}

const useAuthenticatedContextSetup = () => {
	// user's acces_token
	const [auth, setAuth] = useState(null);
	const settingUp = useRef(false);

	useEffect(() => {
		const setupDiscordSdk = async () => {
			await discordSdk.ready();
			
			// authorize with Discord Client
			const { code } = await discordSdk.commands.authorize({
				client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
				response_type: 'code',
        state: '',
        prompt: 'none',
        scope: [
					'identify',
          'guilds',
          'guilds.members.read',
          'rpc.voice.read',
        ],
			});

			// retrieve an acces_token from activity's server
			const response = await axios.post('/api/token', {
				code
			}, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			
			const { access_token } = response.data;
			
			const newAuth = await discordSdk.commands.authenticate({
				access_token
			});

			// get guild name and avatar
			const getGuildMember = await axios.get(`https://discord.com/api/v10/users/@me/guilds/${discordSdk.guildId}/member`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'application/json'
				}
			});
			
			const guildMember = getGuildMember.data;

			// colyseus client
			const wsUrl = `wss://${location.host}/api/colyseus`;
			const client = new Client(wsUrl);

			let roomName = 'Channel';

			// voice channel and guild id exists (call in an guild)
			if (discordSdk.channelId !== null && discordSdk.guildId !== null) {
				const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
				if (channel.name !== null) {
					roomName = channel.name;
				}
			}

			// get the guild avatar, fall back to the user profile avatar or default avatar
			const avatarUri = getUserAvatarUrl({
				guildMember,
				user: newAuth.user
			});

			// get the guild name, fall back to global_name or username
			const name = getUserDisplayName({
				guildMember,
				user: newAuth.user
			});
			
			const newRoom = await client.joinOrCreate(GAME_NAME, {
				channelId: discordSdk.channelId,
				roomName,
				userId: newAuth.user.id,
				name,
				avatarUri
			});

			setAuth({...newAuth, guildMember, client, room: newRoom});
		}

		if (!settingUp.current) {
      settingUp.current = true;
      setupDiscordSdk();
    }
	}, []);
	
	return auth;
}

export {
	AuthenticatedContextProvider,
	useAuthenticatedContext
}