import { useState, useEffect, useContext, createContext } from 'react';
import { Events } from '@discord/embedded-app-sdk';

import { useAuthenticatedContext } from '../hooks/useAuthenticatedContext';
import { discordSdk } from '../discordSdk';

const PlayersContext = createContext([]);

const PlayersContextProvider = ({ children }) => {
	const players = usePlayersContextSetup();

	return <PlayersContext.Provider value={players}>{children}</PlayersContext.Provider>
}

const usePlayers = () => {
	return useContext(PlayersContext);
}

// set up listeners for each player to keep states up to date
// TODO: use a map instead an array for players
const usePlayersContextSetup = () => {
	const [players, setPlayers] = useState([]);

	const authenticatedContext = useAuthenticatedContext();

	useEffect(() => {
		try {
			authenticatedContext.room.state.players.onAdd((player) => {
				setPlayers(players => [...players.filter(p => p.userId !== player.userId), player]);
				
				const handlePropertyChange = (field, value) => {
					console.log('CLUES rodou :x', field);
					setPlayers(players => players.map(p => {
						if (p.userId !== player.userId) return p;
						
						p[field] = value;
						if (field === 'clues') console.log('CLUES:', Array.from(p.clues), 'CLUE VALUE:', value);
						return p;
					}));
				}

				// TODO: improve this code
				player.listen('avatarUri', (value) => handlePropertyChange('avatarUri', value));
        player.listen('name', (value) => handlePropertyChange('name', value));
        player.listen('sessionId', (value) => handlePropertyChange('sessionId', value));
        player.listen('talking', (value) => handlePropertyChange('talking', value));
        player.listen('userId', (value) => handlePropertyChange('userId', value));
				player.listen('health', (value) => handlePropertyChange('health', value));
				player.listen('clues', (value) => handlePropertyChange('clues', value));
				player.listen('voteStatus', (value) => handlePropertyChange('voteStatus', value));
			});

			authenticatedContext.room.state.players.onRemove((player) => {
				setPlayers(players => [...players.filter(p => p.userId !== player.userId)]);
			});
				
			authenticatedContext.room.onLeave((code) => {
				console.log("You've been disconnected.", code);
      });
		} catch (error) {
			console.error("Connection error:", error);
		}
	}, [authenticatedContext.room]);

	useEffect(() => {
		const handleSpeakingStart = ({ user_id }) => {
			if (authenticatedContext.user.id === user_id) {
				authenticatedContext.room.send('startTalking');
			}
		}

		const handleSpeakingStop = ({ user_id }) => {
			if (authenticatedContext.user.id === user_id) {
				authenticatedContext.room.send('stopTalking');
			}
		}

		discordSdk.subscribe(Events.SPEAKING_START, handleSpeakingStart, { channel_id: discordSdk.channelId });
		discordSdk.subscribe(Events.SPEAKING_STOP, handleSpeakingStop, { channel_id: discordSdk.channelId });
	
		return () => {
			discordSdk.unsubscribe(Events.SPEAKING_START, handleSpeakingStart);
      discordSdk.unsubscribe(Events.SPEAKING_STOP, handleSpeakingStop);
		}
	}, [authenticatedContext]);

	return players;
}

export {
	PlayersContextProvider,
	usePlayers
}