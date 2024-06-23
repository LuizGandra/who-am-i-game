import { useEffect, useRef, useState } from 'react';
import SideCards from '../SideCards/sideCards';
import Queue from '../Queue/queue';
import CurrentPlayer from '../CurrentPlayer/currentPlayer';
import GameOverDialog from '../GameOverDialog/gameOverDialog';
import VoteDialog from '../VoteDialog/voteDialog';
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
	const authenticatedContext = useAuthenticatedContext();
	const room = authenticatedContext.room;

	const guildMember = authenticatedContext.guildMember;
	const name = getUserDisplayName({
		guildMember,
		user: authenticatedContext.user
	});

	const players = usePlayers();
	let queue = room.state.queue;
	const player = players.filter(p => name === p.name)[0];

	const [currentPlayer, setCurrentPlayer] = useState(room.state.currentPlayer);

	const [healthEl, setHealthEl] = useState([]);
	const [showGameOverModal, setShowGameOverModal] = useState(false);
	const [showVoteModal, setShowVoteModal] = useState(false);
	
	const round = room.state.round;
	const lastRound = room.state.lastRound;
	const roundTimer = room.state.roundTimer;
	const voteTimer = room.state.voteTimer;
	
	const [roundTimeLeft, setRoundTimeLeft] = useState(roundTimer);
	const [voteTimeLeft, setVoteTimeLeft] = useState(voteTimer);
	
	const [clueText, setClueText] = useState('');
	const currentQuestion = useRef(clueText);

	// TODO NEXT
	// ! Implement Guesses

	useEffect(() => {
		if (player) {
			room.state.listen('currentPlayer', (data) => {
				setCurrentPlayer(data);
			});

			room.state.listen('roundTimer', (data) => {
				setRoundTimeLeft(() => data);
			});

			room.state.listen('voteTimer', (data) => {
				setVoteTimeLeft(() => data);
			});

			room.state.listen('showVote', (data) => {
				setShowVoteModal(data);
			});

			room.state.listen('currentQuestion', (data) => {
				currentQuestion.current = data;
			});
		}
	});

	useEffect(() => {
		if (player) {
			setHealthEl(getPlayerHealth(player.name, player.health));
		}
	}, [player]);

	const handleVotes = (vote) => {
		room.send('updatePlayerVote', vote);
	}

	const checkClue = () => {
		if (clueText.length > 0) {
			room.send('updateShowVote', clueText);
			setClueText('');
		}
	}
	
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
				setShowGameOverModal(true);
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
							<span className="text-3xl">{round} / {lastRound}</span>
						</div>
						<div className="self-center flex flex-col gap-4 items-center">
							<CurrentPlayer {...currentPlayer} />
							{player?.sessionId === currentPlayer?.sessionId ? (
								<div className="h-16 -mt-16 flex">
									<Input placeholder="Am I..." value={clueText} className="w-64 h-full px-4 bg-zinc-950 border-none rounded-lg rounded-r-none text-md focus-visible:ring-offset-0 focus-visible:ring-0" onChange={(e) => setClueText(e.target.value)} />
									<Button className="w-24 h-full bg-zinc-950 rounded-l-none text-xl" onClick={checkClue}>
										?
									</Button>
								</div>
							) : (
								<div className="w-64 h-16 -mt-16 px-4 bg-zinc-950 border-none rounded-lg text-xl text-center focus-visible:ring-offset-0 focus-visible:ring-0 flex justify-center items-center">
									{currentPlayer?.name}
								</div>
							)}
						</div>
						<div className="flex flex-col gap-2 items-center">
							<label className="text-sm uppercase text-zinc-600 font-bold">Timer</label>
							<span className="text-3xl">{roundTimeLeft}</span>
						</div>
					</div>
					<Queue queue={queue} />
				</section>
				<SideCards players={players} userId={player?.userId} healthEl={healthEl} tryGuess={tryGuess} />
			</div>
			<VoteDialog
				showModal={showVoteModal}
				setShowModal={() => ''}
				currentPlayer={currentPlayer}
				player={player}
				queue={queue}
				handleVotes={handleVotes}
				question={currentQuestion.current}
				voteTimer={voteTimeLeft}
			/>
			<GameOverDialog showModal={showGameOverModal} setShowModal={setShowGameOverModal} />
		</main>
	);
}

export default Game;