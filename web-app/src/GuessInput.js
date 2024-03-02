import { TextField } from '@mui/material';

let ENTER_KEY_CODE = 13
let GUESS_TEXT_FIELD_ID = "guessTextField"

export default function GuessInput() {
    function submitInput() {
        let inputElement = document.getElementById(GUESS_TEXT_FIELD_ID)
        console.log(inputElement.value)
        inputElement.value = null
    }
    function handleKeyPress(key) {
        if (key.keyCode == ENTER_KEY_CODE) {
            submitInput()
        }
    }
    return (
        <div className="guessInput">
            <TextField fullWidth id={GUESS_TEXT_FIELD_ID} label="Guess" variant="outlined" onKeyDown={(e) => handleKeyPress(e)}/>
        </div>
    )
}