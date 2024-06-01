import Timer from 'react-timer-wrapper';
import { CircleIndicator } from 'react-indicators';

function TimerSpinner({time, handleQueue}) {
	return (
		<Timer
      active
      loop
			duration={time}
			onFinish={handleQueue}
			className="bg-zinc-600 rounded-full border-2 border-zinc-600"
    >
      <CircleIndicator
        size={80}
        fill="#18181b"
        stroke="#18181b"
        strokeBackground="transparent"
      />
    </Timer>
	);
}

export default TimerSpinner;