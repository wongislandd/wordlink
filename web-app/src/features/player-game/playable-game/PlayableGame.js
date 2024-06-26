import GuessInput from '../guess-input/GuessInput';
import History from '../history/History'
import axios from 'axios'
import React, { useContext } from 'react'
import { GUESS_API_ROUTE } from '../../../router/RouteConstants';
import GameStateContext from '../../../provider/game-state/GameStateContext';
import './playable-game.scss';

const INVALID_GUESS_STATUS_CODE = 404

// too much logic in here, can we extract to helper classes? ARE CLASSES EVEN REAL IN JAVASCRIPT?
const PlayableGame = ({ gameDetails }) => {
  const { setLoading, guessHistory, setGuessHistory } = useContext(GameStateContext)

  const checkScore = (guess, onGuessHandledCallback) => {
    let bodyData = {
      word: guess,
      gameId: gameDetails.gameId
    }
    setLoading(true)
    axios({
      method: "post",
      url: GUESS_API_ROUTE,
      data: bodyData,
      headers: { "Content-Type": "multipart/form-data" }
    }).then((response) => {
      if (response.data != null) {
        let updatedHistory = [...guessHistory, response.data]
        updatedHistory.sort((a, b) => a.score - b.score);
        setGuessHistory(updatedHistory);
        onGuessHandledCallback(true)
      }
    }).catch((exception) => {
      console.log(exception)
      if (exception.response.status === INVALID_GUESS_STATUS_CODE) {
        onGuessHandledCallback(false)
      } else {
        alert("Error scoring the guess!")
      }
    }).finally(() => setLoading(false))
  }

  const handleNewGuess = (guess, onGuessHandledCallback) => {
    checkScore(guess, onGuessHandledCallback)
  };

  return (
    <div className='playable-game'>
      <GuessInput onGuess={handleNewGuess} />
      <History history={guessHistory} gameDetails={gameDetails} />
    </div>
  );
};

export default PlayableGame;