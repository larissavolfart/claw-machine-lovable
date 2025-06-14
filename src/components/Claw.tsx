
import React from 'react';

interface ClawProps {
  position: { x: number; y: number };
  isDescending: boolean;
  hasToy: any;
}

const Claw = ({ position, isDescending, hasToy }: ClawProps) => {
  return (
    <div className="absolute transition-all duration-1000 ease-in-out z-30">
      {/* Cable */}
      <div 
        className="absolute pixel-border"
        style={{
          left: `${position.x + 10}px`,
          top: '0px',
          width: '4px',
          height: `${position.y + 15}px`,
          background: 'linear-gradient(90deg, #4A5568 0%, #2D3748 50%, #4A5568 100%)',
          border: '1px solid #1A202C',
          imageRendering: 'pixelated'
        }}
      ></div>
      
      {/* Claw Assembly */}
      <div 
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          left: `${position.x - 2}px`,
          top: `${position.y}px`,
          transform: isDescending ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {/* Main Claw Head/Mechanism */}
        <div className="relative w-8 h-6 pixel-border"
             style={{
               background: 'linear-gradient(145deg, #E2E8F0 0%, #CBD5E0 50%, #A0AEC0 100%)',
               border: '2px solid #4A5568',
               borderRadius: '0px',
               imageRendering: 'pixelated'
             }}>
          
          {/* Mechanical details */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-gray-800 pixel-border"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-gray-800 pixel-border"></div>
          <div className="absolute top-3 left-2 w-4 h-1 bg-gray-600 pixel-border"></div>
        </div>
        
        {/* Claw Arms - Three prongs like in reference */}
        {/* Left Arm */}
        <div className="absolute -left-1 top-5 w-2 h-6 pixel-border transform rotate-12"
             style={{
               background: 'linear-gradient(45deg, #CBD5E0, #A0AEC0)',
               border: '1px solid #4A5568',
               imageRendering: 'pixelated',
               clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 90%)'
             }}></div>
             
        {/* Right Arm */}
        <div className="absolute -right-1 top-5 w-2 h-6 pixel-border transform -rotate-12"
             style={{
               background: 'linear-gradient(45deg, #CBD5E0, #A0AEC0)',
               border: '1px solid #4A5568',
               imageRendering: 'pixelated',
               clipPath: 'polygon(0 0, 100% 0, 100% 90%, 20% 100%)'
             }}></div>
             
        {/* Center Arm */}
        <div className="absolute left-2 top-5 w-2 h-7 pixel-border"
             style={{
               background: 'linear-gradient(180deg, #CBD5E0, #A0AEC0)',
               border: '1px solid #4A5568',
               imageRendering: 'pixelated',
               clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)'
             }}></div>
        
        {/* Claw Tips */}
        <div className="absolute -left-1 top-10 w-1 h-2 bg-gray-700 pixel-border transform rotate-12"></div>
        <div className="absolute -right-1 top-10 w-1 h-2 bg-gray-700 pixel-border transform -rotate-12"></div>
        <div className="absolute left-3 top-11 w-1 h-2 bg-gray-700 pixel-border"></div>
        
        {/* Toy attached to claw */}
        {hasToy && (
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
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
