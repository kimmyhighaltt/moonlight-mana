import React, { useState } from 'react';
import { Loader2, Zap, CheckCircle2, Battery, BatteryWarning, Quote } from 'lucide-react';
import { THEME, PILLAR_INFO, WHAKATAUKI } from '../constants/index'; // Import WHAKATAUKI
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';

const Tracker = ({ 
  isLogging, currentTime, pillars, setPillars, activeTags, setActiveTags, handleLogMana, isOnline, setView,
  onBack 
}) => {

  // 1. Pick a random proverb ONCE when the component loads
  // We use useState with a function so it doesn't change every time you drag a slider
  const [dailyProverb] = useState(() => {
    const randomIndex = Math.floor(Math.random() * WHAKATAUKI.length);
    return WHAKATAUKI[randomIndex];
  });

  // 2. Calculate Live Average
  const currentAverage = Math.round(
    (pillars.mind + pillars.body + pillars.heart + pillars.soul) / 4
  );

  // 3. Logic to cycle: Off -> Charge (Green) -> Drain (Red) -> Off
  const toggleTag = (tag) => {
    const currentState = activeTags[tag];
    const newTags = { ...activeTags };

    if (!currentState) {
        newTags[tag] = 'charge'; 
    } else if (currentState === 'charge') {
        newTags[tag] = 'drain';  
    } else {
        delete newTags[tag];     
    }
    setActiveTags(newTags);
  };

  const getTagStyle = (tag) => {
    const state = activeTags[tag];
    if (state === 'charge') {
        return 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110';
    }
    if (state === 'drain') {
        return 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.3)] scale-110';
    }
    return 'bg-slate-800/80 border-white/10 text-white/30 hover:border-white/20 hover:text-white/50';
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-10 md:p-14 pb-48 relative overflow-y-auto font-sans animate-fade-in" style={{ backgroundColor: THEME.bg }}>
      <GraphGrid />
      <StatusHeader isOnline={isOnline} onBack={onBack} /> 
      
      {isLogging && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-700">
          <div className="w-32 h-32 rounded-full border-4 border-gold/10 flex items-center justify-center mb-10 relative">
             <Loader2 size={64} className="text-gold animate-spin" style={{ color: THEME.primary }} />
             <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full opacity-50" />
          </div>
          <Logo size="text-3xl" subtitle="MANIFESTING SACRED JOURNAL..." showStars={false} />
        </div>
      )}

      <div className="absolute top-10 right-14 text-right z-20 text-white">
        <div className="text-3xl font-light tracking-tighter">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <div className="text-[12px] uppercase opacity-60 tracking-widest font-black">{currentTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()}</div>
      </div>
      <div className="w-full flex justify-center mb-20 relative z-10"><Logo size="text-6xl" subtitle="DAILY MANA TRACKER" /></div>
      
      {/* SLIDERS SECTION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-between gap-10 mb-32 px-4">
          {Object.keys(PILLAR_INFO).map((key) => {
              const info = PILLAR_INFO[key];
              return (
                  <div key={key} className="flex flex-col items-center flex-1 group">
                      <div className="flex flex-col items-center mb-10 h-20 justify-center">
                          <span className="text-[14px] uppercase tracking-[0.3em] font-black text-center leading-tight text-white mb-2">{info.label}</span>
                          <span className="text-[9px] font-bold text-yellow-600/70 uppercase tracking-[0.4em]">{info.sub}</span>
                      </div>
                      <div className="relative w-20 md:w-28 h-[440px] rounded-full flex items-center justify-center overflow-hidden bg-slate-900/90 border border-white/5 shadow-[inset_0_10px_40px_rgba(0,0,0,0.4)]">
                          <div className="absolute bottom-0 left-0 right-0 w-full transition-all duration-1000 ease-out" style={{ height: `${pillars[key]}%`, background: 'linear-gradient(to top, #2C3E50, #5B4E7A, #E6E6FA)', opacity: 0.9 }} />
                          <input type="range" min="0" max="100" value={pillars[key]} onChange={(e) => setPillars({...pillars, [key]: parseInt(e.target.value)})} className="absolute -rotate-90 w-[440px] h-full opacity-0 cursor-pointer z-20" />
                          <div className="absolute w-[1.5px] h-full bg-white/10 z-10" />
                          <div className="absolute w-10 h-10 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.8)] z-10 transition-all duration-300 pointer-events-none flex items-center justify-center bg-white" style={{ top: `${100 - pillars[key]}%`, transform: 'translateY(-50%)' }}>
                              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: THEME.primary }} />
                          </div>
                          <div className="absolute bottom-10 w-8 h-8 rounded-full z-10 shadow-2xl" style={{ backgroundColor: THEME.primary }} />
                      </div>
                  </div>
              );
          })}
      </div>

      {/* ENERGY TAGS SECTION */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center gap-10 mb-20">
          <div className="flex items-center gap-4">
            <Zap size={20} className="text-gold" style={{ color: THEME.primary }} />
            <h4 className="text-lg font-bold tracking-[0.2em] text-white uppercase">Energy Sources & Sinks</h4>
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest -mt-6 mb-4">Tap once for Charge (Green) • Tap twice for Drain (Red)</p>
          
          <div className="flex flex-wrap justify-center gap-6">
              {['Work', 'Whānau (Family)', 'Hauora (Health)', 'Aotearoa (Nature)', 'Te Moana (Ocean)', 'Sleep'].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => toggleTag(tag)} 
                    className={`relative px-14 py-5 rounded-[24px] text-[12px] font-black uppercase tracking-[0.3em] border-2 transition-all duration-300 shadow-xl ${getTagStyle(tag)}`}
                  >
                    {activeTags[tag] === 'charge' && <Battery size={14} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />}
                    {activeTags[tag] === 'drain' && <BatteryWarning size={14} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />}
                    {tag}
                  </button>
              ))}
          </div>
      </div>

      {/* COMMIT BUTTON */}
      <div className="relative z-10 flex justify-center w-full mb-16">
          <button 
            onClick={handleLogMana} 
            className="px-16 py-6 rounded-full font-black uppercase tracking-widest text-[14px] transition-all hover:scale-105 active:scale-95 flex items-center gap-6 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.5)]" 
            style={{ backgroundColor: THEME.primary, color: THEME.bg }}
          >
              <div className="flex flex-col items-end border-r border-black/10 pr-6">
                 <span className="text-[9px] opacity-60 font-black tracking-widest uppercase">Total Mana</span>
                 <span className="text-3xl font-black leading-none">{currentAverage}%</span>
              </div>
              <div className="flex items-center gap-4 pl-2">
                <CheckCircle2 size={24} /> 
                <span>Commit Ritual</span>
              </div>
          </button>
      </div>

      {/* NEW: WHAKATAUKĪ (PROVERB) SECTION */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center mb-32 px-10 opacity-70 hover:opacity-100 transition-opacity">
        <Quote size={20} className="mx-auto mb-4 text-white/30" />
        <p className="text-xl font-serif italic text-white mb-3">"{dailyProverb.maori}"</p>
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gold" style={{ color: THEME.primary }}>{dailyProverb.english}</p>
      </div>

      <BottomNav view="tracker" setView={setView} />
    </div>
  );
};

export default Tracker;