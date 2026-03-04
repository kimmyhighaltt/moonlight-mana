import React, { useState } from 'react';
import { 
  Globe, Moon, ShoppingBag, ExternalLink, Flame, X, ChevronRight 
} from 'lucide-react';
import { THEME, SACRED_TOOLS } from '../constants/index';
import { StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';
import Shop from './Shop'; 
import { getLunarPopupContent } from '../utils/lunarLogic';

// ... (ShopModal remains unchanged) ...
const ShopModal = ({ onClose, user }) => {
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose} 
    >
      <div 
        className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-white/10 md:rounded-3xl rounded-t-3xl h-[85vh] md:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-500 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex items-center justify-end p-4 border-b border-white/5 bg-white/5 absolute top-0 right-0 z-10 w-full">
          <button 
            onClick={onClose} 
            className="p-2 bg-black/20 rounded-full hover:bg-white/10 transition-colors border border-white/5"
          >
            <X size={20} className="text-white/70" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pt-16 px-4 custom-scrollbar">
            <Shop user={user} />
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ hemisphere, toggleHemisphere, setView, isOnline, moonData, userProfile, streak }) => {
  const [showShop, setShowShop] = useState(false);
  
  // 1. ADDED: State and content for the Moon Modal
  const [isMoonModalOpen, setIsMoonModalOpen] = useState(false);
  // Passing the current date dynamically
  const lunarContent = getLunarPopupContent(moonData, new Date()); 
  
  const carouselItems = [...SACRED_TOOLS, ...SACRED_TOOLS];

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden animate-slide-up pb-24 md:pb-0 text-white">
      
      {/* 1. THE ATMOSPHERE */}
      <CelestialBackground />

      {/* 2. THE AMBIENT LIGHT (Brighter on Desktop) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-indigo-900/10 via-slate-900/0 to-slate-900/20 pointer-events-none mix-blend-screen" />

      {showShop && <ShopModal user={userProfile} onClose={() => setShowShop(false)} />}

      {/* --- HEADER ROW --- */}
      <div className="relative z-10 w-full flex justify-between items-center p-6 pt-12 md:p-8">
        <StatusHeader isOnline={isOnline} />
        <div className="flex items-center gap-3">
            {streak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full animate-in fade-in slide-in-from-top-4 backdrop-blur-sm">
                <Flame size={12} className="text-orange-500 fill-orange-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-orange-400 uppercase">{streak} Day</span>
              </div>
            )}
            
           {/* 2. FIXED: Removed background/border so it reads as pure status text, not a button */}
            <div className="flex items-center gap-1.5 select-none opacity-70">
                <Globe size={12} color={THEME.primary} />
                <p className="text-[10px] tracking-[0.2em] uppercase font-black text-amber-100">{hemisphere}</p>
            </div>
        </div>
      </div>
      
      {/* --- HERO SECTION --- */}
      <header className="flex flex-col items-center mt-4 md:mt-2 px-4 relative z-10 text-center">
        <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-90 mb-2 text-amber-200 drop-shadow-md">
            {userProfile ? `${userProfile.sign} Sun • Life Path ${userProfile.lifePath}` : "Daily Ritual System"}
        </p>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-2 text-white drop-shadow-2xl">
            {userProfile ? `Rise, ${userProfile.name}.` : "Moonlight Mana"}
        </h1>
        <p className="text-[10px] text-white/70 font-bold tracking-[0.2em] uppercase">The veil is thin today</p>
      </header>

      {/* --- MOON CARD (GLASS ALTAR) --- */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto mt-6 md:mt-6 px-6">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 md:bg-indigo-500/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

        {/* 3. FIXED: Added the onClick to trigger the Moon Modal */}
        <div 
          onClick={() => setIsMoonModalOpen(true)}
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] md:rounded-[50px] p-8 md:p-8 flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.5)] group cursor-pointer hover:bg-white/10 transition-all ring-1 ring-white/10 hover:ring-white/30 relative z-10"
        >
          <div className="relative mb-6 md:mb-6 z-10">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-spin-slow bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <Moon size={60} className={`text-amber-100 md:w-[64px] md:h-[64px] ${hemisphere === 'Northern' ? 'rotate-180' : ''} drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]`} />
            </div>
          </div>
          <div className="text-center z-10">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-2 text-white drop-shadow-xl">{moonData.percentage}%</h2>
            <p className="text-[10px] md:text-[12px] tracking-[0.4em] uppercase opacity-80 font-black text-amber-100">{moonData.label}</p>
          </div>
        </div>
        
        <button 
          onClick={() => setView('reflection')} 
          className="relative z-10 mt-8 px-16 py-6 md:px-20 md:py-6 rounded-full font-black uppercase tracking-widest text-[12px] md:text-[13px] shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]" 
        >
          Start Daily Check-in
        </button>
      </main>

      {/* --- CAROUSEL (Shop) --- */}
      {/* Rest of the carousel stays exactly the same... */}
      <section className="relative z-10 w-full mt-12 md:mt-8 overflow-hidden pb-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-4 px-6">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <ShoppingBag size={14} className="text-amber-200" />
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white drop-shadow-md">The Apothecary</h3>
                    <span className="text-[8px] text-amber-200/90 tracking-widest uppercase animate-pulse font-bold">New Collection</span>
                </div>
            </div>

            <button onClick={() => setShowShop(true)} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-100/80 hover:text-white transition-colors">
                View All <ChevronRight size={10} />
            </button>
        </div>
        
        <div className="flex w-full overflow-hidden mask-fade">
            <div className="flex gap-4 md:gap-6 animate-marquee hover:pause pl-4">
                {carouselItems.map((tool, index) => (
                    <div 
                        key={`${tool.id}-${index}`} 
                        onClick={() => setShowShop(true)}
                        className="flex-shrink-0 w-56 md:w-64 bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden hover:bg-white/10 transition-colors group cursor-pointer ring-1 ring-white/5"
                    >
                        <div className="h-28 md:h-32 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-all duration-500" style={{ backgroundImage: `url(${tool.img})` }} />
                        <div className="p-4 md:p-5 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold text-white leading-tight">{tool.name}</h4>
                                <ExternalLink size={12} className="opacity-40 mt-1" />
                            </div>
                            <span className="text-[10px] font-black mt-1 text-amber-200/90">{tool.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <BottomNav view="dashboard" setView={setView} />
      
    {/* 4. ADDED: The actual Moon Phase Pop-Up UI */}
      {isMoonModalOpen && (
        <div 
          /* Changed to items-center and added px-4 to make it a floating centered box */
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center px-4 z-[100] animate-in fade-in duration-300"
          onClick={() => setIsMoonModalOpen(false)}
        >
          <div 
            /* Changed rounded-t-3xl to rounded-3xl so all corners are smooth, and added overflow-y-auto so tiny screens can scroll */
            className="bg-slate-900/90 backdrop-blur-xl border border-white/10 w-full md:max-w-lg rounded-3xl p-6 md:p-8 text-white shadow-2xl animate-in slide-in-from-bottom-10 duration-500 max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-serif text-amber-100 drop-shadow-md">{lunarContent.title}</h3>
               <button 
                  onClick={() => setIsMoonModalOpen(false)} 
                  className="p-2 bg-black/20 rounded-full hover:bg-white/10 transition-colors border border-white/5 flex-shrink-0 ml-4"
               >
                 <X size={20} className="text-white/70" />
               </button>
            </div>
            
            <p className="text-sm text-white/80 leading-relaxed mb-6">{lunarContent.body}</p>
            
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
              <span className="font-black text-[10px] uppercase tracking-[0.2em] text-amber-200/90 mb-2 block">Tracking Tip</span>
              <p className="text-xs text-white/70 leading-relaxed">{lunarContent.tip}</p>
            </div>
            
            <button 
              className="w-full bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 font-black uppercase tracking-widest text-[12px] py-4 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setIsMoonModalOpen(false)}
            >
              Close Insight
            </button>
          </div>
        </div>
      )}

      {/* Styles remain same */}
      <style>{`
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-marquee { animation: scroll 30s linear infinite; }
        .hover\\:pause:hover { animation-play-state: paused; }
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        
        /* Added the slide-up animation for the modal */
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Dashboard;