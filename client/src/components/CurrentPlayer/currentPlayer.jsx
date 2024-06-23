function CurrentPlayer({ name, talking, avatarUri, showName }) {
	return (
		<>
			{showName ? (
				<span className="text-2xl">{name ? name : 'Waiting...'}</span>
			) : (
				undefined
			)}
			<img className={`w-44 h-44 rounded-full ${talking ? 'ring-4 ring-emerald-500 transition-all' : ''}`} src={avatarUri} alt={`${name}'s Avatar`} draggable="false" />
		</>
	);
}

export default CurrentPlayer;