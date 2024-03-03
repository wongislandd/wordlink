import { TextField } from '@mui/material';
import { useContext, useState } from 'react';
import GameStateContext from './GameStateContext';

export default function GuessInput({onGuess}) {
    const [input, setInput] = useState('');
    const { guessHistory } = useContext(GameStateContext)
    console.log(guessHistory)
    const validateGuess = (guess) => {
        // Check if its empty
        if (!guess.trim()) {
            return false
        }
        // Check if the guess is already in the history
        if (guessHistory.some(guessResults => guessResults.word === guess)) {
            alert('You already guessed ' + guess + '! Try another word.')
            return false
        }
        return true;
    }

    const shakeTheInput = () => {
        let inputElement = document.getElementById("mainInput")
        inputElement.classList.add("input-error")
        setTimeout(() => {
            inputElement.classList.remove("input-error");
        }, 1000)
    }

    const onGuessHandledCallback = (handledSuccessfully) => {
        if (handledSuccessfully) {
            setInput('');
        } else {
            // shake the input if error
            shakeTheInput()
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateGuess(input)) {
            onGuess(input, onGuessHandledCallback);
        } else {
            shakeTheInput()
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div id="mainInput" className="guessInput">
                <TextField fullWidth onChange={(e) => setInput(e.target.value)} value={input} label="Guess" variant="outlined"/>
            </div>
        </form>
    )
}