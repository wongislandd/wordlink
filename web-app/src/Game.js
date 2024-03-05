import React, { useContext } from 'react'
import PlayableGame from './PlayableGame'
import GameSelector from './GameSelector';
import GameStateContext from './GameStateContext';
import { LinearProgress, Stack, Button } from '@mui/material';
import { GET_HINT_ROUTE } from './RouteConstants';
import axios from 'axios';
import Typewriter from './Typewriter';
import './styles/Game.scss';

const Game = ({ hint, setHint }) => {
    const { gameState, setGameState, isLoading, setGuessHistory } = useContext(GameStateContext)
    const onSelectionChange = (newGameDetails) => {
      setGameState(({
        selectedGameDetails: newGameDetails,
        isCompleted: false
      }))
    }

    const getHint = () => {
      axios.get(GET_HINT_ROUTE, {
          params: { gameId: gameState.selectedGameDetails.gameId }
        }).then(res => {
            if (res.data != null) {
                console.log(res.data)
                setHint(res.data)
            }
          }).catch(error => {
              console.log(error)
              alert("Could not fetch hint!")
          })
    }

    const resetGame = () => {
      setGameState({
          selectedGameDetails: null,
          isCompleted: false
      })
      setHint(null)
      setGuessHistory([])
    }

    return (
      <Stack sx={{ width: '100%', color: 'black.500'}} spacing={1} className='centered-element game'>
        <div className='loadingIndicator'> 
          {isLoading ? <LinearProgress /> : ""}
        </div>
        <h2 className='header'>{ gameState.selectedGameDetails ? 'Guess a word' : 'Select a game to play!' }</h2>
        { gameState.selectedGameDetails ? 
            <div className='game__actions'>
              <Button disabled={hint} variant="contained" onClick={getHint}>Get hint</Button>
              <Button variant="contained" onClick={resetGame}>New Game</Button>
            </div>
          : ''
        }
        {hint ? <Typewriter text={hint}/> : ""}
        {gameState.selectedGameDetails ? <PlayableGame gameDetails={gameState.selectedGameDetails}/> : <GameSelector onSelectionChange={onSelectionChange}/>}
      </Stack>
    );
  };
  
  export default Game;