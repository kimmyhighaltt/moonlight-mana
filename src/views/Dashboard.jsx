import React from 'react';
import { Globe, Moon, ShoppingBag, ExternalLink } from 'lucide-react';
import { THEME, SACRED_TOOLS } from '../constants/index';
import { StatusHeader, BottomNav } from '../components/UIComponents';

const Dashboard = ({ hemisphere, toggleHemisphere, setView, isOnline, moonData }) => {
  // We duplicate the tools list to create a seamless infinite loop
  const carouselItems = [...SACRED_TOOLS, ...SACRED_TOOLS];

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 pb-40 relative overflow-hidden animate-slide-up" style={{ backgroundColor: THEME.bg, color: '#FFFFFF' }}>
      <StatusHeader isOnline={isOnline} />
      
      {/* HEADER SECTION */}
      <header className="mt-16 flex flex-col items-center relative z-10">
        <button onClick={toggleHemisphere} className="flex items-center gap-2 mb-4 px-5 py-2.5 rounded-full border border-gold/20 hover:bg-gold/5 transition-all bg-white/5 backdrop-blur-sm shadow-lg">
          <Globe size={14} color={THEME.primary} />
          <p className="text-[11px] tracking-[0.2em] uppercase font-black" style={{ color: THEME.primary }}>
            {hemisphere} Hemisphere
          </p>
        </button>
        <h1 className="text-5xl font-bold tracking-tight text-center">Moonlight Mana</h1>
      </header>

      {/* MAIN MOON CARD */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl mt-10">
        <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[60px] p-12 flex flex-col items-center shadow-2xl group cursor-pointer hover:bg-white/10 transition-all">
          <div className="relative mb-8">
            <div className="w-40 h-40 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-spin-slow">
              <Moon size={72} color={THEME.primary} className={hemisphere === 'Northern' ? 'rotate-180' : ''} />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-6xl font-light tracking-tight mb-2">{moonData.percentage}%</h2>
            <p className="text-[12px] tracking-[0.4em] uppercase opacity-40 font-black" style={{ color: THEME.primary }}>
              {moonData.label}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setView('reflection')} 
          className="mt-12 px-20 py-7 rounded-full font-black uppercase tracking-widest text-[13px] shadow-[0_30px_60px_-15px_rgba(212,175,55,0.4)] transition-all hover:scale-105 active:scale-95" 
          style={{ backgroundColor: THEME.primary, color: THEME.bg }}
        >
          Begin Ritual
        </button>
      </main>

      {/* NEW: INFINITE CAROUSEL SECTION */}
      <section className="relative z-10 w-full mt-20 overflow-hidden">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-8 px-4">
            <div className="flex items-center gap-3">
                <ShoppingBag size={16} className="text-white/40" />
                <h3 className="text-[11px] font-black tracking-[0.3em] uppercase opacity-60">Sacred Tools</h3>
            </div>
            <span className="text-[9px] uppercase tracking-widest opacity-30">Curated for you</span>
        </div>
        
        {/* The Moving Track */}
        <div className="flex w-full overflow-hidden mask-fade">
            <div className="flex gap-6 animate-marquee hover:pause pl-4">
                {carouselItems.map((tool, index) => (
                    <a 
                        key={`${tool.id}-${index}`} 
                        href={tool.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-64 bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:bg-white/10 transition-colors group"
                    >
                        <div className="h-32 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-all" style={{ backgroundImage: `url(${tool.img})` }} />
                        <div className="p-5 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold text-white leading-tight">{tool.name}</h4>
                                <ExternalLink size={12} className="opacity-40 mt-1" />
                            </div>
                            <p className="text-[10px] text-white/50 line-clamp-2">{tool.desc}</p>
                            <span className="text-[10px] font-black mt-2" style={{ color: THEME.primary }}>{tool.price}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
      </section>

      <BottomNav view="dashboard" setView={setView} />

      <style>{`
        .animate-slide-up { animation: slideUp 0.8s ease-out; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        
        /* THE MARQUEE ANIMATION */
        .animate-marquee { animation: scroll 30s linear infinite; }
        
        /* Pause the animation when the user hovers over the track */
        .hover\\:pause:hover { animation-play-state: paused; }
        
        /* Fade out the edges of the carousel so it looks smooth */
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }

        @keyframes scroll { 
            0% { transform: translateX(0); } 
            100% { transform: translateX(-50%); } 
        }

        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Dashboard;