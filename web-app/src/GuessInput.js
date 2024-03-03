import { TextField } from '@mui/material';
import { useState } from 'react';

export default function GuessInput({onGuess}) {
    const [input, setInput] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        onGuess(input);
        setInput('');
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="guessInput">
                <TextField fullWidth onChange={(e) => setInput(e.target.value)} value={input} label="Guess" variant="outlined"/>
            </div>
        </form>
    )
}