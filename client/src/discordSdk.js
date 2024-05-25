import { DiscordSDK } from '@discord/embedded-app-sdk';

const queryParams = new URLSearchParams(window.location.search);
const isEmbedded = queryParams.get('frame_id') !== null;

let discordSdk;

if (isEmbedded) {
	discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
} else {
	// TODO
}

export {
	discordSdk
}