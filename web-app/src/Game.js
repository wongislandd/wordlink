import React, { useState } from 'react'
import PlayableGame from './PlayableGame'
import GameSelector from './GameSelector';


// too much logic in here, can we extract to helper classes? ARE CLASSES EVEN REAL IN JAVASCRIPT?
const Game = () => {
    const [selectedGameId, setSelectedGameId] = useState(5);
    return (
      <div className='game'>
        {selectedGameId ? <PlayableGame/> : <GameSelector/>}
      </div>
    );
  };
  
  export default Game;