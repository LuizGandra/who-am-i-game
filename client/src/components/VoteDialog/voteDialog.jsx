import { Check, X } from 'lucide-react';
import Player from '../Player/player';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
} from "../ui/dialog"
import { useState } from 'react';

// TODO modal should be open to all players
function VoteDialog({ showModal, setShowModal, currentName, sessionId, queue, handleVotes, question }) {
	const [vote, setVote] = useState('');

	return (
		<Dialog open={showModal} onOpenChange={setShowModal}>
			<DialogContent className="max-w-[80%] h-[80%] px-4 py-8 bg-zinc-900 border-0 flex flex-col items-center justify-between">
				{(queue?.players?.size > 0 || queue?.lobby?.size > 0) ? (
					<>
						<h1 className="text-4xl text-zinc-50 text-center font-bold">{currentName} is {question}?</h1>
						<div className="w-full h-fit grid grid-rows-2 grid-cols-5 justify-items-center items-center">
							{Array.from(queue?.players)?.map(([key, p]) => {
								if (p.sessionId === sessionId) return <div key={key}><Player {...p} vote={vote} /></div>

								return <div key={key}><Player {...p} /></div>
							})}
							{Array.from(queue?.lobby)?.map(([key, p]) => <div key={key}><Player {...p} /></div>)}
						</div>
						<div className="flex justify-center items-center gap-8">
							<Button className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-400" onClick={() => {
								setVote(() => 'correct');
								handleVotes(() => 'correct');
							}}>
								<Check size={48} strokeWidth={3} />
							</Button>
							<Button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400" onClick={() => {
								setVote(() => 'wrong');
								handleVotes(() => 'wrong');
							}}>
								<X strokeWidth={3} />
							</Button>
						</div>
					</>
				) : (
					<p className="w-full text-center text-zinc-600 text-3xl font-bold">Waiting players...</p>
				)}
				
			</DialogContent>
		</Dialog>
	);
}

export default VoteDialog;