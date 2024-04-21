import { useContext } from 'react';
import GameInfoDetails from '../GameInfoDetails';
import { Stack } from '@mui/material';
import GameStateContext from '../../../provider/game-state/GameStateContext';
import './game-info.scss';

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