import React, { useState } from 'react';
import { X, Compass } from 'lucide-react';

const CompassWaitlistModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        // PASTE YOUR FORMSPREE URL IN THE QUOTES BELOW:
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-8 relative flex flex-col items-center text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-white/10 transition-colors border border-white/5">
          <X size={16} className="text-white/70" />
        </button>

        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 bg-black/50 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <Compass size={32} className="text-white/80" />
        </div>

        <h3 className="text-2xl font-serif tracking-tight mb-2 text-white">The North Node Compass</h3>
        <p className="text-[12px] text-white/70 tracking-wide mb-6 leading-relaxed">
          A tool for mapping your exact energetic direction. Currently in closed development.
        </p>

        {submitted ? (
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-200/90 py-4 animate-in fade-in duration-500">
            Your name has been added to the ledger. We will whisper when the doors open.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-full px-4 py-3 text-[13px] text-white placeholder-white/40 focus:outline-none focus:border-amber-200/50 transition-colors text-center"
            />
            <button type="submit" className="w-full px-6 py-3 rounded-full font-black uppercase tracking-widest text-[11px] transition-all hover:scale-[1.02] active:scale-[0.98] bg-white text-black mt-2">
              Request Access
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompassWaitlistModal;