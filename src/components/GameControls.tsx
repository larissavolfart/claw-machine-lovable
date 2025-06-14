
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
      {/* Left Arrow Button - Pixel Art Style, baby blue, no black outline */}
      <button
        onClick={onMoveLeft}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold w-20 h-20 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow flex items-center justify-center"
        style={{
          background: disabled ? '#bde8fd' : 'linear-gradient(145deg, #bde8fd 0%, #86c5ec 50%, #52b4f7 100%)',
          border: 'none',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.18), inset -2px -2px 0px rgba(0,0,0,0.03), 2px 2px 0px rgba(0,0,0,0.07)'
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

      {/* GO Button - Purple, clean pixel-style, no black outline, white pixel-art text */}
      <button
        onClick={onDrop}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 font-bold w-24 h-20 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow flex items-center justify-center"
        style={{
          background: disabled ? '#d1aaff' : 'linear-gradient(145deg, #be7df9 0%, #b760fa 50%, #a259e6 100%)',
          border: 'none',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.08), inset -2px -2px 0px rgba(0,0,0,0.01), 2px 2px 0px rgba(0,0,0,0.04)',
        }}
      >
        <span
          style={{
            fontFamily: '"Courier New", monospace',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '28px',
            letterSpacing: '1px',
            textShadow: '1px 1px 0px #fff8, 2px 2px 0px #aa83f930'
          }}
        >
          GO
        </span>
      </button>

      {/* Right Arrow Button - Pixel Art Style, baby blue, no black outline */}
      <button
        onClick={onMoveRight}
        disabled={disabled}
        className="pixel-button disabled:opacity-50 text-white font-bold w-20 h-20 transition-all duration-200 hover:scale-110 active:scale-95 retro-glow flex items-center justify-center"
        style={{
          background: disabled ? '#bde8fd' : 'linear-gradient(145deg, #bde8fd 0%, #86c5ec 50%, #52b4f7 100%)',
          border: 'none',
          borderRadius: '0px',
          imageRendering: 'pixelated',
          boxShadow: disabled ? 'none' : 'inset 2px 2px 0px rgba(255,255,255,0.18), inset -2px -2px 0px rgba(0,0,0,0.03), 2px 2px 0px rgba(0,0,0,0.07)'
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

