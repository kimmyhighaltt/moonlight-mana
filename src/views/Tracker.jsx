import React, { useState } from 'react';
import { Loader2, Zap, CheckCircle2, Battery, BatteryWarning, Quote } from 'lucide-react';
import { THEME, PILLAR_INFO, WHAKATAUKI } from '../constants/index'; 
import { Logo, StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';

const Tracker = ({ 
  isLogging, currentTime, pillars, setPillars, activeTags, setActiveTags, handleLogMana, isOnline, setView,
  onBack 
}) => {

  const [dailyProverb] = useState(() => {
    const randomIndex = Math.floor(Math.random() * WHAKATAUKI.length);
    return WHAKATAUKI[randomIndex];
  });

  const TAG_DETAILS = [
    { id: 'Work', label: 'Mahi', sub: 'Work & Purpose' },
    { id: 'Whānau', label: 'Whānau', sub: 'Family & Friends' },
    { id: 'Hauora', label: 'Hauora', sub: 'Health & Body' },
    { id: 'Aotearoa', label: 'Aotearoa', sub: 'Nature (Land)' },
    { id: 'Te Moana', label: 'Te Moana', sub: 'Ocean (Water)' },
    { id: 'Sleep', label: 'Moe', sub: 'Rest & Sleep' }
  ];

  // 🕒 Standardized Time Logic
  const displayTime = new Date(currentTime);
  const ds = displayTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  const ts = displayTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const currentAverage = Math.round(
    (pillars.mind + pillars.body + pillars.heart + pillars.soul) / 4
  );

  const handleSliderChange = (pillarKey, value) => {
    setPillars(prev => ({ ...prev, [pillarKey]: value }));
  };

  const toggleTag = (tag) => {
    const currentState = activeTags[tag];
    const newTags = { ...activeTags };
    if (!currentState) { newTags[tag] = 'charge'; } 
    else if (currentState === 'charge') { newTags[tag] = 'drain'; } 
    else { delete newTags[tag]; }
    setActiveTags(newTags);
  };

  const getTagStyle = (tag) => {
    const state = activeTags[tag];
    if (state === 'charge') return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-105 backdrop-blur-md'; 
    if (state === 'drain') return 'bg-rose-500/20 text-rose-300 border-rose-600/50 shadow-[0_0_20px_rgba(225,29,72,0.2)] scale-105 backdrop-blur-md'; 
    return 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white backdrop-blur-sm'; 
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden font-sans animate-fade-in pb-40 text-white bg-[#020617]">
      
      <CelestialBackground />
      <div className="fixed inset-0 bg-slate-900/20 pointer-events-none" />

      {/* 🌌 UPDATED HEADER: Single Source of Truth */}
      <div className="relative z-20 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 md:p-10 gap-6 max-w-[1600px] mx-auto">
        <StatusHeader isOnline={isOnline} onBack={onBack} />
        
        {/* 🕯️ RESTORED LOGO: Centered and sized for mobile */}
        <div className="flex flex-col items-center">
            <Logo size="text-3xl md:text-4xl" subtitle="MANA TRACKER" />
        </div>

      


        <div className="text-center md:text-right text-white drop-shadow-md">
          <div className="text-4xl md:text-5xl font-serif font-light tracking-tighter text-amber-50">{ts}</div>
          <div className="text-[11px] uppercase opacity-60 tracking-[0.4em] font-black text-amber-200">{ds}</div>
        </div>
      </div>
      
      {/* MANIFESTING OVERLAY */}
      {isLogging && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-700">
          <div className="w-32 h-32 rounded-full border-4 border-amber-200/10 flex items-center justify-center mb-10 relative">
             <Loader2 size={64} className="text-amber-200 animate-spin" />
             <div className="absolute inset-0 border-4 border-amber-200 border-t-transparent rounded-full opacity-50" />
          </div>
          <Logo size="text-3xl" subtitle="SEALING SACRED LEDGER..." />
        </div>
      )}

      {/* Removed the secondary Logo block from here to fix the double title */}
      
      {/* PILLAR SLIDERS (Moved up for better UX) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16 px-6 mt-4 md:mt-0">
         {Object.entries(PILLAR_INFO).map(([key, pillar]) => (
            <div key={key} className="w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl transition-all hover:bg-slate-900/50">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="font-serif text-xl text-white drop-shadow-md">{pillar.label}</h3>
                  <p className="text-[10px] text-amber-100/40 uppercase tracking-widest font-bold">{pillar.sub}</p>
                </div>
                <span className="text-2xl font-black drop-shadow-lg" style={{ color: pillar.color }}>
                  {pillars[key]}%
                </span>
              </div>
              
              <div className="relative h-4 w-full rounded-full border border-white/5 bg-black/40 shadow-inner overflow-hidden ring-1 ring-white/10">
                  <input
                    type="range" min="0" max="100" value={pillars[key]}
                    onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                    className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
                  />
                  <div 
                    className="absolute left-0 top-0 h-full transition-all duration-500 ease-out z-10 rounded-l-full"
                    style={{ 
                        width: `${pillars[key]}%`,
                        backgroundColor: pillar.color,
                        boxShadow: `0 0 15px ${pillar.color}80`
                    }}
                  />
              </div>
              <p className="text-[10px] text-white/50 italic mt-4 font-medium leading-relaxed">"{pillar.question}"</p>
            </div>
         ))}
      </div>

      {/* ENERGY SOURCES */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-8 mb-16 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
                <Zap size={18} className="text-amber-200 animate-pulse" />
                <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase opacity-80">Energy Sources</h4>
            </div>
            <p className="text-[9px] text-amber-100/40 font-bold tracking-widest uppercase">Tap once to Charge (+), Tap twice to Drain (-)</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
              {TAG_DETAILS.map((tag) => (
                  <button 
                    key={tag.id} onClick={() => toggleTag(tag.id)} 
                    className={`relative flex flex-col items-center justify-center px-8 py-4 rounded-2xl border transition-all duration-500 ring-1 ring-white/5 ${getTagStyle(tag.id)}`}
                  >
                    {activeTags[tag.id] === 'charge' && <Battery size={10} className="absolute top-2 right-2 animate-pulse" />}
                    {activeTags[tag.id] === 'drain' && <BatteryWarning size={10} className="absolute top-2 right-2 animate-bounce" />}
                    
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{tag.label}</span>
                    <span className="text-[8px] uppercase tracking-widest opacity-40 font-black mt-1">{tag.sub}</span>
                  </button>
              ))}
          </div>
      </div>

      {/* COMMIT BUTTON */}
      <div className="relative z-10 flex justify-center w-full mb-16">
          <button 
            onClick={handleLogMana} 
            className="px-12 py-6 rounded-full font-black uppercase tracking-widest text-[12px] transition-all hover:scale-105 active:scale-95 flex items-center gap-6 shadow-[0_0_50px_rgba(251,191,36,0.2)] bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 hover:shadow-[0_0_70px_rgba(251,191,36,0.4)]" 
          >
              <div className="flex flex-col items-end border-r border-slate-900/10 pr-6">
                 <span className="text-[8px] opacity-60 font-black tracking-widest uppercase">Mana Total</span>
                 <span className="text-3xl font-black leading-none">{currentAverage}%</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 size={24} /> 
                <span>Seal Entry</span>
              </div>
          </button>
      </div>

      {/* PROVERB AREA */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center mb-10 px-6 drop-shadow-2xl">
        <Quote size={20} className="mx-auto mb-4 text-amber-200 opacity-20" />
        <p className="text-xl md:text-2xl font-serif italic text-amber-50 leading-relaxed mb-4">"{dailyProverb.maori}"</p>
        <p className="text-[9px] uppercase tracking-[0.3em] font-black text-amber-200/60">{dailyProverb.english}</p>
      </div>

      <BottomNav view="tracker" setView={setView} />
      
      <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 30px; width: 30px; border-radius: 50%; background: transparent; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default Tracker;