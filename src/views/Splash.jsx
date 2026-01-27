import React from 'react';
import { Logo } from '../components/UIComponents';
import { THEME } from '../constants/index';

const Splash = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center animate-fade-in" style={{ backgroundColor: THEME.bg }}>
      <div className="animate-pulse-slow">
        <Logo size="text-6xl" subtitle="EMBRACE THE FLOW" />
      </div>
      <style>{`
        @keyframes pulse-slow { 
          0%, 100% { transform: scale(1); opacity: 0.8; } 
          50% { transform: scale(1.08); opacity: 1; } 
        }
      `}</style>
    </div>
  );
};

export default Splash;