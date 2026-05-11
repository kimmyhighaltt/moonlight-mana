import React, { useState } from 'react';
import { X, Compass, Sparkles, Wand2, Moon } from 'lucide-react';

const CompassWaitlistModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch("https://formspree.io/f/xjgjqoab", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email, form: "North Node Compass Waitlist" })
        });
        
        if (response.ok) {
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Form submission failed", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}>
      <div className="w-full max-w-md bg-slate-950 border border-white/10 rounded-[40px] p-10 relative flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]" onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10">
          <X size={18} className="text-white/50" />
        </button>

        {/* Dynamic Icon Header */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full border border-amber-200/20 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent shadow-[0_0_30px_rgba(251,191,36,0.1)]">
            <Compass size={40} className="text-amber-200 animate-pulse" />
          </div>
          <Sparkles size={16} className="absolute -top-1 -right-1 text-amber-200 animate-bounce" />
        </div>

        <h3 className="text-3xl font-serif tracking-tight mb-4 text-white">The North Node Compass</h3>
        
        <p className="text-[13px] text-white/60 tracking-wide mb-8 leading-relaxed max-w-[280px]">
          Go beyond the surface. Unlock the daily synthesis of your <span className="text-amber-100 font-bold text-[11px] uppercase tracking-widest ml-1 italic">Celestial DNA.</span>
        </p>

        {submitted ? (
          <div className="py-8 animate-in zoom-in duration-500">
             <div className="w-12 h-12 rounded-full bg-amber-200/10 flex items-center justify-center mx-auto mb-4">
                <Moon size={20} className="text-amber-200" />
             </div>
             <p className="text-[12px] font-black tracking-[0.2em] uppercase text-amber-200/90 leading-loose">
               Your name has been added to the ledger.<br/>
               The veil will lift soon.
             </p>
          </div>
        ) : (
          <div className="w-full space-y-8">
            {/* Value Hooks */}
            <div className="grid grid-cols-1 gap-4 text-left mb-8">
               <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <Wand2 size={16} className="text-amber-200 mt-1" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-100 mb-1 text-center">Daily Tarot Synthesis</h4>
                    <p className="text-[11px] text-white/50 leading-relaxed text-center">A personalized card pull woven directly into your Life Path mission.</p>
                  </div>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your sacred email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[14px] text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-amber-200/30 transition-all text-center"
                />
              </div>
              
              <button type="submit" className="w-full px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] transition-all hover:bg-amber-100 bg-amber-200 text-slate-950 shadow-[0_10px_20px_rgba(251,191,36,0.2)]">
                Request Entry
              </button>
              
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">
                Limited to 108 Beta Voyagers
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompassWaitlistModal;