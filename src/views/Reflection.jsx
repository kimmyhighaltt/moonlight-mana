import React, { useState, useRef } from 'react';
import { Sun, Moon, CheckCircle2, Plus, Stars, Loader2, Mic, MicOff } from 'lucide-react';
import { Logo, StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';
import ShareButton from '../components/ShareButton'; 
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
  const [isRecording, setIsRecording] = useState(false);
  const [aiState, setAiState] = useState('idle'); 
  const [streamedText, setStreamedText] = useState('');
  const cardRef = useRef(null);
  const recognitionRef = useRef(null);

  const displayTime = new Date(currentTime);
  const moonData = getMoonPhase(displayTime);
  const ds = displayTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  const ts = displayTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // --- 🎙️ Voice-to-Text Logic ---
  const toggleVoiceReflection = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported in this browser.");

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        }
        if (finalTranscript) {
          setReflection(prev => ({
            ...prev,
            theMessage: (prev.theMessage + (prev.theMessage ? ' ' : '') + finalTranscript).trim()
          }));
        }
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    }
  };

  // --- ✨ Updated Wisdom Logic (Restored Affiliate Injection) ---
  const handleChannelWisdom = () => {
    setAiState('loading');
    
    // 1. Get Base Wisdom
    let wisdom = MAJOR_ARCANA[selectedCard.name] || getMinorArcanaMeaning(selectedCard.name);
    
    // 2. Fetch Affiliate Product Data
    const tool = getRecommendationForCard(selectedCard.name); // Returns { name, link, etc }
    const ritualAdvice = getRitualAdvice(tool); // Returns string mentioning the tool
    
    const greeting = userProfile ? `${userProfile.name}, ` : "";
    
    // 3. Construct Full Message including the Product mention
    const fullMessage = `${greeting}${selectedCard.name} has appeared. ${wisdom} To deepen this alignment, I recommend using the ${tool.name}. ${ritualAdvice}`;

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

  const PROMPTS = {
    firstImpressions: { guidedLabel: "Gut Reaction", placeholder: "How does the image make you feel?" },
    theMessage: { guidedLabel: "Core Meaning", placeholder: "Interpret the wisdom..." },
    actionStep: { guidedLabel: "Sacred Action", placeholder: "How will you honor this today?" }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden animate-fade-in pb-32 text-white bg-[#020617]">
      <CelestialBackground />
      <div className="fixed inset-0 bg-slate-900/20 pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-20 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 md:p-10 gap-6 max-w-[1600px] mx-auto">
        <StatusHeader isOnline={isOnline} onBack={onBack} />
        <div className="flex flex-col items-center">
            <Logo size="text-3xl md:text-4xl" subtitle="DAILY REFLECTION" />
        </div>
        <div className="text-center md:text-right">
          <div className="text-4xl md:text-5xl font-serif font-light text-amber-50">{ts}</div>
          <div className="text-[11px] uppercase opacity-60 tracking-[0.4em] font-black text-amber-200">{ds}</div>
        </div>
      </div>

      {/* DATA GRID */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 px-6 md:px-14 max-w-6xl mx-auto w-full text-center">
        {[{ l: 'DATE', v: ds }, { l: 'TIME', v: ts }, { l: 'ZONE', v: hemisphere.toUpperCase() }].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <span className="text-[9px] font-black tracking-widest opacity-40 text-amber-100 uppercase">{item.l}</span>
            <div className="p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl text-[11px] flex items-center justify-center shadow-lg">{item.v}</div>
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-black tracking-widest opacity-40 text-amber-100 uppercase">LUNAR ALIGNMENT</span>
          <div className="bg-amber-500/10 backdrop-blur-md border border-amber-200/20 p-4 rounded-2xl flex items-center justify-center gap-3">
            <Moon size={16} className={`text-amber-200 ${hemisphere === 'Northern' ? 'rotate-180' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-wider">{moonData.label}</span>
          </div>
        </div>
      </div>

      {/* MAIN RITUAL AREA */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_320px] items-start justify-center gap-10 mb-16 px-6 md:px-14 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center w-full relative">
          <div ref={cardRef} className={`relative w-full max-w-[300px] md:max-w-[340px] aspect-[2/3] perspective-1000 z-10 ${!isFlipped ? 'cursor-pointer animate-pulse' : ''}`} onClick={() => !isFlipped && handleCardPull()}>
            <div className={`relative w-full h-full transition-all duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 backface-hidden rounded-[32px] border border-amber-200/40 bg-slate-900/60 flex items-center justify-center"><Sun size={60} className="opacity-40 text-amber-100" /></div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[32px] bg-zinc-900 border-2 border-amber-200/40 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url("${selectedCard.img}")` }} />
                <div className="p-4 text-center bg-zinc-950/95 border-t border-white/10"><h4 className="text-md font-serif uppercase tracking-widest text-amber-200">{selectedCard.name}</h4></div>
              </div>
            </div>
          </div>

          {isFlipped && (
            <div className="w-full max-w-[340px] mt-8 animate-in fade-in slide-in-from-bottom-4 z-10 space-y-6">
              {aiState === 'idle' ? (
                <button onClick={handleChannelWisdom} className="w-full py-4 bg-amber-500/10 border border-amber-200/30 rounded-xl flex items-center justify-center gap-3 hover:bg-amber-500/20 transition-all"><Stars size={16} className="text-amber-200" /><span className="text-xs font-black tracking-widest text-amber-100 uppercase">Channel Wisdom</span></button>
              ) : (
                <>
                  <div className="p-6 bg-slate-900/60 backdrop-blur-xl border border-amber-200/30 rounded-2xl relative shadow-xl">
                    {aiState === 'loading' ? <div className="flex justify-center py-4"><Loader2 className="animate-spin text-amber-200" size={20} /></div> : <p className="text-sm font-serif italic text-white/90 leading-relaxed">"{streamedText}"</p>}
                  </div>
                  {aiState === 'complete' && <div className="flex flex-col items-center gap-6 animate-fade-in"><ShareButton targetRef={cardRef} fileName={`reflection-${selectedCard.name}.png`} /><RecommendedTool cardName={selectedCard.name} /></div>}
                </>
              )}
            </div>
          )}
        </div>

        {/* SACRED RITUALS */}
        <div className="w-full flex flex-col gap-6 z-10">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-2xl">
            <h3 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 border-b border-white/5 pb-6 mb-6">Sacred Rituals</h3>
            <div className="space-y-4">
              {rituals.map((r) => (
                <div key={r} onClick={() => toggleCheck(r)} className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${checkedItems[r] ? 'bg-amber-500/10 border-amber-200/30' : 'bg-black/20 border-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${checkedItems[r] ? 'bg-amber-400 border-transparent' : 'border-white/20'}`}>{checkedItems[r] && <CheckCircle2 size={12} className="text-slate-900" />}</div>
                    <span className={`text-xs ${checkedItems[r] ? 'text-white font-bold' : 'opacity-40'}`}>{r}</span>
                  </div>
                </div>
              ))}
              <form onSubmit={addRitual} className="flex gap-2 mt-4">
                <input type="text" value={newRitualInput} onChange={(e) => setNewRitualInput(e.target.value)} placeholder="Add..." className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-xs text-white" />
                <button type="submit" className="p-2 bg-amber-200 rounded-lg text-slate-900"><Plus size={18} /></button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* REFLECTION SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-20 w-full">
        <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
          <h2 className="text-3xl font-serif text-amber-50">Deep Reflection</h2>
          <button onClick={() => setIsGuided(!isGuided)} className={`px-6 py-2 rounded-full text-[9px] font-black tracking-widest border transition-all ${isGuided ? 'bg-white/5 border-white/10' : 'bg-amber-200 text-slate-900'}`}>{isGuided ? 'GUIDED' : 'FREE FLOW'}</button>
        </div>

        {isGuided ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.keys(PROMPTS).map((id) => (
              <div key={id} className="flex flex-col gap-3">
                <h5 className="text-[10px] font-black tracking-widest text-amber-200 uppercase">{PROMPTS[id].guidedLabel}</h5>
                <div className="bg-slate-950/60 backdrop-blur-md rounded-[32px] border border-white/10 p-2 focus-within:border-amber-200/30 transition-all">
                  <textarea value={reflection[id]} onChange={(e) => setReflection({ ...reflection, [id]: e.target.value })} className="w-full p-4 bg-transparent border-none text-sm text-white h-48 resize-none focus:outline-none" placeholder={PROMPTS[id].placeholder} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative group">
            {/* 🎤 VOICE BUTTON INSIDE FREE FLOW */}
            <div className="absolute top-6 right-8 z-30">
              <button onClick={toggleVoiceReflection} className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-black tracking-widest border shadow-2xl transition-all ${isRecording ? 'bg-rose-600 border-rose-400 animate-pulse text-white' : 'bg-amber-200/10 border-amber-200/20 text-amber-200'}`}>
                {isRecording ? <Mic size={16} /> : <MicOff size={16} className="opacity-40" />}
                {isRecording ? 'LISTENING...' : 'VOICE CHANNEL'}
              </button>
            </div>
            <textarea value={reflection.theMessage} onChange={(e) => setReflection({ ...reflection, theMessage: e.target.value })} className="w-full p-10 pt-24 bg-slate-950/60 backdrop-blur-xl rounded-[40px] border border-amber-200/20 text-xl font-serif italic text-white min-h-[450px] resize-none focus:outline-none text-center leading-relaxed" placeholder="Speak your truth..." />
            {isRecording && <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2"><div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" /><span className="text-[10px] text-rose-400 font-black tracking-[0.2em] uppercase">Recording Voice to Text</span></div>}
          </div>
        )}
      </section>

      <div className="relative z-10 flex justify-center mb-10">
        <button onClick={() => setView('tracker')} className="px-20 py-7 rounded-full font-black uppercase tracking-widest text-[12px] bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 shadow-xl">Seal This Entry</button>
      </div>
      <BottomNav view="reflection" setView={setView} />
      <style>{`.perspective-1000 { perspective: 1000px; } .transform-style-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); }`}</style>
    </div>
  );
};

export default Reflection;