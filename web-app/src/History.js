import { Stack } from "@mui/material";
import PreviousGuess from "./PreviousGuess";
import './styles/History.scss';

export default function History({history, gameDetails}) {
    return <Stack spacing={1} className="history paddingTop">
        {history.map(guessResult => {
            return <PreviousGuess key={guessResult.word} guessResult={guessResult} gameDetails={gameDetails}/>
        })}
    </Stack>
}