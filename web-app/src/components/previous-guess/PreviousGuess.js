import ColoredBox from '../colored-box/ColoredBox';


export default function PreviousGuess({ guessResult, gameDetails }) {

  function calculateColorCoverage(number, emptyThreshold, minCoverage = 1) {
    // Ensure the number is within the range [0, emptyThreshold]
    const clampedNumber = Math.min(Math.max(number, 0), emptyThreshold);
    // Calculate coverage as inverse proportion of number to threshold
    console.log(clampedNumber)
    let coverage = (1 - (clampedNumber / emptyThreshold)) * 100;
    // Ensure minimum coverage is maintained
    coverage = Math.max(coverage, minCoverage);
    return coverage;
  };

  function determineScoreText(guessResult) {
    if (guessResult.score === 0) return ''
    if (guessResult.unrelated) return guessResult.score + "+"
    else return guessResult.score
  }

  function determineColor(score, emptyThreshold) {
    // Special case for a score of 0, which gets gold
    if (score === 0) return 'gold';

    // Calculate the relative position of the score between 0 and the empty threshold
    const relativeScore = score / emptyThreshold;

    // Ensure the color transitions smoothly from green to red as the score increases
    let color;
    if (relativeScore < 1) {
      // Calculate red and green components based on the relative score
      const greenIntensity = Math.round(200 * (1 - relativeScore)); // Decrease green as score increases
      const redIntensity = Math.round(255 * relativeScore); // Increase red as score increases

      color = `rgb(${redIntensity}, ${greenIntensity}, 0)`; // Mix red and green based on score
    } else {
      // Ensure the color is red for scores at or above the threshold
      color = 'rgb(255, 0, 0)';
    }

    return color;
  }

  let emptyThreshold = gameDetails.totalAssociations
  let scoreText = determineScoreText(guessResult)
  let color = determineColor(guessResult.score, emptyThreshold)
  let colorCoverage = calculateColorCoverage(guessResult.score, emptyThreshold)

  return <div className="previous-guess">
    <ColoredBox word={guessResult.word} score={scoreText} colorCoverage={colorCoverage} isAnswer={guessResult.score === 0} baseColor={color} emptyThreshold={emptyThreshold} />
  </div>
}