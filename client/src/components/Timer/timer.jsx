import { useEffect, useState } from 'react';

function Timer({ roundTimer, timeLeft, setTimeLeft }) {
	

	return (
		<span className="text-3xl">{timeLeft}</span>
	);
}

export default Timer;