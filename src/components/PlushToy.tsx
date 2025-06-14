
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
      className="absolute transition-all duration-300 hover:scale-110 z-10"
      style={{
        left: `${toy.position.x}px`,
        top: `${toy.position.y}px`,
        transform: `rotate(${Math.random() * 20 - 10}deg)`
      }}
    >
      <img 
        src={toy.image} 
        alt={toy.type}
        className="w-12 h-12 pixel-image drop-shadow-sm"
        style={{
          imageRendering: 'pixelated',
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
        }}
      />
    </div>
  );
};

export default PlushToy;
