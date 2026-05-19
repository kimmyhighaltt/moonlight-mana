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

 // C. THE DYNAMIC PRO SYNTHESIS (Version 3.0: Predictive Engine)
  if (isPro) {
    baseResult.synthesisCard = dailyCard;
    
    // --- 1. ELEMENTAL DIGNITY (The Visual Equation & Layman Translation) ---
    const cardNameStr = dailyCard.name.toLowerCase();
    let cardElement = "Spirit"; 
    if (cardNameStr.includes("wand")) cardElement = "Fire";
    if (cardNameStr.includes("cup")) cardElement = "Water";
    if (cardNameStr.includes("sword")) cardElement = "Air";
    if (cardNameStr.includes("pentacle") || cardNameStr.includes("coin")) cardElement = "Earth";

    const emojis = { Fire: "🔥", Water: "💧", Earth: "🌿", Air: "💨", Spirit: "✨" };
    const userEmoji = emojis[signData.element] || "✨";
    const cardEmoji = emojis[cardElement] || "✨";
    
    let eqResult = "Synergy";
    let eqIcon = "⚖️";
    let eqTranslation = ""; // 👇 The new layman explanation

    if ((signData.element === "Fire" && cardElement === "Water") || (signData.element === "Water" && cardElement === "Fire")) {
      eqResult = "Volatility"; eqIcon = "⚡";
      eqTranslation = "Your natural energy and today's frequency are clashing. Expect sudden shifts in mood or motivation.";
    } else if ((signData.element === "Earth" && cardElement === "Air") || (signData.element === "Air" && cardElement === "Earth")) {
      eqResult = "Friction"; eqIcon = "🏜️";
      eqTranslation = "Your practical nature is grinding against today's overthinking energy. Take things one step at a time.";
    } else if ((signData.element === "Fire" && cardElement === "Air") || (signData.element === "Air" && cardElement === "Fire")) {
      eqResult = "Amplification"; eqIcon = "🌪️";
      eqTranslation = "Today's energy acts as wind to your fire. You will feel highly stimulated, but beware of burning out.";
    } else if ((signData.element === "Earth" && cardElement === "Water") || (signData.element === "Water" && cardElement === "Earth")) {
      eqResult = "Deep Growth"; eqIcon = "🌱";
      eqTranslation = "A beautiful alignment. Today's emotional energy feeds your need for stability, perfect for building something lasting.";
    } else if (signData.element === cardElement) {
      eqResult = "Pure Resonance"; eqIcon = "🔮";
      eqTranslation = "You are completely in your element today. Trust your gut instincts unconditionally.";
    }

    baseResult.elementalEquation = `${userEmoji} + ${cardEmoji} = ${eqIcon} ${eqResult}`;
    baseResult.elementalTranslation = eqTranslation; // Pass it to the UI

    // ... (Keep the rest of the dynamicInsight, shadowWarning, and somaticAction the same) ...

    // --- 2. THE FULL REVELATION (Simplified and Punchy) ---
    let dynamicInsight = "";
    if (currentMana < 40) {
      dynamicInsight = `At a depleted ${currentMana}% Mana, this ${dailyCard.name} frequency isn't a call to action; it's an eviction notice for your mental static. Your Life Path ${lp} drive must be suspended. The Oracle requires absolute conservation today.`;
    } else if (currentMana > 75) {
      dynamicInsight = `With your Mana surging at ${currentMana}%, the veil is thin. ${dailyCard.name} is a massive catalyst for your Life Path ${lp} mission. Stop hesitating. It is safe to execute and claim your authority today.`;
    } else {
      dynamicInsight = `The Life Path ${lp} energy demands alignment. Today, you must weigh your drive against your fluctuating ${currentMana}% capacity. Let the frequency of ${dailyCard.name} dictate your pacing, not external pressure.`;
    }
    baseResult.deepInsight = dynamicInsight;

    // ... (Keep the Shadow Warning and Somatic Anchor code exactly as they were in the previous step) ...

    // --- 3. THE SHADOW WARNING (With Time Prediction) ---
    // Predicts vulnerability time based on Mana level
    const dangerTime = currentMana > 70 ? "late evening" : currentMana < 40 ? "mid-morning" : "the mid-afternoon slump";
    
    if (currentMana < 50) {
      baseResult.shadowWarning = `Vulnerability Alert: Because your Mana is low, your ${signData.style} nature will be highly susceptible to ${lpData.low} during ${dangerTime}. Set a hard boundary before this window hits. Do not make permanent decisions in a temporary state of exhaustion.`;
    } else {
      baseResult.shadowWarning = `Ego Trap: With high Mana, your ${archetype} energy can become overwhelming. Watch out for ${lpData.low} masking itself as productivity around ${dangerTime}. Ensure you are leading, not dominating.`;
    }

    // --- 4. THE SOMATIC ANCHOR (Bio-Hacking the Frequency) ---
    let somaticDirective = "";
    if (cardElement === "Air" || cardNameStr.includes("tower")) {
      somaticDirective = `Mental static is peaking. Do not meditate—your mind will spiral. Instead, do 33 seconds of aggressive physical shaking (hands and arms) to physically discharge the nervous system.`;
    } else if (cardElement === "Water" || cardNameStr.includes("moon")) {
      somaticDirective = `Emotional saturation detected. Drink a full glass of cold water right now, visualizing the temperature resetting your vagus nerve and clearing your ${signData.element} energy.`;
    } else if (cardElement === "Fire" || cardNameStr.includes("sun")) {
      somaticDirective = `Your somatic system needs grounding from excess adrenaline. Place your bare feet flat on the floor, press down hard, and take 3 sharp exhales to anchor this high-velocity frequency.`;
    } else {
      somaticDirective = `To physically anchor the ${dailyCard.name}, place your hands firmly over your closed eyes for 33 seconds. Block out the external visual static and recalibrate your internal compass.`;
    }
    
    if (moonData && moonData.percentage > 85) {
      somaticDirective += ` The intense ${moonData.label} is amplifying this physical tension. Move slowly today.`;
    }
    baseResult.somaticAction = somaticDirective;

    // --- 5. LUNAR SYNC ---
    if (moonData) {
      const moonIntent = moonData.percentage > 50 ? 'expanding' : 'releasing';
      baseResult.lunarSync = `The ${moonData.label} is actively ${moonIntent} the psychic weight around your ${lpData.drive} sector.`;
    } else {
      baseResult.lunarSync = `Aligning your ${signData.element} signature with the current celestial transit.`;
    }
  } else {
    // Safety Fallbacks
    baseResult.shadowWarning = "";
    baseResult.somaticAction = "";
    baseResult.lunarSync = "";
    baseResult.synthesisCard = null;
  }

  return baseResult;
};