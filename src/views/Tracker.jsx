import React, { useState } from 'react';
import { Loader2, Zap, CheckCircle2, Battery, BatteryWarning, Quote } from 'lucide-react';
import { THEME, PILLAR_INFO, WHAKATAUKI } from '../constants/index'; 
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';

const Tracker = ({ 
  isLogging, currentTime, pillars, setPillars, activeTags, setActiveTags, handleLogMana, isOnline, setView,
  onBack 
}) => {

  const [dailyProverb] = useState(() => {
    const randomIndex = Math.floor(Math.random() * WHAKATAUKI.length);
    return WHAKATAUKI[randomIndex];
  });

  const currentAverage = Math.round(
    (pillars.mind + pillars.body + pillars.heart + pillars.soul) / 4
  );

  const handleSliderChange = (pillarKey, value) => {
    setPillars(prev => ({
      ...prev,
      [pillarKey]: value
    }));
  };

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
        return 'bg-emerald-500 text-emerald-900 font-bold border-emerald-400 shadow-lg scale-105'; 
    }
    if (state === 'drain') {
        return 'bg-rose-500 text-white font-bold border-rose-600 shadow-lg scale-105'; 
    }
    return 'bg-slate-200 border-white/50 text-slate-600 hover:bg-white'; 
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden font-sans animate-fade-in pb-40" style={{ backgroundColor: THEME.bg }}>
      <GraphGrid />
      
      <div className="w-full flex justify-between items-start p-6 pt-12">
        <StatusHeader isOnline={isOnline} onBack={onBack} />
        <div className="text-right text-white">
            <div className="text-2xl md:text-3xl font-light tracking-tighter">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-[10px] md:text-[12px] uppercase opacity-60 tracking-widest font-black">{currentTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()}</div>
        </div>
      </div>
      
      {isLogging && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-2xl flex flex-col items-center justify-center animate-in fade-in duration-700">
          <div className="w-32 h-32 rounded-full border-4 border-gold/10 flex items-center justify-center mb-10 relative">
             <Loader2 size={64} className="text-gold animate-spin" style={{ color: THEME.primary }} />
             <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full opacity-50" />
          </div>
          <Logo size="text-3xl" subtitle="MANIFESTING SACRED JOURNAL..." showStars={false} />
        </div>
      )}

      <div className="w-full flex justify-center mb-10 md:mb-16 relative z-10">
        <Logo size="text-4xl md:text-5xl lg:text-6xl" subtitle="DAILY MANA TRACKER" />
      </div>
      
      {/* SLIDERS SECTION */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20 px-6 md:px-12">
         {Object.entries(PILLAR_INFO).map(([key, pillar]) => (
            <div key={key} className="w-full mb-2">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h3 className="font-serif text-lg text-white">{pillar.label}</h3>
                  <p className="text-xs text-white/60 uppercase tracking-widest">{pillar.sub}</p>
                  <p className="text-xs text-[#D4AF37] italic mt-1 font-medium">
                     {pillar.question}
                  </p>
                </div>
                <span className="text-2xl font-bold" style={{ color: pillar.color }}>
                  {pillars[key]}%
                </span>
              </div>
              
              {/* TEST TUBE STYLE SLIDER */}
              {/* Outer container acts as the 'glass tube' (border + dark bg) */}
              <div className="relative h-6 w-full rounded-full border border-white/20 bg-black/20 shadow-inner overflow-hidden">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={pillars[key]}
                    onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                    className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
                  />
                  {/* The Liquid Fill */}
                  <div 
                    className="absolute left-0 top-0 h-full transition-all duration-300 ease-out z-10 rounded-l-full"
                    style={{ 
                        width: `${pillars[key]}%`,
                        backgroundColor: pillar.color,
                        boxShadow: `inset 0 2px 0 rgba(255,255,255,0.3), 0 0 10px ${pillar.color}40` // Glassy highlight + glow
                    }}
                  />
              </div>
            </div>
          ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center gap-6 md:gap-8 mb-16 md:mb-20 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
                <Zap size={20} className="text-gold" style={{ color: THEME.primary }} />
                <h4 className="text-sm md:text-lg font-bold tracking-[0.2em] text-white uppercase">Energy Sources</h4>
            </div>
            
            {/* ADDED: Missing Instruction Text */}
            <p className="text-[10px] md:text-xs text-white/50 font-medium tracking-wide uppercase">
                Tap once to Charge (+), Tap twice to Drain (-)
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
              {['Work', 'Whānau', 'Hauora', 'Aotearoa', 'Te Moana', 'Sleep'].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => toggleTag(tag)} 
                    className={`relative px-6 py-3 md:px-10 md:py-4 lg:px-14 lg:py-5 rounded-[24px] text-[10px] md:text-[11px] lg:text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-md ${getTagStyle(tag)}`}
                  >
                    {activeTags[tag] === 'charge' && <Battery size={12} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />}
                    {activeTags[tag] === 'drain' && <BatteryWarning size={12} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />}
                    {tag}
                  </button>
              ))}
          </div>
      </div>

      <div className="relative z-10 flex justify-center w-full mb-12">
          <button 
            onClick={handleLogMana} 
            className="px-10 py-5 md:px-16 md:py-6 rounded-full font-black uppercase tracking-widest text-[12px] md:text-[14px] transition-all hover:scale-105 active:scale-95 flex items-center gap-4 md:gap-6 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.5)]" 
            style={{ backgroundColor: THEME.primary, color: THEME.bg }}
          >
              <div className="flex flex-col items-end border-r border-black/10 pr-4 md:pr-6">
                 <span className="text-[8px] md:text-[9px] opacity-60 font-black tracking-widest uppercase">Total</span>
                 <span className="text-2xl md:text-3xl font-black leading-none">{currentAverage}%</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 pl-2">
                <CheckCircle2 size={20} /> 
                <span>Commit</span>
              </div>
          </button>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center mb-10 px-6 opacity-70 hover:opacity-100 transition-opacity">
        <Quote size={16} className="mx-auto mb-3 text-white/30" />
        <p className="text-sm md:text-xl font-serif italic text-white mb-2">"{dailyProverb.maori}"</p>
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-black text-gold" style={{ color: THEME.primary }}>{dailyProverb.english}</p>
      </div>

      <BottomNav view="tracker" setView={setView} />
    </div>
  );
};

export default Tracker;