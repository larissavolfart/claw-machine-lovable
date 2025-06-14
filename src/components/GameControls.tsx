
import React from 'react';

interface GameControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onDrop: () => void;
  disabled: boolean;
}

const GameControls = ({ onMoveLeft, onMoveRight, onDrop, disabled }: GameControlsProps) => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-6">
      
      {/* Left Arrow Button - Pixel Art Style */}
      <button
        onClick={onMoveLeft}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold w-20 h-20 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow flex items-center justify-center"
        style={{
          background: disabled ? '#6B7280' : 'linear-gradient(145deg, #60A5FA 0%, #3B82F6 50%, #1D4ED8 100%)',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.3), inset -2px -2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2)'
        }}
      >
        {/* Pixel Art Left Arrow */}
        <div className="relative">
          <div className="w-8 h-8 relative">
            {/* Arrow shaft */}
            <div className="absolute top-3 left-2 w-4 h-2 bg-white pixel-border"></div>
            {/* Arrow head */}
            <div className="absolute top-2 left-1 w-2 h-1 bg-white pixel-border"></div>
            <div className="absolute top-3 left-0 w-2 h-2 bg-white pixel-border"></div>
            <div className="absolute top-5 left-1 w-2 h-1 bg-white pixel-border"></div>
          </div>
        </div>
      </button>

      {/* GO Button with Pixel Font */}
      <button
        onClick={onDrop}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold w-24 h-20 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow"
        style={{
          background: disabled ? '#6B7280' : 'linear-gradient(145deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.3), inset -2px -2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2)',
          fontFamily: '"Courier New", "Lucida Console", monospace',
          fontSize: '18px',
          textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
          letterSpacing: '2px'
        }}
      >
        GO!
      </button>

      {/* Right Arrow Button - Pixel Art Style */}
      <button
        onClick={onMoveRight}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold w-20 h-20 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow flex items-center justify-center"
        style={{
          background: disabled ? '#6B7280' : 'linear-gradient(145deg, #60A5FA 0%, #3B82F6 50%, #1D4ED8 100%)',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.3), inset -2px -2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2)'
        }}
      >
        {/* Pixel Art Right Arrow */}
        <div className="relative">
          <div className="w-8 h-8 relative">
            {/* Arrow shaft */}
            <div className="absolute top-3 left-2 w-4 h-2 bg-white pixel-border"></div>
            {/* Arrow head */}
            <div className="absolute top-2 left-5 w-2 h-1 bg-white pixel-border"></div>
            <div className="absolute top-3 left-6 w-2 h-2 bg-white pixel-border"></div>
            <div className="absolute top-5 left-5 w-2 h-1 bg-white pixel-border"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default GameControls;
