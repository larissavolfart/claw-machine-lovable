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

const machineImage = "/lovable-uploads/4ca7261a-26f4-49d7-82e1-75799a5476b6.png";

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
    setClawPosition(prev => ({ ...prev, y: 180 }));
    await new Promise(resolve => setTimeout(resolve, 1000));
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
    await new Promise(resolve => setTimeout(resolve, 500));
    setClawPosition(prev => ({ ...prev, y: 20 }));
    if (caughtToy) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setClawPosition({ x: 280, y: 20 });
      await new Promise(resolve => setTimeout(resolve, 800));
      setClawHasToy(null);
      setScore(prev => prev + 1);
      setShowSuccess({ toy: caughtToy, show: true });
      setTimeout(() => {
        setShowSuccess({ toy: null, show: false });
      }, 2000);
      await new Promise(resolve => setTimeout(resolve, 500));
      setClawPosition({ x: 150, y: 20 });
    }
    setIsClawDescending(false);
    setIsClawMoving(false);
  };

  return (
    <div className="relative flex flex-col items-center w-full pb-6 select-none">
      {/* Transparent horizontal banner */}
      <div className="w-full flex justify-center relative mb-3" style={{ zIndex: 10 }}>
        <div
          className="absolute left-0 right-0 mx-auto h-20"
          style={{
            top: 0,
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(96, 165, 250, 0.3) 100%)',
            imageRendering: 'pixelated',
            borderRadius: '16px',
            width: '100%',
            maxWidth: 440,
            pointerEvents: 'none'
          }}
        />
        {/* Score number, white, centered, no text or stars */}
        <div className="relative flex items-center justify-center w-full h-20" style={{ zIndex: 12 }}>
          <span
            className="text-6xl font-bold"
            style={{
              color: 'white',
              fontFamily: 'Arial, sans-serif',
              textShadow: '3px 3px 0px rgba(0,0,0,0.5), -1px -1px 0px rgba(0,0,0,0.5)'
            }}
          >
            {score}
          </span>
        </div>
      </div>

      {/* Claw Machine Frame and Gameplay Area */}
      <div
        className="relative mx-auto"
        style={{
          width: 380,
          height: 420,
          maxWidth: '94vw',
          maxHeight: '90vw',
        }}
      >
        {/* User's provided pixel art machine image */}
        <img
          src={machineImage}
          alt="Claw machine"
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1, imageRendering: 'pixelated' }}
          draggable={false}
        />

        {/* Overlay the interactive content over the "glass" region of the image */}
        <div
          className="absolute"
          style={{
            left: 44,
            top: 68,
            width: 288,
            height: 272,
            zIndex: 2,
            overflow: 'visible'
          }}
        >
          {/* Claw */}
          <Claw
            position={{
              // Offset, so x: 0 aligns left edge of glass (44px), y: 0 aligns top (68px)
              x: clawPosition.x - 44,
              y: clawPosition.y
            }}
            isDescending={isClawDescending}
            hasToy={clawHasToy}
          />
          {/* Plush toys (not yet collected) */}
          {toys.filter(toy => !toy.collected).map(toy => (
            <PlushToy
              key={toy.id}
              toy={{
                ...toy,
                // Rebase toy coordinates into the new glass area coordinates
                position: {
                  x: toy.position.x - 44,
                  y: toy.position.y - 68
                }
              }}
            />
          ))}

          {/* Collection box in bottom-right of play area */}
          <div
            className="absolute bottom-2 right-2 w-14 h-10 pixel-border"
            style={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              imageRendering: 'pixelated',
              border: '2px solid rgba(80,80,80,0.1)'
            }}
          >
            <div className="text-xs text-center text-gray-800 font-bold pixel-text mt-1">📦</div>
          </div>
        </div>
      </div>

      {/* Controls */}
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
