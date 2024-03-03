import React from 'react';

const calculateColorCoverage = (number, emptyThreshold) => {
  // Ensure the number is within the range [0, emptyThreshold]
  const clampedNumber = Math.min(Math.max(number, 0), emptyThreshold);
  // Calculate coverage as inverse proportion of number to threshold
  const coverage = (1 - (clampedNumber / emptyThreshold)) * 100;
  return coverage;
};

const ColoredBox = ({ word, score, isAnswer, baseColor = '#007bff', emptyThreshold = 10 }) => {
  const colorCoverage = calculateColorCoverage(score, emptyThreshold);
  const backgroundColor = `linear-gradient(to right, ${baseColor} ${colorCoverage}%, white ${colorCoverage}%)`;

  return (
    <div className={`colored-box ${isAnswer ? 'glowing' : ''}`} style={{ background: backgroundColor }}>
      <span>{word}</span> {/* Text on the left */}
      <span>{score}</span> {/* Number on the right */}
    </div>
  );
}

export default ColoredBox;