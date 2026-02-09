// src/utils/affiliateLogic.js
import { SACRED_TOOLS } from '../constants/index';

// ==========================================
// 1. TAROT CARD RECOMMENDATIONS (Your Existing Logic)
// ==========================================

export const getRecommendationForCard = (cardName) => {
  if (!cardName) return SACRED_TOOLS.find(t => t.id === 'deck-classic');

  // Specific Cards
  if (['The Moon', 'The High Priestess', 'Wheel of Fortune', 'Nine of Cups', 'Two of Pentacles'].some(c => cardName.includes(c))) return SACRED_TOOLS.find(t => t.id === 'journal-moon') || SACRED_TOOLS[0];
  if (['The Tower', 'Death', 'Judgement', 'Ten of Swords', 'Five of Pentacles', 'The Devil'].some(c => cardName.includes(c))) return SACRED_TOOLS.find(t => t.id === 'cleansing-selenite') || SACRED_TOOLS[0];
  if (['The Star', 'Temperance', 'The Hierophant', 'Six of Cups'].some(c => cardName.includes(c))) return SACRED_TOOLS.find(t => t.id === 'oracle-light') || SACRED_TOOLS[0];
  if (['The Hermit', 'The Hanged Man', 'The Fool', 'Four of Swords'].some(c => cardName.includes(c))) return SACRED_TOOLS.find(t => t.id === 'decor-lamp') || SACRED_TOOLS[0];
  if (['The World', 'Justice', 'Strength', 'Ten of Cups', 'Six of Pentacles'].some(c => cardName.includes(c))) return SACRED_TOOLS.find(t => t.id === 'crystal-set') || SACRED_TOOLS[0];
  if (['The Magician', 'Queen of Wands', 'King of Wands', 'Ace of Wands'].some(c => cardName.includes(c))) return SACRED_TOOLS.find(t => t.id === 'deck-modern') || SACRED_TOOLS[0];

  // Elemental Fallbacks
  if (cardName.includes('Pentacles') || cardName.includes('Emperor')) return SACRED_TOOLS.find(t => t.id === 'crystal-1');
  if (cardName.includes('Swords')) return SACRED_TOOLS.find(t => t.id === 'sage-1');
  if (cardName.includes('Cups') || cardName.includes('Empress')) return SACRED_TOOLS.find(t => t.id === 'sound-bowl');
  if (cardName.includes('Wands') || cardName.includes('Sun') || cardName.includes('Chariot')) return SACRED_TOOLS.find(t => t.id === 'decor-salt');

  return SACRED_TOOLS.find(t => t.id === 'deck-classic');
};

export const getRitualAdvice = (tool) => {
  if (!tool) return "Connect with your inner self.";
  
  switch (tool.id) {
    case 'journal-moon': return `Your intuition is heightened. Track these cycles and dreams using the ${tool.name}.`;
    case 'cleansing-selenite': return `To clear this heavy energy instantly and cut negative cords, we recommend using the ${tool.name}.`;
    case 'oracle-light': return `You are being guided. Connect deeper with your higher self through the ${tool.name}.`;
    case 'decor-lamp': return `Illuminate your inner sanctuary during this time of reflection with the ${tool.name}.`;
    case 'crystal-set': return `Restore balance to your entire energetic system using the ${tool.name}.`;
    case 'deck-modern': return `Channel your modern power and manifestation abilities with the ${tool.name}.`;
    case 'sage-1': return `Clear the mental fog and anxiety associated with this card by cleansing with ${tool.name}.`;
    case 'crystal-1': return `Ground this abundance into physical reality by keeping the ${tool.name} near you.`;
    case 'sound-bowl': return `Harmonize your heart frequency and process these emotions using the ${tool.name}.`;
    case 'decor-salt': return `Amplify your vitality and clear the air around you with the ${tool.name}.`;
    default: return `Deepen your study of this archetype by working with the ${tool.name}.`;
  }
};

// ==========================================
// 2. ZODIAC ELEMENT RECOMMENDATIONS (Moved Here)
// ==========================================

export const getElementBySign = (sign) => {
  const fire = ['Aries', 'Leo', 'Sagittarius'];
  const earth = ['Taurus', 'Virgo', 'Capricorn'];
  const air = ['Gemini', 'Libra', 'Aquarius'];
  
  if (fire.includes(sign)) return 'Fire';
  if (earth.includes(sign)) return 'Earth';
  if (air.includes(sign)) return 'Air';
  return 'Water'; // Default (Cancer, Scorpio, Pisces)
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
            name: " Ceylon Cinnamon Capsules", 
            desc: "Warming herbs to fuel your inner fire.", 
            price: "$15.95", 
            img: "https://m.media-amazon.com/images/I/816P+7NySIL._AC_SL1500_.jpg",
            link: "https://amzn.to/4c3AmpZ" 
        }
      };
    case 'Earth':
      return {
        crystal: { 
            name: "Green Moss Agate Healing Crystal", 
            desc: "For grounding and new beginnings.", 
            price: "$26.99", 
            img: "https://m.media-amazon.com/images/I/81sQJ53nBxL._AC_SL1500_.jpg",
            link: "https://amzn.to/4qvwpxM" 
        },
        tea: { 
            name: "Teeccino Dandelion Herbal Tea - Dark Roast - 25 Tea Bags", 
            desc: "Deeply rooting herbs for stability.", 
            price: "$18.99", 
            img: "https://m.media-amazon.com/images/I/81rPe-3SltL._SL1500_.jpg",
            link: "https://amzn.to/3O1TAlP" 
        }
      };
    case 'Air':
      return {
        crystal: { 
            name: "LAIDANLA Clear Quartz Healing Crystals Wands 3.5-4", 
            desc: "Amplifies thought and mental clarity.", 
            price: "$13.99", 
            img: "https://m.media-amazon.com/images/I/71t5kM59-2L._AC_SL1400_.jpg",
            link: "https://amzn.to/4bLjy6P" 
        },
        tea: { 
            name: "Viter Energy 40mg Caffeine Mints - Sugar Free, B Vitamins,", 
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
            name: "Amazing Gemstone Rainbow Moonstone Crystal", 
            desc: "Enhances intuition and emotional flow.", 
            price: "$19.99", 
            img: "https://m.media-amazon.com/images/I/61O98XE8tIL._AC_SL1500_.jpg",
            link: "https://amzn.to/4tyxbNh" 
        },
        tea: { 
            name: "FGO Organic Chamomile Tea, 100 Tea Bags", 
            desc: "Soothing flowers for deep emotional rest.", 
            price: "$19.99", 
            img: "https://m.media-amazon.com/images/I/71SFHFgKwVL._SL1500_.jpg",
            link: "https://amzn.to/3O3QwFL" 
        }
      };
  }
};