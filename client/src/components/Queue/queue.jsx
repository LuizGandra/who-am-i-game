import Player from '../Player/player';
import {
  Carousel,
  CarouselContent,
	CarouselItem
} from "./../ui/carousel"

function Queue({ queue }) {
	return (
		<div className="w-full h-full px-8 relative">
			<p className="w-fit px-1 bg-zinc-900 text-zinc-600 text-sm font-normal absolute -top-3 left-12">Queue</p>
			{(queue?.players?.size > 0 || queue?.lobby?.size > 0) ? (
				<Carousel
				opts={{
					align: "start",
					loop: true
				}}
				className="w-full min-h-full border-t-2 border-t-zinc-800 flex flex-col justify-center"
				>
					<CarouselContent>
						{Array.from(queue?.players)?.map(([key, p]) => <CarouselItem className="basis-1/10" key={key}><Player {...p} /></CarouselItem>)}
						{Array.from(queue?.lobby)?.map(([key, p]) => <CarouselItem className="basis-1/10" key={key}><Player {...p} /></CarouselItem>)}
					</CarouselContent>
				</Carousel>
			) : (
				<div className="w-full min-h-full border-t-2 border-t-zinc-800 text-zinc-600 flex justify-center items-center">Waiting players...</div>
			)}
		</div>
	);
}

export default Queue;