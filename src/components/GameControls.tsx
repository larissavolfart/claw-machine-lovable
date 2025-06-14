
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
      {/* Left Arrow Button - Pixel Art Style, baby blue, roxo border */}
      <button
        onClick={onMoveLeft}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold w-20 h-20 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow flex items-center justify-center"
        style={{
          background: disabled ? '#bde8fd' : 'linear-gradient(145deg, #bde8fd 0%, #86c5ec 50%, #52b4f7 100%)',
          border: '4px solid #a78bfa', // Roxo
          borderRadius: '16px',
          imageRendering: 'pixelated',
          boxShadow: 'none'
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

      {/* GO Button - Roxo, margens roxas, texto branco pixelado clean */}
      <button
        onClick={onDrop}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 font-bold w-24 h-20 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow flex items-center justify-center"
        style={{
          background: disabled ? '#d1aaff' : 'linear-gradient(145deg, #be7df9 0%, #b760fa 50%, #a259e6 100%)',
          border: '4px solid #a78bfa', // Roxo
          borderRadius: '16px',
          imageRendering: 'pixelated',
          boxShadow: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace, "Courier New", "Lucida Console"',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '28px',
            letterSpacing: '1px',
            textShadow: 'none'
          }}
        >
          GO
        </span>
      </button>

      {/* Right Arrow Button - Pixel Art Style, baby blue, roxo border */}
      <button
        onClick={onMoveRight}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold w-20 h-20 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow flex items-center justify-center"
        style={{
          background: disabled ? '#bde8fd' : 'linear-gradient(145deg, #bde8fd 0%, #86c5ec 50%, #52b4f7 100%)',
          border: '4px solid #a78bfa', // Roxo
          borderRadius: '16px',
          imageRendering: 'pixelated',
          boxShadow: 'none'
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
