import { Check, X } from 'lucide-react';
import Player from '../Player/player';
import CurrentPlayer from '../CurrentPlayer/currentPlayer';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
} from "../ui/dialog"

function VoteDialog({ showModal, setShowModal, currentPlayer, player, queue, handleVotes, question, voteTimer }) {
	return (
		<Dialog open={showModal} onOpenChange={setShowModal}>
			<DialogContent className="max-w-[96%] h-[96%] px-8 py-12 bg-zinc-900 border-0 flex flex-col items-center justify-between">
				{(queue?.players?.size > 0 || queue?.lobby?.size > 0) ? (
					<>
						<span className="absolute top-4 right-8 text-4xl text-zinc-50 text-center font-bold">
							{voteTimer}
						</span>
						<CurrentPlayer {...currentPlayer} showName={false} />
						<div className="w-fit -mt-24 px-16 py-3 bg-zinc-950 border-none rounded-lg text-xl text-center focus-visible:ring-offset-0 focus-visible:ring-0 flex justify-center items-center">
							<h1 className="text-4xl text-zinc-50 text-center font-bold">{currentPlayer?.name} is {question}?</h1>
						</div>
						<div className="w-full h-fit grid grid-rows-2 grid-cols-5 justify-items-center items-center">
							{Array.from(queue?.players)?.map(([key, p]) => {
								if (p.sessionId === player.sessionId) return <div key={key}><Player {...p} /></div>

								return <div key={key}><Player {...p} /></div>
							})}
							{Array.from(queue?.lobby)?.map(([key, p]) => <div key={key}><Player {...p} /></div>)}
						</div>
						{player?.sessionId !== currentPlayer?.sessionId ? (
							<div className="flex justify-center items-center gap-8">
								<Button className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-400" disabled={player?.voteStatus?.isActive} onClick={() => {
									handleVotes(true);
								}}>
									<Check size={48} strokeWidth={3} />
								</Button>
								<Button className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400" disabled={player?.voteStatus?.isActive} onClick={() => {
									handleVotes(false);
								}}>
									<X size={48} strokeWidth={3} />
								</Button>
							</div>
						) : (
							undefined
						)}
					</>
				) : (
					<p className="w-full text-center text-zinc-600 text-3xl font-bold">Waiting players...</p>
				)}
				
			</DialogContent>
		</Dialog>
	);
}

export default VoteDialog;