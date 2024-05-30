import { Heart } from "lucide-react";

const getPlayerHealth = (name, health) => {
	let hp = [];

	if (name && health) {
		for(const [key, value] of health.entries()) {
			if (value) {
				hp.push(<Heart key={`${name}-hp-${key + 1}`} size={18} color="#dc2626" fill="#dc2626"/>);
			} else {
				hp.push(<Heart key={`${name}-hp-${key + 1}`} size={18} color="#a1a1aa"/>);
			}
		}

		return hp;
	}

	return '...';
}

export default getPlayerHealth;