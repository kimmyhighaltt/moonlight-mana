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

// HELPER: Generate Correct Image URLs (Using Sacred Texts Archive)
const getCardImage = (suit, rank, id) => {
  const baseUrl = "https://www.sacred-texts.com/tarot/pkt/img/";
  
  // 1. Handle MAJOR ARCANA (0-21)
  if (!suit) {
    // Format: ar00.jpg, ar01.jpg ... ar21.jpg
    const numStr = id < 10 ? `0${id}` : `${id}`;
    return `${baseUrl}ar${numStr}.jpg`;
  }

  // 2. Handle MINOR ARCANA
  // Map Suit names to 2-letter codes
  const suitCodes = { 'Wands': 'wa', 'Cups': 'cu', 'Swords': 'sw', 'Pentacles': 'pe' };
  const s = suitCodes[suit];

  // Map Ranks to codes (ac, 02..10, pa, kn, qu, ki)
  const rankCodes = {
    'Ace': 'ac', 'Two': '02', 'Three': '03', 'Four': '04', 'Five': '05',
    'Six': '06', 'Seven': '07', 'Eight': '08', 'Nine': '09', 'Ten': '10',
    'Page': 'pa', 'Knight': 'kn', 'Queen': 'qu', 'King': 'ki'
  };
  const r = rankCodes[rank];

  return `${baseUrl}${s}${r}.jpg`;
};

// A. The 22 Major Arcana
const MAJOR_ARCANA_DATA = [
  { id: 0, name: 'The Fool' },
  { id: 1, name: 'The Magician' },
  { id: 2, name: 'The High Priestess' },
  { id: 3, name: 'The Empress' },
  { id: 4, name: 'The Emperor' },
  { id: 5, name: 'The Hierophant' },
  { id: 6, name: 'The Lovers' },
  { id: 7, name: 'The Chariot' },
  { id: 8, name: 'Strength' },
  { id: 9, name: 'The Hermit' },
  { id: 10, name: 'Wheel of Fortune' },
  { id: 11, name: 'Justice' },
  { id: 12, name: 'The Hanged Man' },
  { id: 13, name: 'Death' },
  { id: 14, name: 'Temperance' },
  { id: 15, name: 'The Devil' },
  { id: 16, name: 'The Tower' },
  { id: 17, name: 'The Star' },
  { id: 18, name: 'The Moon' },
  { id: 19, name: 'The Sun' },
  { id: 20, name: 'Judgement' },
  { id: 21, name: 'The World' },
].map(card => ({
  ...card,
  message: `${card.name} signifies a major life lesson.`, // Fallback message
  img: getCardImage(null, null, card.id) // Auto-generate Image URL
}));

// B. The 56 Minor Arcana
const SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];

const MINOR_ARCANA_DATA = [];
let idCounter = 22;

SUITS.forEach(suit => {
  RANKS.forEach(rank => {
    MINOR_ARCANA_DATA.push({
      id: idCounter++,
      name: `${rank} of ${suit}`,
      img: getCardImage(suit, rank, null), // Auto-generate Image URL (e.g., cu04.jpg)
      message: `The energy of the ${rank} in the realm of ${suit}.`,
      suit: suit,
      rank: rank
    });
  });
});

// C. EXPORT THE FULL DECK
export const TAROT_DECK = [...MAJOR_ARCANA_DATA, ...MINOR_ARCANA_DATA];


// -----------------------------------------------------------------------------
// 3. MOCK DATA & TOOLS (Kept exactly as you had them)
// -----------------------------------------------------------------------------
export const INITIAL_MOCK_ENTRIES = [
  {
    id: 170528,
    date: 'JAN 11',
    time: '08:30 AM',
    moon: 'New Moon',
    card: 'The High Priestess',
    img: 'https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg',
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
    img: 'https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg',
    mana: 92,
    message: 'Feeling absolutely radiant and alive.',
    pillars: { mind: 90, body: 95, heart: 90, soul: 92 },
    trend: 'up'
  }
];

export const SACRED_TOOLS = [
  {
    id: 'deck-1',
    name: 'The Starlight Tarot Deck',
    desc: 'Wyspell Tarot Cards: Starlight Tarot Deck with Guide Book.',
    price: '$26.82',
    link: 'https://amzn.to/49IbDG3', 
    img: 'https://m.media-amazon.com/images/I/91i5jQ5mZYL._AC_SX679_.jpg' 
  },
  {
    id: 'sage-1',
    name: 'White Sage Bundle',
    desc: '6 Pack White Sage ~ Sage Smudge Sticks for Smudging.',
    price: '$20.08',
    link: 'https://amzn.to/4q0SEvi', 
    img: 'https://m.media-amazon.com/images/I/81qkJ2mMSbL._AC_SX679_.jpg'
  },
  {
    id: 'crystal-1',
    name: 'Amethyst Cluster',
    desc: 'SUNYIK Natural Amethyst Quartz Crystal Cluster.',
    price: '$28.84',
    link: 'https://amzn.to/4r8PuX8', 
    img: 'https://m.media-amazon.com/images/I/819sOd2ebeL._AC_SX679_.jpg'
  },
  {
    id: 'deck-classic',
    name: 'The Rider Waite Tarot',
    desc: 'The essential deck for all readers.',
    price: '$32.78',
    link: 'https://amzn.to/4t6KjZO', 
    img: 'https://m.media-amazon.com/images/I/71YMG6rKgnL._SY466_.jpg' 
  },
  {
    id: 'journal-moon',
    name: 'Moonology Diary 2026',
    desc: 'Align your life with the lunar cycles.',
    price: '$27.01',
    link: 'https://amzn.to/49X3c8q',
    img: 'https://m.media-amazon.com/images/I/71djIm0c9DL._SX445_.jpg'
  },
  {
    id: 'cleansing-selenite',
    name: 'Selenite Cleansing Stick',
    desc: 'Clear negative energy instantly.',
    price: '$36.91',
    link: 'https://amzn.to/4bhimYJ',
    img: 'https://m.media-amazon.com/images/I/61FaJMlWP8L._SX466_.jpg'
  },
  {
    id: 'deck-modern',
    name: 'Modern Witch Tarot',
    desc: 'A stylish, contemporary take on tarot.',
    price: '$56.26',
    link: 'https://amzn.to/3Z0xrGQ',
    img: 'https://m.media-amazon.com/images/I/81Ri5CeTklL._SY342_.jpg' 
  },
  {
    id: 'oracle-light',
    name: 'Work Your Light Oracle',
    desc: 'Gentle guidance for your soul journey.',
    price: '$22.61',
    link: 'https://amzn.to/3O6zQ07',
    img: 'https://m.media-amazon.com/images/I/71kWsJJY9fL._SY342_.jpg'
  },
  {
    id: 'decor-lamp',
    name: '3D Moon Lamp',
    desc: 'Bring the full moon into your room.',
    price: '$33.47',
    link: 'https://amzn.to/3YWVLcy',
    img: 'https://m.media-amazon.com/images/I/81Mdq0wkxqL._AC_SX679_.jpg'
  },
  {
    id: 'sound-bowl',
    name: 'Tibetan Singing Bowl',
    desc: 'Sound healing for deep meditation.',
    price: '$31.82',
    link: 'https://amzn.to/3LVAygb',
    img: 'https://m.media-amazon.com/images/I/61IRVh7WUpL._AC_SX679_.jpg'
  },
  {
    id: 'decor-salt',
    name: 'Himalayan Salt Lamp',
    desc: 'Purify the air and set the mood.',
    price: '$33.53',
    link: 'https://amzn.to/3NFzspk',
    img: 'https://m.media-amazon.com/images/I/71fKbPe9gML._AC_SX679_.jpg'
  },
  {
    id: 'crystal-set',
    name: 'Chakra Healing Crystals',
    desc: '7 stones for balancing your energy.',
    price: '$36.89',
    link: 'https://amzn.to/4t6Lc4A',
    img: 'https://m.media-amazon.com/images/I/81eyC6EOThL._AC_SX679_.jpg'
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