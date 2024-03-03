import React, { useState } from 'react'
import PlayableGame from './PlayableGame'
import GameSelector from './GameSelector';

const Game = () => {
    const [ selectedGameDetails, setSelectedGameDetails] = useState(null);
    const onSelectionChange = (newSelection) => {
      setSelectedGameDetails(newSelection)
    }
    return (
      <div className='game'>
        {selectedGameDetails ? <PlayableGame gameDetails={selectedGameDetails}/> : <GameSelector onSelectionChange={onSelectionChange}/>}
      </div>
    );
  };
  
  export default Game;