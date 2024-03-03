import PreviousGuess from "./PreviousGuess";

export default function History({history, gameDetails}) {
    return <div className="history">
        {history.map(guessResult => {
            return <PreviousGuess key={guessResult.word} guessResult={guessResult} gameDetails={gameDetails}/>
        })}
    </div>
}