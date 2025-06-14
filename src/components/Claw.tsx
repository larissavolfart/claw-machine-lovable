
import React from 'react';

interface ClawProps {
  position: { x: number; y: number };
  isDescending: boolean;
  hasToy: any;
}

const Claw = ({ position, isDescending, hasToy }: ClawProps) => {
  return (
    <div className="absolute transition-all duration-1000 ease-in-out z-30">
      {/* Claw Cable */}
      <div 
        className="absolute bg-gray-700 pixel-border"
        style={{
          left: `${position.x + 8}px`,
          top: '0px',
          width: '2px',
          height: `${position.y + 15}px`
        }}
      ></div>
      
      {/* Claw Body */}
      <div 
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isDescending ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {/* Claw Base */}
        <div className="relative w-4 h-6 bg-gray-600 border-2 border-gray-800 pixel-border">
          {/* Claw Arms */}
          <div className="absolute -left-1 top-4 w-2 h-4 bg-gray-700 border border-gray-900 transform rotate-12 pixel-border"></div>
          <div className="absolute -right-1 top-4 w-2 h-4 bg-gray-700 border border-gray-900 transform -rotate-12 pixel-border"></div>
          <div className="absolute left-1 top-5 w-2 h-4 bg-gray-700 border border-gray-900 pixel-border"></div>
        </div>
        
        {/* Toy attached to claw */}
        {hasToy && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <img 
              src={hasToy.image} 
              alt={hasToy.type}
              className="w-8 h-8 pixel-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Claw;
