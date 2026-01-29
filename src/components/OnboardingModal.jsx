// src/components/OnboardingModal.jsx
import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { THEME } from '../constants/index';

const OnboardingModal = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && dob) {
      onComplete({ name, dob });
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-slate-900 border border-gold/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Sparkles className="text-gold animate-pulse" size={32} />
          </div>
          
          <h2 className="text-2xl font-serif text-white mb-2">Welcome, Seeker</h2>
          <p className="text-white/60 text-sm mb-8">To align the cards with your energy, tell us a little about yourself.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-1">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-1">Date of Birth</label>
              <input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full mt-6 py-4 bg-gold text-slate-900 font-bold uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Begin Journey <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;