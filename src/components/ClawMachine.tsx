
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
    { id: 1, type: 'cat-bow', position: { x: 40, y: 200 }, collected: false, image: '/lovable-uploads/31a95875-ffa3-4ed6-9e67-d1cf2f048490.png' },
    { id: 2, type: 'dog-purple', position: { x: 160, y: 190 }, collected: false, image: '/lovable-uploads/e8d0132b-4379-4d0b-8d25-f8e984a41cb7.png' },
    { id: 3, type: 'chick-2', position: { x: 100, y: 230 }, collected: false, image: '/lovable-uploads/5f2d3e4e-8703-4321-a0ba-3d8efce5df42.png' },
    { id: 4, type: 'koala-blue', position: { x: 230, y: 200 }, collected: false, image: '/lovable-uploads/49fb5f07-2809-4851-bf2c-b3ae6efcd8a1.png' },
    { id: 5, type: 'cat-bow-2', position: { x: 70, y: 180 }, collected: false, image: '/lovable-uploads/31a95875-ffa3-4ed6-9e67-d1cf2f048490.png' },
    { id: 6, type: 'dog-purple-2', position: { x: 200, y: 220 }, collected: false, image: '/lovable-uploads/e8d0132b-4379-4d0b-8d25-f8e984a41cb7.png' },
    { id: 7, type: 'chick-3', position: { x: 130, y: 210 }, collected: false, image: '/lovable-uploads/5f2d3e4e-8703-4321-a0ba-3d8efce5df42.png' },
    { id: 8, type: 'koala-blue-2', position: { x: 50, y: 240 }, collected: false, image: '/lovable-uploads/49fb5f07-2809-4851-bf2c-b3ae6efcd8a1.png' },
    { id: 9, type: 'cat-bow-3', position: { x: 180, y: 240 }, collected: false, image: '/lovable-uploads/31a95875-ffa3-4ed6-9e67-d1cf2f048490.png' },
    { id: 10, type: 'dog-purple-3', position: { x: 220, y: 180 }, collected: false, image: '/lovable-uploads/e8d0132b-4379-4d0b-8d25-f8e984a41cb7.png' },
    { id: 11, type: 'chick-4', position: { x: 80, y: 220 }, collected: false, image: '/lovable-uploads/5f2d3e4e-8703-4321-a0ba-3d8efce5df42.png' },
    { id: 12, type: 'koala-blue-3', position: { x: 250, y: 240 }, collected: false, image: '/lovable-uploads/49fb5f07-2809-4851-bf2c-b3ae6efcd8a1.png' },
    { id: 13, type: 'cat-bow-4', position: { x: 120, y: 190 }, collected: false, image: '/lovable-uploads/31a95875-ffa3-4ed6-9e67-d1cf2f048490.png' },
    { id: 14, type: 'dog-purple-4', position: { x: 90, y: 200 }, collected: false, image: '/lovable-uploads/e8d0132b-4379-4d0b-8d25-f8e984a41cb7.png' },
    { id: 15, type: 'chick-5', position: { x: 210, y: 195 }, collected: false, image: '/lovable-uploads/5f2d3e4e-8703-4321-a0ba-3d8efce5df42.png' }
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
      {/* UI top section: clean counter, no stars, banner remains */}
      <div className="relative mb-6 flex flex-col items-center">
        {/* Transparent horizontal banner */}
        <div 
          className="absolute inset-0 w-full h-16 pixel-border"
          style={{
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(96, 165, 250, 0.3) 100%)',
            imageRendering: 'pixelated',
            borderRadius: "20px",
          }}
        ></div>
        {/* Centralized score number, plain white, no shadow */}
        <div className="relative flex items-center justify-center z-10 py-4">
          <div
            className="text-5xl font-bold flex items-center justify-center"
            style={{
              fontFamily: 'Arial, sans-serif',
              color: 'white',
              background: "rgba(100,70,200,0.70)", // Suave fundo roxo translúcido
              borderRadius: "9999px",
              width: "78px",
              height: "78px",
              minWidth: "78px",
              minHeight: "78px",
              margin: "0 auto",
              padding: "0",
              boxShadow: "none",
              border: "4px solid #a78bfa", // Roxo claro da paleta tailwind
              textAlign: "center",
              lineHeight: "78px",
            }}
          >
            {score}
          </div>
        </div>
      </div>

      {/* Machine container */}
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

      {/* Success Animation - Only +1, no text */}
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
            <div className="text-4xl font-bold text-center text-yellow-600 pixel-text"
                 style={{
                   fontFamily: '"Courier New", "Lucida Console", monospace',
                   textShadow: '2px 2px 0px rgba(0,0,0,0.5)'
                 }}>+1</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClawMachine;

