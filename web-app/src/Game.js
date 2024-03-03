import React, { useContext } from 'react'
import PlayableGame from './PlayableGame'
import GameSelector from './GameSelector';
import GameStateContext from './GameStateContext';
import { LinearProgress, Stack } from '@mui/material';

const Game = () => {
    const { gameState, setGameState, isLoading } = useContext(GameStateContext)
    const onSelectionChange = (newGameDetails) => {
      setGameState(({
        selectedGameDetails: newGameDetails,
        isCompleted: false
      }))
    }
    return (
      <Stack sx={{ width: '100%', color: 'black.500'}} spacing={1} className='centered-element game'>
        <div className='loadingIndicator'> 
          {isLoading ? <LinearProgress /> : ""}
        </div>
        {gameState.selectedGameDetails ? <PlayableGame gameDetails={gameState.selectedGameDetails}/> : <GameSelector onSelectionChange={onSelectionChange}/>}
      </Stack>
    );
  };
  
  export default Game;