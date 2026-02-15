// src/utils/affiliateLogic.js
import { SACRED_TOOLS } from '../constants/index';

// Helper to safely find a tool by ID
const findTool = (id) => {
  return SACRED_TOOLS.find(t => t.id === id) || SACRED_TOOLS[0];
};

// ==========================================
// 1. TAROT CARD RECOMMENDATIONS
// ==========================================

export const getRecommendationForCard = (cardName) => {
  if (!cardName) return findTool('deck-classic');

  // --- SPECIFIC MAJOR ARCANA MAPPINGS ---
  
  // High Intuition Cards -> Moon Diary
  if (['The Moon', 'The High Priestess', 'Wheel of Fortune', 'Nine of Cups', 'Two of Pentacles'].some(c => cardName.includes(c))) {
    return findTool('journal-moon');
  }
  
  // Heavy Energy/Release Cards -> Cleansing Stick
  if (['The Tower', 'Death', 'Judgement', 'Ten of Swords', 'Five of Pentacles', 'The Devil'].some(c => cardName.includes(c))) {
    return findTool('cleansing-selenite');
  }
  
  // Guidance/Spirit Cards -> Oracle Deck
  if (['The Star', 'Temperance', 'The Hierophant', 'Six of Cups'].some(c => cardName.includes(c))) {
    return findTool('oracle-light');
  }
  
  // Solitude/Inner Light -> Moon Lamp
  if (['The Hermit', 'The Hanged Man', 'The Fool', 'Four of Swords'].some(c => cardName.includes(c))) {
    return findTool('decor-lamp');
  }
  
  // Manifestation/Power -> Modern Witch Deck
  if (['The Magician', 'Queen of Wands', 'King of Wands', 'Ace of Wands'].some(c => cardName.includes(c))) {
    return findTool('deck-modern');
  }

  // --- ELEMENTAL FALLBACKS (Using your new swapped items) ---

  // Earth (Pentacles) -> Crystals
  if (cardName.includes('Pentacles') || cardName.includes('Emperor') || cardName.includes('World')) {
    return findTool('crystal-set');
  }

  // Air (Swords) -> Sage Bundle (Mental Clarity)
  if (cardName.includes('Swords')) {
    return findTool('sage-1');
  }

  // Water (Cups) -> Bath Salts (Emotional Cleansing)
  // *Replaced old 'singing bowl' logic with your new Bath Salts*
  if (cardName.includes('Cups') || cardName.includes('Empress')) {
    return findTool('bath-salts');
  }

  // Fire (Wands) -> Ritual Candles (Action/Passion)
  // *Replaced old 'salt lamp' logic with your new Candles*
  if (cardName.includes('Wands') || cardName.includes('Sun') || cardName.includes('Chariot')) {
    return findTool('ritual-candle');
  }

  // Default Catch-All
  return findTool('deck-classic');
};

export const getRitualAdvice = (tool) => {
  if (!tool) return "Connect with your inner self.";
  // Uses the description you already wrote in index.js
  return tool.desc; 
};

// ==========================================
// 2. ZODIAC ELEMENT RECOMMENDATIONS
// ==========================================
// (Kept separate because these specific items might not be in your main shop list)

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
        crystal: { 
            name: "Raw Carnelian Flame", 
            desc: "Ignites passion and restores vitality.", 
            price: "$28.99", 
            img: "https://m.media-amazon.com/images/I/616CDvG6BTL._AC_SL1500_.jpg",
            link: "https://amzn.to/3ZraBIA" 
        },
        tea: { 
            name: "Ceylon Cinnamon Capsules", 
            desc: "Warming herbs to fuel your inner fire.", 
            price: "$15.95", 
            img: "https://m.media-amazon.com/images/I/816P+7NySIL._AC_SL1500_.jpg",
            link: "https://amzn.to/4c3AmpZ" 
        }
      };
    case 'Earth':
      return {
        crystal: { 
            name: "Green Moss Agate", 
            desc: "For grounding and new beginnings.", 
            price: "$26.99", 
            img: "https://m.media-amazon.com/images/I/81sQJ53nBxL._AC_SL1500_.jpg",
            link: "https://amzn.to/4qvwpxM" 
        },
        tea: { 
            name: "Dandelion Herbal Tea", 
            desc: "Deeply rooting herbs for stability.", 
            price: "$18.99", 
            img: "https://m.media-amazon.com/images/I/81rPe-3SltL._SL1500_.jpg",
            link: "https://amzn.to/3O1TAlP" 
        }
      };
    case 'Air':
      return {
        crystal: { 
            name: "Clear Quartz Wand", 
            desc: "Amplifies thought and mental clarity.", 
            price: "$13.99", 
            img: "https://m.media-amazon.com/images/I/71t5kM59-2L._AC_SL1400_.jpg",
            link: "https://amzn.to/4bLjy6P" 
        },
        tea: { 
            name: "Energy Mints", 
            desc: "Bright herbs to clear the mental fog.", 
            price: "$21.99", 
            img: "https://m.media-amazon.com/images/I/71kcJRYBEIL._AC_SL1500_.jpg",
            link: "https://amzn.to/46HBprR" 
        }
      };
    case 'Water':
    default:
      return {
        crystal: { 
            name: "Rainbow Moonstone", 
            desc: "Enhances intuition and emotional flow.", 
            price: "$19.99", 
            img: "https://m.media-amazon.com/images/I/61O98XE8tIL._AC_SL1500_.jpg",
            link: "https://amzn.to/4tyxbNh" 
        },
        tea: { 
            name: "Organic Chamomile Tea", 
            desc: "Soothing flowers for deep emotional rest.", 
            price: "$19.99", 
            img: "https://m.media-amazon.com/images/I/71SFHFgKwVL._SL1500_.jpg",
            link: "https://amzn.to/3O3QwFL" 
        }
      };
  }
};