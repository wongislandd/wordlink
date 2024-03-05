import './App.scss';
import AppHeader from './AppHeader';
import Game from './Game';
import GameInfo from './GameInfo';
import { useState } from 'react';

function App() {
  const [hint, setHint] = useState(null)
  return (
    <div className="App">
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
