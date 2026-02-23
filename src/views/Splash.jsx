import React from 'react';
import { Logo } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';

const Splash = () => {
  return (
    /* h-screen and w-screen ensure the flexbox has the full space to center the content */
    <div className="relative h-screen w-screen overflow-hidden bg-[#020617]">
      
      {/* 🌌 THE UNIVERSE BASE */}
      <CelestialBackground />

      {/* 🕯️ THE LOGO CONTAINER - Forced to absolute center */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="animate-fade-in px-4 text-center">
          <div className="animate-pulse-slow">
            <Logo size="text-6xl" subtitle="EMBRACE THE FLOW" />
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
};

export default Splash;