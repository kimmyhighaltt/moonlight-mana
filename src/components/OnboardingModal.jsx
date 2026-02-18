import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, Loader2, Moon } from 'lucide-react';

const OnboardingModal = ({ onComplete, isLoading = false }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🌌 GENERATE THE STARS
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && dob && !isSubmitting) {
      setIsSubmitting(true);
      onComplete({ name, dob, isGuest: false });
    }
  };

  const handleGuestEntry = () => {
    if (!isSubmitting) {
        setIsSubmitting(true);
        onComplete({ name: 'Seeker', dob: null, isGuest: true }); 
    }
  };

  const activeLoading = isSubmitting || isLoading;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center animate-in fade-in duration-700 bg-black overflow-hidden">
      
      {/* 🌌 V11: RESPONSIVE NEBULA (Tamed for Mobile) */}
      <div className="absolute inset-0 z-0">
        
        {/* Layer 1: The Void Base */}
        <div className="absolute inset-0 bg-[#020617]" />
        
        {/* Layer 2: THE GLOWING NEBULA CLOUDS */}
        {/* KEY CHANGE: Using 'w-[300px] md:w-[700px]' to shrink them on mobile */}
        
        {/* Top Left: Hot Pink/Magenta */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-fuchsia-600/30 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        
        {/* Bottom Right: Golden Amber */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-amber-500/30 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen" />
        
        {/* Top Right: Electric Violet */}
        <div className="absolute top-[10%] right-[-20%] w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-violet-600/30 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen" />
        
        {/* Bottom Left: Deep Cyan */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-500/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen" />

        {/* Layer 3: The Stars */}
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
      <div className="w-full max-w-md bg-slate-950/40 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden z-10 backdrop-blur-xl ring-1 ring-white/10 mx-4">
        
        {/* Inner Card Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md">
            <Sparkles className={`${activeLoading ? 'animate-spin' : 'animate-pulse'} text-amber-100`} size={32} />
          </div>
          
          <h2 className="text-3xl font-serif text-white mb-2 tracking-wide drop-shadow-md">
            {activeLoading ? "Aligning the Stars..." : "Welcome, Seeker"}
          </h2>
          <p className="text-amber-50/70 text-sm mb-8 leading-relaxed font-light tracking-wide drop-shadow-md">
            {activeLoading 
              ? "We're calculating your lunar alignment based on your birth energy."
              : "To align the cards with your energy, tell us a little about yourself."
            }
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left opacity-transition duration-300" style={{ opacity: activeLoading ? 0.5 : 1 }}>
              <label className="text-[10px] uppercase tracking-widest text-amber-200/90 font-bold ml-1 text-shadow">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah"
                disabled={activeLoading}
                className="w-full bg-slate-900/60 border border-white/10 focus:border-amber-200/50 rounded-xl px-4 py-3 text-white focus:outline-none transition-all placeholder:text-white/20 hover:border-white/20 hover:bg-slate-900/80 backdrop-blur-sm"
                required
              />
            </div>

            <div className="space-y-1 text-left opacity-transition duration-300" style={{ opacity: activeLoading ? 0.5 : 1 }}>
              <label className="text-[10px] uppercase tracking-widest text-amber-200/90 font-bold ml-1 text-shadow">Date of Birth</label>
              <input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={activeLoading}
                className="w-full bg-slate-900/60 border border-white/10 focus:border-amber-200/50 rounded-xl px-4 py-3 text-white focus:outline-none transition-all hover:border-white/20 hover:bg-slate-900/80 backdrop-blur-sm"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={activeLoading || !name || !dob}
              className={`w-full mt-6 py-4 font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.1)]
                ${activeLoading 
                  ? 'bg-slate-800/80 text-white/40 cursor-wait' 
                  : 'bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]'
                }`}
            >
              {activeLoading ? (
                <>
                  Calculating... <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  Begin Journey <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {!activeLoading && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <button 
                  onClick={handleGuestEntry}
                  className="group flex items-center justify-center gap-2 mx-auto text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors py-2"
                >
                  <Moon size={12} className="text-white/40 group-hover:text-amber-200 transition-colors" />
                  <span className="border-b border-transparent group-hover:border-amber-200 pb-0.5 transition-all">Just looking? Enter as Guest</span>
                </button>
              </div>
          )}
          
          {activeLoading && (
            <p className="mt-4 text-[10px] text-amber-200/60 uppercase tracking-[0.2em] animate-pulse">
              Consulting the Moon...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;