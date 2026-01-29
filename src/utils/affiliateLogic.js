// src/utils/affiliateLogic.js
import { SACRED_TOOLS } from '../constants/index';

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