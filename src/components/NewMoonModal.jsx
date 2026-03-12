import React, { useState, useEffect } from 'react';

// --- 1. THE ALCHEMIST'S DICTIONARY (All 8 Phases) ---
const LUNAR_PHASE_DATA = [
  {
    name: "New Moon",
    emoji: "🌑",
    illumination: "0%",
    desc: "The sky is dark, offering a cosmic blank slate. This is the most powerful time of the lunar cycle to set fresh intentions and plant seeds for the reality you want to build.",
    tags: ["🌱 Planting Seeds", "✨ Blank Slate", "💧 Deep Intuition"],
    tip: "Your trackers should be reset to 0%. Use today's blank slate to intentionally choose which habits you want to track this cycle. Don't overwhelm yourself—pick 3 daily habits.",
    prompt: "Look at the empty space you've created. What is the single most important energy or feeling you want to invite into this newly cleared space?"
  },
  {
    name: "Waxing Crescent",
    emoji: "🌒",
    illumination: "1-49%",
    desc: "The moon is beginning to gather light. This is the time to take your first physical steps toward the intentions you set during the New Moon. Momentum is building.",
    tags: ["📈 Building Momentum", "💡 Sparking Ideas", "🏃‍♀️ Taking Action"],
    tip: "Focus on consistency today. Even if you only check off one small habit in your tracker, that forward motion is exactly what this phase requires.",
    prompt: "Manifestation requires mundane action. What is one physical, practical step you can take today to prove you are serious about your intention?"
  },
  {
    name: "First Quarter",
    emoji: "🌓",
    illumination: "50%",
    desc: "Half the moon is illuminated. You might face your first obstacles or doubts right now. This phase asks you to stay committed and push through friction.",
    tags: ["⚔️ Overcoming Friction", "🔥 Willpower", "🛡️ Commitment"],
    tip: "Look at your Alchemist's Log. Are you resisting a certain habit? Lean into the friction today. Pushing through now sets up your success for the Full Moon.",
    prompt: "What friction or resistance are you currently feeling? How can you lean into this discomfort instead of running from it?"
  },
  {
    name: "Waxing Gibbous",
    emoji: "🌔",
    illumination: "51-99%",
    desc: "The moon is almost full. This is a phase of refining, editing, and adjusting. Look at what is working and what isn't, and fine-tune your approach.",
    tags: ["🔍 Refining", "✍️ Editing", "⚙️ Adjusting"],
    tip: "Review your trackers. If a habit is consistently sitting at 0%, it's okay to pivot or adjust the goal. Make tweaks before the energy peaks.",
    prompt: "Review your progress since the New Moon. What needs to be adjusted, refined, or entirely rewritten before the energy peaks?"
  },
  {
    name: "Full Moon",
    emoji: "🌕",
    illumination: "100%",
    desc: "The energy has peaked. This is a time of harvest, celebration, and illumination. Things hidden in the shadows may come to light right now.",
    tags: ["🌾 Harvest", "🎉 Celebration", "👁️ Illumination"],
    tip: "Take a moment to look at how far you've come since the New Moon. Acknowledge your progress in the Alchemist's Log, no matter how small.",
    prompt: "What truths are being illuminated for you right now? What achievements, no matter how small, are you celebrating today?"
  },
  {
    name: "Waning Gibbous",
    emoji: "🌖",
    illumination: "99-51%",
    desc: "The light begins to recede. The harvest is over, and it's time to feel gratitude for what you have achieved and start turning your energy inward.",
    tags: ["🙏 Gratitude", "🤲 Sharing", "🏡 Turning Inward"],
    tip: "Share your knowledge or energy with your community today. In your trackers, focus on maintaining rather than pushing for new records.",
    prompt: "Who in your community could benefit from the energy, lessons, or harvest you have cultivated this cycle?"
  },
  {
    name: "Last Quarter",
    emoji: "🌗",
    illumination: "50%",
    desc: "The moon is half dark. This is a powerful phase for active release. Let go of grudges, forgive yourself for missed habits, and shed dead weight.",
    tags: ["🍂 Releasing", "🕊️ Forgiveness", "✂️ Cutting Ties"],
    tip: "Forgive yourself for any unchecked boxes in your trackers this week. The cycle is winding down. Release the guilt and focus on your baseline.",
    prompt: "What expectation, grudge, or self-limiting belief are you ready to actively release and leave behind?"
  },
  {
    name: "Waning Crescent",
    emoji: "🌘",
    illumination: "49-1%",
    desc: "The cycle is almost over. Your energy may feel low, and that is by design. This is the time for deep rest, decluttering, and spiritual housekeeping.",
    tags: ["🧹 Decluttering", "🛌 Deep Rest", "🔋 Recharging"],
    tip: "Start archiving old notes and physically clearing your space. Don't worry about perfect tracking today; just prepare your environment for the coming New Moon.",
    prompt: "Look around your physical and digital space. What clutter needs to be cleared to prepare for the upcoming New Moon?"
  }
];

// --- 2. THE MOON MATH (Calculates based on exact date) ---
const calculateMoonPhase = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  
  if (month < 3) {
    year--;
    month += 12;
  }
  month++;
  
  const c = 365.25 * year;
  const e = 30.6 * month;
  const jd = c + e + day - 694039.09; // Julian days
  
  let phase = jd / 29.5305882; // Divide by lunar cycle
  const b = parseInt(phase); 
  phase -= b; // Get fractional part
  
  let phaseIndex = Math.round(phase * 8);
  if (phaseIndex >= 8) phaseIndex = 0;
  
  return phaseIndex;
};

// --- 3. THE COMPONENT ---
// ADDED: onNavigateToLog prop
export default function LunarInsightModal({ isOpen, onClose, userProfile, onNavigateToLog }) {
  const [currentPhase, setCurrentPhase] = useState(LUNAR_PHASE_DATA[0]); 

  useEffect(() => {
    // Only calculate when the modal is actually opened to ensure accuracy
    if (isOpen) {
      const today = new Date();
      const phaseIndex = calculateMoonPhase(today);
      setCurrentPhase(LUNAR_PHASE_DATA[phaseIndex]);
    }
  }, [isOpen]);

  // CRITICAL FIX: If it's not open, return absolutely nothing (no rogue boxes!)
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center px-4 z-[100] animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-[#0f1423] border border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 relative shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevents clicks inside the modal from closing it
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </button>

        {/* Personalized Header (If userProfile is provided) */}
        {userProfile && (
          <p className="text-[10px] font-black tracking-widest uppercase text-indigo-400 mb-3 drop-shadow-md">
            Aligned for Life Path {userProfile.lifePath} • {userProfile.sign} Sun
          </p>
        )}

        {/* Dynamic Header */}
        <h2 className="text-2xl font-serif text-[#fceb9e] pr-10 mb-2">
          Current Energy: {currentPhase.name} {currentPhase.emoji}
        </h2>
        
        {/* Dynamic Illumination */}
        <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">
          Illumination: {currentPhase.illumination}
        </p>

        {/* Dynamic Body Text */}
        <p className="text-slate-300 leading-relaxed mb-6 text-[15px]">
          {currentPhase.desc}
        </p>

        {/* Dynamic Keywords */}
        <div className="mb-6 flex flex-wrap gap-2">
          {currentPhase.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1.5 bg-slate-800/60 text-slate-300 text-xs font-medium rounded-full border border-slate-700">
              {tag}
            </span>
          ))}
        </div>

        {/* Dynamic Journal Prompt Box */}
        <div className="bg-gradient-to-r from-indigo-900/40 to-indigo-900/10 border border-indigo-700/50 rounded-xl p-5 mb-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400"></div>
          <h3 className="text-indigo-300 text-xs font-bold tracking-wider uppercase mb-2 ml-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Alchemist's Log Prompt
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed ml-2 italic">
            "{currentPhase.prompt}"
          </p>
        </div>

        {/* Dynamic Tracking Tip Box */}
        <div className="bg-gradient-to-r from-slate-800/60 to-slate-800/20 border border-slate-700/50 rounded-xl p-5 mb-8 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#fceb9e]"></div>
          <h3 className="text-[#fceb9e] text-xs font-bold tracking-wider uppercase mb-2 ml-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/></svg>
            Alchemist's Tip
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed ml-2">
            {currentPhase.tip}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => {
            if (onNavigateToLog) {
              onNavigateToLog(); // This sends them to the journal
            } else {
              onClose(); // Fallback just in case
            }
          }}
          className="w-full py-4 bg-[#fceb9e] hover:bg-[#ebd780] text-slate-900 font-bold tracking-wide rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(252,235,158,0.4)]"
        >
          {currentPhase.name === "New Moon" ? "SET INTENTIONS IN LOG" : "JOURNAL THIS PROMPT"}
        </button>

      </div>
    </div>
  );
}