import React from 'react';
import { Moon, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { THEME } from '../constants/index';
import { getMoonPhase } from '../utils/lunarLogic';
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';

const Planner = ({ 
  currentTime, hemisphere, toggleHemisphere, selectedCalendarDay, setSelectedCalendarDay, setView 
}) => {
  
  // Helper to get days in current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentTime);
  const monthName = currentTime.toLocaleString('default', { month: 'long' }).toUpperCase();
  const year = currentTime.getFullYear();

  // Generate calendar grid
  const renderCalendar = () => {
    let blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push(<div key={`blank-${i}`} className="h-14 md:h-32 bg-transparent" />);
    }

    let daysArray = [];
    for (let d = 1; d <= days; d++) {
      // Calculate moon phase for this specific day
      const thisDate = new Date(year, currentTime.getMonth(), d);
      const moon = getMoonPhase(thisDate);
      const isToday = d === new Date().getDate();
      const isSelected = selectedCalendarDay === d;

      daysArray.push(
        <div 
          key={d} 
          onClick={() => setSelectedCalendarDay(d)}
          className={`relative h-14 md:h-32 rounded-xl md:rounded-3xl border transition-all cursor-pointer flex flex-col items-center justify-start pt-2 md:pt-4 gap-1 md:gap-2 group
            ${isSelected ? 'bg-gold border-gold text-slate-900 scale-105 z-10' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}
            ${isToday ? 'ring-2 ring-white/50' : ''}
          `}
          style={{ backgroundColor: isSelected ? THEME.primary : '' }}
        >
          <span className={`text-[10px] md:text-sm font-black ${isSelected ? 'opacity-100' : 'opacity-40'}`}>{d}</span>
          
          {/* Moon Icon */}
          <div className="flex-1 flex items-center justify-center">
             <Moon size={16} className={`md:w-8 md:h-8 ${hemisphere === 'Northern' ? 'rotate-180' : ''}`} fill={isSelected ? '#000' : 'currentColor'} color={isSelected ? '#000' : THEME.primary} />
          </div>

          {/* Phase Name - Hidden on Mobile, Visible on Desktop */}
          <span className="hidden md:block text-[8px] uppercase tracking-widest opacity-60 font-black pb-4 text-center px-1">
            {moon.label}
          </span>
          
          {/* Mobile Dot for Phase */}
          <div className="md:hidden w-1 h-1 rounded-full bg-current opacity-50 mb-2" />
        </div>
      );
    }

    return [...blanks, ...daysArray];
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden font-sans animate-fade-in pb-40" style={{ backgroundColor: THEME.bg }}>
      <GraphGrid />
      
      {/* HEADER */}
      <div className="w-full flex justify-between items-start p-6 pt-12 md:p-10">
        <StatusHeader isOnline={true} />
        <button onClick={toggleHemisphere} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-white/5 backdrop-blur-sm">
          <Moon size={12} color={THEME.primary} />
          <p className="text-[10px] tracking-[0.2em] uppercase font-black" style={{ color: THEME.primary }}>
            {hemisphere}
          </p>
        </button>
      </div>

      <div className="w-full flex flex-col items-center mb-10 relative z-10 px-4">
        <Logo size="text-3xl md:text-5xl" subtitle="LUNAR CYCLE PLANNER" />
      </div>

      {/* Month Navigation */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-full backdrop-blur-md">
            <button className="p-2 hover:bg-white/10 rounded-full transition-all text-white"><ChevronLeft size={20} /></button>
            <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-black tracking-widest text-white uppercase">{monthName}</span>
                <span className="text-[10px] text-gold font-bold tracking-[0.4em]" style={{ color: THEME.primary }}>{year}</span>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-all text-white"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 md:px-4 mb-20">
        {/* Days Header */}
        <div className="grid grid-cols-7 mb-4 text-center">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <span key={d} className="text-[10px] font-black text-white/30 tracking-widest">{d}</span>
            ))}
        </div>
        
        {/* The Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-4">
            {renderCalendar()}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedCalendarDay && (
        <div className="fixed bottom-32 left-4 right-4 md:left-auto md:right-10 md:w-80 bg-slate-900/90 border border-gold/20 p-6 rounded-[32px] backdrop-blur-xl shadow-2xl z-40 animate-slide-up">
            <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20" style={{ borderColor: THEME.primary }}>
                    <CalendarIcon size={20} color={THEME.primary} />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white">{monthName} {selectedCalendarDay}</h4>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 text-white">Projected Energy</span>
                </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
                The moon is in a powerful phase for setting intentions. Focus your mana on new beginnings.
            </p>
        </div>
      )}

      <BottomNav view="planner" setView={setView} />
      
      <style>{`
        .animate-slide-up { animation: slideUp 0.5s ease-out; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Planner;