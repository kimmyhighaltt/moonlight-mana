import React, { useRef } from 'react';
import { Search, TrendingUp, TrendingDown, Image as ImageIcon, Clock } from 'lucide-react';
import { THEME } from '../constants/index';
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';
import ShareButton from '../components/ShareButton';

const VaultEntryCard = ({ entry }) => {
  const cardRef = useRef(null);

  return (
    <div className="flex flex-col gap-6 group w-full max-w-lg mx-auto"> 
      <div 
        ref={cardRef}
        // Ensure BG is WHITE (Solid)
        className="relative bg-white text-slate-900 rounded-[32px] md:rounded-[40px] shadow-xl p-6 md:p-8 flex flex-col items-center transition-all hover:scale-[1.02] cursor-default min-h-[450px] border-b-8 border-gold/10"
      >
        <div className="w-full flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-left">
                <span className="text-lg font-black tracking-widest text-slate-900">{entry.date}</span>
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
            <div className="px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Ritual</div>
          </div>
        </div>

        <div className="w-full aspect-[1/1.5] rounded-[24px] bg-zinc-100 overflow-hidden relative mb-6 shadow-lg border-4 border-slate-50">
          {entry.img ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${entry.img}")` }} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300"><ImageIcon size={48} /></div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
            <span className="text-white font-serif italic text-lg">{entry.card}</span>
          </div>
        </div>
        
        <div className="w-full grid grid-cols-2 gap-4 mb-6">
          {['Body', 'Soul', 'Mind', 'Heart'].map(l => {
            const v = entry.pillars?.[l.toLowerCase()] || entry.mana;
            return (
              <div key={l} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{l}</span>
                  <span className="text-[9px] font-black text-yellow-600">{v}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: `${v}%`, backgroundColor: THEME.primary }} />
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-sm text-slate-600 italic text-center px-4 line-clamp-3 leading-relaxed font-serif">"{entry.message}"</p>
      </div>

      <div className="flex justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
        <ShareButton targetRef={cardRef} fileName={`moonlight-${entry.date}.png`} />
      </div>
    </div>
  );
};

const Vault = ({ searchTerm, setSearchTerm, filterHighMana, setFilterHighMana, filteredEntries, setView, isOnline }) => {
  return (
    <div className="min-h-screen w-full flex flex-col p-6 md:p-10 lg:p-16 pb-40 relative overflow-x-hidden font-sans animate-fade-in" style={{ backgroundColor: THEME.bg, color: THEME.secondary }}>
      <GraphGrid />
      <div className="w-full flex justify-between items-start mb-8">
          <StatusHeader isOnline={isOnline} />
      </div>
      
      <div className="w-full flex justify-center mb-8 relative z-10"><Logo size="text-4xl md:text-5xl lg:text-6xl" subtitle="THE SACRED ARCHIVE" /></div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto mb-10 space-y-4 px-2">
          <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 opacity-30 text-slate-400" size={20} />
                  
                  {/* FIX: Changed bg-white/10 to bg-white (Solid) and text to slate-900 */}
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full pl-16 pr-8 py-4 rounded-[24px] bg-white border-2 border-transparent text-slate-900 focus:outline-none focus:border-gold transition-all shadow-lg placeholder:text-slate-400" 
                  />
              </div>
              
              {/* FIX: Inactive button is now Solid White (bg-white) instead of glass */}
              <button 
                onClick={() => setFilterHighMana(!filterHighMana)} 
                className={`px-6 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] border-2 transition-all shadow-lg ${filterHighMana ? 'bg-gold border-gold text-slate-900' : 'bg-white border-white text-slate-500 hover:text-slate-900'}`} 
                style={{ backgroundColor: filterHighMana ? THEME.primary : '' }}
              >
                High Mana
              </button>
          </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 mb-20">
          {filteredEntries.map(entry => (
             <VaultEntryCard key={entry.id} entry={entry} />
          ))}
      </div>
      <BottomNav view="vault" setView={setView} />
    </div>
  );
};

export default Vault;