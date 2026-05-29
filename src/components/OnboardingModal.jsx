import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, Loader2, Moon, Calendar, User } from 'lucide-react';
import { getZodiacSign, getLifePathNumber } from '../utils/cosmicLogic'; 

const OnboardingModal = ({ onComplete, isLoading = false }) => {
  // --- 1. State Management ---
  const [step, setStep] = useState(1);
  const [isGreeting, setIsGreeting] = useState(false); // 🕯️ The Acknowledgment Threshold
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const activeLoading = isSubmitting || isLoading;

  // --- 2. Live Cosmic Reflection ---
  const cosmicSignature = useMemo(() => {
    if (!dob) return null;
    return {
      sign: getZodiacSign(dob),
      lifePath: getLifePathNumber(dob)
    };
  }, [dob]);

  // --- 3. Star Field Logic ---
  const stars = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.6 ? 2 : 1, 
      opacity: Math.random() * 0.8 + 0.2, 
      animationDuration: `${Math.random() * 4 + 2}s`, 
      animationDelay: `${Math.random() * 2}s`
    }));
  }, []);

  // --- 4. Action Handlers ---
  const handleNextStep = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsGreeting(true); // Flash the greeting ritual text

      // Let them sit with their acknowledged name for one brief breath cycle
      setTimeout(() => {
        setIsGreeting(false);
        setStep(2); // Seamlessly slide into the birth date inputs
      }, 2600);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && dob && !isSubmitting) {
      setIsSubmitting(true);
      
      // Notify parent App.jsx to fire up your Firebase cloud synchronization
      onComplete({ name, dob, isGuest: false });

      // Keep this processing window active for intentional cosmic resolution
      setTimeout(() => {
        setIsDone(true); 
      }, 3500); 
    }
  };

  const handleGuestEntry = () => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      onComplete({ name: 'Seeker', dob: null, isGuest: true }); 
      
      setTimeout(() => { 
        setIsDone(true); 
      }, 1500);
    }
  };

  // --- 5. Dom Dismount ---
  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center animate-in fade-in duration-1000 bg-black overflow-hidden">
      
      {/* 🌌 NEBULA BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#020617]" />
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-fuchsia-600/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-amber-500/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen" />
        
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
              boxShadow: star.size > 1 ? '0 0 6px rgba(255, 255, 255, 0.9)' : 'none'
            }}
          />
        ))}
      </div>

      {/* THE MODAL CARD */}
      <div className="w-full max-w-md bg-slate-950/50 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden z-10 backdrop-blur-xl ring-1 ring-white/10 mx-4 transition-all duration-500">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md">
            <Sparkles className={`${activeLoading ? 'animate-spin' : 'animate-pulse'} text-amber-100`} size={32} />
          </div>
          
          <h2 className="text-3xl font-serif text-white mb-2 tracking-wide transition-all duration-500 animate-in fade-in">
            {activeLoading 
              ? "Weaving Your Profile..." 
              : isGreeting 
                ? `Hail, ${name}` 
                : step === 1 
                  ? "Welcome, Seeker" 
                  : "Aligning Your Transit"
            }
          </h2>
          
          <p className="text-amber-50/70 text-sm mb-8 h-12 leading-relaxed font-light tracking-wide transition-all duration-500">
            {activeLoading 
              ? "Mapping your astral blueprint into the database architecture..."
              : isGreeting
                ? "Your presence is registered in the silence of the sanctuary. Prepare your coordinates."
                : step === 1 
                  ? "How should the Moonlight Mana sanctuary address your presence?"
                  : "Enter your birth date to establish your local cosmic signature."
            }
          </p>

          {/* STEP 1: IDENTITY INPUT */}
          {step === 1 && !isGreeting && !activeLoading && (
            <form onSubmit={handleNextStep} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase tracking-widest text-amber-200/90 font-bold ml-1 flex items-center gap-1.5">
                  <User size={10} /> Your Identity Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-amber-200/50 rounded-xl px-4 py-3 text-white focus:outline-none transition-all placeholder:text-white/20 hover:border-white/20 hover:bg-slate-900/80 backdrop-blur-sm"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={!name.trim()}
                className="w-full mt-6 py-4 font-bold uppercase tracking-widest rounded-xl bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-40"
              >
                Continue <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* THE GREETING PAUSE */}
          {isGreeting && (
            <div className="py-8 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700 text-center">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-amber-200/30 animate-ping opacity-25" style={{ animationDuration: '2s' }} />
                <Moon size={20} className="text-amber-100 animate-pulse" />
              </div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-amber-200/40 font-bold mt-4 animate-pulse">
                Sensing Astral Frequency
              </p>
            </div>
          )}

          {/* STEP 2: COSMIC HOROSCOPE ALIGNMENT */}
          {step === 2 && !isGreeting && (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-1 text-left opacity-transition duration-300" style={{ opacity: activeLoading ? 0.4 : 1 }}>
                <label className="text-[10px] uppercase tracking-widest text-amber-200/90 font-bold ml-1 flex items-center gap-1.5">
                  <Calendar size={10} /> Date of Birth
                </label>
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={activeLoading}
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-amber-200/50 rounded-xl px-4 py-3 text-white focus:outline-none transition-all hover:border-white/20 hover:bg-slate-900/80 backdrop-blur-sm"
                  required
                />
              </div>

              {/* 🌟 REVEAL MANIFESTATION LAYER */}
              {cosmicSignature && !activeLoading && (
                <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-left flex justify-around animate-in zoom-in-95 duration-300">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Zodiac Archetype</p>
                    <p className="text-sm font-serif text-amber-100 mt-0.5">{cosmicSignature.sign}</p>
                  </div>
                  <div className="border-l border-white/10 h-8 self-center" />
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Life Path Vibration</p>
                    <p className="text-sm font-serif text-amber-100 mt-0.5">Frequency {cosmicSignature.lifePath}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {!activeLoading && (
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-4 rounded-xl border border-white/10 text-white text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button 
                  type="submit" 
                  disabled={activeLoading || !dob}
                  className={`flex-1 py-4 font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2
                    ${activeLoading 
                      ? 'bg-slate-800/80 text-white/40 cursor-wait' 
                      : 'bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 hover:scale-[1.01] active:scale-[0.99]'
                    }`}
                >
                  {activeLoading ? (
                    <>
                      Aligning Vectors... <Loader2 size={18} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Confirm Integration <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* GUEST ACCESS FOOTER */}
          {!activeLoading && step === 1 && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <button 
                type="button"
                onClick={handleGuestEntry}
                className="group flex items-center justify-center gap-2 mx-auto text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors py-2"
              >
                <Moon size={12} className="text-white/40 group-hover:text-amber-200 transition-colors" />
                <span className="border-b border-transparent group-hover:border-amber-200 pb-0.5 transition-all">Just looking? Enter as Guest</span>
              </button>
            </div>
          )}
          
          {activeLoading && (
            <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/5 animate-pulse text-center">
              <p className="text-[10px] text-amber-200/80 uppercase tracking-[0.25em] font-medium">
                Establishing Cloud Infrastructure...
              </p>
              <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">
                Do not close the sanctuary window
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;