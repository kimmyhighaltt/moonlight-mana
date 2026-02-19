import React, { useRef } from 'react';
import { Search, TrendingUp, TrendingDown, Image as ImageIcon, Clock, Ghost, Trash2 } from 'lucide-react'; 
import { THEME, TAROT_DECK } from '../constants/index'; 
import { Logo, StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';
import ShareButton from '../components/ShareButton'; // Ensure this path is correct

const VaultEntryCard = ({ entry, onDelete }) => {
  const cardRef = useRef(null);
  const deckCard = TAROT_DECK?.find(c => c.name === entry.card);
  const displayImg = deckCard?.img || entry.img;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm("Release this memory from the archive?")) {
      onDelete(entry.id);
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div 
        ref={cardRef}
        className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden transition-all hover:border-amber-200/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] flex flex-col"
      >
        {/* HEADER: DATE & TIME */}
        <div className="p-4 flex justify-between items-center border-b border-white/5">
            <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-white">{entry.date}</span>
                <span className="text-[8px] font-bold text-amber-200/40 uppercase">{entry.time}</span>
            </div>
            {entry.trend === 'up' ? <TrendingUp size={12} className="text-emerald-400" /> : <TrendingDown size={12} className="text-rose-400" />}
        </div>

        {/* FULL IMAGE AREA: Scaled down but not cropped */}
        <div className="relative w-full aspect-[2/3] bg-slate-950 overflow-hidden">
          {displayImg ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${displayImg}")` }} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"><ImageIcon size={24} className="opacity-10" /></div>
          )}
          
          {/* Action Overlay */}
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all">
             <button onClick={handleDeleteClick} className="p-2 bg-rose-500/20 hover:bg-rose-500 text-white rounded-full backdrop-blur-md transition-all">
                <Trash2 size={12} />
             </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900 to-transparent">
              <h4 className="text-[11px] font-serif italic text-amber-100 text-center">{entry.card}</h4>
          </div>
        </div>

        {/* PILLAR MINI-READOUT */}
        <div className="p-4 grid grid-cols-2 gap-2 bg-black/20">
          {['Mind', 'Body', 'Heart', 'Soul'].map(l => {
            const v = entry.pillars?.[l.toLowerCase()] || entry.mana || 0;
            return (
              <div key={l} className="flex flex-col gap-1">
                <div className="flex justify-between items-center opacity-40">
                  <span className="text-[7px] font-black uppercase tracking-widest">{l}</span>
                  <span className="text-[7px] font-bold">{v}%</span>
                </div>
                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-200/40" style={{ width: `${v}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SHARE BUTTON: Restored under the card */}
      <div className="flex justify-center">
         <ShareButton 
            targetRef={cardRef} 
            fileName={`moonlight-mana-${entry.date}.png`}
            variant="minimal" 
         />
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
      
    {/* SEARCH & FILTER (Side-by-Side Polish) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mb-10 px-6">
          <div className="flex flex-row items-stretch gap-3">
              {/* Compact Search Bar */}
              <div className="flex-1 relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 text-amber-100" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search archive..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-200/40 transition-all backdrop-blur-md placeholder:text-white/20" 
                  />
              </div>
              
              {/* Precision Filter Button */}
              <button 
                onClick={() => setFilterHighMana(!filterHighMana)} 
                className={`flex items-center justify-center px-5 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all backdrop-blur-md whitespace-nowrap ${
                  filterHighMana 
                  ? 'bg-amber-200 border-amber-200 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                }`}
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
              <div className="w-full flex flex-col items-center justify-center py-32 opacity-30">
                <Ghost size={64} className="mb-6" />
                <p className="text-xl font-serif italic text-amber-50">The vault is silent...</p>
              </div>
          )}
      </div>

      <BottomNav view="vault" setView={setView} />
    </div>
  );
};

export default Vault;