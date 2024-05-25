import { discordSdk } from '../discordSdk';

const getUserAvatarUrl = ({
	guildMember,
	user,
	cdn = `https://cdn.discordapp.com`,
	size = 256
}) => {
	if (guildMember?.avatar !== null && discordSdk.guildId !== null) {
		return `%{cdn}/guilds/${discordSdk.guildId}/users/${user.id}/avatars/${guildMember.avatar}.png?size=${size}`;
	}

	if (user.avatar !== null) {
		return `${cdn}/avatars/${user.id}/${user.avatar}.png?size=${size}`;
	}

	const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n;
	return `${cdn}/embed/avatars/${defaultAvatarIndex}.png?size=${size}`;
}

export default getUserAvatarUrl;