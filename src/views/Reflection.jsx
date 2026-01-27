import React from 'react';
import { Sun, Moon, CheckCircle2, Sparkles, Plus, Info } from 'lucide-react';
import { THEME } from '../constants/index';
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';

const Reflection = ({ 
  currentTime, hemisphere, isFlipped, selectedCard, handleCardPull, 
  rituals, checkedItems, toggleCheck, newRitualInput, setNewRitualInput, 
  addRitual, reflection, setReflection, setView, isOnline,
  selectedHour, setSelectedHour, onBack
}) => {
  
  let displayTime = new Date(currentTime);
  if (selectedHour !== null) {
    displayTime.setHours(selectedHour);
    displayTime.setMinutes(0);
  }

  const ds = displayTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  const ts = displayTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden font-sans animate-fade-in pb-32" style={{ backgroundColor: THEME.bg, color: THEME.secondary }}>
      <GraphGrid />
      
      {/* RESPONSIVE HEADER - Stacks on mobile, Spreads on desktop */}
      <div className="relative z-20 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 md:p-10 gap-6">
        <StatusHeader isOnline={isOnline} onBack={onBack} />
        
        {/* Mobile Logo */}
        <div className="md:hidden">
            <Logo size="text-3xl" subtitle="REFLECTION" />
        </div>

        {/* Date/Time - Centered on mobile, Right on desktop */}
        <div className="text-center md:text-right text-white">
          <div className="text-3xl md:text-4xl font-light tracking-tighter">{ts}</div>
          <div className="text-[11px] uppercase opacity-60 tracking-widest font-black">{ds}</div>
        </div>
      </div>

      {/* Desktop Logo (Hidden on mobile) */}
      <div className="hidden md:flex w-full justify-center mb-12 relative z-10">
        <Logo size="text-4xl" subtitle="DAILY TAROT REFLECTION" />
      </div>

      <div className="w-full h-[1px] mb-8 relative z-10 bg-gold/10 hidden md:block" />
      
      {/* META INFO GRID - 2 columns on mobile, 4 on desktop */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10 items-end px-6 md:px-14">
        {[{ l: 'DATE:', v: ds }, { l: 'TIME:', v: ts }, { l: 'ZONE:', v: hemisphere.toUpperCase() }].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-[9px] md:text-[10px] font-black tracking-widest opacity-60 text-white uppercase">{item.l}</span>
            <div className="p-4 border border-white/10 bg-white/5 rounded-2xl text-[10px] md:text-xs text-white flex items-center shadow-inner">
              {item.v}
            </div>
          </div>
        ))}
        {/* Moon Phase Badge */}
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

      {/* MAIN CONTENT AREA - Stacks vertical on mobile */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start mb-16 px-6 md:px-14">
        
        {/* Time Sidebar - Hidden on Mobile to save space */}
        <div className="hidden lg:flex flex-col items-center pr-10 border-r border-white/5 h-[500px] overflow-y-auto custom-scrollbar">
          <span className="text-[10px] mb-6 font-black tracking-widest text-white opacity-40">HR</span>
          {[...Array(24)].map((_, i) => (
            <button key={i} onClick={() => setSelectedHour(i+1)} className={`text-[11px] h-10 w-10 flex items-center justify-center font-mono border-b transition-all ${selectedHour === i+1 ? 'text-gold scale-125' : 'text-white/20'}`} style={{ color: selectedHour === i+1 ? THEME.primary : '' }}>{i+1}</button>
          ))}
        </div>
        
        {/* Tarot Card Area */}
        <div className="w-full lg:flex-1 flex flex-col items-center justify-center py-2">
          <div className="relative w-[280px] h-[450px] md:w-[350px] md:h-[560px] cursor-pointer perspective-1000 group p-2" onClick={handleCardPull}>
            <div className={`relative w-full h-full transition-all duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden rounded-[32px] border-2 border-white/10 bg-white shadow-2xl flex items-center justify-center p-8">
                <div className="flex flex-col items-center">
                  <Sun size={100} color="#000" strokeWidth={0.5} className="opacity-10 mb-8 animate-pulse" />
                  <span className="text-[12px] tracking-[0.5em] text-black/20 font-black uppercase">Tap</span>
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
        </div>

        {/* Rituals List - Full width on mobile, Sidebar on desktop */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <h3 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-80 border-b border-white/10 pb-4 text-white">Sacred Rituals:</h3>
          <div className="space-y-4">
            {rituals.map((r) => (
              <div key={r} className="flex items-center justify-between group cursor-pointer bg-white/5 p-4 rounded-xl border border-white/5" onClick={() => toggleCheck(r)}>
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 border-2 transition-all flex items-center justify-center rounded-lg ${checkedItems[r] ? 'border-transparent' : 'border-white/20'}`} style={{ backgroundColor: checkedItems[r] ? THEME.primary : 'transparent' }}>
                    {checkedItems[r] && <CheckCircle2 size={14} color={THEME.bg} />}
                  </div>
                  <span className={`text-sm ${checkedItems[r] ? 'opacity-100 font-bold text-white' : 'opacity-50 text-white'}`}>{r}</span>
                </div>
              </div>
            ))}
             <form onSubmit={addRitual} className="flex gap-2">
              <input type="text" value={newRitualInput} onChange={(e) => setNewRitualInput(e.target.value)} placeholder="Add ritual..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none" />
              <button type="submit" className="p-3 rounded-xl bg-gold text-slate-900" style={{ backgroundColor: THEME.primary }}><Plus size={20} /></button>
            </form>
          </div>
        </div>
      </div>

      {/* Reflection Inputs - Stack vertically on mobile */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-6 md:px-14">
        {['firstImpressions', 'theMessage', 'actionStep'].map((id) => (
          <div key={id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h5 className="text-[10px] font-black tracking-[0.3em] text-white uppercase">{id.replace(/([A-Z])/g, ' $1')}</h5>
            </div>
            <textarea 
              value={reflection[id]} 
              onChange={(e) => setReflection({...reflection, [id]: e.target.value})} 
              className="w-full p-6 rounded-[24px] bg-white/5 border border-dashed border-white/10 text-sm focus:outline-none focus:border-gold transition-all resize-none h-40 text-white placeholder:opacity-20" 
              placeholder="Type here..." 
            />
          </div>
        ))}
      </section>

      <div className="relative z-10 flex justify-center w-full mb-10">
        <button onClick={() => setView('tracker')} className="px-16 py-6 rounded-full font-black uppercase tracking-widest text-[12px] shadow-2xl transition-all bg-white/5 border border-white/10 text-white hover:bg-white/10">Continue</button>
      </div>

      <BottomNav view="reflection" setView={setView} />
      <style>{`
        .perspective-1000 { perspective: 1000px; } 
        .transform-style-3d { transform-style: preserve-3d; } 
        .backface-hidden { backface-visibility: hidden; } 
        .rotate-y-180 { transform: rotateY(180deg); } 
      `}</style>
    </div>
  );
};

export default Reflection;