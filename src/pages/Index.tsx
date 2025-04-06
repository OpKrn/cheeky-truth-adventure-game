
import React from 'react';
import { GameProvider, useGameContext } from '@/context/GameContext';
import PlayerSetup from '@/components/PlayerSetup';
import GameBoard from '@/components/GameBoard';

const GameContainer = () => {
  const { gameStarted } = useGameContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-light via-white to-game-light/50 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold gradient-text mb-2">Truth or Dare</h1>
        <p className="text-muted-foreground">Spice up your game night!</p>
      </header>
      
      <main className="container mx-auto px-4">
        {!gameStarted ? <PlayerSetup /> : <GameBoard />}
      </main>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2025 Truth or Dare Game. Play responsibly! 🎮</p>
      </footer>
    </div>
  );
};

const Index = () => {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
};

export default Index;
