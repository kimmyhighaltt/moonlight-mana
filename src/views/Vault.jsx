import React, { useRef } from 'react';
import { Search, TrendingUp, TrendingDown, Image as ImageIcon, Star, Ghost, Trash2 } from 'lucide-react'; 
import { THEME, TAROT_DECK } from '../constants/index'; 
import { Logo, StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';
import ShareButton from '../components/ShareButton'; 

const VaultEntryCard = ({ entry, onDelete }) => {
  const cardRef = useRef(null);
  const deckCard = TAROT_DECK?.find(c => c.name === entry.card);
  const displayImg = deckCard?.img || entry.img;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 🖼️ THE CAPTURE AREA (Branded for Sharing) */}
      <div 
        ref={cardRef}
        className="group relative bg-[#020617] border border-white/10 rounded-[28px] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header: Time & Trend */}
        <div className="p-4 flex justify-between items-center bg-white/5 border-b border-white/5">
            <div className="flex flex-col text-left">
                <span className="text-[10px] font-black tracking-widest text-white">{entry.date}</span>
                <span className="text-[8px] font-bold text-amber-200/40 uppercase">{entry.time}</span>
            </div>
            {entry.trend === 'up' ? <TrendingUp size={12} className="text-emerald-400" /> : <TrendingDown size={12} className="text-rose-400" />}
        </div>

        {/* Full Image Area */}
        <div className="relative w-full aspect-[2/3] bg-slate-950 overflow-hidden">
          {displayImg ? (
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${displayImg}")` }} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800"><ImageIcon size={20} className="opacity-20" /></div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent">
              <h4 className="text-sm font-serif italic text-amber-100 text-center drop-shadow-md">{entry.card}</h4>
          </div>
        </div>

        {/* Pillar Readouts (Mini) */}
        <div className="p-4 grid grid-cols-2 gap-x-3 gap-y-2 bg-white/[0.02]">
          {['Mind', 'Body', 'Heart', 'Soul'].map(l => {
            const v = entry.pillars?.[l.toLowerCase()] || entry.mana || 0;
            return (
              <div key={l} className="flex flex-col gap-1">
                <div className="flex justify-between items-center opacity-40">
                  <span className="text-[7px] font-black uppercase tracking-widest text-white">{l}</span>
                  <span className="text-[7px] font-bold text-white">{v}%</span>
                </div>
                <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-200/50" style={{ width: `${v}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 🌙 BRANDING FOOTER (Included in screenshot) */}
        <div className="p-3 flex justify-center items-center gap-2 border-t border-white/5 bg-white/5">
            <Star size={6} className="text-amber-200/40" fill="currentColor" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">Moonlight Mana</span>
            <Star size={6} className="text-amber-200/40" fill="currentColor" />
        </div>
      </div>

      {/* ACTION BUTTONS (Outside capture area) */}
      <div className="flex justify-center gap-3">
         <ShareButton targetRef={cardRef} fileName={`mana-${entry.date}.png`} variant="minimal" />
         <button 
           onClick={() => onDelete(entry.id)} 
           className="p-3 bg-white/5 hover:bg-rose-500/20 text-white/20 hover:text-rose-400 rounded-full border border-white/10 transition-all"
         >
            <Trash2 size={14} />
         </button>
      </div>
    </div>
  );
};

const Vault = ({ searchTerm, setSearchTerm, filterHighMana, setFilterHighMana, filteredEntries, setView, isOnline, onDelete, currentTime }) => {
  
  const safeDate = currentTime || new Date();
  const ds = safeDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  const ts = safeDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden animate-fade-in pb-40 text-white bg-[#020617]">
      <CelestialBackground />
      <div className="fixed inset-0 bg-slate-900/20 pointer-events-none" />

      {/* UNIVERSAL HEADER */}
      <div className="relative z-20 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 md:p-10 gap-6 max-w-[1600px] mx-auto">
        <StatusHeader isOnline={isOnline} />
        <div className="flex flex-col items-center">
            <Logo size="text-3xl md:text-4xl" subtitle="THE SACRED ARCHIVE" />
        </div>
        <div className="text-center md:text-right text-white drop-shadow-md">
          <div className="text-4xl md:text-5xl font-serif font-light tracking-tighter text-amber-50">{ts}</div>
          <div className="text-[11px] uppercase opacity-60 tracking-[0.4em] font-black text-amber-200">{ds}</div>
        </div>
      </div>
      
      {/* SEARCH & FILTER (Side-by-side Polish) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mb-10 px-6">
          <div className="flex flex-row items-stretch gap-3">
              <div className="flex-1 relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 text-amber-100" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search archive..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-200/40 transition-all backdrop-blur-md placeholder:text-white/20" 
                  />
              </div>
              
              <button 
                onClick={() => setFilterHighMana(!filterHighMana)} 
                className={`flex items-center justify-center px-5 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all backdrop-blur-md whitespace-nowrap ${filterHighMana ? 'bg-amber-200 border-amber-200 text-slate-900 shadow-xl' : 'bg-white/5 border-white/10 text-white/60'}`} 
              >
                {filterHighMana ? '★ High' : 'Mana'}
              </button>
          </div>
      </div>

      {/* GALLERY GRID */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mb-20">
          {filteredEntries && filteredEntries.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredEntries.map(entry => (
                     <VaultEntryCard key={entry.id} entry={entry} onDelete={onDelete} />
                  ))}
              </div>
          ) : (
              <div className="w-full flex flex-col items-center justify-center py-32 opacity-30 text-center">
                <Ghost size={64} className="mb-6 opacity-20" />
                <p className="text-xl font-serif italic text-amber-50">The vault is silent...</p>
              </div>
          )}
      </div>

      <BottomNav view="vault" setView={setView} />
    </div>
  );
};

export default Vault;