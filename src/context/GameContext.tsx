
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameQuestion, Difficulty, GameType, getRandomQuestion } from '../data/gameData';

interface Player {
  id: string;
  name: string;
  score: number;
}

interface GameContextType {
  players: Player[];
  currentPlayerIndex: number;
  gameStarted: boolean;
  difficulty: Difficulty;
  currentQuestion: GameQuestion | null;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  startGame: () => void;
  resetGame: () => void;
  nextTurn: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  generateQuestion: (type: GameType) => void;
  completeChallenge: (completed: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('mild');
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);

  const addPlayer = (name: string) => {
    if (name.trim() === '') return;
    setPlayers([...players, { id: Date.now().toString(), name, score: 0 }]);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const startGame = () => {
    if (players.length > 0) {
      setGameStarted(true);
      setCurrentPlayerIndex(0);
      setCurrentQuestion(null);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setCurrentQuestion(null);
    setDifficulty('mild');
  };

  const nextTurn = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setCurrentQuestion(null);
  };

  const generateQuestion = (type: GameType) => {
    const question = getRandomQuestion(type, difficulty);
    setCurrentQuestion(question);
  };

  const completeChallenge = (completed: boolean) => {
    if (completed && currentQuestion) {
      setPlayers(players.map((player, index) => {
        if (index === currentPlayerIndex) {
          const points = difficulty === 'mild' ? 1 : difficulty === 'medium' ? 2 : 3;
          return { ...player, score: player.score + points };
        }
        return player;
      }));
    }
    nextTurn();
  };

  const value = {
    players,
    currentPlayerIndex,
    gameStarted,
    difficulty,
    currentQuestion,
    addPlayer,
    removePlayer,
    startGame,
    resetGame,
    nextTurn,
    setDifficulty: (newDifficulty: Difficulty) => setDifficulty(newDifficulty),
    generateQuestion,
    completeChallenge,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
