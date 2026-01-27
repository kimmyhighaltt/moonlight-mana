import React from 'react';
import { 
  Moon, Star, Cloud, ShieldCheck, Home, BookOpen, ChevronLeft 
} from 'lucide-react';
import { THEME } from '../constants/index';

export const Logo = ({ size = "text-xl", subtitle = "DAILY TAROT REFLECTION", showStars = true, color = THEME.primary }) => (
  <div className="flex flex-col items-center select-none text-center relative z-10 animate-fade-in py-4">
    {showStars && (
      <div className="flex gap-4 mb-[-8px] opacity-80">
        <Star size={10} fill={color} color={color} />
        <Star size={14} fill={color} color={color} className="mt-[-4px]" />
        <Moon size={16} fill={color} color={color} className="mt-[-8px]" />
        <Star size={14} fill={color} color={color} className="mt-[-4px]" />
        <Star size={10} fill={color} color={color} />
      </div>
    )}
    <h1 className={`${size} font-serif tracking-tight`} style={{ color: color }}>Moonlight Mana</h1>
    {subtitle && <span className="text-[10px] tracking-[0.3em] uppercase opacity-80 font-bold -mt-1" style={{ color: color }}>{subtitle}</span>}
  </div>
);

export const GraphGrid = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-40" 
       style={{ backgroundImage: `linear-gradient(to right, ${THEME.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${THEME.gridColor} 1px, transparent 1px)`, backgroundSize: '25px 25px' }} />
);

// UPDATED: No longer strictly absolute on mobile. 
// It now adapts to the parent container to prevent overlapping.
export const StatusHeader = ({ isOnline, onBack, className = "" }) => (
  <div className={`flex items-center gap-4 z-20 ${className}`}>
    {onBack && (
      <button 
        onClick={onBack} 
        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105 active:scale-95"
      >
        <ChevronLeft size={16} />
      </button>
    )}
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold border transition-all ${isOnline ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-orange-500/30 text-orange-400 bg-orange-500/5'}`}>
      <Cloud size={12} /> <span className="hidden xs:inline">{isOnline ? 'Live' : 'Offline'}</span>
    </div>
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold border border-white/10 text-white/40 bg-white/5">
      <ShieldCheck size={12} /> <span className="hidden xs:inline">Secured</span>
    </div>
  </div>
);

export const BottomNav = ({ view, setView }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 pt-3 pb-8 md:pb-12 flex justify-around items-center z-50 rounded-t-[32px] md:rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] transition-all">
    <button onClick={() => setView('dashboard')} className={`flex flex-col items-center gap-1 transition-all ${['dashboard', 'reflection', 'tracker'].includes(view) ? 'text-slate-800 scale-110' : 'text-gray-300 hover:text-gray-400'}`}>
      <Home size={24} fill={['dashboard', 'reflection', 'tracker'].includes(view) ? 'currentColor' : 'none'} />
      <span className="text-[8px] font-black uppercase tracking-widest">Today</span>
    </button>
    <button onClick={() => setView('vault')} className={`flex flex-col items-center gap-1 transition-all ${view === 'vault' ? 'text-slate-800 scale-110' : 'text-gray-300 hover:text-gray-400'}`}>
      <BookOpen size={24} fill={view === 'vault' ? 'currentColor' : 'none'} />
      <span className="text-[8px] font-black uppercase tracking-widest">Vault</span>
    </button>
    <button onClick={() => setView('planner')} className={`flex flex-col items-center gap-1 transition-all ${view === 'planner' ? 'text-slate-800 scale-110' : 'text-gray-300 hover:text-gray-400'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${view === 'planner' ? 'bg-gold shadow-lg shadow-gold/30' : 'bg-gray-100'}`} style={{ backgroundColor: view === 'planner' ? THEME.primary : '' }}>
        <Moon size={14} fill="white" color="white" />
      </div>
    </button>
  </nav>
);