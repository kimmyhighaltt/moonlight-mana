import React, { useRef } from 'react';
import { Search, TrendingUp, TrendingDown, Image as ImageIcon, ArrowUpRight, Clock } from 'lucide-react';
import { THEME } from '../constants/index';
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';
import ShareButton from '../components/ShareButton';

const VaultEntryCard = ({ entry }) => {
  const cardRef = useRef(null);

  return (
    <div className="flex flex-col gap-6 group">
      {/* The Ref goes on this container so we capture the whole card style */}
      <div 
        ref={cardRef}
        className="relative bg-white rounded-[60px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] p-10 flex flex-col items-center transition-all hover:scale-[1.02] cursor-default min-h-[620px] border-b-8 border-gold/10"
      >
        <div className="w-full flex justify-between items-start mb-10">
          <div className="flex items-center gap-4">
            {/* DATE & TIME SECTION */}
            <div className="flex flex-col">
                <span className="text-lg font-black tracking-widest text-slate-800">{entry.date}</span>
                {/* Only show time if it exists in the saved entry */}
                {entry.time && (
                    <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                        <Clock size={10} />
                        <span className="text-[10px] font-bold tracking-widest uppercase">{entry.time}</span>
                    </div>
                )}
            </div>
            {entry.trend === 'up' ? <TrendingUp size={18} className="text-green-500 mb-4" /> : <TrendingDown size={18} className="text-orange-400 mb-4" />}
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 shadow-sm">
                Lunar Ritual
            </div>
            {/* Show Moon Phase if available */}
            {entry.moon && (
                <span className="text-[9px] font-bold uppercase tracking-widest text-gold opacity-80" style={{ color: THEME.primary }}>
                    {entry.moon}
                </span>
            )}
          </div>
        </div>

        <div className="w-full aspect-[1/1.5] rounded-[48px] bg-zinc-100 overflow-hidden relative mb-10 shadow-2xl border-4 border-slate-50">
          {entry.img ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${entry.img}")` }} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-200"><ImageIcon size={64} strokeWidth={1} /></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60" />
          
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <span className="text-white font-serif italic text-xl drop-shadow-md">{entry.card}</span>
          </div>
        </div>

        <span className="text-[12px] uppercase tracking-[0.6em] font-black text-slate-300 mb-10">Heavenly Influence</span>
        
        <div className="w-full grid grid-cols-2 gap-x-8 gap-y-6 mb-12">
          {['Body', 'Soul', 'Mind', 'Heart'].map(l => {
            const v = entry.pillars?.[l.toLowerCase()] || entry.mana;
            return (
              <div key={l} className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{l}</span>
                  <span className="text-[10px] font-black text-yellow-600">{v}%</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full transition-all duration-[2000ms] ease-out" style={{ width: `${v}%`, backgroundColor: THEME.primary }} />
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-[14px] text-slate-500 italic text-center px-6 line-clamp-3 leading-relaxed mb-6 font-serif">"{entry.message}"</p>
      </div>

      <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        <ShareButton targetRef={cardRef} fileName={`moonlight-${entry.date}.png`} />
      </div>
    </div>
  );
};

const Vault = ({ searchTerm, setSearchTerm, filterHighMana, setFilterHighMana, filteredEntries, setView, isOnline }) => {
  return (
    <div className="min-h-screen w-full flex flex-col p-10 md:p-16 pb-48 relative overflow-x-hidden font-sans animate-fade-in" style={{ backgroundColor: THEME.bg, color: THEME.secondary }}>
      <GraphGrid />
      <StatusHeader isOnline={isOnline} />
      <div className="w-full flex justify-center mb-16 relative z-10"><Logo size="text-6xl" subtitle="THE SACRED ARCHIVE" /></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto mb-20 space-y-8 px-4">
          <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 relative group">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 opacity-30 text-white group-focus-within:text-gold transition-all" size={24} />
                  <input type="text" placeholder="Search the whispers of your soul..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-20 pr-8 py-6 rounded-[32px] bg-white/5 border border-white/10 text-lg text-white focus:outline-none focus:border-gold transition-all shadow-2xl backdrop-blur-md" />
              </div>
              <div className="flex gap-4">
                  <button onClick={() => setFilterHighMana(!filterHighMana)} className={`px-10 py-6 rounded-[32px] text-[12px] font-black uppercase tracking-[0.3em] border transition-all ${filterHighMana ? 'bg-gold border-gold text-slate-900 shadow-xl shadow-gold/30' : 'bg-white/5 border-white/10 text-white/40'}`} style={{ backgroundColor: filterHighMana ? THEME.primary : '', borderColor: filterHighMana ? THEME.primary : '' }}>High Mana Only</button>
              </div>
          </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-4 mb-32">
          {filteredEntries.map(entry => (
             <VaultEntryCard key={entry.id} entry={entry} />
          ))}
      </div>
      <BottomNav view="vault" setView={setView} />
      <style>{`.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }`}</style>
    </div>
  );
};

export default Vault;