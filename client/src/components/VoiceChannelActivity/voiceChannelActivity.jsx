import Player from '../Player/player';
import { usePlayers } from '../../hooks/usePlayers';
import './style.css';

function VoiceChannelActivity() {
	const players = usePlayers();

	return (
		<div className="voice__channel__container">
			{players.map(p => <Player key={p.userId} {...p} />)}
		</div>
	);
}

export default VoiceChannelActivity;