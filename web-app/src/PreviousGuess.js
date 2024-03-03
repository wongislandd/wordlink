import ColoredBox from './ColoredBox';


export default function PreviousGuess({previousGuess}) {
    function determineColor(score, emptyThreshold) {
        // Special case for a score of 0, which gets gold
        if (score === 0) return 'gold';
      
        // Calculate the relative position of the score between 0 and the empty threshold
        const relativeScore = score / emptyThreshold;
      
        // Determine color based on the relative score
        let color;
        if (relativeScore <= 1) {
          // Use a deeper green by starting with full green intensity
          // and only slightly reducing it as the score increases.
          const greenBase = 200; // Base value for green to make it deeper
          const greenIntensity = Math.round(greenBase - (relativeScore * (greenBase - 100))); // Ensures green stays bold
          const redIntensity = Math.round(255 * relativeScore); // Red increases as score approaches the empty threshold
          
          color = `rgb(${redIntensity}, ${Math.max(greenIntensity, 0)}, 0)`; // Construct the RGB color, ensuring green does not go negative
        } else {
          // Just in case the score exceeds the threshold, it remains red
          color = 'rgb(255, 0, 0)';
        }
      
        return color;
      }
      
    let emptyThreshold = 5000
    let color = determineColor(previousGuess.score, emptyThreshold)

    return <div className="previousGuess">
        <ColoredBox word={previousGuess.word} score={previousGuess.score} unrelated={previousGuess.unrelated} baseColor={color} emptyThreshold={5000}/>
    </div>
}