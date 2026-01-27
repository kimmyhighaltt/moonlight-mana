import React from 'react';
import { 
  Sun, Moon, CheckCircle2, Sparkles, Plus, Info 
} from 'lucide-react';
import { THEME } from '../constants/index';
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';

const Reflection = ({ 
  currentTime, hemisphere, isFlipped, selectedCard, handleCardPull, 
  rituals, checkedItems, toggleCheck, newRitualInput, setNewRitualInput, 
  addRitual, reflection, setReflection, setView, isOnline,
  selectedHour, setSelectedHour,
  onBack // <--- NEW PROP
}) => {
  
  // LOGIC: Use the selected hour if it exists, otherwise use real time
  let displayTime = new Date(currentTime);
  if (selectedHour !== null) {
    displayTime.setHours(selectedHour);
    displayTime.setMinutes(0);
  }

  const ds = displayTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  const ts = displayTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen w-full flex flex-col p-8 md:p-14 pb-48 relative overflow-y-auto font-sans animate-fade-in" style={{ backgroundColor: THEME.bg, color: THEME.secondary }}>
      <GraphGrid />
      <StatusHeader isOnline={isOnline} onBack={onBack} /> 
      
      <div className="absolute top-8 right-10 text-right z-20 text-white">
        <div className="text-3xl font-light tracking-tighter">{ts}</div>
        <div className="text-[11px] uppercase opacity-60 tracking-widest font-black">{ds}</div>
      </div>

      <div className="w-full flex justify-center mb-12 relative z-10">
        <Logo size="text-4xl" subtitle="DAILY TAROT REFLECTION" />
      </div>

      <div className="w-full h-[1px] mb-12 relative z-10 bg-gold/10" />
      
      {/* Meta Info Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 items-end px-4">
        {[{ l: 'DATE:', v: ds }, { l: 'TIME OF PULL:', v: ts }, { l: 'HEMISPHERE:', v: hemisphere.toUpperCase() }].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-widest opacity-60 text-white uppercase">{item.l}</span>
            <div className="p-5 border border-white/10 bg-white/5 rounded-2xl text-xs text-white min-h-[52px] flex items-center shadow-inner transition-all duration-500">
              {item.v}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <div className="bg-[#34495E] border border-white/10 px-8 py-5 rounded-[32px] flex items-center gap-5 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-slate-900/50 flex items-center justify-center border border-white/10">
              <Moon size={24} color={THEME.primary} className={hemisphere === 'Northern' ? 'rotate-180' : ''} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black text-white uppercase tracking-tighter">NEW MOON 0%</span>
              <span className="text-[10px] opacity-40 uppercase font-black tracking-widest">
                {currentTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-16 items-start mb-20 px-4">
        {/* Timeline Sidebar (Interactive) */}
        <div className="hidden md:flex flex-col items-center pr-10 border-r border-white/5 h-[600px] overflow-y-auto custom-scrollbar">
          <span className="text-[10px] mb-6 font-black tracking-widest text-white opacity-40">HR</span>
          {[...Array(24)].map((_, i) => {
            const hour = i + 1;
            const isActive = selectedHour === hour;
            return (
              <button 
                key={i} 
                onClick={() => setSelectedHour(hour)}
                className={`text-[11px] h-10 flex items-center justify-center font-mono w-10 border-b transition-all duration-200 hover:scale-110 ${
                  isActive 
                    ? 'border-gold text-gold font-black scale-125 opacity-100 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'border-white/5 text-white opacity-20 hover:opacity-100 hover:text-white'
                }`}
                style={{ borderColor: isActive ? THEME.primary : '', color: isActive ? THEME.primary : '' }}
              >
                {hour}
              </button>
            );
          })}
        </div>
        
        {/* Tarot Card Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <div className="relative w-full max-w-[400px] aspect-[1/1.6] cursor-pointer perspective-1000 group p-2 rounded-[40px]" onClick={handleCardPull}>
            <div className={`relative w-full h-full transition-all duration-1000 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 backface-hidden rounded-[40px] border-2 border-white/10 bg-white shadow-2xl flex items-center justify-center p-12 hover:border-gold/50 transition-all">
                <div className="flex flex-col items-center">
                  <Sun size={160} color="#000" strokeWidth={0.5} className="opacity-10 mb-12 animate-pulse" />
                  <span className="text-[14px] tracking-[0.8em] text-black/20 font-black uppercase">Tap to Pull</span>
                </div>
              </div>

              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[40px] bg-zinc-900 border-[5px] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.4)]" style={{ borderColor: THEME.primary }}>
                <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url("${selectedCard.img}")` }} />
                <div className="p-10 text-center bg-zinc-950 border-t border-white/10">
                  <h4 className="text-xl font-serif uppercase tracking-[0.4em]" style={{ color: THEME.primary }}>{selectedCard.name}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rituals Section */}
        <div className="w-full md:w-96 flex flex-col gap-10 pt-6">
          <h3 className="text-[12px] font-black tracking-[0.4em] uppercase opacity-80 border-b border-white/10 pb-6 text-white">Sacred Rituals:</h3>
          <div className="space-y-6 max-h-[480px] overflow-y-auto pr-4 custom-scrollbar">
            {rituals.map((r) => (
              <div key={r} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleCheck(r)}>
                <div className="flex items-center gap-6">
                  <div className={`w-8 h-8 border-2 transition-all flex items-center justify-center rounded-xl ${checkedItems[r] ? 'border-transparent' : 'border-white/20'}`} style={{ backgroundColor: checkedItems[r] ? THEME.primary : 'transparent' }}>
                    {checkedItems[r] && <CheckCircle2 size={20} color={THEME.bg} />}
                  </div>
                  <span className={`text-[15px] tracking-wide transition-all text-white ${checkedItems[r] ? 'opacity-100 font-bold' : 'opacity-40 hover:opacity-70'}`}>{r}</span>
                </div>
                {checkedItems[r] && <Sparkles size={14} className="text-gold animate-bounce" style={{ color: THEME.primary }} />}
              </div>
            ))}
            <form onSubmit={addRitual} className="pt-8 border-t border-white/10 flex items-center gap-4">
              <input type="text" value={newRitualInput} onChange={(e) => setNewRitualInput(e.target.value)} placeholder="New custom ritual..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-gold transition-all shadow-inner" />
              <button type="submit" className="p-4 rounded-2xl bg-gold text-slate-900 shadow-xl shadow-gold/20 hover:scale-110 active:scale-90 transition-all" style={{ backgroundColor: THEME.primary }}><Plus size={24} /></button>
            </form>
          </div>
        </div>
      </div>

      {/* Reflection Inputs */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 px-4">
        {['firstImpressions', 'theMessage', 'actionStep'].map((id) => (
          <div key={id} className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h5 className="text-[12px] font-black tracking-[0.5em] text-white uppercase">{id.replace(/([A-Z])/g, ' $1')}</h5>
              <Info size={16} className="opacity-20 text-white cursor-help" />
            </div>
            <textarea 
              value={reflection[id]} 
              onChange={(e) => setReflection({...reflection, [id]: e.target.value})} 
              className="w-full p-8 rounded-[32px] bg-white/5 border border-dashed border-white/10 text-sm focus:outline-none focus:border-gold transition-all resize-none h-56 text-white placeholder:opacity-10 shadow-2xl" 
              placeholder={id === 'theMessage' ? `"${selectedCard.message}"` : "Capture the current vibration..."} 
            />
          </div>
        ))}
      </section>

      <div className="relative z-10 flex justify-center w-full mb-32">
        <button onClick={() => setView('tracker')} className="px-24 py-8 rounded-full font-black uppercase tracking-widest text-[14px] shadow-2xl transition-all hover:scale-105 active:scale-95 bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-gold/30">Continue to Mana</button>
      </div>

      <BottomNav view="reflection" setView={setView} />

      <style>{`
        .perspective-1000 { perspective: 1000px; } 
        .transform-style-3d { transform-style: preserve-3d; } 
        .backface-hidden { backface-visibility: hidden; } 
        .rotate-y-180 { transform: rotateY(180deg); } 
        .custom-scrollbar::-webkit-scrollbar { width: 4px; } 
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${THEME.primary}66; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Reflection;