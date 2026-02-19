import React from 'react';
import { Moon, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Waves, ShoppingBag, ExternalLink, ChevronRight as ChevronRightSmall } from 'lucide-react';
import { THEME, SACRED_TOOLS } from '../constants/index';
import { getMoonPhase } from '../utils/lunarLogic';
import { Logo, StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground'; // 🌌 THE MAGIC

const Planner = ({ 
  currentTime, hemisphere, toggleHemisphere, selectedCalendarDay, setSelectedCalendarDay, setView, isOnline, onBack
}) => {
  
  const carouselItems = [...SACRED_TOOLS, ...SACRED_TOOLS];

  // 🕒 Standardized Time Logic (Matches Reflection & Tracker)
  const displayTime = new Date(currentTime);
  const ds = displayTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  const ts = displayTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const PHASE_QUOTES = {
    'New Moon': "A time of darkness and new beginnings. Set your intentions clearly.",
    'Waxing Crescent': "Energy is building. Take the first step towards your goals.",
    'First Quarter': "Challenges may arise. Stand firm in your decisions.",
    'Waxing Gibbous': "Refine and edit. You are close to fruition.",
    'Full Moon': "Maximum power and illumination. Celebrate your progress.",
    'Waning Gibbous': "Gratitude and sharing. Give back what you have received.",
    'Last Quarter': "Release and let go. Clear the path for what comes next.",
    'Waning Crescent': "Rest, recover, and reflect. The cycle is almost complete."
  };

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

  const getTideTimes = (day) => {
    const baseHour = 6; 
    const dailyShiftMinutes = 50 * (day - 1);
    let totalMinutes = (baseHour * 60) + dailyShiftMinutes;
    while (totalMinutes >= 1440) totalMinutes -= 1440;
    
    const h1 = Math.floor(totalMinutes / 60);
    const m1 = totalMinutes % 60;
    let lowMinutes = totalMinutes + (6.2 * 60);
    while (lowMinutes >= 1440) lowMinutes -= 1440;
    const h2 = Math.floor(lowMinutes / 60);
    const m2 = Math.floor(lowMinutes % 60);

    const fmt = (h, m) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    return { high: fmt(h1, m1), low: fmt(h2, m2) };
  };

  const renderCalendar = () => {
    let blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push(<div key={`blank-${i}`} className="h-16 md:h-32 bg-transparent" />);
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
          className={`relative h-16 md:h-32 rounded-xl md:rounded-3xl border transition-all cursor-pointer flex flex-col items-center justify-start pt-2 md:pt-4 gap-1 md:gap-2 group backdrop-blur-md
            ${isSelected ? 'bg-amber-200 border-amber-200 text-slate-900 scale-105 z-10 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}
            ${isToday ? 'ring-2 ring-amber-200/50' : ''}
          `}
        >
          <span className={`text-[10px] md:text-xs font-black opacity-80 ${isSelected ? 'text-slate-900' : 'text-amber-100'}`}>{d}</span>
          <div className="flex-1 flex items-center justify-center">
             <Moon size={16} className={`md:w-8 md:h-8 ${hemisphere === 'Northern' ? 'rotate-180' : ''} ${isSelected ? 'text-slate-900 fill-slate-900' : 'text-amber-100 fill-amber-100/20'}`} />
          </div>
          <span className={`hidden md:block text-[7px] uppercase tracking-widest opacity-60 font-black pb-4 text-center px-1 ${isSelected ? 'text-slate-900' : 'text-white'}`}>
            {moon.label}
          </span>
          <div className={`md:hidden w-1 h-1 rounded-full opacity-50 mb-2 ${isSelected ? 'bg-slate-900' : 'bg-amber-200'}`} />
        </div>
      );
    }
    return [...blanks, ...daysArray];
  };

  let tides = null;
  let phaseQuote = "";
  let selectedMoon = null;
  if (selectedCalendarDay) {
      tides = getTideTimes(selectedCalendarDay);
      const thisDate = new Date(year, currentTime.getMonth(), selectedCalendarDay);
      selectedMoon = getMoonPhase(thisDate);
      phaseQuote = PHASE_QUOTES[selectedMoon.label] || "Connect with the lunar energy today.";
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden font-sans animate-fade-in pb-40 text-white bg-[#020617]">
      
      <CelestialBackground />
      <div className="fixed inset-0 bg-slate-900/20 pointer-events-none" />

      {/* 🚨 UNIVERSAL HEADER: Standardized Branding & Time */}
      <div className="relative z-20 w-full flex flex-col md:flex-row md:justify-between items-center md:items-start p-6 md:p-10 gap-6 max-w-[1600px] mx-auto">
        <StatusHeader isOnline={isOnline} onBack={onBack} />
        <div className="flex flex-col items-center">
            <Logo size="text-3xl md:text-4xl" subtitle="LUNAR PLANNER" />
        </div>
        <div className="text-center md:text-right text-white drop-shadow-md">
          <div className="text-4xl md:text-5xl font-serif font-light tracking-tighter text-amber-50">{ts}</div>
          <div className="text-[11px] uppercase opacity-60 tracking-[0.4em] font-black text-amber-200">{ds}</div>
        </div>
      </div>

      {/* MONTH NAVIGATOR */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-full backdrop-blur-xl shadow-2xl">
            <button className="p-2 hover:bg-white/10 rounded-full text-amber-100 transition-all"><ChevronLeft size={20} /></button>
            <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-serif tracking-widest text-white uppercase">{monthName}</span>
                <span className="text-[10px] text-amber-200/60 font-bold tracking-[0.4em]">{year}</span>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full text-amber-100 transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 md:px-4 mb-10">
        <div className="grid grid-cols-7 mb-6 text-center">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <span key={d} className="text-[9px] font-black text-amber-200/40 tracking-[0.3em] uppercase">{d}</span>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-1 md:gap-4">
            {renderCalendar()}
        </div>
      </div>

      {/* SACRED TOOLS CAROUSEL (Apothecary Style) */}
      <section className="relative z-10 w-full mt-10 mb-10 overflow-hidden">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-6 px-6">
            <div className="flex items-center gap-3">
                <ShoppingBag size={14} className="text-amber-200/40" />
                <div className="flex flex-col">
                    <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white">The Apothecary</h3>
                    <span className="text-[8px] text-amber-200/60 tracking-widest uppercase font-bold">Recommended for Rituals</span>
                </div>
            </div>
            <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-200/40 hover:text-white transition-colors">
                View All <ChevronRightSmall size={10} />
            </button>
        </div>
        
        <div className="flex w-full overflow-hidden mask-fade">
            <div className="flex gap-4 md:gap-6 animate-marquee hover:pause pl-4">
                {carouselItems.map((tool, index) => (
                    <div 
                        key={`${tool.id}-${index}`} 
                        className="flex-shrink-0 w-56 md:w-64 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden hover:bg-slate-900/60 transition-all group cursor-pointer"
                    >
                        <div className="h-28 md:h-32 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-all duration-500" style={{ backgroundImage: `url(${tool.img})` }} />
                        <div className="p-4 md:p-5 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold text-white leading-tight">{tool.name}</h4>
                                <ExternalLink size={12} className="opacity-40 text-white mt-1" />
                            </div>
                            <span className="text-[10px] font-black mt-1 text-amber-200">{tool.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CALENDAR POPUP: Glass Modal Style */}
      {selectedCalendarDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedCalendarDay(null)}>
          <div className="w-full max-w-sm bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300 relative" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedCalendarDay(null)} 
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6 pr-8">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-200/20">
                      <CalendarIcon size={24} className="text-amber-200" />
                  </div>
                  <div>
                      <h4 className="text-xl font-serif text-white">{monthName} {selectedCalendarDay}</h4>
                      <span className="text-[10px] uppercase tracking-widest opacity-40 text-amber-100 font-black">Projected Alignment</span>
                  </div>
              </div>

              <div className="flex items-center gap-5 mb-6 bg-amber-500/5 p-5 rounded-3xl border border-amber-200/10">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                      <Waves size={20} />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-center w-full">
                          <span className="text-[9px] font-black uppercase tracking-widest text-amber-100/40">High Tide</span>
                          <span className="text-xs font-bold text-white">{tides.high}</span>
                      </div>
                      <div className="w-full h-[1px] bg-white/5" />
                      <div className="flex justify-between items-center w-full">
                          <span className="text-[9px] font-black uppercase tracking-widest text-amber-100/40">Low Tide</span>
                          <span className="text-xs font-bold text-white">{tides.low}</span>
                      </div>
                  </div>
              </div>

              <div className="relative">
                  <div className="absolute -top-1 -left-3 text-amber-200/20"><Quote size={40} fill="currentColor" /></div>
                  <p className="text-md text-white/90 leading-relaxed italic font-serif relative z-10 px-2 pt-2">
                    "{phaseQuote}"
                  </p>
              </div>
          </div>
        </div>
      )}

      <BottomNav view="planner" setView={setView} />
      
      <style>{`
        .animate-marquee { animation: scroll 30s linear infinite; }
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
        .hover\\:pause:hover { animation-play-state: paused; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

// Simple Quote helper for the modal
const Quote = (props) => (
    <svg {...props} viewBox="0 0 24 24" stroke="none"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H21.017C21.5693 3 22.017 3.44772 22.017 4V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C3.89543 8 3 7.10457 3 6V3H10C10.5523 3 11 3.44772 11 4V15C11 18.3137 8.31371 21 5 21H3Z"/></svg>
);

export default Planner;