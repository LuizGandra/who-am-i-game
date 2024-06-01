const checkHealth = (health) => {
	let falseCount = 0;

	for(const value of health.values()) {
		if (!value) {
			falseCount++;
		}

		if (falseCount === 3) {
			return false;
		}
	}

	return true;
}

export default checkHealth;