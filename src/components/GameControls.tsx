
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
      
      {/* Left Arrow Button */}
      <button
        onClick={onMoveLeft}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold text-3xl w-20 h-20 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow"
        style={{
          background: disabled ? '#6B7280' : 'linear-gradient(145deg, #60A5FA 0%, #3B82F6 50%, #1D4ED8 100%)',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.3), inset -2px -2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2)'
        }}
      >
        ⬅️
      </button>

      {/* GO Button */}
      <button
        onClick={onDrop}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold text-2xl w-24 h-20 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow"
        style={{
          background: disabled ? '#6B7280' : 'linear-gradient(145deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.3), inset -2px -2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2)'
        }}
      >
        GO!
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={onMoveRight}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold text-3xl w-20 h-20 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow"
        style={{
          background: disabled ? '#6B7280' : 'linear-gradient(145deg, #60A5FA 0%, #3B82F6 50%, #1D4ED8 100%)',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.3), inset -2px -2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2)'
        }}
      >
        ➡️
      </button>
    </div>
  );
};

export default GameControls;
