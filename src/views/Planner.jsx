import React from 'react';
import { Moon, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Waves } from 'lucide-react';
import { THEME } from '../constants/index';
import { getMoonPhase } from '../utils/lunarLogic';
import { Logo, GraphGrid, StatusHeader, BottomNav } from '../components/UIComponents';

const Planner = ({ 
  currentTime, hemisphere, toggleHemisphere, selectedCalendarDay, setSelectedCalendarDay, setView 
}) => {
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

  // NEW: Calculate approx tide times based on the day of the month
  // Tides shift approx 50 mins later each day. 
  // This is a simulation to give the user a realistic feel.
  const getTideTimes = (day) => {
    const baseHour = 6; // Start reference (e.g., High tide at 6am on 1st)
    const dailyShiftMinutes = 50 * (day - 1);
    
    let totalMinutes = (baseHour * 60) + dailyShiftMinutes;
    
    // Normalize to 24h
    while (totalMinutes >= 1440) totalMinutes -= 1440;
    
    const h1 = Math.floor(totalMinutes / 60);
    const m1 = totalMinutes % 60;
    
    // Low tide is roughly 6.2 hours after high
    let lowMinutes = totalMinutes + (6.2 * 60);
    while (lowMinutes >= 1440) lowMinutes -= 1440;
    const h2 = Math.floor(lowMinutes / 60);
    const m2 = Math.floor(lowMinutes % 60);

    const fmt = (h, m) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    return {
        high: fmt(h1, m1),
        low: fmt(h2, m2)
    };
  };

  const renderCalendar = () => {
    let blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push(<div key={`blank-${i}`} className="h-14 md:h-32 bg-transparent" />);
    }

    let daysArray = [];
    for (let d = 1; d <= days; d++) {
      const thisDate = new Date(year, currentTime.getMonth(), d);
      const moon = getMoonPhase(thisDate);
      const isToday = d === new Date().getDate();
      const isSelected = selectedCalendarDay === d;

      daysArray.push(
        <div 
          key={d} 
          onClick={() => setSelectedCalendarDay(isSelected ? null : d)}
          className={`relative h-14 md:h-32 rounded-xl md:rounded-3xl border transition-all cursor-pointer flex flex-col items-center justify-start pt-2 md:pt-4 gap-1 md:gap-2 group
            ${isSelected ? 'bg-gold border-gold text-slate-900 scale-105 z-10' : 'bg-white/90 border-transparent text-slate-900 hover:bg-white'}
            ${isToday ? 'ring-4 ring-gold/50' : ''}
          `}
          style={{ backgroundColor: isSelected ? THEME.primary : '' }}
        >
          <span className={`text-[10px] md:text-sm font-black opacity-80`}>{d}</span>
          
          <div className="flex-1 flex items-center justify-center">
             <Moon size={16} className={`md:w-8 md:h-8 ${hemisphere === 'Northern' ? 'rotate-180' : ''}`} fill={isSelected ? '#000' : 'currentColor'} color={isSelected ? '#000' : THEME.primary} />
          </div>

          <span className="hidden md:block text-[8px] uppercase tracking-widest opacity-60 font-black pb-4 text-center px-1">
            {moon.label}
          </span>
          <div className="md:hidden w-1 h-1 rounded-full bg-slate-400 opacity-50 mb-2" />
        </div>
      );
    }
    return [...blanks, ...daysArray];
  };

  // Pre-calculate tide for the selected day
  const tides = selectedCalendarDay ? getTideTimes(selectedCalendarDay) : null;

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden font-sans animate-fade-in pb-40" style={{ backgroundColor: THEME.bg }}>
      <GraphGrid />
      
      <div className="w-full flex justify-between items-start p-6 pt-12 md:p-10">
        <StatusHeader isOnline={true} />
        <button onClick={toggleHemisphere} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-white/5 backdrop-blur-sm">
          <Moon size={12} color={THEME.primary} />
          <p className="text-[10px] tracking-[0.2em] uppercase font-black" style={{ color: THEME.primary }}>{hemisphere}</p>
        </button>
      </div>

      <div className="w-full flex flex-col items-center mb-10 relative z-10 px-4">
        <Logo size="text-3xl md:text-5xl" subtitle="LUNAR CYCLE PLANNER" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between bg-white/10 border border-white/20 p-4 rounded-full backdrop-blur-md">
            <button className="p-2 hover:bg-white/20 rounded-full text-white"><ChevronLeft size={20} /></button>
            <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-black tracking-widest text-white uppercase">{monthName}</span>
                <span className="text-[10px] text-gold font-bold tracking-[0.4em]" style={{ color: THEME.primary }}>{year}</span>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-full text-white"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 md:px-4 mb-20">
        <div className="grid grid-cols-7 mb-4 text-center">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <span key={d} className="text-[10px] font-black text-white/50 tracking-widest">{d}</span>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-4">
            {renderCalendar()}
        </div>
      </div>

      {selectedCalendarDay && (
        <div className="fixed bottom-32 left-4 right-4 md:left-auto md:right-10 md:w-80 bg-white text-slate-900 border-4 border-slate-100 p-6 rounded-[32px] shadow-2xl z-40 animate-slide-up">
            <button 
              onClick={() => setSelectedCalendarDay(null)} 
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-4 pr-8">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20" style={{ borderColor: THEME.primary }}>
                    <CalendarIcon size={20} color={THEME.primary} />
                </div>
                <div>
                    <h4 className="text-lg font-bold">{monthName} {selectedCalendarDay}</h4>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 text-slate-500">Projected Energy</span>
                </div>
            </div>

            {/* NEW: TIDE SECTION */}
            <div className="flex items-center gap-4 mb-4 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <Waves size={18} />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center w-full">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">High Tide</span>
                        <span className="text-xs font-bold text-slate-700">{tides.high}</span>
                    </div>
                    <div className="w-full h-[1px] bg-blue-200/50" />
                    <div className="flex justify-between items-center w-full">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Low Tide</span>
                        <span className="text-xs font-bold text-slate-700">{tides.low}</span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
                The moon is in a powerful phase for setting intentions. Focus your mana on new beginnings.
            </p>
        </div>
      )}

      <BottomNav view="planner" setView={setView} />
      <style>{`.animate-slide-up { animation: slideUp 0.5s ease-out; } @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
};

export default Planner;