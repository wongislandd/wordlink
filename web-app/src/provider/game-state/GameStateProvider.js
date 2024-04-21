// GameStateProvider.js
import React, { useState } from 'react';
import GameStateContext from './GameStateContext';

const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    selectedGameDetails: null,
    isCompleted: false
  });

  const [isLoading, setLoading] = useState(false)

  const [guessHistory, setGuessHistory] = useState([])

  return (
    <GameStateContext.Provider value={{ gameState, setGameState, isLoading, setLoading, guessHistory, setGuessHistory }}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;