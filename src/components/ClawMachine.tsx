
import React, { useState, useRef, useEffect } from 'react';
import PlushToy from './PlushToy';
import GameControls from './GameControls';
import Claw from './Claw';

interface Position {
  x: number;
  y: number;
}

interface Toy {
  id: number;
  type: string;
  position: Position;
  collected: boolean;
  image: string;
}

const ClawMachine = () => {
  const [clawPosition, setClawPosition] = useState({ x: 150, y: 20 });
  const [isClawMoving, setIsClawMoving] = useState(false);
  const [isClawDescending, setIsClawDescending] = useState(false);
  const [toys, setToys] = useState<Toy[]>([
    { id: 1, type: 'cat', position: { x: 60, y: 220 }, collected: false, image: '/lovable-uploads/f455a38f-b9ea-45e5-ba94-deeb13ec613c.png' },
    { id: 2, type: 'dog', position: { x: 180, y: 200 }, collected: false, image: '/lovable-uploads/d8d933a2-a6c4-41d8-8ae9-eca93026bec4.png' },
    { id: 3, type: 'spider-bear', position: { x: 120, y: 240 }, collected: false, image: '/lovable-uploads/52d86918-1734-4ea8-99c2-1cc158096ec4.png' },
    { id: 4, type: 'chick', position: { x: 250, y: 210 }, collected: false, image: '/lovable-uploads/5b153179-98d3-4238-8948-8c5ecf92fdb4.png' },
    { id: 5, type: 'koala', position: { x: 90, y: 190 }, collected: false, image: '/lovable-uploads/626e6b90-65e5-445c-9992-262a23efcd8a.png' }
  ]);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState<{ toy: Toy | null; show: boolean }>({ toy: null, show: false });
  const [clawHasToy, setClawHasToy] = useState<Toy | null>(null);

  const machineRef = useRef<HTMLDivElement>(null);

  const moveClawLeft = () => {
    if (isClawMoving || isClawDescending) return;
    setClawPosition(prev => ({ ...prev, x: Math.max(30, prev.x - 30) }));
  };

  const moveClawRight = () => {
    if (isClawMoving || isClawDescending) return;
    setClawPosition(prev => ({ ...prev, x: Math.min(270, prev.x + 30) }));
  };

  const dropClaw = async () => {
    if (isClawMoving || isClawDescending) return;
    
    setIsClawDescending(true);
    setIsClawMoving(true);

    // Descend
    setClawPosition(prev => ({ ...prev, y: 180 }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for toy collision
    const caughtToy = toys.find(toy => 
      !toy.collected &&
      Math.abs(toy.position.x - clawPosition.x) < 25 &&
      Math.abs(toy.position.y - 180) < 30
    );

    if (caughtToy) {
      setClawHasToy(caughtToy);
      setToys(prev => prev.map(toy => 
        toy.id === caughtToy.id ? { ...toy, collected: true } : toy
      ));
    }

    // Ascend
    await new Promise(resolve => setTimeout(resolve, 500));
    setClawPosition(prev => ({ ...prev, y: 20 }));
    
    if (caughtToy) {
      // Move to collection area
      await new Promise(resolve => setTimeout(resolve, 500));
      setClawPosition({ x: 280, y: 20 });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Drop toy and show success
      setClawHasToy(null);
      setScore(prev => prev + 1);
      setShowSuccess({ toy: caughtToy, show: true });
      
      setTimeout(() => {
        setShowSuccess({ toy: null, show: false });
      }, 2000);
      
      // Return claw to center
      await new Promise(resolve => setTimeout(resolve, 500));
      setClawPosition({ x: 150, y: 20 });
    }

    setIsClawDescending(false);
    setIsClawMoving(false);
  };

  return (
    <div className="relative">
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-white drop-shadow-lg">
          Score: {score} 🏆
        </div>
      </div>
      
      <div 
        ref={machineRef}
        className="relative mx-auto bg-gradient-to-b from-purple-600 to-purple-800 rounded-lg p-6 shadow-2xl"
        style={{ width: '350px', height: '400px' }}
      >
        {/* Machine Frame */}
        <div className="absolute inset-4 bg-gradient-to-b from-pink-200 to-blue-200 rounded border-4 border-gray-800 overflow-hidden">
          
          {/* Top Rainbow Section */}
          <div className="h-8 bg-gradient-to-r from-pink-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400"></div>
          
          {/* Glass Panel */}
          <div className="relative h-64 bg-gradient-to-b from-blue-100 to-blue-50 border-2 border-gray-600">
            
            {/* Claw */}
            <Claw 
              position={clawPosition} 
              isDescending={isClawDescending}
              hasToy={clawHasToy}
            />
            
            {/* Toys */}
            {toys.filter(toy => !toy.collected).map(toy => (
              <PlushToy 
                key={toy.id} 
                toy={toy}
              />
            ))}
            
            {/* Collection Box */}
            <div className="absolute bottom-2 right-2 w-12 h-8 bg-yellow-400 border-2 border-gray-800 rounded pixel-border">
              <div className="text-xs text-center text-gray-800 font-bold">BOX</div>
            </div>
          </div>
          
          {/* Control Panel */}
          <div className="h-12 bg-gradient-to-r from-purple-400 to-pink-400 border-t-2 border-gray-600 flex items-center justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full border border-gray-800"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full border border-gray-800"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full border border-gray-800"></div>
            </div>
          </div>
        </div>

        {/* Coin Slot */}
        <div className="absolute bottom-2 left-6 w-8 h-4 bg-gray-900 rounded border border-gray-600"></div>
      </div>

      <GameControls 
        onMoveLeft={moveClawLeft}
        onMoveRight={moveClawRight}
        onDrop={dropClaw}
        disabled={isClawMoving}
      />

      {/* Success Animation */}
      {showSuccess.show && showSuccess.toy && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl border-4 border-yellow-400 animate-bounce">
            <img 
              src={showSuccess.toy.image} 
              alt="Caught toy"
              className="w-24 h-24 mx-auto mb-4 pixel-image"
            />
            <div className="text-3xl font-bold text-center text-yellow-600">+1</div>
            <div className="text-lg font-bold text-center text-gray-800">Nice Catch!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClawMachine;
