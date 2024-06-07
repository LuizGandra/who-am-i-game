import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./../ui/dialog"

function GameOverDialog({ showModal, setShowModal }) {
	return (
		<Dialog open={showModal} onOpenChange={setShowModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Não foi dessa vez!</DialogTitle>
					<DialogDescription>
						Continue assistindo seus amigos se divertindo enquanto espera a sua vez.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default GameOverDialog;