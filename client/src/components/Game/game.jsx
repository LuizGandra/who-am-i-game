import { useEffect, useState } from 'react';
import SideCards from '../SideCards/sideCards';
import Queue from '../Queue/queue';
import CurrentPlayer from '../CurrentPlayer/currentPlayer';
import GameOverDialog from '../GameOverDialog/gameOverDialog';
import { usePlayers } from '../../hooks/usePlayers';
import { useAuthenticatedContext } from '../../hooks/useAuthenticatedContext';
import { Input } from "./../ui/input"
import { Button } from "./../ui/button"
import getPlayerHealth from './../../utils/getPlayerHealth';
import checkHealth from './../../utils/checkHealth';
import checkGuess from './../../utils/checkGuess';
import checkQueue from './../../utils/checkQueue';
import getUserDisplayName from '../../utils/getUserDisplayName';

function Game() {
	// TODO:
	// ! 1. A queue deve ser mantida pelo servidor;
	// ! 2. O timer deve ser mantido pelo servidor;

	const authenticatedContext = useAuthenticatedContext();
	const room = authenticatedContext.room;

	const guildMember = authenticatedContext.guildMember;
	const name = getUserDisplayName({
		guildMember,
		user: authenticatedContext.user
	});

	const players = usePlayers();
	const player = players.filter(p => name === p.name)[0];

	let queue = room.state.queue;
	let currentPlayer = room.state.currentPlayer;

	const [healthEl, setHealthEl] = useState([]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (player) {
			// TODO: not working
			room.onMessage('updateCurrentPlayer', () => {
				currentPlayer = room.state.currentPlayer;
				queue = room.state.queue;

				console.log('TESTING CURRENT:', currentPlayer);
				console.log('TESTING QUEUE:', queue);
			});
		}
	}, [players, player, room]);

	useEffect(() => {
		if (player) {
			setHealthEl(getPlayerHealth(player.name, player.health));
		}
	}, [player]);
	
	const tryGuess = (guess) => {
		if (!checkGuess(player?.name, guess)) {
			for(const value of player.health.values()) {
				if (value) {
					room.send('removeHealth');

					setHealthEl(() => {
						const newHealth = player.health;
						newHealth.pop();
						newHealth.unshift(false);

						return getPlayerHealth(player.name, newHealth);
					});
					break;
				}
			}

			if (!checkHealth(player?.health)) {
				setShowModal(true);
				if (checkQueue(queue, player.sessionId)) {
					room.send('moveToLobby', player.sessionId);
				}
			}
		}
	}

	return (
		<main className="w-screen h-screen bg-zinc-900 text-white font-bold">
			<div className="grid grid-cols-[75%_25%]">
				<section className="h-screen grid grid-rows-[65%_35%]">
					<div className="px-12 pt-8 pb-4 flex justify-between items-start">
						<div className="w-24 flex flex-col gap-2 items-center">
							<label className="text-sm uppercase text-zinc-600 font-bold">Round</label>
							<span className="text-3xl">1/20</span>
						</div>
						<div className="self-center flex flex-col gap-4 items-center">
							<CurrentPlayer player={currentPlayer} />
							<div className="h-16 -mt-16 flex">
								<Input placeholder="Am I..." className="w-64 h-full px-4 bg-zinc-950 border-none rounded-lg rounded-r-none text-md focus-visible:ring-offset-0 focus-visible:ring-0" />
								<Button className="w-24 h-full bg-zinc-950 rounded-l-none text-xl">
									?
								</Button>
							</div>
						</div>
						<div className="flex flex-col gap-2 items-center">
							{/* {} */}
						</div>
					</div>
					<Queue queue={queue} />
				</section>
				<SideCards healthEl={healthEl} tryGuess={tryGuess} />
			</div>
			<GameOverDialog showModal={showModal} setShowModal={setShowModal} />
		</main>
	);
}

export default Game;