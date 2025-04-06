
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';

const SpinWheel = () => {
  const { generateQuestion } = useGameContext();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedType, setSelectedType] = useState<'truth' | 'dare' | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    // Random rotation between 2 and 5 full spins plus a partial spin
    const newRotation = rotation + 720 + Math.floor(Math.random() * 1080);
    setRotation(newRotation);
    
    // Determine if it lands on Truth or Dare
    setTimeout(() => {
      const normalizedRotation = newRotation % 360;
      const type = normalizedRotation < 180 ? 'truth' : 'dare';
      setSelectedType(type);
      setIsSpinning(false);
    }, 3000); // Match this with the animation duration
  };

  const handleSelection = () => {
    if (selectedType) {
      generateQuestion(selectedType);
      setSelectedType(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-64 h-64">
        {/* Wheel background */}
        <div className="absolute inset-0 rounded-full bg-white shadow-xl overflow-hidden">
          {/* Truth section */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-game-purple" />
          {/* Dare section */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-game-pink" />
          
          {/* Center divider */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-1 h-full bg-white" />
          </div>
          
          {/* Text labels */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full flex">
              <div className="w-1/2 h-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl transform -rotate-45">TRUTH</span>
              </div>
              <div className="w-1/2 h-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl transform rotate-45">DARE</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Spinner */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-16 bg-white shadow-lg z-10 origin-top rounded-sm"
          style={{ 
            x: "-50%", 
            y: "0",
            transformOrigin: "50% 0%",
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 3, type: "spring", damping: 10 }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-300" />
        </motion.div>
        
        {/* Center point */}
        <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-white border-2 border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20" />
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <Button 
          onClick={handleSpin} 
          disabled={isSpinning}
          className="game-button bg-game-teal hover:bg-game-teal/90"
        >
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </Button>
        
        {selectedType && (
          <div className="text-center">
            <p className="text-lg mb-2">
              You landed on <span className="font-bold">{selectedType.toUpperCase()}</span>!
            </p>
            <Button 
              onClick={handleSelection} 
              className="game-button bg-gradient-game"
            >
              Accept {selectedType}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
