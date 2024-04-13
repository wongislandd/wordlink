import { Stack } from "@mui/material";
import PreviousGuess from "../../../components/previous-guess/PreviousGuess";

export default function History({ history, gameDetails }) {
    return <Stack spacing={1} className="padding-top">
        {history.map(guessResult => {
            return <PreviousGuess key={guessResult.word} guessResult={guessResult} gameDetails={gameDetails} />
        })}
    </Stack>
}