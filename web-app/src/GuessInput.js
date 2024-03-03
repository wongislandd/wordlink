import { TextField } from '@mui/material';
import axios from 'axios'

let ENTER_KEY_CODE = 13
let GUESS_TEXT_FIELD_ID = "guessTextField"

const GUESS_API_ROUTE = "http://20.115.73.149:8080/guess"

export default function GuessInput(props) {
    let gameId = props.gameId

    function submitInput() {
        let inputElement = document.getElementById(GUESS_TEXT_FIELD_ID)
        axios.post(GUESS_API_ROUTE, {
            word: inputElement.value,
            gameId: 5
        }).then((response) => {
            console.log(response)
        })
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