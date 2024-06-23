import { Check, X } from 'lucide-react';
import getPlayerHealth from './../../utils/getPlayerHealth';

function Player({ avatarUri, name, talking, health, voteStatus }) {
	let gameOver = false;

	let falseCount = 0;

	if (health) {
		for(const value of health.values()) {
			if (!value) {
				falseCount++;
			}

			if (falseCount === 3) {
				gameOver = true;
			}
		}
	}

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<div className="mb-2 flex gap-1">
				{getPlayerHealth(name, health)}
			</div>
			<div className={`w-fit max-h-20 mb-2 rounded-full shadow-sm shadow-black ${talking ? 'ring-4 ring-emerald-500 transition-all' : ''} ${gameOver ? '-z-10': ''} ${voteStatus?.isActive ? 'relative -z-10' : ''}`}>
				<img className={`w-fit max-h-20 rounded-full ${gameOver ? 'grayscale blur-[1px]' : ''} ${voteStatus?.isActive ? 'brightness-[.3]' : ''}`} src={avatarUri} width="100%" height="100%" />
				{voteStatus?.isActive ? voteStatus?.vote ? (
					<Check size={32} strokeWidth={3} className="h-full pb-2 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				) : (
					<X size={32} strokeWidth={3} className="h-full pb-2 text-white mb-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				) : undefined}
			</div>
      <div className={`w-28 -mt-7 bg-black px-4 py-1 rounded-full text-white text-sm text-center`}>
				{name}
			</div>
    </div>
	);
}

export default Player;