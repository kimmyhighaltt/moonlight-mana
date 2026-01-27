// src/utils/lunarLogic.js
export const getMoonPhase = (date) => {
  const cycle = 29.530588853; // Length of a lunar month
  const knownNewMoon = new Date('2024-01-11T11:57:00').getTime(); // A reference point
  const msPerDay = 86400000;
  
  const elapsed = date.getTime() - knownNewMoon;
  const daysSinceNew = (elapsed / msPerDay) % cycle;
  const percent = (daysSinceNew / cycle) * 100;
  
  let label = "";
  if (percent < 2) label = "New Moon";
  else if (percent < 24) label = "Waxing Crescent";
  else if (percent < 26) label = "First Quarter";
  else if (percent < 49) label = "Waxing Gibbous";
  else if (percent < 51) label = "Full Moon";
  else if (percent < 74) label = "Waning Gibbous";
  else if (percent < 76) label = "Last Quarter";
  else label = "Waning Crescent";

  return {
    percentage: percent.toFixed(1),
    label: label
  };
};