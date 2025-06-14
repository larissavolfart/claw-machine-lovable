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
    { id: 1, type: 'cat', position: { x: 40, y: 200 }, collected: false, image: '/lovable-uploads/f455a38f-b9ea-45e5-ba94-deeb13ec613c.png' },
    { id: 2, type: 'dog', position: { x: 160, y: 190 }, collected: false, image: '/lovable-uploads/d8d933a2-a6c4-41d8-8ae9-eca93026bec4.png' },
    { id: 3, type: 'spider-bear', position: { x: 100, y: 230 }, collected: false, image: '/lovable-uploads/52d86918-1734-4ea8-99c2-1cc158096ec4.png' },
    { id: 4, type: 'chick', position: { x: 230, y: 200 }, collected: false, image: '/lovable-uploads/5b153179-98d3-4238-8948-8c5ecf92fdb4.png' },
    { id: 5, type: 'koala', position: { x: 70, y: 180 }, collected: false, image: '/lovable-uploads/626e6b90-65e5-445c-9992-262a23efcd8a.png' },
    { id: 6, type: 'cat-2', position: { x: 200, y: 220 }, collected: false, image: '/lovable-uploads/f455a38f-b9ea-45e5-ba94-deeb13ec613c.png' },
    { id: 7, type: 'dog-2', position: { x: 130, y: 210 }, collected: false, image: '/lovable-uploads/d8d933a2-a6c4-41d8-8ae9-eca93026bec4.png' },
    { id: 8, type: 'spider-bear-2', position: { x: 50, y: 240 }, collected: false, image: '/lovable-uploads/52d86918-1734-4ea8-99c2-1cc158096ec4.png' },
    { id: 9, type: 'chick-2', position: { x: 180, y: 240 }, collected: false, image: '/lovable-uploads/5b153179-98d3-4238-8948-8c5ecf92fdb4.png' },
    { id: 10, type: 'koala-2', position: { x: 220, y: 180 }, collected: false, image: '/lovable-uploads/626e6b90-65e5-445c-9992-262a23efcd8a.png' },
    { id: 11, type: 'cat-3', position: { x: 80, y: 220 }, collected: false, image: '/lovable-uploads/f455a38f-b9ea-45e5-ba94-deeb13ec613c.png' },
    { id: 12, type: 'dog-3', position: { x: 250, y: 240 }, collected: false, image: '/lovable-uploads/d8d933a2-a6c4-41d8-8ae9-eca93026bec4.png' }
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
      Math.abs(toy.position.x - clawPosition.x) < 30 &&
      Math.abs(toy.position.y - 180) < 35
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
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-white pixel-text retro-glow">
          🏆 {score} 🏆
        </div>
      </div>
      
      <div 
        ref={machineRef}
        className="relative mx-auto rounded-lg p-6 shadow-2xl retro-glow"
        style={{ 
          width: '380px', 
          height: '420px',
          background: 'linear-gradient(145deg, #8B5CF6 0%, #EC4899 50%, #60A5FA 100%)',
          border: '4px solid #4C1D95',
          imageRendering: 'pixelated'
        }}
      >
        {/* Machine Frame */}
        <div className="absolute inset-4 rounded border-4 border-gray-800 overflow-hidden pixel-border"
             style={{
               background: 'linear-gradient(145deg, #FFB6C1 0%, #87CEEB 50%, #DDA0DD 100%)',
               imageRendering: 'pixelated'
             }}>
          
          {/* Top Rainbow Section */}
          <div className="h-10 pixel-border"
               style={{
                 background: 'linear-gradient(90deg, #FF69B4 0%, #FFD700 25%, #00FF7F 50%, #1E90FF 75%, #9370DB 100%)',
                 imageRendering: 'pixelated'
               }}></div>
          
          {/* Glass Panel */}
          <div className="relative h-64 border-2 border-gray-600 pixel-border"
               style={{
                 background: 'linear-gradient(180deg, rgba(173, 216, 230, 0.3) 0%, rgba(135, 206, 235, 0.2) 100%)',
                 imageRendering: 'pixelated'
               }}>
            
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
            
            {/* Collection Box - More Pixelated */}
            <div className="absolute bottom-2 right-2 w-14 h-10 border-3 border-gray-800 pixel-border"
                 style={{
                   background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                   imageRendering: 'pixelated'
                 }}>
              <div className="text-xs text-center text-gray-800 font-bold pixel-text mt-1">📦</div>
            </div>
          </div>
          
          {/* Control Panel */}
          <div className="h-14 border-t-2 border-gray-600 flex items-center justify-center pixel-border"
               style={{
                 background: 'linear-gradient(90deg, #9370DB 0%, #FF69B4 50%, #FFD700 100%)',
                 imageRendering: 'pixelated'
               }}>
            <div className="flex space-x-3">
              <div className="w-4 h-4 bg-red-500 border-2 border-gray-800 pixel-border animate-pulse"></div>
              <div className="w-4 h-4 bg-yellow-400 border-2 border-gray-800 pixel-border animate-pulse"
                   style={{ animationDelay: '0.5s' }}></div>
              <div className="w-4 h-4 bg-green-400 border-2 border-gray-800 pixel-border animate-pulse"
                   style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Coin Slot */}
        <div className="absolute bottom-3 left-8 w-10 h-6 bg-gray-900 border-2 border-gray-600 pixel-border"
             style={{ imageRendering: 'pixelated' }}></div>
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
          <div className="bg-white rounded-lg p-8 shadow-2xl border-4 border-yellow-400 animate-bounce pixel-border retro-glow"
               style={{ imageRendering: 'pixelated' }}>
            <img 
              src={showSuccess.toy.image} 
              alt="Caught toy"
              className="w-32 h-32 mx-auto mb-4 pixel-image"
              style={{
                filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3)) brightness(1.2)',
                imageRendering: 'pixelated'
              }}
            />
            <div className="text-4xl font-bold text-center text-yellow-600 pixel-text">+1</div>
            <div className="text-xl font-bold text-center text-gray-800 pixel-text">✨ Amazing! ✨</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClawMachine;
