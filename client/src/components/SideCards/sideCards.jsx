import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { ArrowBigLeft, ArrowBigRight, Contact } from 'lucide-react';

function SideCards({ healthEl, tryGuess }) {
	return (
		<aside className="h-screen px-2 pt-12 pb-4 grid grid-rows-[54%_45%] gap-3 font-normal text-sm">
			<div className="w-full h-full px-4 pt-12 pb-4 bg-zinc-950 rounded-lg shadow-lg relative -rotate-1">
				<div className="w-48 flex justify-between absolute -top-4 left-[50%] -translate-x-[50%]">
					<Button className="w-12 h-12 p-0 bg-zinc-800 shadow-md rotate-12"><ArrowBigLeft color="#e4e4e7" fill="#e4e4e7" /></Button>
					<Button className="w-12 h-12 p-0 bg-zinc-800 shadow-md rotate-0"><Contact color="#e4e4e7" /></Button>
					<Button className="w-12 h-12 p-0 bg-zinc-800 shadow-md -rotate-6"><ArrowBigRight color="#e4e4e7" fill="#e4e4e7" /></Button>
				</div>
				<div className="h-full flex flex-col flex-grow">
					<h2 className="mb-4 font-bold">Your Clues</h2>
					<ScrollArea className="flex flex-col gap-4">
						<p className="text-zinc-400">I Am Not a real person</p>
						<p className="text-zinc-400">I Am Not a cartoon character</p>
						<p className="text-emerald-600">I Am a superhero</p>
					</ScrollArea>
				</div>
			</div>
			<div className="w-full h-full px-4 pt-6 pb-4 bg-zinc-950 rounded-lg shadow-lg rotate-1">
				<div className="h-full flex flex-col gap-2">
					<div className="flex justify-between items-center mb-2">
						<h2 className="font-bold">Your Guesses</h2>
						<div className="flex gap-1">
							{healthEl}
						</div>
					</div>
					<div className="h-full flex flex-col gap-1">
						<p className="text-zinc-400">
							Ximbinha
						</p>
						<p className="text-emerald-600">
							Hulk
						</p>
					</div>
					<Button className="bg-zinc-900" onClick={() => tryGuess('Ximbinha')}>
						Make a Guess!
					</Button>
				</div>
			</div>
		</aside>
	);
}

export default SideCards;