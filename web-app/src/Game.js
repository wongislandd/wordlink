import React, { useContext } from 'react'
import PlayableGame from './PlayableGame'
import GameSelector from './GameSelector';
import GameStateContext from './GameStateContext';

const Game = () => {
    const { gameState, setGameState } = useContext(GameStateContext)
    const onSelectionChange = (newGameDetails) => {
      setGameState(({
        selectedGameDetails: newGameDetails,
        isCompleted: false
      }))
    }
    return (
      <div className='game'>
        {gameState.selectedGameDetails ? <PlayableGame gameDetails={gameState.selectedGameDetails}/> : <GameSelector onSelectionChange={onSelectionChange}/>}
      </div>
    );
  };
  
  export default Game;