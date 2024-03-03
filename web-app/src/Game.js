import React, { useState } from 'react'
import PlayableGame from './PlayableGame'
import GameSelector from './GameSelector';

const Game = () => {
    const [ selectedGameId, setSelectedGameId] = useState(null);
    const onSelectionChange = (newSelection) => {
        setSelectedGameId(newSelection)
    }
    return (
      <div className='game'>
        {selectedGameId ? <PlayableGame gameId={selectedGameId}/> : <GameSelector selectedGameId = {selectedGameId} onSelectionChange={onSelectionChange}/>}
      </div>
    );
  };
  
  export default Game;