import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Moon } from 'lucide-react';

const OnboardingModal = ({ onComplete, isLoading = false }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // We pass "Seeker" as a default name so the app doesn't break
        onComplete({ name: 'Seeker', dob: null, isGuest: true }); 
    }
  };

  const activeLoading = isSubmitting || isLoading;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-slate-900 border border-amber-200/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Sparkles className={`${activeLoading ? 'animate-spin' : 'animate-pulse'} text-amber-200`} size={32} />
          </div>
          
          <h2 className="text-2xl font-serif text-white mb-2">
            {activeLoading ? "Aligning the Stars..." : "Welcome, Seeker"}
          </h2>
          <p className="text-white/60 text-sm mb-8">
            {activeLoading 
              ? "We're calculating your lunar alignment based on your birth energy."
              : "To align the cards with your energy, tell us a little about yourself."
            }
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left opacity-transition duration-300" style={{ opacity: activeLoading ? 0.5 : 1 }}>
              <label className="text-[10px] uppercase tracking-widest text-amber-200 font-bold ml-1">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah"
                disabled={activeLoading}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-200/50 transition-colors disabled:cursor-not-allowed"
                required
              />
            </div>

            <div className="space-y-1 text-left opacity-transition duration-300" style={{ opacity: activeLoading ? 0.5 : 1 }}>
              <label className="text-[10px] uppercase tracking-widest text-amber-200 font-bold ml-1">Date of Birth</label>
              <input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={activeLoading}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-200/50 transition-colors disabled:cursor-not-allowed"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={activeLoading || !name || !dob}
              className={`w-full mt-6 py-4 font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 
                ${activeLoading 
                  ? 'bg-slate-800 text-white/40 cursor-wait' 
                  : 'bg-amber-200 text-slate-900 hover:scale-[1.02] active:scale-[0.98]'
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

          {/* THE NEW GUEST MODE BRIDGE */}
          {!activeLoading && (
              <div className="mt-6 pt-4 border-t border-white/5">
                <button 
                  onClick={handleGuestEntry}
                  className="group flex items-center justify-center gap-2 mx-auto text-xs uppercase tracking-widest text-white/40 hover:text-amber-200 transition-colors"
                >
                  <Moon size={12} className="group-hover:text-amber-200 transition-colors" />
                  Just looking? Enter as Guest
                </button>
              </div>
          )}
          
          {activeLoading && (
            <p className="mt-4 text-[10px] text-amber-200/40 uppercase tracking-[0.2em] animate-pulse">
              Consulting the Moon...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;