// -----------------------------------------------------------------------------
// 1. THEME & CONFIGURATION
// -----------------------------------------------------------------------------
export const THEME = {
  primary: '#D4AF37',   // Gold
  secondary: '#E6E6FA', // Lavender
  bg: '#40566E',        // LIGHTER Slate Blue
  gridColor: 'rgba(255, 255, 255, 0.1)',
};

export const PILLAR_INFO = {
  mind: { 
    label: 'Hinengaro', 
    sub: 'Mind', 
    color: '#60A5FA',
    question: 'Is your mind clear or cluttered today?' 
  },
  body: { 
    label: 'Tinana', 
    sub: 'Body', 
    color: '#34D399',
    question: 'How is your physical energy level?' 
  },
  heart: { 
    label: 'Whatumanawa', 
    sub: 'Heart', 
    color: '#F472B6', 
    question: 'How are you feeling emotionally?' 
  },
  soul: { 
    label: 'Wairua', 
    sub: 'Spirit', 
    color: '#A78BFA',
    question: 'Do you feel connected to your purpose?' 
  },
};

// -----------------------------------------------------------------------------
// 2. TAROT DECK GENERATION (78 Cards)
// -----------------------------------------------------------------------------

// HELPER: Only used for MINOR Arcana (Cups, Wands, etc)
const getMinorCardImage = (suit, rank) => {
  const baseUrl = "https://www.sacred-texts.com/tarot/pkt/img/";
  
  // Map Suit names to 2-letter codes
  const suitCodes = { 'Wands': 'wa', 'Cups': 'cu', 'Swords': 'sw', 'Pentacles': 'pe' };
  const s = suitCodes[suit];

  // Map Ranks to codes
  const rankCodes = {
    'Ace': 'ac', 'Two': '02', 'Three': '03', 'Four': '04', 'Five': '05',
    'Six': '06', 'Seven': '07', 'Eight': '08', 'Nine': '09', 'Ten': '10',
    'Page': 'pa', 'Knight': 'kn', 'Queen': 'qu', 'King': 'ki'
  };
  const r = rankCodes[rank];

  return `${baseUrl}${s}${r}.jpg`;
};

// A. The 22 Major Arcana (RESTORED YOUR ORIGINAL WIKIPEDIA IMAGES)
const MAJOR_ARCANA_DATA = [
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

// B. The 56 Minor Arcana (Auto-Generated Sacred Text Images)
const SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];

const MINOR_ARCANA_DATA = [];
let idCounter = 22;

SUITS.forEach(suit => {
  RANKS.forEach(rank => {
    MINOR_ARCANA_DATA.push({
      id: idCounter++,
      name: `${rank} of ${suit}`,
      img: getMinorCardImage(suit, rank), // <--- Uses Sacred Texts for these
      message: `The energy of the ${rank} in the realm of ${suit}.`,
      suit: suit,
      rank: rank
    });
  });
});

// C. EXPORT THE FULL DECK
export const TAROT_DECK = [...MAJOR_ARCANA_DATA, ...MINOR_ARCANA_DATA];


// -----------------------------------------------------------------------------
// 3. MOCK DATA & TOOLS
// -----------------------------------------------------------------------------
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

export const SACRED_TOOLS = [
  // --- HIGH CONVERSION CONSUMABLES (The Money Makers) ---
  {
    id: 'free-audible-trial',
    name: 'Free Audiobook (Audible)',
    desc: 'Listen to "The Power of Now" or any spiritual book for free.',
    price: 'FREE', // Visual trigger for users
    link: 'https://amzn.to/4a5lJ2E', 
    img: 'https://m.media-amazon.com/images/I/516kmKfROhL._SX342_.jpg' 
  },
  {
    id: 'sage-1',
    name: 'White Sage Bundle',
    desc: '6 Pack White Sage ~ Clear negative energy instantly.',
    price: '$11.97',
    link: 'https://amzn.to/4t5yOl8', 
    img: 'https://m.media-amazon.com/images/I/81qkJ2mMSbL._AC_SX679_.jpg'
  },
  {
    id: 'ritual-candle', // SWAPPED: Replaces Salt Lamp
    name: 'Chakra Ritual Candles',
    desc: 'Set of colored candles for spellwork and manifestation.',
    price: '$15.99',
    link: 'https://amzn.to/4tfy7FW', 
    img: 'https://m.media-amazon.com/images/I/81i2uGn4l8L._AC_SX679_.jpg'
  },
  {
    id: 'bath-salts', // SWAPPED: Replaces Singing Bowl
    name: 'Aura Cleansing Salts',
    desc: 'Lavender & Epsom salts to wash away heavy emotions.',
    price: '$3.54',
    link: 'https://amzn.to/3ZeqSAs', 
    img: 'https://m.media-amazon.com/images/I/81RPtbwDwNL._SX679_.jpg'
  },

  // --- THE BEST SELLERS (Decks & Journals) ---
  {
    id: 'deck-modern',
    name: 'Modern Witch Tarot',
    desc: 'A stylish, contemporary take on tarot. #1 Bestseller.',
    price: '$18.45', 
    link: 'https://amzn.to/4as2qBQ',
    img: 'https://m.media-amazon.com/images/I/81bvT2YcWiL._SY342_.jpg' 
  },
  {
    id: 'deck-classic',
    name: 'The Rider Waite Tarot',
    desc: 'The essential deck for all readers.',
    price: '$19.54',
    link: 'https://amzn.to/4qdayLm', 
    img: 'https://m.media-amazon.com/images/I/71YMG6rKgnL._SL1404_.jpg' 
  },
  {
    id: 'oracle-light',
    name: 'Work Your Light Oracle',
    desc: 'Gentle guidance for your soul journey.',
    price: '$16.14',
    link: 'https://amzn.to/3ZK8Lm3',
    img: 'https://m.media-amazon.com/images/I/8123LkyQThL._SL1400_.jpg'
  },
  {
    id: 'journal-moon',
    name: 'Moonology Diary 2026',
    desc: 'Align your life with the lunar cycles.',
    price: '$16.10',
    link: 'https://amzn.to/4tfyMao',
    img: 'https://m.media-amazon.com/images/I/71djIm0c9DL._SL1500_.jpg'
  },

  // --- HIGH TICKET / GIFTS (Keep these for specific cards) ---
  {
    id: 'cleansing-selenite',
    name: 'Selenite Cleansing Stick',
    desc: 'Clear negative energy instantly.',
    price: '$9.99',
    link: 'https://amzn.to/4afhvpb',
    img: 'https://m.media-amazon.com/images/I/81282kmUtKL._AC_SX679_PIbundle-12,TopRight,0,0_SH20_.jpg'
  },
  {
    id: 'crystal-set',
    name: 'Chakra Healing Crystals',
    desc: '7 stones for balancing your energy.',
    price: '$21.99',
    link: 'https://amzn.to/4qhF6vo',
    img: 'https://m.media-amazon.com/images/I/81eyC6EOThL._AC_SL1500_.jpg'
  },
  {
    id: 'decor-lamp',
    name: '3D Moon Lamp',
    desc: 'Bring the full moon into your room.',
    price: '$17.99',
    link: 'https://amzn.to/3ZfcIir',
    img: 'https://m.media-amazon.com/images/I/71F4ab7Sx8L._AC_SL1500_.jpg'
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