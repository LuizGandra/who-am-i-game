const getUserDisplayName = ({ guildMember, user }) => {
	if (guildMember?.nick !== null && guildMember.nick !== '') return guildMember.nick;
	if (user.discriminator !== '0') return `${user.username}#${user.discriminator}`;
	if (user.global_name !== null && user.global_name !== '') return user.global_name;

	return user.username;
}

export default getUserDisplayName;