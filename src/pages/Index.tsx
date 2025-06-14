
import ClawMachine from '../components/ClawMachine';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg pixel-text">
          🎮 PIXEL CLAW MACHINE 🎮
        </h1>
        <ClawMachine />
      </div>
    </div>
  );
};

export default Index;
