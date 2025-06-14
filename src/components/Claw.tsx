
import React from 'react';

interface ClawProps {
  position: { x: number; y: number };
  isDescending: boolean;
  hasToy: any;
}

const Claw = ({ position, isDescending, hasToy }: ClawProps) => {
  return (
    <div className="absolute transition-all duration-1000 ease-in-out z-30">
      {/* Cute Pixelated Cable */}
      <div 
        className="absolute pixel-border"
        style={{
          left: `${position.x + 10}px`,
          top: '0px',
          width: '4px',
          height: `${position.y + 20}px`,
          background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          border: '1px solid #B8860B',
          imageRendering: 'pixelated'
        }}
      ></div>
      
      {/* Cute Claw Body */}
      <div 
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isDescending ? 'scale(1.2)' : 'scale(1)'
        }}
      >
        {/* Main Claw Head - Cute and Round */}
        <div className="relative w-6 h-8 pixel-border"
             style={{
               background: 'linear-gradient(145deg, #FF69B4 0%, #FF1493 50%, #C71585 100%)',
               border: '2px solid #8B008B',
               borderRadius: '0px',
               imageRendering: 'pixelated'
             }}>
          
          {/* Cute Eyes */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-white pixel-border"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-white pixel-border"></div>
          
          {/* Cute Mouth */}
          <div className="absolute top-3 left-2 w-2 h-1 bg-white pixel-border rounded-none"
               style={{ imageRendering: 'pixelated' }}></div>
        </div>
        
        {/* Claw Arms - More Colorful and Cute */}
        <div className="absolute -left-2 top-6 w-3 h-5 pixel-border transform rotate-12"
             style={{
               background: 'linear-gradient(45deg, #FF69B4, #FF1493)',
               border: '1px solid #8B008B',
               imageRendering: 'pixelated'
             }}></div>
        <div className="absolute -right-2 top-6 w-3 h-5 pixel-border transform -rotate-12"
             style={{
               background: 'linear-gradient(45deg, #FF69B4, #FF1493)',
               border: '1px solid #8B008B',
               imageRendering: 'pixelated'
             }}></div>
        <div className="absolute left-1 top-7 w-3 h-5 pixel-border"
             style={{
               background: 'linear-gradient(180deg, #FF69B4, #FF1493)',
               border: '1px solid #8B008B',
               imageRendering: 'pixelated'
             }}></div>
        
        {/* Toy attached to claw */}
        {hasToy && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
            <img 
              src={hasToy.image} 
              alt={hasToy.type}
              className="w-10 h-10 pixel-image"
              style={{
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                imageRendering: 'pixelated'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Claw;
