const checkQueue = (queue, id) => {
	let isQueued = false;
	
	queue.players.forEach(p => {
		if (p.sessionId === id) isQueued = true;
	})
	
	return isQueued;
}

export default checkQueue;