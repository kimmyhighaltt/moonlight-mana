import React from 'react';
import CelestialBackground from '../components/CelestialBackground';

const ValuePage = ({ onContinue }) => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#020617] text-white font-sans">
      {/* 🌌 KEEP THE UNIVERSE MOVING */}
      <CelestialBackground />

      {/* 🕯️ CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center animate-fade-in">
        
        {/* HEADER SECTION */}
        <h1 className="text-2xl md:text-3xl font-light tracking-wide mb-2">
          Your Daily Ritual, <span className="italic">Simplified.</span>
        </h1>
        <p className="text-fuchsia-300/90 text-sm md:text-base mb-8 tracking-widest uppercase">
          Stop forgetting your tarot messages
        </p>

        {/* FEATURE LIST */}
        <div className="w-full max-w-sm space-y-6 mb-10 text-left bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-start space-x-4">
            <span className="text-amber-400 text-xl">✨</span>
            <p className="text-sm md:text-base leading-relaxed">
              <strong className="block text-white">Daily Tarot Journal</strong>
              Capture the essence of every pull before the moment fades.
            </p>
          </div>
          
          <div className="flex items-start space-x-4">
            <span className="text-violet-400 text-xl">🌙</span>
            <p className="text-sm md:text-base leading-relaxed">
              <strong className="block text-white">Lunar Alignment</strong>
              Track your energy alongside the current moon phase.
            </p>
          </div>

          <div className="flex items-start space-x-4">
            <span className="text-cyan-400 text-xl">🕯️</span>
            <p className="text-sm md:text-base leading-relaxed">
              <strong className="block text-white">Your Sacred Space</strong>
              Ad-free, private, and designed for your spiritual growth.
            </p>
          </div>
        </div>

        {/* THE "ENTER" BUTTON */}
        <button 
          onClick={onContinue}
          className="w-full max-w-xs py-4 bg-white text-[#020617] font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-widest text-sm"
        >
          Enter My Sanctuary
        </button>
        
        <p className="mt-4 text-[10px] text-white/40 uppercase tracking-[0.2em]">
          No sign-up required to begin
        </p>
      </div>

      <style>{`
        .animate-fade-in {
          animation: pageFadeIn 1s ease-out forwards;
        }
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ValuePage;