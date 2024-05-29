import { useState } from 'react';
import Player from '../Player/player';
import { usePlayers } from '../../hooks/usePlayers';
import { Input } from "./../ui/input"
import { Button } from "./../ui/button"
import { ScrollArea } from "./../ui/scroll-area"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./../ui/carousel"
import { ArrowBigLeft, ArrowBigRight, Contact, Heart } from 'lucide-react';

function Game() {
	const players = usePlayers();
	console.log('players list:', players);
	// TODO: filter player
	// const player = useState(players.filter({}));

	return (
		<main className="w-screen h-screen bg-zinc-900 text-white font-bold">
			<div className="grid grid-cols-[75%_25%]">
				<section className="h-screen grid grid-rows-[65%_35%]">
					<div className="px-12 pt-8 pb-4 flex justify-between items-start">
						<div className="flex flex-col gap-2 items-center">
							<label className="text-sm uppercase text-zinc-300 font-bold">Round</label>
							<span className="text-3xl font-bold">1/20</span>
						</div>
						<div className="self-center flex flex-col gap-4 items-center">
							<span>YOU</span>
							<div className="w-52 h-52 bg-zinc-500 rounded-full"></div>
							<div className="h-16 -mt-16 flex">
								<Input placeholder="Am I..." className="w-64 h-full px-4 bg-zinc-950 border-none rounded-lg rounded-r-none text-md focus-visible:ring-offset-0 focus-visible:ring-0" />
								<Button className="w-24 h-full bg-zinc-950 rounded-l-none text-xl">
									?
								</Button>
							</div>
						</div>
						<div className="flex flex-col gap-2 items-center">
							<div className="w-24 h-24 bg-zinc-950 rounded-full"></div>
							<span className="text-sm uppercase text-zinc-300 font-bold">20 seconds</span>
						</div>
					</div>
					<div className="w-full h-full px-8 relative">
						<p className="w-fit px-1 bg-zinc-900 text-zinc-600 text-sm font-normal absolute -top-3 left-12">Queue</p>
						<Carousel
							opts={{
								align: "start",
								loop: true
							}}
							className="w-full min-h-full border-t-2 border-t-zinc-800 flex flex-col justify-center"
						>
							<CarouselContent>
								{players.map(p => <CarouselItem className="basis-1/10" key={p.userId}><Player  {...p} /></CarouselItem>)}
							</CarouselContent>
						</Carousel>
					</div>
				</section>
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
								<p className="text-emerald-600">I Am a superhero</p>
								<p className="text-emerald-600">I Am a superhero</p>
								<p className="text-emerald-600">I Am a superhero</p>
								<p className="text-emerald-600">I Am a superhero</p>
								<p className="text-emerald-600">I Am a superhero</p>
								<p className="text-emerald-600">I Am a superhero</p>
								<p className="text-emerald-600">I Am a superhero</p>
							</ScrollArea>
						</div>
					</div>
					<div className="w-full h-full px-4 pt-6 pb-4 bg-zinc-950 rounded-lg shadow-lg rotate-1">
						<div className="h-full flex flex-col gap-2">
							<div className="flex justify-between items-center mb-2">
								<h2 className="font-bold">Your Guesses</h2>
								<div className="flex items-center gap-1">
									<div><Heart size={18} color="#52525b" /></div>
									<div><Heart size={18} color="#dc2626" fill="#dc2626" /></div>
									<div><Heart size={18} color="#dc2626" fill="#dc2626" /></div>
								</div>
							</div>
							<div className="h-full flex flex-col gap-1">
								<p className="text-zinc-400">
									Ximbinha
								</p>
								<p className="text-emerald-600">
									Hulk
								</p>
								<p className="text-emerald-600">
									Ximbinha
								</p>
							</div>
							<Button className="bg-zinc-900">
								Make a Guess!
							</Button>
						</div>
					</div>
				</aside>
			</div>
		</main>
	);
}

export default Game;