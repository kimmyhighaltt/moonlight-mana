import { SACRED_TOOLS } from '../constants/index';

/**
 * Helper to safely find a tool by ID. 
 * If the ID is missing or mistyped, it defaults to the Modern Witch Tarot.
 */
const findTool = (id) => {
  return SACRED_TOOLS.find(t => t.id === id) || SACRED_TOOLS.find(t => t.id === 'deck-modern');
};

// ==========================================
// 1. TAROT CARD RECOMMENDATIONS
// ==========================================

export const getRecommendationForCard = (cardName) => {
  if (!cardName) return findTool('deck-modern');

  // --- SPECIFIC MAJOR ARCANA MAPPINGS ---
  
  // High Intuition & Cycles -> Moonology Diary
  if (['The Moon', 'The High Priestess', 'Wheel of Fortune', 'Nine of Cups'].some(c => cardName.includes(c))) {
    return findTool('journal-moon');
  }
  
  // Heavy Energy & Release -> Obsidian Shielding Kit
  if (['The Tower', 'Death', 'Judgement', 'Ten of Swords', 'The Devil'].some(c => cardName.includes(c))) {
    return findTool('obsidian-kit');
  }
  
  // Solitude & Inner Light -> Lunar Aura Salt Lamp
  if (['The Hermit', 'The Hanged Man', 'The Fool', 'Four of Swords'].some(c => cardName.includes(c))) {
    return findTool('lunar-salt-lamp');
  }
  
  // Manifestation & Action -> Modern Witch Deck
  if (['The Magician', 'The Sun', 'Queen of Wands', 'King of Wands', 'Ace of Wands'].some(c => cardName.includes(c))) {
    return findTool('deck-modern');
  }

  // --- ELEMENTAL FALLBACKS ---

  // Earth (Pentacles) -> Moss Agate
  if (cardName.includes('Pentacles') || cardName.includes('Emperor') || cardName.includes('World')) {
    return findTool('element-earth-crystal');
  }

  // Air (Swords) -> Sage Bundle (Clearing the mind)
  if (cardName.includes('Swords')) {
    return findTool('sage-1');
  }

  // Water (Cups) -> Teapot (Nurturing the emotional body)
  if (cardName.includes('Cups') || cardName.includes('Empress')) {
    return findTool('cast-iron-teapot');
  }

  // Fire (Wands) -> Brass Holders (Channeling passion)
  if (cardName.includes('Wands') || cardName.includes('Chariot')) {
    return findTool('brass-holders');
  }

  // Default Catch-All
  return findTool('deck-modern');
};

/**
 * Grabs the specific ritual advice we wrote for each tool.
 */
export const getRitualAdvice = (tool) => {
  if (!tool) return "Take a moment to center your energy.";
  return tool.ritualAdvice || tool.desc; 
};

// ==========================================
// 2. ZODIAC ELEMENT RECOMMENDATIONS
// ==========================================

export const getElementBySign = (sign) => {
  const fire = ['Aries', 'Leo', 'Sagittarius'];
  const earth = ['Taurus', 'Virgo', 'Capricorn'];
  const air = ['Gemini', 'Libra', 'Aquarius'];
  
  if (fire.includes(sign)) return 'Fire';
  if (earth.includes(sign)) return 'Earth';
  if (air.includes(sign)) return 'Air';
  return 'Water'; 
};

export const getShopRecommendations = (element) => {
  switch(element) {
    case 'Fire':
      return {
        crystal: findTool('element-fire-crystal'),
        tea: findTool('element-fire-tea') // Now this exists!
      };
    case 'Earth':
      return {
        crystal: findTool('element-earth-crystal'),
        tea: findTool('element-earth-tea')
      };
    case 'Air':
      return {
        crystal: findTool('element-air-crystal'),
        tea: findTool('element-air-tea') // Now this exists!
      };
    case 'Water':
    default:
      return {
        crystal: findTool('element-water-crystal'),
        tea: findTool('element-water-tea') // Now this exists!
      };
  }
};