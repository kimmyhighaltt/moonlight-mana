import React from 'react';
import { Moon, BookOpen, X, Star } from 'lucide-react';
import { THEME } from '../constants/index';
import { Logo, GraphGrid, BottomNav } from '../components/UIComponents';

const Planner = ({ currentTime, hemisphere, toggleHemisphere, selectedCalendarDay, setSelectedCalendarDay, setView }) => {
  const td = currentTime.getDate();
  const ml = currentTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dl = currentTime.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-10 md:p-16 pb-48 relative overflow-y-auto font-sans animate-fade-in" style={{ backgroundColor: THEME.bg }}>
      <GraphGrid />
      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center mt-12 mb-12">
          <div className="w-full bg-white rounded-[80px] shadow-[0_60px_150px_-30px_rgba(0,0,0,0.6)] overflow-hidden p-16 md:p-24 flex flex-col items-center border-b-[12px] border-slate-50">
              <div className="mb-14"><Logo size="text-6xl" subtitle="" color="#C5A021" /></div>
              <h2 className="text-4xl font-black text-gray-800 tracking-tighter mb-20 uppercase">Lunar Cycle Planner</h2>
              
              <div className="w-full flex justify-between items-center mb-20 px-4 text-slate-800">
                  <div className="px-10 py-4 border-2 border-yellow-600/10 bg-yellow-50/50 rounded-full flex items-center gap-5 shadow-inner transition-all hover:bg-yellow-50 active:scale-95 cursor-pointer" onClick={toggleHemisphere}>
                    <div className="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center text-white shadow-lg"><span className="text-[14px] font-black">+</span></div>
                    <span className="text-[14px] font-black uppercase tracking-[0.3em] text-yellow-800">{hemisphere} Hemisphere</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-black tracking-tight">{ml}</h3>
                    <div className="text-[14px] uppercase font-black text-gray-300 mt-2 tracking-[0.5em]">{dl}</div>
                  </div>
              </div>

              <div className="w-full border border-gray-100 rounded-[64px] overflow-hidden bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]">
                  <div className="grid grid-cols-7 bg-slate-50/50 border-b border-gray-100 py-12">
                    {['SUN', 'MO', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (<div key={d} className="text-center text-[15px] font-black text-slate-400 tracking-[0.3em]">{d}</div>))}
                  </div>
                  <div className="grid grid-cols-7">
                      {[...Array(4)].map((_, i) => <div key={`ee-${i}`} className="aspect-square border-r border-b border-gray-100 bg-slate-50/10" />)}
                      {[...Array(31)].map((_, i) => {
                          const d = i + 1;
                          const it = d === td;
                          return (
                              <div key={d} onClick={() => setSelectedCalendarDay(d)} className={`aspect-square border-r border-b border-gray-100 p-8 relative cursor-pointer hover:bg-slate-50 transition-all group ${it ? 'bg-yellow-50/50' : ''}`}>
                                  <span className={`text-xl font-black transition-all ${it ? 'text-yellow-600 scale-150 block text-center' : 'text-slate-300 group-hover:text-slate-600'}`}>{d}</span>
                                  {d === 12 && (
                                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 animate-pulse">
                                          <Moon size={36} fill="#F0C808" color="#F0C808" className="opacity-40" />
                                          <div className="mt-4 bg-yellow-100 px-4 py-2 rounded-xl text-yellow-800 text-[10px] font-black uppercase text-center shadow-xl">New Moon</div>
                                      </div>
                                  )}
                                  {d === 16 && (
                                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                                          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_50px_rgba(240,200,8,0.7)] animate-pulse">
                                            <div className="w-8 h-8 rounded-full bg-white/90 blur-[3px]" />
                                          </div>
                                          <div className="mt-4 bg-yellow-600 px-4 py-2 rounded-xl text-white text-[10px] font-black uppercase text-center shadow-xl">Full Moon</div>
                                      </div>
                                  )}
                              </div>
                          );
                      })}
                  </div>
              </div>

              <div className="w-full mt-24 text-left px-4">
                  <div className="flex items-center gap-6 mb-14">
                    <BookOpen size={24} className="text-gray-200" />
                    <h4 className="text-[18px] font-black uppercase tracking-[0.6em] text-gray-300">Upcoming Sacred Rituals</h4>
                  </div>
                  <div className="space-y-12">
                      {[{ d: 'JAN 29', t: 'Full Moon Release', desc: 'Scribe, Surrender & Evolve' }, { d: 'FEB 18', t: 'New Moon Intentions', desc: 'Planting Seeds of Light' }].map((r, i) => (
                          <div key={i} className="flex items-center justify-between p-14 bg-slate-50/30 rounded-[50px] border border-gray-50 group hover:border-yellow-300 hover:bg-white transition-all shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-2xl">
                              <div className="flex items-center gap-14">
                                <div className="w-28 h-28 rounded-[32px] bg-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-all border border-gray-50">
                                  <Moon size={44} color={THEME.primary} fill={THEME.primary} className="opacity-10" />
                                </div>
                                <div>
                                  <p className="text-3xl font-black text-slate-800 tracking-tighter mb-4">{r.d}: {r.t}</p>
                                  <p className="text-[16px] text-slate-400 font-bold uppercase tracking-[0.3em]">{r.desc}</p>
                                </div>
                              </div>
                              <button className="px-16 py-7 bg-gold rounded-[32px] text-[14px] font-black uppercase tracking-widest text-white shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: THEME.primary }}>Plan Ritual</button>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </main>

      {selectedCalendarDay && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-slate-900/90 backdrop-blur-3xl animate-in fade-in duration-300">
              <div className="w-full max-w-xl bg-white rounded-[70px] overflow-hidden shadow-[0_80px_160px_-20px_rgba(0,0,0,0.7)] animate-in slide-in-from-bottom-20 duration-700">
                  <div className="bg-slate-50 p-14 flex justify-between items-center border-b border-gray-100">
                      <div>
                          <h4 className="text-3xl font-black text-slate-800 tracking-tighter">Astronomical Details</h4>
                          <p className="text-[14px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">January {selectedCalendarDay}, 2026</p>
                      </div>
                      <button onClick={() => setSelectedCalendarDay(null)} className="p-6 bg-white rounded-[32px] shadow-2xl hover:bg-gray-100 transition-all border border-slate-50"><X size={28} color="#2C3E50" /></button>
                  </div>
                  <div className="p-16 space-y-12 text-slate-800">
                      <div className="grid grid-cols-2 gap-10">
                          <div className="p-10 rounded-[40px] bg-slate-50 border border-gray-100 text-center shadow-[inset_0_5px_15px_rgba(0,0,0,0.03)]">
                              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-5">Moon Rise</span>
                              <span className="text-4xl font-black text-slate-800">10:22 PM</span>
                          </div>
                          <div className="p-10 rounded-[40px] bg-slate-50 border border-gray-100 text-center shadow-[inset_0_5px_15px_rgba(0,0,0,0.03)]">
                              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-5">Moon Set</span>
                              <span className="text-4xl font-black text-slate-800">08:45 AM</span>
                          </div>
                      </div>
                      <div className="p-12 rounded-[50px] bg-indigo-50/50 border border-indigo-100 flex items-center gap-8 shadow-xl">
                          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner"><Star size={44} /></div>
                          <div>
                              <span className="text-[12px] font-black uppercase tracking-[0.5em] text-indigo-400 block mb-2">Zodiac Transit</span>
                              <span className="text-2xl font-black text-slate-800">Moon in Leo</span>
                          </div>
                      </div>
                      <div className="space-y-10">
                          <div className="p-10 border-l-8 border-gold bg-slate-50 rounded-r-[40px] italic text-lg leading-relaxed text-slate-600 shadow-sm" style={{ borderColor: THEME.primary }}>
                              "The courageous energy of Leo tonight encourages bold self-expression and the release of creative blocks."
                          </div>
                          <button onClick={() => { setView('reflection'); setSelectedCalendarDay(null); }} className="w-full py-9 bg-gold rounded-[40px] text-[14px] font-black uppercase tracking-[0.5em] text-white shadow-[0_30px_70px_-10px_rgba(212,175,55,0.6)]" style={{ backgroundColor: THEME.primary }}>Sync Vibration</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
      <BottomNav view="planner" setView={setView} />
    </div>
  );
};

export default Planner;