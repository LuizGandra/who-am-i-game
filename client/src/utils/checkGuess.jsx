const checkGuess = (name, guess) => {
	if (name) {
		if (guess === 'Hulk') {
			return true;
		} else {
			return false;
		}
	}
}

export default checkGuess;