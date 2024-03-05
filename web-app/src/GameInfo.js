import { useContext } from 'react';
import GameInfoDetails from './GameInfoDetails';
import { Button, Stack } from '@mui/material';
import GameStateContext from './GameStateContext';
import './styles/GameInfo.scss';

export default function GameInfo() {

  const { gameState } = useContext(GameStateContext)

  return (
    <div className='game-info'>
      { gameState.selectedGameDetails ? 
        <Stack spacing={3}>
            <GameInfoDetails selectedGameDetails={gameState.selectedGameDetails}/>
        </Stack> : "" 
      }
    </div>
  );
}