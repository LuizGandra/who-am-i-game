import { AuthenticatedContextProvider } from './hooks/useAuthenticatedContext';
import { PlayersContextProvider } from './hooks/usePlayers';

import VoiceChannelActivity from './components/VoiceChannelActivity/voiceChannelActivity';

import './App.css';

function App() {

  return (
    <AuthenticatedContextProvider>
			<PlayersContextProvider>
				<VoiceChannelActivity />
			</PlayersContextProvider>
		</AuthenticatedContextProvider>
  )
}

export default App;
