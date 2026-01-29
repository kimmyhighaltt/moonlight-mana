import React from 'react';
import { Globe, Moon, ShoppingBag, ExternalLink } from 'lucide-react';
import { THEME, SACRED_TOOLS } from '../constants/index';
import { StatusHeader, BottomNav } from '../components/UIComponents';

const Dashboard = ({ hemisphere, toggleHemisphere, setView, isOnline, moonData, userProfile }) => {
  const carouselItems = [...SACRED_TOOLS, ...SACRED_TOOLS];

  return (
    // FIX: Removed 'items-center' from main div to allow full width, added explicit bg color
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden animate-slide-up pb-32" style={{ backgroundColor: THEME.bg, color: '#FFFFFF' }}>
      
      {/* Mobile-Friendly Header */}
      <div className="w-full flex justify-between items-start p-6 pt-12 md:p-10">
        <StatusHeader isOnline={isOnline} />
        <button onClick={toggleHemisphere} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-white/5 backdrop-blur-sm">
          <Globe size={12} color={THEME.primary} />
          <p className="text-[10px] tracking-[0.2em] uppercase font-black" style={{ color: THEME.primary }}>
            {hemisphere}
          </p>
        </button>
      </div>
      
      {/* Hero Section (PERSONALIZED) */}
      <header className="flex flex-col items-center mt-4 md:mt-10 px-4 relative z-10 text-center">
        {/* Zodiac / Subtitle Badge */}
        <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-80 animate-pulse mb-2" style={{ color: THEME.primary }}>
            {userProfile 
                ? `${userProfile.sign} Sun • Life Path ${userProfile.lifePath}` 
                : "Daily Ritual System"}
        </p>

        {/* Main Title / Greeting */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
            {userProfile ? `Rise, ${userProfile.name}.` : "Moonlight Mana"}
        </h1>

        {/* Tagline */}
        <p className="text-xs text-white/50 font-medium tracking-wider uppercase">
             The veil is thin today
        </p>
      </header>

      {/* Main Moon Card - Responsive Sizing */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto mt-8 md:mt-12 px-6">
        <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] md:rounded-[60px] p-8 md:p-12 flex flex-col items-center shadow-2xl group cursor-pointer hover:bg-white/10 transition-all">
          <div className="relative mb-6 md:mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-spin-slow">
              <Moon size={60} color={THEME.primary} className={`md:w-[72px] md:h-[72px] ${hemisphere === 'Northern' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-2">{moonData.percentage}%</h2>
            <p className="text-[10px] md:text-[12px] tracking-[0.4em] uppercase opacity-40 font-black" style={{ color: THEME.primary }}>
              {moonData.label}
            </p>
          </div>
        </div>
        
        {/* NEW: Beginner-Friendly Guidance Block */}
        <div className="mb-2 mx-4 bg-white/5 p-4 rounded-xl border border-white/10 text-center max-w-sm mt-8">
          <p className="font-bold text-sm mb-1 uppercase tracking-widest" style={{ color: THEME.primary }}>
            DAILY GUIDANCE
          </p>
          <p className="text-sm text-white/80 leading-relaxed">
            Align your energy with the moon. Click below to <strong>track your wellness</strong> and <strong>pull your daily tarot card</strong>.
          </p>
        </div>
        
        {/* UPDATED: Button Text & Helper Text */}
        <button 
          onClick={() => setView('reflection')} 
          className="mt-6 px-16 py-6 md:px-20 md:py-7 rounded-full font-black uppercase tracking-widest text-[12px] md:text-[13px] shadow-[0_30px_60px_-15px_rgba(212,175,55,0.4)] transition-all hover:scale-105 active:scale-95" 
          style={{ backgroundColor: THEME.primary, color: THEME.bg }}
        >
          Start Daily Check-in
        </button>
        <p className="mt-3 text-xs text-white/50">Takes less than 2 minutes</p>

      </main>

      {/* Carousel Section */}
      <section className="relative z-10 w-full mt-16 md:mt-20 overflow-hidden">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-6 px-6">
            <div className="flex items-center gap-3">
                <ShoppingBag size={14} className="text-white/40" />
                <h3 className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">Sacred Tools</h3>
            </div>
        </div>
        
        <div className="flex w-full overflow-hidden mask-fade">
            <div className="flex gap-4 md:gap-6 animate-marquee hover:pause pl-4">
                {carouselItems.map((tool, index) => (
                    <a 
                        key={`${tool.id}-${index}`} 
                        href={tool.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-56 md:w-64 bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden hover:bg-white/10 transition-colors group"
                    >
                        <div className="h-28 md:h-32 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-all" style={{ backgroundImage: `url(${tool.img})` }} />
                        <div className="p-4 md:p-5 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold text-white leading-tight">{tool.name}</h4>
                                <ExternalLink size={12} className="opacity-40 mt-1" />
                            </div>
                            <span className="text-[10px] font-black mt-1" style={{ color: THEME.primary }}>{tool.price}</span>
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