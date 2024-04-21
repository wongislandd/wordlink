import './App.scss';
import AppHeader from './components/app-header/AppHeader';
import Game from './features/player-game/game/Game';
import GameInfo from './features/player-game/game-info/GameInfo';
import { useState } from 'react';

function App() {
  const [hint, setHint] = useState(null)
  return (
    <div className="app">
      <AppHeader />
      <div className='container'>
        <div className="main-content-wrapper">
          <div className="main-content">
            <GameInfo />
            <Game hint={hint} setHint={setHint} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
