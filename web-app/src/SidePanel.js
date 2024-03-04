import { useContext, useState } from 'react';
import GameInfo from './GameInfo';
import logo from './assets/wordlinkLogo-no-bg.webp'
import { Button, Stack } from '@mui/material';
import GameStateContext from './GameStateContext';
import { GET_HINT_ROUTE } from './RouteConstants';
import axios from 'axios';
import Typewriter from './Typewriter';

const SidePanel = () => {

  const { gameState, setGameState, setGuessHistory } = useContext(GameStateContext)
  const [hint, setHint] = useState(null)


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
    <div className='side-panel-container'>
        <Stack spacing={3}>
            <div className='wordlink-logo'>
            <img src={logo} alt="Logo"/>
            </div>
            { gameState.selectedGameDetails ? 
                <Stack className="side-padding" spacing={3}>
                    <GameInfo selectedGameDetails={gameState.selectedGameDetails}/>
                    <Button disabled={hint} variant="contained" onClick={(e) => getHint()}>Get hint</Button>
                </Stack> : "" }
        {hint ? <Typewriter text={hint}/> : ""}
        </Stack>
        { gameState.selectedGameDetails ? <Button className="bottom-element" variant="contained" onClick={(e) => resetGame()}>Restart</Button> : ""}
    </div>
  );
}

export default SidePanel;