// GameStateProvider.js
import React, { useState } from 'react';
import GameStateContext from './GameStateContext';

const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    selectedGameDetails: null,
    isCompleted: false
  });

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;