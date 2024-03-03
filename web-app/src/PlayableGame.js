import GuessInput from './GuessInput';
import History from './History'
import axios from 'axios'
import React, { useState } from 'react'
import { GUESS_API_ROUTE } from './RouteConstants';

// too much logic in here, can we extract to helper classes? ARE CLASSES EVEN REAL IN JAVASCRIPT?
const PlayableGame = ({gameDetails}) => {
    const [history, setHistory] = useState([]);

    const validateGuess = (guess) => {
        if (!guess.trim()) {
            alert("The guess cannot be empty.");
            return false
        }
        // Check if the guess is already in the history
        if (history.some(guessResults => guessResults.word === guess)) {
            alert("You've already guessed that word. Try something new!");
            return false
        }
        return true;
    }

    const checkScore = (guess) => {
        let bodyData = {
            word : guess,
            gameId : gameDetails.gameId
        }
        axios({
            method: "post",
            url: GUESS_API_ROUTE,
            data: bodyData,
            headers: { "Content-Type": "multipart/form-data"}
        }).then((response) => {
            if (response.data != null) {
              let updatedHistory = [...history, response.data]
              updatedHistory.sort((a, b) => a.score - b.score);
              setHistory(updatedHistory);
            }
        }).catch((exception) => {
            console.log(exception)
            alert("Error scoring the guess!")
        })
    }

    const handleNewGuess = (guess) => {
      // Make the request
      if (validateGuess(guess)) {
        checkScore(guess)
      }
    };
  
    return (
      <div className='playableGame'>
        <header className='header'>Take a guess (game {gameDetails.gameId})</header>
        <GuessInput onGuess={handleNewGuess} />
        <History history={history} gameDetails={gameDetails}/>
      </div>
    );
  };
  
  export default PlayableGame;