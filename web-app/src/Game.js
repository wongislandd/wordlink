import GuessInput from './GuessInput';
import History from './History'
import axios from 'axios'
import React, { useState } from 'react'

const SCHEMA = "http://"
const REMOTE_BASE_URL = "20.115.73.149"
const LOCAL_BASE_URL = "localhost"
const PORT = ":8080"
const GUESS_API_ROUTE = SCHEMA + LOCAL_BASE_URL + PORT + "/guess"

// too much logic in here, can we extract to helper classes? ARE CLASSES EVEN REAL IN JAVASCRIPT?
const Game = () => {
    const [history, setHistory] = useState([]);
  
    const sortHistory = (history) => {
        history.sort((a, b) => {
            console.log(a.score, b.score)
            // If both scores are 0, or neither are, retain their order (stable sort)
            if ((a.score === 0 && b.score === 0) || (a.score !== 0 && b.score !== 0)) {
              return 0;
            }
            if (a.score > 0) {
              return -1;
            }
            if (b.score < 0) {
              return 1;
            }
            // Fallback for any unforeseen cases (shouldn't be reached)
            return 0;
          });
    }

    const validateGuess = (guess) => {
        if (!guess.trim()) {
            alert("The guess cannot be empty.");
            return false;
        }
        // Check if the guess is already in the history
        if (history.some(previousGuess => previousGuess.word == guess)) {
            alert("You've already guessed that word. Try something new!");
            return false;
        }
        return true;
    }

    const checkScore = (guess) => {
        let bodyData = {
            word : guess,
            gameId : 5
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
        })
    }

    const handleNewGuess = (guess) => {
      console.log(guess)
      // Make the request
      if (validateGuess(guess)) {
        checkScore(guess)
      }
    };
  
    return (
      <div className='game'>
        <header className='header'>Take a guess</header>
        <GuessInput onGuess={handleNewGuess} />
        <History history={history} />
      </div>
    );
  };
  
  export default Game;