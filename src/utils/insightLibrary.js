import { TAROT_DECK } from '../constants/index';

// 1. THE ARCHETYPE MAP (108 Titles)
const ARCHETYPE_MAP = {
  Aries: { 1: "Fearless Catalyst", 2: "Protective Guardian", 3: "Radiant Pioneer", 4: "Strategic Commander", 5: "Untethered Rebel", 6: "Devoted Warrior", 7: "Intuitive Spark", 8: "Forceful Visionary", 9: "Altruistic Hero" },
  Leo: { 1: "Sovereign Leader", 2: "Benevolent Mentor", 3: "Master Performer", 4: "Loyal Pillar", 5: "Expressive Adventurer", 6: "Noble Protector", 7: "Solar Mystic", 8: "Majestic Authority", 9: "Heart-Centered Guide" },
  Sagittarius: { 1: "Pioneering Explorer", 2: "Philosophic Partner", 3: "Optimistic Storyteller", 4: "Ethical Architect", 5: "Wild Voyager", 6: "Inspirational Teacher", 7: "Truth Seeker", 8: "Expansive Mogul", 9: "Global Visionary" },
  Taurus: { 1: "Steadfast Architect", 2: "Loyal Anchor", 3: "Artistic Builder", 4: "Master Foundation", 5: "Sensory Voyager", 6: "Earthly Nurturer", 7: "Quiet Naturalist", 8: "Abundant Provider", 9: "Global Steward" },
  Virgo: { 1: "Precision Analyst", 2: "Methodical Healer", 3: "Eloquent Craftsperson", 4: "Systems Organizer", 5: "Adaptive Minimalist", 6: "Dedicated Alchemist", 7: "Analytical Mystic", 8: "Quality Controller", 9: "Humanitarian Healer" },
  Capricorn: { 1: "Mountain Climber", 2: "Reliable Keystone", 3: "Disciplined Creator", 4: "Industrial Titan", 5: "Strategic Risk-Taker", 6: "Responsible Patriarch", 7: "Solitary Sage", 8: "Executive Powerhouse", 9: "Stoic Philanthropist" },
  Gemini: { 1: "Intellectual Spark", 2: "Collaborative Link", 3: "Eloquent Messenger", 4: "Curious Analyst", 5: "Versatile Nomad", 6: "Shared Educator", 7: "Sharp Investigator", 8: "Media Powerhouse", 9: "Universal Teacher" },
  Libra: { 1: "Harmonious Catalyst", 2: "Diplomatic Mirror", 3: "Artistic Diplomat", 4: "Balanced Structurist", 5: "Social Voyager", 6: "Graceful Mediator", 7: "Aesthetic Seeker", 8: "Just Authority", 9: "Peace Ambassador" },
  Aquarius: { 1: "Radical Inventor", 2: "Communal Visionary", 3: "Eccentric Storyteller", 4: "Progressive Architect", 5: "Freedom Innovator", 6: "Altruistic Rebel", 7: "Scientific Mystic", 8: "Technological Titan", 9: "Humanitarian Genius" },
  Cancer: { 1: "Nurturing Catalyst", 2: "Empathic Anchor", 3: "Creative Protector", 4: "Secure Fortress", 5: "Emotional Nomad", 6: "Family Guardian", 7: "Moonlit Seeker", 8: "Instinctive Leader", 9: "Compassionate Guide" },
  Scorpio: { 1: "Transformative Power", 2: "Psychic Detective", 3: "Intense Artist", 4: "Occult Architect", 5: "Phoenix Voyager", 6: "Healing Magnet", 7: "Silent Shadow", 8: "Alchemy Master", 9: "Soul Transformer" },
  Pisces: { 1: "Dreaming Artisan", 2: "Intuitive Healer", 3: "Mystical Poet", 4: "Fluid Foundation", 5: "Astral Traveler", 6: "Universal Caretaker", 7: "Spiritual Recluse", 8: "Infinite Visionary", 9: "Transcendent Empath" }
};

const LP_THEMES = {
  1: { drive: "initiation", action: "take the lead on a new vision", low: "over-exertion" },
  2: { drive: "partnership", action: "seek harmony in your connections", low: "people-pleasing" },
  3: { drive: "expression", action: "share your creative voice boldly", low: "scattered focus" },
  4: { drive: "structure", action: "strengthen your physical foundations", low: "rigidity" },
  5: { drive: "adventure", action: "embrace a radical shift in routine", low: "restlessness" },
  6: { drive: "nurturing", action: "prioritize the needs of your tribe", low: "over-responsibility" },
  7: { drive: "truth", action: "seek answers in the quiet depths", low: "isolation" },
  8: { drive: "abundance", action: "claim your authority and manifest results", low: "material stress" },
  9: { drive: "service", action: "release what no longer serves the collective", low: "emotional weight" }
};

const SIGN_THEMES = {
  Aries: { style: "bold and fast", focus: "identity", element: "Fire" },
  Taurus: { style: "steady and sensory", focus: "security", element: "Earth" },
  Gemini: { style: "quick and social", focus: "ideas", element: "Air" },
  Cancer: { style: "intuitive and protective", focus: "home", element: "Water" },
  Leo: { style: "radiant and confident", focus: "the heart", element: "Fire" },
  Virgo: { style: "precise and helpful", focus: "refinement", element: "Earth" },
  Libra: { style: "artistic and fair", focus: "connection", element: "Air" },
  Scorpio: { style: "intense and transformative", focus: "inner truth", element: "Water" },
  Sagittarius: { style: "expansive and honest", focus: "the horizon", element: "Fire" },
  Capricorn: { style: "disciplined and ambitious", focus: "legacy", element: "Earth" },
  Aquarius: { style: "radical and unique", focus: "innovation", element: "Air" },
  Pisces: { style: "dreamy and empathic", focus: "the soul", element: "Water" }
};

export const INSIGHT_LIBRARY = {
  Sagittarius: {
    LP1: {
      dailyinsights: [
        { 
          highEnergy: { archetype: "Pioneering Explorer", message: "Your fire is peaking. Aim high.", direction: "Initiate one bold conversation.", deepInsight: "The 1 energy thrives on firsts." },
          lowEnergy: { archetype: "Reflective Wanderer", message: "Lower the bow to find aim.", direction: "5 minutes of stillness.", deepInsight: "Explorers need base camps." }
        }
      ]
    }
  }
};

// ... Keep your existing ARCHETYPE_MAP, LP_THEMES, SIGN_THEMES, and INSIGHT_LIBRARY ...

// 4. THE MASTER GETTER FUNCTION (Version 2.0 Synthesis)
export const getInsightData = (sign, lp, currentMana, isPro = false, moonData = null, pulledCard = null) => {
  const isLowEnergy = currentMana < 40;
  const dayIndex = new Date().getDate();
  
  const lpData = LP_THEMES[lp] || { drive: "growth", action: "align with your purpose", low: "fatigue" };
  const signData = SIGN_THEMES[sign] || { style: "unique", focus: "balance", element: "Spirit" };
  const archetype = ARCHETYPE_MAP[sign]?.[lp] || "Celestial Seeker";
  
// 👇 Tell the app: If they pulled a card, use it. If not, generate one.
  const cardIndex = (dayIndex + Math.floor(currentMana / 10)) % TAROT_DECK.length;
  const dailyCard = pulledCard ? pulledCard : TAROT_DECK[cardIndex];

  const manual = INSIGHT_LIBRARY[sign]?.[`LP${lp}`]?.dailyinsights || [];
  let baseResult;

  // A. Check for manual overrides first (Handles the basic Free tier UI)
  if (manual.length > 0) {
    const dailyData = manual[dayIndex % manual.length] || manual[0];
    baseResult = isLowEnergy ? { ...dailyData.lowEnergy } : { ...dailyData.highEnergy };
  } else {
    // B. Generate fallback content if no manual entry exists
    if (isLowEnergy) {
      baseResult = {
        archetype: `Reflective ${sign}`,
        message: `The ${signData.style} energy of your sun is calling for a pause.`,
        direction: `Focus on ${signData.focus} through quiet observation.`,
        deepInsight: `Low mana is a time for restorative silence.`
      };
    } else {
      baseResult = {
        archetype: archetype,
        message: `Your ${signData.element} energy is peaking. Use this ${signData.style} momentum to ${lpData.action}.`,
        direction: `Initiate a ritual centered on your ${signData.focus}.`,
        deepInsight: `As a ${archetype}, your highest alignment occurs when your personality serves your Life Path ${lp} mission.`
      };
    }
  }

  // C. THE DYNAMIC PRO SYNTHESIS (The Version 2.0 Override)
  if (isPro) {
    baseResult.synthesisCard = dailyCard;
    
    // 👇 OVERRIDE the static deepInsight with live Synthesis
    let dynamicInsight = "";
    if (currentMana < 40) {
      dynamicInsight = `Your Life Path ${lp} drive for ${lpData.drive} is currently intersecting with ${dailyCard.name}. At a low ${currentMana}% Mana, this is a sign of conservation, not action. Let the energy of this card clear the static rather than forcing output.`;
    } else if (currentMana > 75) {
      dynamicInsight = `With your Mana surging at ${currentMana}%, ${dailyCard.name} acts as a powerful catalyst. Channel this high-frequency energy directly into your Life Path ${lp} mission. It is safe to ${lpData.action} today.`;
    } else {
      dynamicInsight = `The ${lp} energy thrives on alignment. Today, ${dailyCard.name} requires you to weigh your drive for ${lpData.drive} against your current ${currentMana}% capacity. Use this frequency to ${lpData.action}, but let the card dictate the pacing.`;
    }
    
    baseResult.deepInsight = dynamicInsight;

    // Shadow Warning Override
    baseResult.shadowWarning = `As a ${archetype}, your biggest hurdle today is ${lpData.low}. Your ${signData.style} nature might lead you to over-commit at ${currentMana}% capacity.`;

    // Somatic Action
    const somaticMap = { Fire: "solar plexus", Earth: "feet/ground", Air: "throat/chest", Water: "lower belly" };
    baseResult.somaticAction = `To ground your ${signData.element} energy, place your hands on your ${somaticMap[signData.element] || 'heart'} and hold for 33 seconds.`;

    // Lunar Sync
    if (moonData) {
      const moonIntent = moonData.percentage > 50 ? 'expanding' : 'releasing';
      baseResult.lunarSync = `Under this ${moonData.label} Moon, ${dailyCard.name} is a somatic anchor for ${moonIntent} your ${lpData.drive}.`;
    } else {
      baseResult.lunarSync = `The frequency of ${dailyCard.name} is acting as your somatic anchor today.`;
    }
  } else {
    // Safety Fallbacks to ensure Free UI doesn't crash
    baseResult.shadowWarning = "";
    baseResult.somaticAction = "";
    baseResult.lunarSync = "";
    baseResult.synthesisCard = null;
  }

  return baseResult;
};