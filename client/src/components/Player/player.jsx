import getPlayerHealth from "./../../utils/getPlayerHealth";

function Player({ avatarUri, name, talking, health }) {
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<div className="mb-2 flex gap-1">
				{getPlayerHealth(name, health)}
			</div>
			<img className={`w-fit max-h-20 mb-2 rounded-full shadow-sm shadow-black ${talking ? 'ring-4 ring-emerald-500 transition-all ' : ''}`} src={avatarUri} width="100%" height="100%" />
      <div className="w-28 -mt-7 bg-black px-4 py-1 rounded-full  text-white text-sm text-center">
				{name}
			</div>
    </div>
	);
}

export default Player;