export const getMoonPhase = (date = new Date()) => {
  const cycle = 29.530588853; // Length of a lunar month
  const knownNewMoon = new Date('2024-01-11T11:57:00Z').getTime(); // Reference point (UTC)
  const msPerDay = 86400000;
  
  // 1. Calculate the age of the moon (0 to 29.5 days)
  const elapsed = date.getTime() - knownNewMoon;
  let daysSinceNew = (elapsed / msPerDay) % cycle;
  if (daysSinceNew < 0) daysSinceNew += cycle; // Handle potential negative dates

  // 2. Calculate Progress (0.0 to 1.0)
  const currentCycle = daysSinceNew / cycle;

  // 3. Calculate Illumination % (0 = Dark, 100 = Full, 0 = Dark)
  // We use a cosine wave to simulate the shadow moving across the moon
  // Formula: (1 - cos(angle)) / 2
  const illumination = Math.round((1 - Math.cos(currentCycle * 2 * Math.PI)) / 2 * 100);

  // 4. Determine the Label based on where we are in the cycle
  let label = "";
  // 0.0 - 1.0 scale
  if (currentCycle < 0.02 || currentCycle > 0.98) label = "New Moon";
  else if (currentCycle < 0.24) label = "Waxing Crescent";
  else if (currentCycle < 0.26) label = "First Quarter";
  else if (currentCycle < 0.49) label = "Waxing Gibbous";
  else if (currentCycle < 0.51) label = "Full Moon";
  else if (currentCycle < 0.74) label = "Waning Gibbous";
  else if (currentCycle < 0.76) label = "Last Quarter";
  else label = "Waning Crescent";

  return {
    percentage: illumination, // Now shows Brightness (0-100%)
    label: label,
    isWaxing: currentCycle < 0.5 // Helpful if you want to show growing/shrinking icons later
  };
};



// --- NEW POP-UP LOGIC BELOW ---

export const getLunarPopupContent = (moonData, date = new Date()) => {
  const currentMonth = date.getUTCMonth() + 1; // JS months start at 0
  const currentDate = date.getUTCDate();

  // 1. The Eclipse Portal (March 3rd UTC)
  if (currentMonth === 3 && currentDate === 3) {
    return {
      title: "Total Lunar Eclipse Energy 🌑🩸",
      body: "The Blood Moon portal is officially open. The energetic ripple of a Total Lunar Eclipse is massive. This is a time of sudden endings, karmic resets, and heavy emotional static.",
      tip: "Do not force productivity or attempt heavy manifestation right now. Ground yourself, stay hydrated, and allow the eclipse to clear out what no longer serves you."
    };
  } 
  
  // 2. Post-Eclipse Recovery (March 4th and 5th UTC)
  if (currentMonth === 3 && (currentDate === 4 || currentDate === 5)) {
    return {
      title: "The Dust is Settling 🌖",
      body: "The heavy eclipse portal is finally closing. The energetic static is clearing out. Now is the time to rest, recover, and integrate any sudden shifts.",
      tip: "Your spiritual battery might still be in the red. Prioritize gentle routines today and monitor how quickly your baseline energy is bouncing back."
    };
  }

  // 3. Dynamic Default (Uses your math logic for the rest of the year!)
  return {
    title: `Current Energy: ${moonData.label} ✨`,
    body: `The moon is currently in the ${moonData.label} phase with ${moonData.percentage}% illumination. Notice how this specific light and gravity shift is affecting your energetic baseline today.`,
    tip: "Use today's check-in to notice where you feel resistance. Are you holding onto anything that needs to be released or adjusted as the moon shifts?"
  };
};
/**
 * Calculates a 'Power Level' based on the moon phase and the user's element.
 */
export const calculatePowerLevel = (phase, element) => {
  let power = 50; // Base energy level

  const phaseBoosts = {
    'New Moon': { Earth: 30, Air: 20, Water: 10, Fire: 5 },
    'Waxing Crescent': { Fire: 15, Air: 25 },
    'First Quarter': { Fire: 25, Earth: 15 },
    'Waxing Gibbous': { Fire: 30, Water: 10 },
    'Full Moon': { Water: 45, Fire: 40, Air: 20, Earth: 10 },
    'Waning Gibbous': { Water: 20, Earth: 25 },
    'Last Quarter': { Air: 30, Earth: 20 },
    'Waning Crescent': { Water: 30, Earth: 30 }
  };

  const boost = phaseBoosts[phase]?.[element] || 10;
  return Math.min(power + boost, 100); 
};
/**
 * Returns current status of major planets for UI indicators
 */
export const getPlanetaryTransits = (date = new Date()) => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Jan is 1
  const year = date.getUTCFullYear();

  // 2026 Mercury Retrograde example dates: Feb 25 - Mar 20
  const isMercuryRetrograde = (year === 2026 && month === 3 && day <= 20);
  
  // 2026 Mars is Direct in March
  const isMarsDirect = true; 

  return [
    { 
      name: "Mercury", 
      status: isMercuryRetrograde ? "Retrograde" : "Direct", 
      color: isMercuryRetrograde ? "bg-red-400" : "bg-blue-400" 
    },
    { 
      name: "Mars", 
      status: isMarsDirect ? "Direct" : "Retrograde", 
      color: "bg-orange-500" 
    }
  ];
};