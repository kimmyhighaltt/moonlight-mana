import React from 'react';
import { Logo } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';

const Splash = ({ onEnter }) => {
  return (
    <div 
      className="relative h-screen w-screen overflow-hidden bg-[#020617] cursor-pointer"
      onClick={onEnter} 
    >
      <CelestialBackground />

      {/* Changed to flex container so the clickable helper sits naturally below the logo */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="animate-cosmic-rhythm px-4 text-center pointer-events-none">
          <Logo size="text-6xl" subtitle="EMBRACE THE FLOW" />
        </div>
        
        <p className="absolute bottom-16 text-slate-400/60 text-[10px] tracking-[0.3em] uppercase font-light animate-pulse-slow">
          Tap to center
        </p>
      </div>

      <style>{`
        /* 🧘 UNIFIED MOTION: Smooth entry + infinite deep breathing cycle combined */
        .animate-cosmic-rhythm {
          animation: cosmicArrival 1500ms ease-out forwards, cosmicPulse 6000ms ease-in-out infinite 1500ms;
        }

        @keyframes cosmicArrival {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.90; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }

        .animate-pulse-slow {
          animation: simplePulse 3s ease-in-out infinite alternate;
        }
        @keyframes simplePulse {
          from { opacity: 0.2; }
          to { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default Splash;