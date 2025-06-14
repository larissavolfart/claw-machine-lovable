
import React from 'react';

interface Toy {
  id: number;
  type: string;
  position: { x: number; y: number };
  collected: boolean;
  image: string;
}

interface PlushToyProps {
  toy: Toy;
}

const PlushToy = ({ toy }: PlushToyProps) => {
  return (
    <div 
      className="absolute transition-all duration-300 hover:scale-125 z-10 float-animation"
      style={{
        left: `${toy.position.x}px`,
        top: `${toy.position.y}px`,
        transform: `rotate(${Math.random() * 15 - 7.5}deg)`
      }}
    >
      <img 
        src={toy.image} 
        alt={toy.type}
        className="w-16 h-16 pixel-image"
        style={{
          imageRendering: 'pixelated',
          filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4)) brightness(1.1) saturate(1.2)',
          background: 'transparent'
        }}
      />
      {/* Cute sparkle effect */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 pixel-border animate-pulse"
           style={{ 
             clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
             imageRendering: 'pixelated'
           }}></div>
    </div>
  );
};

export default PlushToy;
