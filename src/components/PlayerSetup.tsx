
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameContext } from '@/context/GameContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UserPlus, UserMinus, Play } from 'lucide-react';

const PlayerSetup = () => {
  const { players, addPlayer, removePlayer, startGame, setDifficulty, difficulty } = useGameContext();
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName);
      setNewPlayerName('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 animate-bounce-in">
      <h2 className="text-3xl font-bold mb-6 gradient-text">Player Setup</h2>

      <form onSubmit={handleAddPlayer} className="mb-6 flex gap-2">
        <Input
          placeholder="Enter player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          className="game-input flex-grow"
        />
        <Button 
          type="submit" 
          className="bg-game-purple hover:bg-game-purple/90 flex items-center"
          disabled={!newPlayerName.trim()}
        >
          <UserPlus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </form>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Choose Difficulty</h3>
        <RadioGroup
          value={difficulty}
          onValueChange={(value) => setDifficulty(value as 'mild' | 'medium' | 'spicy')}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mild" id="mild" />
            <Label htmlFor="mild" className="cursor-pointer">Mild</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="spicy" id="spicy" />
            <Label htmlFor="spicy" className="cursor-pointer">Spicy 🔥</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Players</h3>
        {players.length === 0 ? (
          <p className="text-gray-500">No players added yet.</p>
        ) : (
          <ul className="space-y-2">
            {players.map((player) => (
              <li 
                key={player.id} 
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <span>{player.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removePlayer(player.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                >
                  <UserMinus size={18} />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        onClick={startGame}
        disabled={players.length < 2}
        className="w-full game-button bg-gradient-game"
      >
        <Play className="mr-2 h-5 w-5" /> 
        Start Game
      </Button>
      {players.length < 2 && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Add at least 2 players to start
        </p>
      )}
    </div>
  );
};

export default PlayerSetup;
