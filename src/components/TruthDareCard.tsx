
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/context/GameContext';
import { Check, X } from 'lucide-react';

const difficultyColors = {
  mild: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  spicy: 'bg-red-100 text-red-800'
};

const TruthDareCard = () => {
  const { currentQuestion, completeChallenge } = useGameContext();

  if (!currentQuestion) return null;

  return (
    <div className="game-card max-w-lg mx-auto animate-bounce-in">
      <div className="mb-4">
        <span 
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            difficultyColors[currentQuestion.difficulty]
          }`}
        >
          {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
        </span>
        <span 
          className={`ml-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            currentQuestion.type === 'truth' 
              ? 'bg-game-purple/20 text-game-purple' 
              : 'bg-game-pink/20 text-game-pink'
          }`}
        >
          {currentQuestion.type.toUpperCase()}
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-6">{currentQuestion.text}</h2>

      <div className="flex justify-between gap-4">
        <Button
          onClick={() => completeChallenge(false)} 
          variant="outline"
          className="flex-1 border-2 border-red-300 text-red-500 hover:bg-red-50"
        >
          <X className="mr-2 h-4 w-4" /> Skip
        </Button>
        <Button
          onClick={() => completeChallenge(true)} 
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <Check className="mr-2 h-4 w-4" /> Complete
        </Button>
      </div>
    </div>
  );
};

export default TruthDareCard;
