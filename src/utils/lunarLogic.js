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