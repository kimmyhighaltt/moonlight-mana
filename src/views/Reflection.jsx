import React, { useState } from 'react';
import { Sun, Moon, CheckCircle2, Plus, Sparkles, PenTool, BookOpen, Stars, Loader2 } from 'lucide-react';
import { THEME } from '../constants/index';
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';

// 👇 NEW IMPORTS
import { MAJOR_ARCANA, getMinorArcanaMeaning } from '../utils/tarotLogic';
import { getRecommendationForCard, getRitualAdvice } from '../utils/affiliateLogic';
import RecommendedTool from '../components/RecommendedTool';

const Reflection = ({
  currentTime, hemisphere, isFlipped, selectedCard, handleCardPull,
  rituals, checkedItems, toggleCheck, newRitualInput, setNewRitualInput,
  addRitual, reflection, setReflection, setView, isOnline,
  selectedHour, setSelectedHour, onBack,
  userProfile // 👈 1. ADDED USER PROFILE PROP HERE
}) => {

  const [isGuided, setIsGuided] = useState(true);
  const [aiState, setAiState] = useState('idle'); 
  const [streamedText, setStreamedText] = useState('');

  // ------------------------------------------------
  // 🧠 HANDLE AI CHANNELING
  // ------------------------------------------------
  const handleChannelWisdom = () => {
    setAiState('loading');

    // 1. Get Card Wisdom (From utils)
    let specificWisdom = MAJOR_ARCANA[selectedCard.name] || getMinorArcanaMeaning(selectedCard.name);

    // 2. Get Tool & Ritual Advice (From utils)
    const tool = getRecommendationForCard(selectedCard.name);
    const ritualAdvice = getRitualAdvice(tool);

    // 3. Build Message (PERSONALIZED)
    // If name exists, add it. Otherwise, keep it empty.
    const greeting = userProfile ? `${userProfile.name}, ` : "";
    
    const fullMessage = `${greeting}${selectedCard.name} has appeared. ${specificWisdom} ${ritualAdvice} Breathe deeply and accept this guidance.`;

    // 4. Stream Text
    setTimeout(() => {
      setAiState('streaming');
      let i = 0;
      const interval = setInterval(() => {
        setStreamedText(fullMessage.slice(0, i));
        i++;
        if (i > fullMessage.length) {
          clearInterval(interval);
          setAiState('complete');
        }
      }, 30); 
    }, 1500); 
  };

  // Time & Date Logic
  let displayTime = new Date(currentTime);
  if (selectedHour !== null) {
    displayTime.setHours(selectedHour);
    displayTime.setMinutes(0);
  }
  const ds = displayTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  const ts = displayTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const PROMPTS = {
    firstImpressions: {
      label: "First Impressions",
      guidedLabel: "Gut Reaction",
      sub: isGuided ? "What symbol draws your eye first? How does it make you feel?" : "Initial thoughts...",
      placeholder: isGuided ? "e.g., The bright sun makes me feel hopeful, but the clouds look ominous..." : "Type your initial thoughts here..."
    },
    theMessage: {
      label: "The Message",
      guidedLabel: "Core Meaning",
      sub: isGuided ? "How does this card relate to your current challenge?" : "What is the card saying?",
      placeholder: isGuided ? "e.g., It's telling me to be patient with my project..." : "Interpret the meaning..."
    },
    actionStep: {
      label: "Action Step",
      guidedLabel: "Sacred Action",
      sub: isGuided ? "What is ONE small thing you will do today to honor this?" : "Next steps...",
      placeholder: isGuided ? "e.g., I will take a 10-minute walk at lunch..." : "Plan your action..."
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden font-sans animate-fade-in pb-32" style={{ backgroundColor: THEME.bg, color: THEME.secondary }}>
      <GraphGrid />

      {/* HEADER */}
      <div className="relative z-20 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 md:p-10 gap-6">
        <StatusHeader isOnline={isOnline} onBack={onBack} />
        <div className="md:hidden"><Logo size="text-3xl" subtitle="REFLECTION" /></div>
        <div className="text-center md:text-right text-white">
          <div className="text-3xl md:text-4xl font-light tracking-tighter">{ts}</div>
          <div className="text-[11px] uppercase opacity-60 tracking-widest font-black">{ds}</div>
        </div>
      </div>

      <div className="hidden md:flex w-full justify-center mb-12 relative z-10"><Logo size="text-4xl" subtitle="DAILY TAROT REFLECTION" /></div>
      <div className="w-full h-[1px] mb-8 relative z-10 bg-gold/10 hidden md:block" />

      {/* DATA GRID */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10 items-end px-6 md:px-14">
        {[{ l: 'DATE:', v: ds }, { l: 'TIME:', v: ts }, { l: 'ZONE:', v: hemisphere.toUpperCase() }].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-[9px] md:text-[10px] font-black tracking-widest opacity-60 text-white uppercase">{item.l}</span>
            <div className="p-4 border border-white/10 bg-white/5 rounded-2xl text-[10px] md:text-xs text-white flex items-center shadow-inner">{item.v}</div>
          </div>
        ))}
        <div className="flex justify-end col-span-1 md:col-span-1">
          <div className="bg-[#34495E] border border-white/10 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl w-full justify-center md:w-auto">
            <Moon size={18} color={THEME.primary} className={hemisphere === 'Northern' ? 'rotate-180' : ''} />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase">New Moon</span>
              <span className="text-[8px] opacity-40 uppercase">0% Illum</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start mb-16 px-6 md:px-14">
        {/* HOUR SELECTOR */}
        <div className="hidden lg:flex flex-col items-center pr-10 border-r border-white/5 h-[500px] overflow-y-auto custom-scrollbar">
          <span className="text-[10px] mb-6 font-black tracking-widest text-white opacity-40">HR</span>
          {[...Array(24)].map((_, i) => (
            <button key={i} onClick={() => setSelectedHour(i + 1)} className={`text-[11px] h-10 w-10 flex items-center justify-center font-mono border-b transition-all ${selectedHour === i + 1 ? 'text-gold scale-125' : 'text-white/20'}`} style={{ color: selectedHour === i + 1 ? THEME.primary : '' }}>{i + 1}</button>
          ))}
        </div>

        {/* CARD AREA */}
        <div className="w-full lg:flex-1 flex flex-col items-center justify-center py-2">
          <div className="relative w-[280px] h-[450px] md:w-[350px] md:h-[560px] cursor-pointer perspective-1000 group p-2" onClick={handleCardPull}>
            <div className={`relative w-full h-full transition-all duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden rounded-[32px] border-4 border-white bg-white shadow-2xl flex items-center justify-center p-8 hover:scale-[1.02] transition-all">
                <div className="flex flex-col items-center">
                  <Sun size={100} className="text-slate-900 opacity-20 mb-8 animate-pulse" strokeWidth={1} />
                  <span className="text-[12px] tracking-[0.5em] text-slate-900 font-black uppercase">Tap to Pull</span>
                </div>
              </div>
              {/* Front of Card */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[32px] bg-zinc-900 border-[4px] overflow-hidden flex flex-col shadow-[0_0_80px_rgba(212,175,55,0.3)]" style={{ borderColor: THEME.primary }}>
                <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url("${selectedCard.img}")` }} />
                <div className="p-6 text-center bg-zinc-950 border-t border-white/10">
                  <h4 className="text-lg font-serif uppercase tracking-[0.2em]" style={{ color: THEME.primary }}>{selectedCard.name}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* AI INTERPRETATION SECTION */}
          {isFlipped && (
            <div className="w-[280px] md:w-[350px] mt-8 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-4">
              {aiState === 'idle' ? (
                <button
                  onClick={handleChannelWisdom}
                  className="w-full py-4 border border-white/20 bg-white/5 rounded-xl hover:bg-white/10 hover:border-gold/50 transition-all flex items-center justify-center gap-3 group"
                >
                  <Stars size={16} className="text-gold group-hover:animate-spin" style={{ color: THEME.primary }} />
                  <span className="text-xs font-black uppercase tracking-widest text-white">Channel Wisdom</span>
                </button>
              ) : (
                <div className="relative p-6 bg-slate-900/80 border border-gold/30 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                  {aiState === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-4 gap-3">
                      <Loader2 className="animate-spin text-gold" size={20} style={{ color: THEME.primary }} />
                      <span className="text-[10px] uppercase tracking-widest opacity-50 animate-pulse">Consulting the ether...</span>
                    </div>
                  )}
                  {(aiState === 'streaming' || aiState === 'complete') && (
                    <div className="relative">
                      <Sparkles className="absolute -top-3 -left-3 text-gold opacity-50" size={12} style={{ color: THEME.primary }} />
                      <p className="text-sm font-serif italic text-white/90 leading-relaxed">
                        "{streamedText}"
                      </p>
                      <div className="mt-3 flex justify-end">
                        <span className="text-[8px] uppercase tracking-widest opacity-30">AI Oracle</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* AFFILIATE TOOL */}
              {(aiState === 'streaming' || aiState === 'complete') && (
                 <RecommendedTool cardName={selectedCard.name} />
              )}
            </div>
          )}
        </div>

        {/* RITUALS SECTION */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <h3 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-80 border-b border-white/10 pb-4 text-white">Sacred Rituals:</h3>
          <div className="space-y-4">
            {rituals.map((r) => (
              <div
                key={r}
                onClick={() => toggleCheck(r)}
                className={`flex items-center justify-between group cursor-pointer p-4 rounded-xl border transition-all duration-300 active:scale-95 ${checkedItems[r] ? 'shadow-[0_0_20px_rgba(212,175,55,0.15)] border-transparent' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                style={{ backgroundColor: checkedItems[r] ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 border-2 transition-all flex items-center justify-center rounded-lg ${checkedItems[r] ? 'border-transparent scale-110' : 'border-white/20'}`}
                    style={{ backgroundColor: checkedItems[r] ? THEME.primary : 'transparent' }}
                  >
                    {checkedItems[r] && <CheckCircle2 size={14} color={THEME.bg} className="animate-in zoom-in duration-300" />}
                  </div>
                  <span className={`text-sm transition-colors duration-300 ${checkedItems[r] ? 'opacity-100 font-bold text-white' : 'opacity-50 text-white'}`}>{r}</span>
                </div>
                {checkedItems[r] && <Sparkles size={14} className="animate-pulse" style={{ color: THEME.primary }} />}
              </div>
            ))}
            <form onSubmit={addRitual} className="flex gap-2 mt-2">
              <input type="text" value={newRitualInput} onChange={(e) => setNewRitualInput(e.target.value)} placeholder="Add ritual..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold placeholder:text-white/20 transition-all" />
              <button type="submit" className="p-3 rounded-xl hover:scale-105 active:scale-95 transition-all text-slate-900 shadow-lg" style={{ backgroundColor: THEME.primary }}><Plus size={20} /></button>
            </form>
          </div>
        </div>
      </div>

      {/* REFLECTION INPUTS */}
      <section className="relative z-10 max-w-6xl mx-auto mb-16 px-6 md:px-14">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-2xl font-serif text-white mb-1">Daily Reflection</h2>
            <p className="text-xs text-white/50 uppercase tracking-widest">Capture the wisdom of the cards</p>
          </div>
          <button onClick={() => setIsGuided(!isGuided)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isGuided ? 'bg-white text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            {isGuided ? <Sparkles size={14} /> : <PenTool size={14} />}
            {isGuided ? 'Guided Mode' : 'Free Flow'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {['firstImpressions', 'theMessage', 'actionStep'].map((id) => (
            <div key={id} className="flex flex-col gap-2 group">
              <div className="flex flex-col">
                <h5 className="text-[11px] font-black tracking-[0.2em] text-gold uppercase" style={{ color: THEME.primary }}>{isGuided ? PROMPTS[id].guidedLabel : PROMPTS[id].label}</h5>
                <span className="text-[10px] text-white/40 italic mt-1 min-h-[20px]">{PROMPTS[id].sub}</span>
              </div>
              <div className="relative rounded-[20px] p-[1px] bg-gradient-to-b from-white/20 to-transparent group-focus-within:from-gold/50 group-focus-within:to-gold/10 transition-all duration-500">
                <div className="bg-slate-900/80 rounded-[19px] h-full overflow-hidden backdrop-blur-sm">
                  <textarea
                    value={reflection[id]}
                    onChange={(e) => setReflection({ ...reflection, [id]: e.target.value })}
                    className="w-full p-5 bg-transparent border-none text-sm text-white placeholder:text-white/20 focus:outline-none resize-none h-40 custom-scrollbar leading-relaxed"
                    placeholder={PROMPTS[id].placeholder}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="relative z-10 flex justify-center w-full mb-10">
        <button onClick={() => setView('tracker')} className="px-16 py-6 rounded-full font-black uppercase tracking-widest text-[12px] shadow-2xl transition-all bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 active:scale-95 flex items-center gap-3">
          <BookOpen size={16} />
          Save Entry
        </button>
      </div>

      <BottomNav view="reflection" setView={setView} />
      <style>{`.perspective-1000 { perspective: 1000px; } .transform-style-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); } .textarea::-webkit-scrollbar { width: 6px; } .textarea::-webkit-scrollbar-track { background: transparent; } .textarea::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }`}</style>
    </div>
  );
};

export default Reflection;