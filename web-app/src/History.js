import PreviousGuess from "./PreviousGuess";

export default function History({history}) {
    return <div className="history">
        {history.map(element => {
            return <PreviousGuess key={element.word} previousGuess={element} />
        })}
    </div>
}