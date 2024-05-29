import { AuthenticatedContextProvider } from './hooks/useAuthenticatedContext';
import { PlayersContextProvider } from './hooks/usePlayers';

import Game from './components/Game/game';

import './index.css';
import './App.css';

function App() {
  return (
    <AuthenticatedContextProvider>
			<PlayersContextProvider>
				<Game />
			</PlayersContextProvider>
		</AuthenticatedContextProvider>
  )
}

export default App;
