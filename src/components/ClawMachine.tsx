
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

const PLUSH_Y_OFFSET = 42; // Mais puxado pra cima ainda!

const ClawMachine = () => {
  const [clawPosition, setClawPosition] = useState({ x: 150, y: 20 });
  const [isClawMoving, setIsClawMoving] = useState(false);
  const [isClawDescending, setIsClawDescending] = useState(false);
  const [toys, setToys] = useState([
    { id: 1, type: 'cat-bow', position: { x: 40, y: 200 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/31a95875-ffa3-4ed6-9e67-d1cf2f048490.png' },
    { id: 2, type: 'dog-purple', position: { x: 160, y: 190 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/e8d0132b-4379-4d0b-8d25-f8e984a41cb7.png' },
    { id: 3, type: 'chick-2', position: { x: 100, y: 230 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/5f2d3e4e-8703-4321-a0ba-3d8efce5df42.png' },
    { id: 4, type: 'koala-blue', position: { x: 230, y: 200 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/49fb5f07-2809-4851-bf2c-b3ae6efcd8a1.png' },
    { id: 5, type: 'cat-bow-2', position: { x: 70, y: 180 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/31a95875-ffa3-4ed6-9e67-d1cf2f048490.png' },
    { id: 6, type: 'dog-purple-2', position: { x: 200, y: 220 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/e8d0132b-4379-4d0b-8d25-f8e984a41cb7.png' },
    { id: 7, type: 'chick-3', position: { x: 130, y: 210 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/5f2d3e4e-8703-4321-a0ba-3d8efce5df42.png' },
    { id: 8, type: 'koala-blue-2', position: { x: 50, y: 240 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/49fb5f07-2809-4851-bf2c-b3ae6efcd8a1.png' },
    { id: 9, type: 'cat-bow-3', position: { x: 180, y: 240 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/31a95875-ffa3-4ed6-9e67-d1cf2f048490.png' },
    { id: 10, type: 'dog-purple-3', position: { x: 220, y: 180 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/e8d0132b-4379-4d0b-8d25-f8e984a41cb7.png' },
    { id: 11, type: 'chick-4', position: { x: 80, y: 220 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/5f2d3e4e-8703-4321-a0ba-3d8efce5df42.png' },
    { id: 12, type: 'koala-blue-3', position: { x: 250, y: 240 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/49fb5f07-2809-4851-bf2c-b3ae6efcd8a1.png' },
    { id: 13, type: 'cat-bow-4', position: { x: 120, y: 190 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/31a95875-ffa3-4ed6-9e67-d1cf2f048490.png' },
    { id: 14, type: 'dog-purple-4', position: { x: 90, y: 200 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/e8d0132b-4379-4d0b-8d25-f8e984a41cb7.png' },
    { id: 15, type: 'chick-5', position: { x: 210, y: 195 - PLUSH_Y_OFFSET }, collected: false, image: '/lovable-uploads/5f2d3e4e-8703-4321-a0ba-3d8efce5df42.png' }
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
        {/* Transparent horizontal banner - mais arredondado */}
        <div 
          className="absolute inset-0 w-full h-16"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 182, 193, 0.4) 0%, rgba(255, 192, 203, 0.4) 30%, rgba(221, 160, 221, 0.4) 70%, rgba(173, 216, 230, 0.4) 100%)',
            borderRadius: "24px",
            boxShadow: '0 8px 32px rgba(255, 182, 193, 0.3)',
          }}
        ></div>
        {/* Score mais fofo */}
        <div className="relative flex items-center justify-center z-10 py-4">
          <div
            className="text-5xl font-bold flex items-center justify-center"
            style={{
              fontFamily: 'Arial, sans-serif',
              color: 'white',
              background: "linear-gradient(145deg, rgba(255, 182, 193, 0.8), rgba(255, 192, 203, 0.9))",
              borderRadius: "50%",
              width: "78px",
              height: "78px",
              minWidth: "78px",
              minHeight: "78px",
              margin: "0 auto",
              padding: "0",
              border: "4px solid #FFB6C1",
              textAlign: "center",
              lineHeight: "78px",
              boxShadow: '0 4px 20px rgba(255, 182, 193, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.3)',
            }}
          >
            {score}
          </div>
        </div>
      </div>

      {/* Machine container - muito mais fofa */}
      <div 
        ref={machineRef}
        className="relative mx-auto p-6 shadow-2xl"
        style={{ 
          width: '380px', 
          height: '420px',
          background: 'linear-gradient(145deg, #FFB6C1 0%, #FFE4E1 30%, #E6E6FA 70%, #F0F8FF 100%)',
          border: '6px solid #FFB6C1',
          borderRadius: '32px',
          boxShadow: '0 16px 40px rgba(255, 182, 193, 0.4), 0 8px 20px rgba(255, 192, 203, 0.3), inset 0 4px 20px rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Machine Frame - mais arredondado */}
        <div className="absolute inset-4 overflow-hidden"
             style={{
               background: 'linear-gradient(145deg, #FFF0F5 0%, #F8F8FF 50%, #F0FFFF 100%)',
               borderRadius: '24px',
               border: '4px solid #FFB6C1',
               boxShadow: 'inset 0 4px 15px rgba(255, 182, 193, 0.2)',
             }}>
          
          {/* Top Rainbow Section - mais suave */}
          <div className="h-10"
               style={{
                 background: 'linear-gradient(90deg, #FFB6C1 0%, #FFEFD5 20%, #E0FFFF 40%, #F0E68C 60%, #DDA0DD 80%, #FFB6C1 100%)',
                 borderRadius: '20px 20px 0 0',
               }}></div>
          
          {/* Glass Panel - mais delicado */}
          <div className="relative h-64"
               style={{
                 background: 'linear-gradient(180deg, rgba(240, 248, 255, 0.6) 0%, rgba(230, 230, 250, 0.4) 100%)',
                 borderRadius: '0 0 20px 20px',
                 border: '2px solid rgba(255, 182, 193, 0.3)',
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
            
            {/* Collection Box - mais fofinho */}
            <div className="absolute bottom-2 right-2 w-14 h-10"
                 style={{
                   background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                   borderRadius: '12px',
                   border: '3px solid #FFB6C1',
                   boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
                 }}>
              <div className="text-xs text-center text-gray-800 font-bold mt-1">📦</div>
            </div>
          </div>
          
          {/* Control Panel - mais arredondado */}
          <div className="h-14 flex items-center justify-center"
               style={{
                 background: 'linear-gradient(90deg, #FFB6C1 0%, #DDA0DD 30%, #F0E68C 70%, #FFB6C1 100%)',
                 borderRadius: '0 0 20px 20px',
                 borderTop: '2px solid rgba(255, 182, 193, 0.5)',
               }}>
            <div className="flex space-x-4">
              <div className="w-5 h-5 bg-gradient-to-br from-red-400 to-red-500 animate-pulse"
                   style={{ borderRadius: '50%', border: '2px solid white', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)' }}></div>
              <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 animate-pulse"
                   style={{ borderRadius: '50%', border: '2px solid white', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)', animationDelay: '0.5s' }}></div>
              <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 animate-pulse"
                   style={{ borderRadius: '50%', border: '2px solid white', boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)', animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Coin Slot - mais fofo */}
        <div className="absolute bottom-4 left-8 w-12 h-6 bg-gradient-to-br from-gray-600 to-gray-800"
             style={{ 
               borderRadius: '12px',
               border: '2px solid #FFB6C1',
               boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(255, 182, 193, 0.3)',
             }}></div>
      </div>

      <GameControls 
        onMoveLeft={moveClawLeft}
        onMoveRight={moveClawRight}
        onDrop={dropClaw}
        disabled={isClawMoving}
      />

      {/* Success Animation - mais fofa */}
      {showSuccess.show && showSuccess.toy && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-white p-8 shadow-2xl animate-bounce"
               style={{ 
                 borderRadius: '24px',
                 border: '4px solid #FFD700',
                 boxShadow: '0 16px 40px rgba(255, 215, 0, 0.4), 0 8px 20px rgba(255, 182, 193, 0.3)',
                 background: 'linear-gradient(145deg, #FFFAF0, #FFF8DC)',
               }}>
            <img 
              src={showSuccess.toy.image} 
              alt="Caught toy"
              className="w-32 h-32 mx-auto mb-4"
              style={{
                filter: 'drop-shadow(4px 4px 12px rgba(0,0,0,0.2)) brightness(1.2)',
                imageRendering: 'pixelated'
              }}
            />
            <div className="text-4xl font-bold text-center text-yellow-600"
                 style={{
                   fontFamily: '"Courier New", "Lucida Console", monospace',
                   textShadow: '2px 2px 0px rgba(255,255,255,0.8), 0 0 10px rgba(255, 215, 0, 0.5)'
                 }}>+1</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClawMachine;
