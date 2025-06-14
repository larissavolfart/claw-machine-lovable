
import React from 'react';

interface GameControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onDrop: () => void;
  disabled: boolean;
}

const GameControls = ({ onMoveLeft, onMoveRight, onDrop, disabled }: GameControlsProps) => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      
      {/* Left Arrow Button */}
      <button
        onClick={onMoveLeft}
        disabled={disabled}
        className="pixel-button bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold text-2xl w-16 h-16 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        ⬅️
      </button>

      {/* GO Button */}
      <button
        onClick={onDrop}
        disabled={disabled}
        className="pixel-button bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold text-xl w-20 h-16 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        GO!
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={onMoveRight}
        disabled={disabled}
        className="pixel-button bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold text-2xl w-16 h-16 border-4 border-gray-800 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        ➡️
      </button>
    </div>
  );
};

export default GameControls;
