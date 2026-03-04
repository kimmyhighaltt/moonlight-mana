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
  // ==========================================
  // CATEGORY 1: ENERGY SHIELDING & CLEANSING
  // ==========================================
  {
    id: 'obsidian-kit',
    category: 'Energy Shielding',
    name: 'Raw Obsidian Shielding Kit',
    desc: 'Tourmaline & Obsidian for ultimate energy protection.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Anima-Premium-Protection-Crystals-Shielding/dp/B0F6CTMCBB?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/814z9E8cMUL._AC_SL1500_.jpg',
    ritualAdvice: 'Keep this near your entryway to absorb heavy static and protect your Hinengaro (Mind) from draining external forces.'
  },
  {
    id: 'smokeless-smudge',
    category: 'Energy Cleansing',
    name: 'Smokeless Palo Santo Spray',
    desc: 'Clear stagnant energy without the smoke.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Essential-Aromatherapy-fresheners-Meditation-Accessories/dp/B0D5LZM1MR?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/51Ixm0ESfPL._AC_SL1080_.jpg', 
    ritualAdvice: 'Mist this around your aura right before hitting the "Seal This Entry" button to clear any lingering negativity.'
  },
  {
    id: 'crystal-amulet',
    category: 'Energy Shielding',
    name: '7 Chakra Crystal Amulet',
    desc: 'Wearable daily energy shielding.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Jovivi-Gemstone-Wrapped-Natural-Necklace/dp/B078185CLY?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/61A5x1gQ02L._AC_SY535_.jpg', 
    ritualAdvice: 'Wear this on high-stress days to keep your personal mana contained and protected from energetic vampires.'
  },
  {
    id: 'witch-bells',
    category: 'Energy Cleansing',
    name: 'Altar Cleansing Bells',
    desc: 'Handmade bells for home protection.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Protection-Handmade-Doorknob-Witchcraft-Decorations/dp/B09H78SC8Y?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71kzpPVH0SL._AC_SL1500_.jpg', 
    ritualAdvice: 'Hang these on your door to sonically cleanse the energy entering your sacred space.'
  },
  {
    id: 'sage-1',
    category: 'Energy Cleansing',
    name: 'White Sage Bundle',
    desc: '6 Pack White Sage ~ Clear negative energy instantly.',
    price: '$11.97',
    link: 'https://amzn.to/4t5yOl8', 
    img: 'https://m.media-amazon.com/images/I/81qkJ2mMSbL._AC_SX679_.jpg',
    ritualAdvice: 'Light this during the Waning Moon to banish blockages in your Wairua (Spirit).'
  },

  // ==========================================
  // CATEGORY 2: THE SACRED ALTAR
  // ==========================================
  {
    id: 'grey-salt-lamp',
    category: 'Sacred Altar',
    name: 'Obsidian-Tone Salt Lamp',
    desc: 'Dark grey salt to purify your physical space.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Himalayan-Glow-1041-Natural-Listed/dp/B07CH2KDSG?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/61fnifPLOFL._AC_SL1500_.jpg', 
    ritualAdvice: 'Turn this on before drawing your daily Tarot card to set a grounded, moody atmosphere.'
  },
  {
    id: 'candle-warmer',
    category: 'Sacred Altar',
    name: 'Lotus Wax Warmer Lamp',
    desc: 'Melt ritual candles slowly and safely.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Dimmable-Electric-Birthday-Christmas-Aromatic/dp/B0C27FG8L9?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71l9egP7MWL._AC_SL1500_.jpg',
    ritualAdvice: 'The amber light doubles as a calming visual anchor during your guided journaling sessions.'
  },
  {
    id: 'brass-holders',
    category: 'Sacred Altar',
    name: 'Vintage Brass Candle Holders',
    desc: 'Set of 6 taper holders for spellwork.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Nuptio-Candlestick-Decorative-Centerpiece-Housewarming/dp/B08MLGXSPH?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/61yjFs5uUfL._AC_SX679_.jpg',
    ritualAdvice: 'Use these to hold your intention candles during New Moon rituals.'
  },
  {
    id: 'match-cloche',
    category: 'Sacred Altar',
    name: 'Aesthetic Match Cloche',
    desc: 'Glass display dome for ritual matches.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Cinnvoice-Matches-Decorative-Fireplace-Display/dp/B0DNFPWZYC?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71w7u+WIjlL._AC_SL1500_.jpg',
    ritualAdvice: 'Elevate the simple act of lighting your altar candle into a mindful, deliberate action.'
  },
  {
    id: 'incense-waterfall',
    category: 'Sacred Altar',
    name: 'Moon Backflow Incense',
    desc: 'Mesmerizing smoke waterfall for meditation.',
    price: 'View Collection',
    link: 'https://www.amazon.com/XINGZUAN-Backflow-Incense-Waterfall-Fountain/dp/B0CYPNN5J4?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71f8OfVVjmL._AC_SL1500_.jpg',
    ritualAdvice: 'Watch the smoke flow downward to visually practice grounding your erratic thoughts.'
  },

  // ==========================================
  // CATEGORY 3: SHADOW WORK & RESET
  // ==========================================
  {
    id: 'leather-journal',
    category: 'Shadow Work',
    name: 'Vintage Leather Grimoire',
    desc: 'Blank pages for deep shadow work.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Journals-Notebooks-Refillable-Notebook-Sketchbook/dp/B088R5S5TG?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71+7PU8VyEL._AC_SL1500_.jpg', 
    ritualAdvice: 'Use this physical journal to free-flow your raw thoughts before logging your finalized reflections into the app.'
  },
  {
    id: 'cast-iron-teapot',
    category: 'Sunday Reset',
    name: 'Cast Iron Tetsubin Teapot',
    desc: 'Heavy iron pot for herbal grounding blends.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Workshop-Japanese-Tetsubin-Stainless-Infuser/dp/B01N5JTAAD?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71oSXJ-IhFL._AC_SL1500_.jpg', 
    ritualAdvice: 'Brew a loose-leaf blend in this heavy pot to ground your Tinana (Body) after a high-energy day.'
  },
  {
    id: 'deck-modern',
    category: 'Shadow Work',
    name: 'Modern Witch Tarot',
    desc: 'A stylish, contemporary take on tarot.',
    price: '$18.45', 
    link: 'https://amzn.to/4as2qBQ',
    img: 'https://m.media-amazon.com/images/I/81bvT2YcWiL._SY342_.jpg',
    ritualAdvice: 'A highly intuitive deck perfect for translating your daily pulls into actionable modern advice.'
  },
  {
    id: 'journal-moon',
    category: 'Shadow Work',
    name: 'Moonology Diary 2026',
    desc: 'Align your life with the lunar cycles.',
    price: '$16.10',
    link: 'https://amzn.to/4tfyMao',
    img: 'https://m.media-amazon.com/images/I/71djIm0c9DL._SL1500_.jpg',
    ritualAdvice: 'Pair this with our digital lunar tracker to master your manifestation timing.'
  },
  {
    id: 'free-audible-trial',
    category: 'Sunday Reset',
    name: 'Free Audiobook (Audible)',
    desc: 'Listen to any spiritual book for free.',
    price: 'FREE',
    link: 'https://amzn.to/4a5lJ2E', 
    img: 'https://m.media-amazon.com/images/I/516kmKfROhL._SX342_.jpg',
    ritualAdvice: 'If your eyes are tired from screens, rest your body and absorb spiritual wisdom through audio instead.'
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