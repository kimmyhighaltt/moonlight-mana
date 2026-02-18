import React, { useState } from 'react';
import { Sun, Moon, CheckCircle2, Plus, Sparkles, PenTool, BookOpen, Stars, Loader2, Share2, Check } from 'lucide-react';
import { THEME } from '../constants/index';
import { Logo, StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';
import { getMoonPhase } from '../utils/lunarLogic';
import { MAJOR_ARCANA, getMinorArcanaMeaning } from '../utils/tarotLogic';
import { getRecommendationForCard, getRitualAdvice } from '../utils/affiliateLogic';
import RecommendedTool from '../components/RecommendedTool';

const Reflection = ({
  currentTime, hemisphere, isFlipped, selectedCard, handleCardPull,
  rituals, checkedItems, toggleCheck, newRitualInput, setNewRitualInput,
  addRitual, reflection, setReflection, setView, isOnline,
  onBack, userProfile
}) => {

  const [isGuided, setIsGuided] = useState(true);
  const [aiState, setAiState] = useState('idle'); 
  const [streamedText, setStreamedText] = useState('');
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // 🕒 AUTOMATIC TIME OBSERVATION
  const displayTime = new Date(currentTime);
  const moonData = getMoonPhase(displayTime);
  const ds = displayTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  const ts = displayTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // 🚨 INTERNAL HANDLER TO PREVENT DOUBLE-PULLS
  const onPullClick = () => {
    // Only allow the pull if the card hasn't been flipped yet
    if (!isFlipped) {
      handleCardPull();
    }
  };

  const handleChannelWisdom = () => {
    setAiState('loading');
    let specificWisdom = MAJOR_ARCANA[selectedCard.name] || getMinorArcanaMeaning(selectedCard.name);
    const tool = getRecommendationForCard(selectedCard.name);
    const ritualAdvice = getRitualAdvice(tool);
    const greeting = userProfile ? `${userProfile.name}, ` : "";
    const fullMessage = `${greeting}${selectedCard.name} has appeared. ${specificWisdom} ${ritualAdvice}`;

    setTimeout(() => {
      setAiState('streaming');
      let i = 0;
      const interval = setInterval(() => {
        setStreamedText(fullMessage.slice(0, i));
        i++;
        if (i > fullMessage.length) { clearInterval(interval); setAiState('complete'); }
      }, 30); 
    }, 1500); 
  };

  const PROMPTS = {
    firstImpressions: { guidedLabel: "Gut Reaction", sub: "Initial thoughts...", placeholder: "How does the image make you feel?" },
    theMessage: { guidedLabel: "Core Meaning", sub: "What is the card saying?", placeholder: "Interpret the wisdom..." },
    actionStep: { guidedLabel: "Sacred Action", sub: "Next steps...", placeholder: "How will you honor this today?" }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden animate-fade-in pb-32 text-white bg-[#020617]">
      
      <CelestialBackground />
      <div className="fixed inset-0 bg-slate-900/20 pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-20 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 md:p-10 gap-6 max-w-[1600px] mx-auto">
        <StatusHeader isOnline={isOnline} onBack={onBack} />
        <div className="md:hidden"><Logo size="text-3xl" subtitle="REFLECTION" /></div>
        <div className="text-center md:text-right text-white drop-shadow-md">
          <div className="text-4xl md:text-5xl font-serif tracking-tighter text-amber-50">{ts}</div>
          <div className="text-[11px] uppercase opacity-60 tracking-widest font-black text-amber-200">{ds}</div>
        </div>
      </div>

      {/* DATA GRID */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 px-6 md:px-14 max-w-6xl mx-auto w-full">
        {[{ l: 'DATE', v: ds }, { l: 'TIME', v: ts }, { l: 'ZONE', v: hemisphere.toUpperCase() }].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <span className="text-[9px] font-black tracking-widest opacity-40 text-amber-100 uppercase">{item.l}</span>
            <div className="p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl text-[11px] text-white flex items-center shadow-lg">{item.v}</div>
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-black tracking-widest opacity-40 text-amber-100 uppercase">LUNAR ALIGNMENT</span>
          <div className="bg-amber-500/10 backdrop-blur-md border border-amber-200/20 p-4 rounded-2xl flex items-center gap-3 shadow-xl">
            <Moon size={16} className={`text-amber-200 ${hemisphere === 'Northern' ? 'rotate-180' : ''}`} />
            <span className="text-[10px] font-black text-white uppercase tracking-wider">{moonData.label}</span>
          </div>
        </div>
      </div>

      {/* MAIN RITUAL AREA */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_320px] items-start justify-center gap-10 mb-16 px-6 md:px-14 max-w-7xl mx-auto w-full">
        
        {/* CENTER COLUMN */}
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          {!isFlipped && (
            <div className="mb-6 animate-pulse z-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 border border-amber-200/30 px-6 py-2 rounded-full bg-amber-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.15)]">
                The veil is ready • Tap to pull
              </p>
            </div>
          )}

          {/* 🚨 THE FATE-LOCKED CARD CONTAINER */}
          <div 
            className={`relative w-full max-w-[300px] md:max-w-[340px] aspect-[2/3] perspective-1000 group z-10 
              ${!isFlipped ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`} 
            onClick={onPullClick}
          >
            <div className={`relative w-full h-full transition-all duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 backface-hidden rounded-[32px] border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl flex items-center justify-center p-8 transition-all hover:bg-slate-900/60">
                <Sun size={60} className="text-amber-100/10" />
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[32px] bg-zinc-900 border-2 border-amber-200/40 overflow-hidden flex flex-col shadow-[0_0_60px_rgba(212,175,55,0.4)]">
                <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url("${selectedCard.img}")` }} />
                <div className="p-4 text-center bg-zinc-950/95 backdrop-blur-md border-t border-white/10">
                  <h4 className="text-md font-serif uppercase tracking-widest text-amber-200">{selectedCard.name}</h4>
                </div>
              </div>
            </div>
          </div>

          {isFlipped && (
            <div className="w-full max-w-[340px] mt-8 animate-in fade-in slide-in-from-bottom-4 z-10 space-y-6">
              {aiState === 'idle' ? (
                <button onClick={handleChannelWisdom} className="w-full py-4 bg-amber-500/10 border border-amber-200/30 rounded-xl hover:bg-amber-500/20 transition-all flex items-center justify-center gap-3">
                  <Stars size={16} className="text-amber-200" /><span className="text-xs font-black uppercase tracking-widest text-amber-100">Channel Wisdom</span>
                </button>
              ) : (
                <>
                  <div className="p-6 bg-slate-900/60 backdrop-blur-xl border border-amber-200/30 rounded-2xl shadow-xl">
                    {aiState === 'loading' ? <div className="flex flex-col items-center py-4 gap-2"><Loader2 className="animate-spin text-amber-200" size={20} /></div> :
                      <p className="text-sm font-serif italic text-white/90 leading-relaxed">"{streamedText}"</p>
                    }
                  </div>
                  {aiState === 'complete' && <RecommendedTool cardName={selectedCard.name} />}
                </>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: RITUALS */}
        <div className="w-full flex flex-col gap-6 z-10">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-2xl">
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 border-b border-white/5 pb-6 mb-6">Sacred Rituals</h3>
              <div className="space-y-4">
                {rituals.map((r) => (
                  <div key={r} onClick={() => toggleCheck(r)} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${checkedItems[r] ? 'bg-amber-500/10 border-amber-200/30' : 'bg-black/20 border-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${checkedItems[r] ? 'bg-amber-400 border-transparent' : 'border-white/20'}`}>
                        {checkedItems[r] && <CheckCircle2 size={12} className="text-slate-900" />}
                      </div>
                      <span className={`text-xs ${checkedItems[r] ? 'text-white font-bold' : 'opacity-40'}`}>{r}</span>
                    </div>
                  </div>
                ))}
                <form onSubmit={addRitual} className="flex gap-2 mt-4">
                  <input type="text" value={newRitualInput} onChange={(e) => setNewRitualInput(e.target.value)} placeholder="Add..." className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-xs focus:outline-none" />
                  <button type="submit" className="p-2 bg-amber-200 rounded-lg text-slate-900"><Plus size={18} /></button>
                </form>
              </div>
          </div>
        </div>
      </div>

      {/* REFLECTION INPUTS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-20 w-full">
        <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-4">
          <h2 className="text-3xl font-serif text-amber-50">Deep Reflection</h2>
          <button onClick={() => setIsGuided(!isGuided)} className="px-5 py-2 rounded-full text-[9px] font-black tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            {isGuided ? 'GUIDED' : 'FREE FLOW'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.keys(PROMPTS).map((id) => (
            <div key={id} className="flex flex-col gap-3">
              <h5 className="text-[10px] font-black tracking-widest text-amber-200 uppercase">{PROMPTS[id].guidedLabel}</h5>
              <div className="bg-slate-950/60 backdrop-blur-md rounded-[32px] border border-white/10 focus-within:border-amber-200/30 transition-all">
                <textarea
                  value={reflection[id]}
                  onChange={(e) => setReflection({ ...reflection, [id]: e.target.value })}
                  className="w-full p-6 bg-transparent border-none text-sm text-white focus:outline-none h-48 resize-none leading-relaxed"
                  placeholder={PROMPTS[id].placeholder}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="relative z-10 flex justify-center mb-10">
        <button onClick={() => setView('tracker')} className="px-20 py-7 rounded-full font-black uppercase tracking-widest text-[12px] bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 shadow-xl hover:scale-105 transition-all">
           Seal This Entry
        </button>
      </div>

      <BottomNav view="reflection" setView={setView} />
      
      <style>{`
        .perspective-1000 { perspective: 1000px; } 
        .transform-style-3d { transform-style: preserve-3d; } 
        .backface-hidden { backface-visibility: hidden; } 
        .rotate-y-180 { transform: rotateY(180deg); } 
        textarea::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Reflection;