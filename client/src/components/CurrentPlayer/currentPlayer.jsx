function CurrentPlayer({ name, talking, avatarUri }) {
	console.log('talking funciona?', talking);
	return (
		<>
			<span className="text-2xl">{name ? name : 'Waiting...'}</span>
			<img className={`w-44 h-44 rounded-full ${talking ? 'ring-4 ring-emerald-500 transition-all' : ''}`} src={avatarUri} alt={`${name}'s Avatar`} draggable="false" />
		</>
	);
}

export default CurrentPlayer;