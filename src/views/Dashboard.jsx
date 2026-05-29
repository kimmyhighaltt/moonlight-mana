import React, { useState, useEffect, useMemo } from 'react';
import {
  Globe, Moon, ShoppingBag, ExternalLink, Flame, X,
  ChevronRight, ChevronLeft, Lock, Sparkles, Compass, ShieldAlert, Zap, Info, CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { THEME, SACRED_TOOLS } from '../constants/index';
import { StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';
import Shop from './Shop';
import LunarInsightModal from '../components/NewMoonModal';
import CompassWaitlistModal from '../components/CompassWaitlistModal';
import { getInsightData } from '../utils/insightLibrary';
import { doc, setDoc } from 'firebase/firestore'; // For unlocking Pro
import { db, auth } from '../firebase';

const ShopModal = ({ onClose, user, autoOpenId }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-white/10 md:rounded-3xl rounded-t-3xl h-[85vh] md:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-500 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end p-4 border-b border-white/5 bg-white/5 absolute top-0 right-0 z-10 w-full">
          <button
            onClick={onClose}
            className="p-2 bg-black/20 rounded-full hover:bg-white/10 transition-colors border border-white/5"
          >
            <X size={20} className="text-white/70" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pt-16 px-4 custom-scrollbar">
          <Shop user={user} initialProductId={autoOpenId} />
        </div>
      </div>
    </div>
  );
};
const CompassLegendModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      // 1. CHANGED: 'items-end' to 'items-center' and added 'p-4' for screen edge padding
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        // 2. CHANGED: Made it fully rounded on mobile, added max-height, and changed animation to zoom
        className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl animate-in zoom-in-95 duration-400 relative max-h-[85vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-white/10 transition-colors border border-white/5 z-10"
        >
          <X size={20} className="text-white/70" />
        </button>

        <h3 className="text-2xl font-serif text-white mb-6 text-center mt-2">The Compass Key</h3>

        {/* ... Keep the rest of your legend items exactly the same ... */}

        <div className="space-y-5">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1"><Info size={14} className="text-white/70" /></div>
            <div><h4 className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-1">The Equation</h4><p className="text-xs text-white/50 leading-relaxed">Instantly shows if your natural energy is clashing or flowing with the day's frequency.</p></div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-1"><Sparkles size={14} className="text-amber-200" /></div>
            <div><h4 className="text-[10px] font-black uppercase tracking-widest text-amber-200 mb-1">Full Revelation</h4><p className="text-xs text-white/50 leading-relaxed">Your strategic overview for the day. Read this first to set your intentions and pacing.</p></div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-1"><ShieldAlert size={14} className="text-orange-400" /></div>
            <div><h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1">Shadow Potential</h4><p className="text-xs text-white/50 leading-relaxed">Your daily warning label. Learn how you are most likely to self-sabotage based on your current battery level.</p></div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1"><Zap size={14} className="text-blue-400" /></div>
            <div><h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Somatic Alignment</h4><p className="text-xs text-white/50 leading-relaxed">Your physical reset button. Do this 33-second action whenever the mental static gets too loud today.</p></div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1"><Moon size={14} className="text-indigo-400" /></div>
            <div><h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Lunar Sync</h4><p className="text-xs text-white/50 leading-relaxed">The background cosmic weather currently affecting your life path.</p></div>
          </div>
        </div>

      </div>
    </div>
  );
};

const AnchorModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState('select');
  const [activeElement, setActiveElement] = useState(null);
  const [timeLeft, setTimeLeft] = useState(33);

  useEffect(() => {
    if (isOpen) {
      setStep('select');
      setActiveElement(null);
      setTimeLeft(33);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (step === 'breathe' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && step === 'breathe') {
      setStep('complete');
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  if (!isOpen) return null;

  const handleSelect = (el) => {
    setActiveElement(el);
    setStep('breathe');
  };

  const elements = [
    { id: 'fire', icon: '🔥', label: 'Burning', sub: 'Frustrated, Angry, Overwhelmed', color: 'bg-orange-500', action: 'Inhale deeply. Exhale sharply for 6 seconds.' },
    { id: 'air', icon: '💨', label: 'Spiraling', sub: 'Anxious, Overthinking, Panicked', color: 'bg-indigo-400', action: 'Box breath. Inhale 4, hold 4, exhale 4, hold 4.' },
    { id: 'water', icon: '💧', label: 'Drowning', sub: 'Sad, Heavy, Hopeless', color: 'bg-blue-500', action: 'Double inhale through the nose. Long sigh out the mouth.' },
    { id: 'earth', icon: '🌿', label: 'Frozen', sub: 'Stuck, Numb, Paralyzed', color: 'bg-emerald-500', action: 'Notice 3 things you can see. Flex and release your hands.' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-3xl p-6 animate-in fade-in duration-500">
      
      {/* --- STEP 1: ELEMENTAL DIAGNOSIS --- */}
      {step === 'select' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700">
          <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-3xl font-serif text-white mb-2 text-center">Where is the static?</h2>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 mb-10 text-center">Identify the frequency</p>
          <div className="flex flex-col gap-4 w-full">
            {elements.map((el) => (
              <button
                key={el.id}
                onClick={() => handleSelect(el)}
                className="flex items-center gap-4 p-5 rounded-[24px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
                  {el.icon}
                </div>
                <div>
                  <h3 className="text-lg font-serif text-white">{el.label}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{el.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- STEP 2: THE VOID (33 SECOND INTERRUPT) --- */}
      {step === 'breathe' && activeElement && (
        <div className="flex flex-col items-center justify-center animate-in zoom-in-95 duration-1000">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-16 text-center animate-pulse">
            Grounding {activeElement.label} Static
          </p>
          <div className="relative flex items-center justify-center w-64 h-64 mb-16">
            <div className={`absolute w-full h-full rounded-full ${activeElement.color} opacity-20 blur-3xl animate-pulse duration-1000`} />
            <div className={`w-32 h-32 rounded-full border border-white/20 bg-black/50 flex items-center justify-center z-10 shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-[4000ms] ${timeLeft % 8 < 4 ? 'scale-150' : 'scale-100'}`}>
              <span className="text-4xl font-light text-white">{timeLeft}</span>
            </div>
          </div>
          <p className="text-lg font-serif italic text-white/90 text-center max-w-[280px] leading-relaxed">
            "{activeElement.action}"
          </p>
        </div>
      )}

      {/* --- STEP 3: INTEGRATION (Now properly inside the return) --- */}
      {step === 'complete' && (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
            <CheckCircle2 size={32} className="text-indigo-300" />
          </div>
          <h2 className="text-3xl font-serif text-white mb-4">Static Grounded.</h2>
          <p className="text-sm text-white/50 text-center mb-10 max-w-[250px] leading-relaxed">
            Your nervous system has been reset. You may return to the Sanctuary.
          </p>
          <button
            onClick={() => {
              if (onComplete && activeElement) onComplete(activeElement.label);
              onClose();
            }}
            className="px-10 py-4 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all cursor-pointer z-30"
          >
            Return
          </button>
        </div>
      )}
    </div>
  );
};

const Dashboard = ({
  hemisphere,
  toggleHemisphere,
  setView,
  isOnline,
  moonData,
  userProfile,
  streak,
  autoOpenProductId,
  clearAutoOpen,
  journalEntries = []
}) => {
  const [showShop, setShowShop] = useState(false);
  const [isMoonModalOpen, setIsMoonModalOpen] = useState(false);
  const [isCompassModalOpen, setIsCompassModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('moon');
  const [hasSwiped, setHasSwiped] = useState(false);
  const [hasClickedMoon, setHasClickedMoon] = useState(false);
  const [showEqInfo, setShowEqInfo] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isAnchorOpen, setIsAnchorOpen] = useState(false);

  // 🔑 BETA CODE STATE
  const [unlockCode, setUnlockCode] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [lastGrounded, setLastGrounded] = useState(null);

  const SECRET_BETA_CODE = "MANA108";

  const currentMana = useMemo(() => {
    return journalEntries[0]?.mana || 60;
  }, [journalEntries]);

  const guidance = useMemo(() => {
    const sign = userProfile?.sign || 'Sagittarius';
    const lp = userProfile?.lifePath || 1;
    const isPro = userProfile?.isPro || false;

    // 1. Get today's local date (Year-Month-Day)
    const now = new Date();
    const localToday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const latestEntry = journalEntries?.[0];

    // 2. STRENGTHENED CHECK: 
    // We check the 'date' field, OR if the 'createdAt' timestamp contains our local date string
    const hasLoggedToday = latestEntry && (
      latestEntry.date === localToday ||
      (latestEntry.createdAt && latestEntry.createdAt.includes(localToday))
    );

    // 3. Sync the card
    const todaysCard = hasLoggedToday ? latestEntry.drawnCard : null;

    // DEBUG LOG: Open your browser console (F12) to see if this is hitting!
    console.log("Compass Sync Check:", { localToday, entryDate: latestEntry?.date, matched: hasLoggedToday });

    return getInsightData(sign, lp, currentMana, isPro, moonData, todaysCard);
  }, [userProfile, currentMana, moonData, journalEntries]);

  // 🔓 HANDLE BETA UNLOCK
  const handleSecretUnlock = async () => {
    if (unlockCode.toUpperCase() === SECRET_BETA_CODE) {
      setIsUnlocking(true);
      try {
        if (auth.currentUser) {
          const userRef = doc(db, 'users', auth.currentUser.uid);
          const updatedData = {
            isPro: true,
            betaMember: true,
            unlockedAt: new Date().toISOString()
          };

          // 1. Update Firestore
          await setDoc(userRef, updatedData, { merge: true });

          // 2. THE FIX: Force the local profile to update immediately
          // If your parent component passes a 'setUserProfile' function, use it here.
          // Otherwise, we can trigger a small local state or a quick window reload.

          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FDE68A', '#FBBF24', '#FFFFFF']
          });

          // Optional: Give them 2 seconds of confetti before showing the content
          setTimeout(() => {
            window.location.reload(); // The simplest way to ensure all "Pro" logic resets
          }, 2000);
        }
      } catch (err) {
        console.error("Portal error:", err);
      } finally {
        setIsUnlocking(false);
      }
    }
  };

  const handleToggle = () => {
    setHasSwiped(true);
    setActiveTab(prev => prev === 'moon' ? 'compass' : 'moon');
  };

  const handleMoonClick = () => {
    setHasClickedMoon(true);
    setIsMoonModalOpen(true);
  };

  const handleCloseShop = () => {
    setShowShop(false);
    if (clearAutoOpen) clearAutoOpen();
  };

  const dynamicSubtitle = useMemo(() => {
    if (lastGrounded) {
      return `THE ${lastGrounded.toUpperCase()} IS STILL NOW`;
    }
    if (currentMana > 80) return "YOUR LIGHT IS RADIANT TODAY";
    if (currentMana < 30) return "REST IS A SACRED MOVEMENT TODAY";
    return "THE VEIL IS THIN TODAY";
  }, [currentMana, lastGrounded]);

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-slate-950 text-white">
      <CelestialBackground />

      {/* 👇 Swap your old background glow div for this dynamic one 👇 */}
      <div
        className={`fixed inset-0 z-0 transition-colors duration-1000 pointer-events-none ${lastGrounded === 'Burning' ? 'bg-orange-500/5' :
            lastGrounded === 'Spiraling' ? 'bg-indigo-500/5' :
              lastGrounded === 'Drowning' ? 'bg-blue-500/5' :
                lastGrounded === 'Frozen' ? 'bg-emerald-500/5' :
                  activeTab === 'compass' ? 'bg-amber-500/5' : 'bg-transparent'
          }`}
      />

      {showShop && <ShopModal user={userProfile} onClose={handleCloseShop} autoOpenId={autoOpenProductId} />}

      {/* --- HEADER --- */}
      <div className="relative z-20 w-full flex justify-between items-center p-6 pt-12 md:pt-16 max-w-7xl mx-auto">
        <StatusHeader isOnline={isOnline} />
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <Flame size={12} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-black tracking-widest text-orange-400 uppercase">{streak} Day</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 opacity-70">
            <Globe size={12} color={THEME.primary} />
            <p className="text-[10px] tracking-[0.2em] uppercase font-black text-amber-100">{hemisphere}</p>
          </div>
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT AREA --- */}
      <div className="w-full relative z-10 pb-36">

        <header className="flex flex-col items-center mt-4 md:mt-10 px-4 text-center md:mb-12">
          <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-70 mb-2 text-amber-200">
              {userProfile ? `${userProfile.sign} Sun • Life Path ${userProfile.lifePath}` : "The Journey Begins"}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-2 text-white">
              {userProfile ? `Rise, ${userProfile.name}.` : "Moonlight Mana"}
            </h1>
          </div>

          {/* 🌟 CHANGE THIS LINE: Swap the old <p> for this dynamic one */}
          <p className="text-[10px] text-white/50 font-bold tracking-[0.25em] uppercase animate-pulse duration-[4000ms]">
            {dynamicSubtitle}
          </p>
          {/* 👇 PASTE THIS EXACT BUTTON BLOCK HERE 👇 */}
          <button
            onClick={() => setIsAnchorOpen(true)}
            className="mt-6 mb-8 flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 group shadow-lg cursor-pointer relative z-30"
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] ${currentMana < 30 ? 'animate-ping' : 'animate-pulse'}`} />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-indigo-100/80 group-hover:text-white transition-colors">
              Ground the Current Static
            </span>
          </button>

          {/* ... (keep your Ground button code here) */}
        </header>

        <main className="flex flex-col items-center w-full max-w-2xl mx-auto px-6">

          <div className="w-full bg-white/10 backdrop-blur-3xl border-white/20 border border-white/10 rounded-[40px] md:rounded-[50px] p-8 min-h-[450px] flex flex-col items-center justify-center shadow-2xl relative overflow-hidden transition-all">

            <button onClick={handleToggle} className="absolute left-2 top-1/2 -translate-y-1/2 p-4 text-white/10 hover:text-amber-200/50 z-20">
              <ChevronLeft size={28} />
            </button>

            <button onClick={handleToggle} className={`absolute right-2 top-1/2 -translate-y-1/2 p-4 z-20 transition-all ${!hasSwiped ? 'text-amber-200 animate-bounce-horizontal' : 'text-white/10 hover:text-amber-200/50'}`}>
              <ChevronRight size={28} />
            </button>

            {activeTab === 'moon' ? (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500 cursor-pointer" onClick={handleMoonClick}>
                {!hasClickedMoon && (
                  <div className="absolute top-4 animate-pulse-slow">
                    <span className="text-[7px] md:text-[8px] uppercase tracking-[0.5em] text-amber-200/40 font-bold">
                      Tap for Lunar Insight
                    </span>
                  </div>
                )}
                <div className="relative mb-6 mt-8">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-transform group-hover:scale-105 duration-700">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FEF3C7] overflow-hidden shadow-[0_0_40px_rgba(251,191,36,0.3)] animate-float">
                      <div
                        className="absolute top-0 bottom-0 bg-slate-950/90 transition-all duration-1000 ease-in-out"
                        style={{
                          left: hemisphere === 'Northern' ? `${moonData.percentage}%` : '0',
                          right: hemisphere === 'Southern' ? `${moonData.percentage}%` : '0',
                          width: `${100 - moonData.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-2 text-white">{moonData.percentage}%</h2>
                  <p className="text-[10px] tracking-[0.4em] uppercase opacity-80 font-black text-amber-100">{moonData.label}</p>
                </div>


              </div>
            ) : (
              <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-right-8 duration-700 relative w-full h-full">
                {/* --- MANA BAR --- */}
                <div className="absolute top-0 left-0 right-0">
                  <div className="flex justify-between items-center mb-1 px-1">
                    <span className="text-[6px] uppercase tracking-[0.3em] font-bold text-amber-200/40">Current Soul Mana</span>
                    <span className="text-[10px] uppercase font-bold text-amber-200">{currentMana}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                    <div className="h-full bg-amber-200 transition-all duration-1000" style={{ width: `${currentMana}%` }} />
                  </div>
                </div>

                <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-200/20 mt-8">
                  <Compass className="text-amber-200 animate-pulse" size={28} />
                </div>
                {/* 👇 THE NEW FLOATING INFO BUTTON */}
                <button
                  onClick={() => setIsLegendOpen(true)}
                  className="absolute top-6 right-0 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/90 hover:bg-white/10 transition-all duration-300 z-30"
                >
                  <Info size={14} />
                </button>

                <p className="text-[9px] uppercase tracking-[0.4em] text-amber-100/50 font-bold mb-1">The {guidance.archetype}</p>
                <h3 className="text-xl font-serif italic text-white mb-4 px-4 leading-snug">"{guidance.message}"</h3>

                {/* --- MONEY GATE / CODE INPUT --- */}
                <div className="w-full px-2 relative overflow-hidden pb-4">
                  {!userProfile?.isPro ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                        <span className="text-[8px] uppercase tracking-widest text-white/40 block mb-1">Ritual Action</span>
                        <p className="text-amber-200 text-xs font-bold">{guidance.direction}</p>
                      </div>

                      <div className="relative group">
                        <input
                          type="text"
                          placeholder="ENTER BETA CODE"
                          value={unlockCode}
                          onChange={(e) => setUnlockCode(e.target.value)}
                          className="w-full py-4 bg-black/40 border border-white/10 rounded-2xl text-center text-[10px] tracking-[0.3em] font-black focus:border-amber-200/50 outline-none transition-all placeholder:text-white/20"
                        />
                        <button
                          onClick={handleSecretUnlock}
                          disabled={isUnlocking}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-amber-200 hover:text-white transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                      <p className="text-[7px] uppercase tracking-widest text-white/30">Free for the first 108 Voyagers</p>
                    </div>
                  ) : (
                    /* --- PRO REVELATION VIEW --- */
                    <div className="w-full space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      <div className="relative group w-full flex flex-col items-center">
                        {guidance.synthesisCard && (
                          <div className="relative z-10 flex flex-col items-center w-full px-4 mb-6">
                            <img src={guidance.synthesisCard.img} alt={guidance.synthesisCard.name} className="w-24 h-36 md:w-28 md:h-40 object-cover rounded-xl border border-amber-200/30 shadow-2xl mb-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-200 mb-6">{guidance.synthesisCard.name}</span>

                            {/* --- The Visual Equation Tier --- */}
                            <div className="flex flex-col items-center w-full">
                              <div className="flex items-center gap-3">
                                {/* The Equation Pill (Given more breathing room) */}
                                <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-lg">
                                  <span className="text-sm tracking-widest text-white/90 font-mono font-bold">
                                    {guidance.elementalEquation}
                                  </span>
                                </div>

                                {/* The Info Toggle Button */}
                                <button
                                  onClick={() => setShowEqInfo(!showEqInfo)}
                                  className={`p-2.5 rounded-full border transition-all duration-300 ${showEqInfo ? 'bg-amber-200/10 border-amber-200/30 text-amber-200' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/80'}`}
                                >
                                  <Info size={14} />
                                </button>
                              </div>

                              {/* --- The Hidden Layman's Translation (Smooth Reveal) --- */}
                              {showEqInfo && (
                                <div className="mt-4 p-4 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl w-full max-w-[280px] animate-in fade-in zoom-in-95 duration-300 shadow-xl">
                                  <p className="text-[11px] text-white/70 italic text-center leading-relaxed">
                                    {guidance.elementalTranslation}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-6 rounded-[32px] bg-gradient-to-b from-amber-200/10 to-transparent border border-amber-200/20 shadow-xl text-left">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles size={14} className="text-amber-200" />
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-200">The Full Revelation</span>
                        </div>
                        <p className="text-[14px] text-white/90 font-serif italic leading-relaxed">"{guidance.deepInsight}"</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 bg-slate-900/40 backdrop-blur-md border border-orange-500/20 rounded-3xl text-left flex gap-3 items-start">
                          <ShieldAlert size={18} className="text-orange-500 shrink-0 mt-1" />
                          <div><span className="text-[8px] font-black uppercase tracking-widest text-orange-400 block mb-1">Shadow Potential</span><p className="text-[11px] text-white/60">{guidance.shadowWarning}</p></div>
                        </div>
                        <div className="p-4 bg-slate-900/40 backdrop-blur-md border border-blue-500/20 rounded-3xl text-left flex gap-3 items-start">
                          <Zap size={18} className="text-blue-400 shrink-0 mt-1" />
                          <div><span className="text-[8px] font-black uppercase tracking-widest text-blue-400 block mb-1">Somatic Alignment</span><p className="text-[11px] text-white/60">{guidance.somaticAction}</p></div>
                        </div>
                      </div>

                      <div className="w-full p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center justify-center gap-3">
                        <Moon size={12} className="text-indigo-400" />
                        <p className="text-[10px] text-indigo-200/50 tracking-wide italic font-light">{guidance.lunarSync}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => setView('reflection')} className="mt-10 md:mt-16 px-16 py-6 rounded-full font-black uppercase tracking-widest text-[12px] bg-gradient-to-r from-amber-200 to-amber-100 text-slate-900 shadow-xl transition-all hover:scale-105">
            Start Daily Check-in
          </button>
        </main>
      </div>


      <BottomNav view="dashboard" setView={setView} />
      <LunarInsightModal isOpen={isMoonModalOpen} onClose={() => setIsMoonModalOpen(false)} userProfile={userProfile} onNavigateToLog={() => { setIsMoonModalOpen(false); setView('reflection'); }} />
      {isCompassModalOpen && <CompassWaitlistModal onClose={() => setIsCompassModalOpen(false)} />}
      <CompassLegendModal isOpen={isLegendOpen} onClose={() => setIsLegendOpen(false)} />

      {/* 🌟 UPDATE THIS TAG at the bottom of Dashboard.jsx */}
      <AnchorModal
        isOpen={isAnchorOpen}
        onClose={() => setIsAnchorOpen(false)}
        onComplete={(label) => setLastGrounded(label)} // 🌟 This saves the memory to the dashboard state
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-horizontal { 0%, 100% { transform: translateX(0); opacity: 0.3; } 50% { transform: translateX(10px); opacity: 1; } }
        .animate-bounce-horizontal { animation: bounce-horizontal 1.5s infinite; }
      `}</style>
    </div>
  );
};

export default Dashboard;