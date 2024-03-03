import React from 'react';

const ColoredBox = ({ word, score, colorCoverage, isAnswer, baseColor = '#007bff', emptyThreshold }) => {
  const backgroundColor = `linear-gradient(to right, ${baseColor} ${colorCoverage}%, white ${colorCoverage}%)`;

  return (
    <div className={`colored-box ${isAnswer ? 'glowing' : ''}`} style={{ background: backgroundColor }}>
      <span>{word}</span> {/* Text on the left */}
      <span>{score}</span> {/* Number on the right */}
    </div>
  );
}

export default ColoredBox;