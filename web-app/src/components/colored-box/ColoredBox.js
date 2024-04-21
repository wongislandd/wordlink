import React from 'react';
import './colored-box.scss';

const ColoredBox = ({ word, score, colorCoverage, isAnswer, baseColor = '#007bff', emptyThreshold }) => {
  const backgroundColor = `linear-gradient(to right, ${baseColor} ${colorCoverage}%, white ${colorCoverage}%)`;

  return (
    <div className={`colored-box ${isAnswer ? 'glowing' : ''}`} style={{ background: backgroundColor }}>
      <span className="text-overflow">{word}</span> {/* Text on the left */}
      <span className="score">{score}</span> {/* Number on the right */}
    </div>
  );
}

export default ColoredBox;