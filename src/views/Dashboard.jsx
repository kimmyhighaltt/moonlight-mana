import React, { useState, useEffect } from 'react';
import {
  Globe, Moon, ShoppingBag, ExternalLink, Flame, X, ChevronRight
} from 'lucide-react';
import { THEME, SACRED_TOOLS } from '../constants/index';
import { StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';
import Shop from './Shop';
import LunarInsightModal from '../components/NewMoonModal';

const ShopModal = ({ onClose, user, autoOpenId }) => {
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
          <Shop user={user} initialProductId={autoOpenId} />
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({
  hemisphere,
  toggleHemisphere,
  setView,
  isOnline,
  moonData,
  userProfile,
  streak,
  autoOpenProductId,
  clearAutoOpen
}) => {
  const [showShop, setShowShop] = useState(false);
  const [isMoonModalOpen, setIsMoonModalOpen] = useState(false);
  const [daysUntilNewMoon, setDaysUntilNewMoon] = useState(0);

  useEffect(() => {
    if (autoOpenProductId) {
      const tool = SACRED_TOOLS.find(t => t.id === autoOpenProductId);
      if (tool) {
        setShowShop(true);
      }
    }
  }, [autoOpenProductId]);

  // NEW: Calculate days until the March 18th New Moon Portal
  useEffect(() => {
    const targetDate = new Date('2026-03-18T00:00:00');
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilNewMoon(diffDays > 0 ? diffDays : 0);
  }, []);

  const handleCloseShop = () => {
    setShowShop(false);
    if (clearAutoOpen) clearAutoOpen();
  };

  const carouselItems = [...SACRED_TOOLS, ...SACRED_TOOLS];

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden animate-slide-up pb-24 md:pb-0 text-white">

      <CelestialBackground />

      <div className="fixed inset-0 z-0 bg-gradient-to-b from-indigo-900/10 via-slate-900/0 to-slate-900/20 pointer-events-none mix-blend-screen" />
      {/* ✨ NEW MOON URGENCY BANNER - PLACED AT THE VERY TOP ✨ */}
      <div
        onClick={() => setShowShop(true)}
        className="relative z-20 w-full bg-amber-900/30 border-b border-amber-200/20 px-4 py-3 flex items-center justify-center gap-3 overflow-hidden cursor-pointer hover:bg-amber-900/40 transition-colors"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/5 to-transparent animate-pulse"></div>
        <Moon size={14} className="text-amber-200 relative z-10" />
        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-amber-100 relative z-10 text-center">
          The March 18th New Moon Approaches. <span className="text-amber-400 ml-1">Tap to prepare your altar.</span>
        </p>
      </div>

      {showShop && (
        <ShopModal
          user={userProfile}
          onClose={handleCloseShop}
          autoOpenId={autoOpenProductId}
        />
      )}
      {showShop && (
        <ShopModal
          user={userProfile}
          onClose={handleCloseShop}
          autoOpenId={autoOpenProductId}
        />
      )}


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

        {/* --- THE UPCOMING PORTAL COUNTDOWN --- */}
        <div className="relative z-10 mt-8 flex mb-20 md:mb-12 flex-col items-center animate-in fade-in duration-1000 delay-300">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-200/50"></span>
            <p className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-amber-100/90 drop-shadow-md">
              🌑 Portal Opens: {daysUntilNewMoon === 0 ? "Today" : `${daysUntilNewMoon} Days`}
            </p>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-200/50"></span>
          </div>
        </div>

      </main>

      {/* --- CAROUSEL (Shop) --- */}
      {/*<section className="relative z-10 w-full mt-12 md:mt-8 overflow-hidden pb-10">
            </div>
        </div>
      </section>*/}

      <BottomNav view="dashboard" setView={setView} />

      <LunarInsightModal
        isOpen={isMoonModalOpen}
        onClose={() => setIsMoonModalOpen(false)}
        userProfile={userProfile}
        onNavigateToLog={() => {
          setIsMoonModalOpen(false);
          setView('reflection');
        }}
      />

      <style>{`
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-marquee { animation: scroll 30s linear infinite; }
        .hover\\:pause:hover { animation-play-state: paused; }
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Dashboard;