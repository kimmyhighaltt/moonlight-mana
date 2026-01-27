import { Moon, Sun, Star, Cloud, Heart, Zap, Anchor, Feather } from 'lucide-react';

export const THEME = {
  primary: '#D4AF37',   // Gold
  secondary: '#E6E6FA', // Lavender
  bg: '#2C3E50',        // Slate Blue
  gridColor: 'rgba(255, 255, 255, 0.05)',
};

export const PILLAR_INFO = {
  mind: { label: 'Hinengaro', sub: 'Mind', color: '#60A5FA' },
  body: { label: 'Tinana', sub: 'Body', color: '#34D399' },
  heart: { label: 'Whatumanawa', sub: 'Heart', color: '#F472B6' },
  soul: { label: 'Wairua', sub: 'Spirit', color: '#A78BFA' },
};

// THE 22 MAJOR ARCANA (Rider-Waite-Smith Public Domain Images)
export const TAROT_DECK = [
  { 
    id: 0, 
    name: 'The Fool', 
    message: 'New beginnings, innocence, spontaneity.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg' 
  },
  { 
    id: 1, 
    name: 'The Magician', 
    message: 'Manifestation, resourcefulness, power.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg' 
  },
  { 
    id: 2, 
    name: 'The High Priestess', 
    message: 'Intuition, sacred knowledge, divine feminine.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg' 
  },
  { 
    id: 3, 
    name: 'The Empress', 
    message: 'Femininity, beauty, nature, nurturing.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg' 
  },
  { 
    id: 4, 
    name: 'The Emperor', 
    message: 'Authority, structure, control, fatherhood.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg' 
  },
  { 
    id: 5, 
    name: 'The Hierophant', 
    message: 'Spiritual wisdom, religious beliefs, conformity.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg' 
  },
  { 
    id: 6, 
    name: 'The Lovers', 
    message: 'Love, harmony, relationships, values alignment.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg' 
  },
  { 
    id: 7, 
    name: 'The Chariot', 
    message: 'Control, willpower, success, action.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg' 
  },
  { 
    id: 8, 
    name: 'Strength', 
    message: 'Courage, persuasion, influence, compassion.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg' 
  },
  { 
    id: 9, 
    name: 'The Hermit', 
    message: 'Soul-searching, introspection, being alone.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg' 
  },
  { 
    id: 10, 
    name: 'Wheel of Fortune', 
    message: 'Good luck, karma, life cycles, destiny.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg' 
  },
  { 
    id: 11, 
    name: 'Justice', 
    message: 'Justice, fairness, truth, cause and effect.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg' 
  },
  { 
    id: 12, 
    name: 'The Hanged Man', 
    message: 'Pause, surrender, letting go, new perspectives.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg' 
  },
  { 
    id: 13, 
    name: 'Death', 
    message: 'Endings, change, transformation, transition.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg' 
  },
  { 
    id: 14, 
    name: 'Temperance', 
    message: 'Balance, moderation, patience, purpose.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg' 
  },
  { 
    id: 15, 
    name: 'The Devil', 
    message: 'Shadow self, attachment, addiction, restriction.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg' 
  },
  { 
    id: 16, 
    name: 'The Tower', 
    message: 'Sudden change, upheaval, chaos, revelation.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg' 
  },
  { 
    id: 17, 
    name: 'The Star', 
    message: 'Hope, faith, purpose, renewal, spirituality.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg' 
  },
  { 
    id: 18, 
    name: 'The Moon', 
    message: 'Illusion, fear, anxiety, subconscious, intuition.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg' 
  },
  { 
    id: 19, 
    name: 'The Sun', 
    message: 'Positivity, fun, warmth, success, vitality.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg' 
  },
  { 
    id: 20, 
    name: 'Judgement', 
    message: 'Judgement, rebirth, inner calling, absolution.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg' 
  },
  { 
    id: 21, 
    name: 'The World', 
    message: 'Completion, integration, accomplishment, travel.', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg' 
  },
];

export const INITIAL_MOCK_ENTRIES = [
  {
    id: 170528,
    date: 'JAN 11',
    time: '08:30 AM',
    moon: 'New Moon',
    card: 'The High Priestess',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
    mana: 45,
    message: 'Trusting my intuition today.',
    pillars: { mind: 40, body: 60, heart: 30, soul: 50 },
    trend: 'down'
  },
  {
    id: 170529,
    date: 'JAN 12',
    time: '09:15 PM',
    moon: 'Waxing Crescent',
    card: 'The Sun',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
    mana: 92,
    message: 'Feeling absolutely radiant and alive.',
    pillars: { mind: 90, body: 95, heart: 90, soul: 92 },
    trend: 'up'
  }
];

// AFFILIATE / SHOPPING LINKS
export const SACRED_TOOLS = [
  {
    id: 'deck-1',
    name: 'The Starlight Tarot Deck',
    desc: 'Classic Rider-Waite imagery with a celestial gold finish.',
    price: '$24.99',
    link: 'https://amazon.com/s?k=tarot+deck', // Replace with your affiliate link
    img: 'https://images.unsplash.com/photo-1632057796985-7cc203241077?auto=format&fit=crop&q=80&w=400' 
  },
  {
    id: 'sage-1',
    name: 'White Sage Bundle',
    desc: 'Premium California sage for clearing negative energy.',
    price: '$8.50',
    link: 'https://amazon.com/s?k=white+sage', // Replace with your affiliate link
    img: 'https://images.unsplash.com/photo-1601662529555-46eb11e89b43?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'crystal-1',
    name: 'Amethyst Cluster',
    desc: 'Raw crystals to enhance spiritual connection.',
    price: '$15.00',
    link: 'https://amazon.com/s?k=amethyst+cluster', // Replace with your affiliate link
    img: 'https://images.unsplash.com/photo-1565538392686-350731bd1cb8?auto=format&fit=crop&q=80&w=400'
  }
];
export const WHAKATAUKI = [
  { 
    maori: 'Tama tū tama ora, tama noho tama mate.', 
    english: 'He who stands lives, he who sits perishes.' 
  },
  { 
    maori: 'He oranga ngākau, he pikinga waiora.', 
    english: 'Relief for the heart, progress for health.' 
  },
  { 
    maori: 'Mahia te mahi, hei painga mō te iwi.', 
    english: 'Do the work for the good of the people.' 
  },
  { 
    maori: 'Mauria te pono.', 
    english: 'Believe in yourself.' 
  },
  { 
    maori: 'Te toka tū moana.', 
    english: 'The rock standing firm in the ocean.' 
  },
  { 
    maori: 'Ko te pae tawhiti whāia kia tata, ko te pae tata whakamaua kia tina.', 
    english: 'Seek out distant horizons, and cherish those that you attain.' 
  }
];