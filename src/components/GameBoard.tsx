
import React from 'react';
import { useGameContext } from '@/context/GameContext';
import SpinWheel from './SpinWheel';
import TruthDareCard from './TruthDareCard';
import { Button } from '@/components/ui/button';
import { RotateCcw, Home } from 'lucide-react';

const GameBoard = () => {
  const { players, currentPlayerIndex, currentQuestion, resetGame } = useGameContext();
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold gradient-text">
          {currentPlayer.name}'s Turn
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={resetGame}
            className="flex items-center gap-1"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Menu</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {players.map((player, index) => (
            <div 
              key={player.id}
              className={`p-3 rounded-lg ${
                index === currentPlayerIndex 
                  ? 'bg-gradient-game text-white font-bold' 
                  : 'bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{player.name}</span>
                <span className="text-lg font-bold">{player.score}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Content area */}
        <div className="mt-8 flex flex-col items-center">
          {!currentQuestion ? (
            <SpinWheel />
          ) : (
            <TruthDareCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
