import React, { useState } from 'react';
import { 
  Globe, Moon, ShoppingBag, ExternalLink, Flame, X, ChevronRight 
} from 'lucide-react';
import { THEME, SACRED_TOOLS } from '../constants/index';
import { StatusHeader, BottomNav } from '../components/UIComponents';
import Shop from './Shop'; 

// =========================================================
// 🔮 SHOP MODAL WRAPPER
// =========================================================
const ShopModal = ({ onClose, user }) => {
  return (
    // 1. BACKDROP CLICK (Closes the modal)
    <div 
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose} 
    >
      
      {/* 2. MODAL CONTAINER (Stops the close event) */}
      <div 
        className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-white/10 md:rounded-3xl rounded-t-3xl h-[85vh] md:h-auto overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-end p-4 border-b border-white/5 bg-white/5 absolute top-0 right-0 z-10 w-full">
          <button 
            onClick={onClose} 
            className="p-2 bg-black/20 rounded-full hover:bg-white/10 transition-colors border border-white/5"
          >
            <X size={20} className="text-white/70" />
          </button>
        </div>

        {/* 3. RENDER YOUR SHOP COMPONENT HERE */}
        <div className="flex-1 overflow-y-auto pt-16 px-4">
            <Shop user={user} />
        </div>

      </div>
    </div>
  );
};

// =========================================================
// 🌑 MAIN DASHBOARD COMPONENT
// =========================================================
const Dashboard = ({ hemisphere, toggleHemisphere, setView, isOnline, moonData, userProfile, streak }) => {
  const [showShop, setShowShop] = useState(false);
  const carouselItems = [...SACRED_TOOLS, ...SACRED_TOOLS];

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden animate-slide-up pb-32" style={{ backgroundColor: THEME.bg, color: '#FFFFFF' }}>
      
      {/* SHOP MODAL OVERLAY */}
      {showShop && <ShopModal user={userProfile} onClose={() => setShowShop(false)} />}

      {/* --- HEADER ROW --- */}
      <div className="w-full flex justify-between items-center p-6 pt-12 md:p-10">
        <StatusHeader isOnline={isOnline} />
        <div className="flex items-center gap-3">
            {/* Streak */}
            {streak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full animate-in fade-in slide-in-from-top-4">
                <Flame size={12} className="text-orange-500 fill-orange-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-orange-400 uppercase">{streak} Day</span>
              </div>
            )}
            {/* Hemisphere */}
            <button onClick={toggleHemisphere} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-white/5 backdrop-blur-sm">
                <Globe size={12} color={THEME.primary} />
                <p className="text-[10px] tracking-[0.2em] uppercase font-black" style={{ color: THEME.primary }}>{hemisphere}</p>
            </button>
        </div>
      </div>
      
      {/* --- HERO SECTION --- */}
      <header className="flex flex-col items-center mt-4 md:mt-10 px-4 relative z-10 text-center">
        <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 mb-1" style={{ color: THEME.primary }}>
            {userProfile ? `${userProfile.sign} Sun • Life Path ${userProfile.lifePath}` : "Daily Ritual System"}
        </p>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-2 text-white">
            {userProfile ? `Rise, ${userProfile.name}.` : "Moonlight Mana"}
        </h1>
        <p className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase">The veil is thin today</p>
      </header>

      {/* --- MOON CARD --- */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto mt-8 md:mt-12 px-6">
        <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] md:rounded-[60px] p-8 md:p-12 flex flex-col items-center shadow-2xl group cursor-pointer hover:bg-white/10 transition-all">
          <div className="relative mb-6 md:mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-spin-slow">
              <Moon size={60} color={THEME.primary} className={`md:w-[72px] md:h-[72px] ${hemisphere === 'Northern' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-2">{moonData.percentage}%</h2>
            <p className="text-[10px] md:text-[12px] tracking-[0.4em] uppercase opacity-40 font-black" style={{ color: THEME.primary }}>{moonData.label}</p>
          </div>
        </div>
        
        {/* Action Button */}
        <button 
          onClick={() => setView('reflection')} 
          className="mt-8 px-16 py-6 md:px-20 md:py-7 rounded-full font-black uppercase tracking-widest text-[12px] md:text-[13px] shadow-[0_30px_60px_-15px_rgba(212,175,55,0.4)] transition-all hover:scale-105 active:scale-95" 
          style={{ backgroundColor: THEME.primary, color: THEME.bg }}
        >
          Start Daily Check-in
        </button>
      </main>

      {/* --- CAROUSEL (Trigger for Shop) --- */}
      <section className="relative z-10 w-full mt-16 md:mt-20 overflow-hidden">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-6 px-6">
            
            {/* NEW: THE APOTHECARY HEADER WITH PULSING DOT */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <ShoppingBag size={14} className="text-amber-200" />
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white">The Apothecary</h3>
                    <span className="text-[8px] text-amber-200 tracking-widest uppercase animate-pulse font-bold">New Collection</span>
                </div>
            </div>

            {/* LINK TO OPEN MODAL */}
            <button onClick={() => setShowShop(true)} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-200 hover:text-white transition-colors">
                View All <ChevronRight size={10} />
            </button>
        </div>
        
        {/* Carousel Items: Clicking these also opens the Shop */}
        <div className="flex w-full overflow-hidden mask-fade">
            <div className="flex gap-4 md:gap-6 animate-marquee hover:pause pl-4">
                {carouselItems.map((tool, index) => (
                    <div 
                        key={`${tool.id}-${index}`} 
                        onClick={() => setShowShop(true)}
                        className="flex-shrink-0 w-56 md:w-64 bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                        <div className="h-28 md:h-32 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-all" style={{ backgroundImage: `url(${tool.img})` }} />
                        <div className="p-4 md:p-5 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold text-white leading-tight">{tool.name}</h4>
                                <ExternalLink size={12} className="opacity-40 mt-1" />
                            </div>
                            <span className="text-[10px] font-black mt-1" style={{ color: THEME.primary }}>{tool.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <BottomNav view="dashboard" setView={setView} />

      <style>{`
        .animate-slide-up { animation: slideUp 0.8s ease-out; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-marquee { animation: scroll 30s linear infinite; }
        .hover\\:pause:hover { animation-play-state: paused; }
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Dashboard;