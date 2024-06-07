function CurrentPlayer({ player }) {
	return (
		<>
			<span className="text-2xl">{player?.name ? player?.name : 'Waiting...'}</span>
			<img className={`w-44 h-44 rounded-full ${player?.talking ? 'ring-4 ring-emerald-500 transition-all' : ''}`} src={player?.avatarUri} alt={`${player?.name}'s Avatar`} draggable="false" />
		</>
	);
}

export default CurrentPlayer;