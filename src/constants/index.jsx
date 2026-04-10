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

const getMinorCardImage = (suit, rank) => {
  const baseUrl = "https://www.sacred-texts.com/tarot/pkt/img/";
  const suitCodes = { 'Wands': 'wa', 'Cups': 'cu', 'Swords': 'sw', 'Pentacles': 'pe' };
  const s = suitCodes[suit];
  const rankCodes = {
    'Ace': 'ac', 'Two': '02', 'Three': '03', 'Four': '04', 'Five': '05',
    'Six': '06', 'Seven': '07', 'Eight': '08', 'Nine': '09', 'Ten': '10',
    'Page': 'pa', 'Knight': 'kn', 'Queen': 'qu', 'King': 'ki'
  };
  const r = rankCodes[rank];
  return `${baseUrl}${s}${r}.jpg`;
};

const MAJOR_ARCANA_DATA = [
  { id: 0, name: 'The Fool', message: 'New beginnings, innocence, spontaneity.', img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg' },
  { id: 1, name: 'The Magician', message: 'Manifestation, resourcefulness, power.', img: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg' },
  { id: 2, name: 'The High Priestess', message: 'Intuition, sacred knowledge, divine feminine.', img: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg' },
  { id: 3, name: 'The Empress', message: 'Femininity, beauty, nature, nurturing.', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg' },
  { id: 4, name: 'The Emperor', message: 'Authority, structure, control, fatherhood.', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg' },
  { id: 5, name: 'The Hierophant', message: 'Spiritual wisdom, religious beliefs, conformity.', img: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg' },
  { id: 6, name: 'The Lovers', message: 'Love, harmony, relationships, values alignment.', img: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg' },
  { id: 7, name: 'The Chariot', message: 'Control, willpower, success, action.', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg' },
  { id: 8, name: 'Strength', message: 'Courage, persuasion, influence, compassion.', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg' },
  { id: 9, name: 'The Hermit', message: 'Soul-searching, introspection, being alone.', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg' },
  { id: 10, name: 'Wheel of Fortune', message: 'Good luck, karma, life cycles, destiny.', img: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg' },
  { id: 11, name: 'Justice', message: 'Justice, fairness, truth, cause and effect.', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg' },
  { id: 12, name: 'The Hanged Man', message: 'Pause, surrender, letting go, new perspectives.', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg' },
  { id: 13, name: 'Death', message: 'Endings, change, transformation, transition.', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg' },
  { id: 14, name: 'Temperance', message: 'Balance, moderation, patience, purpose.', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg' },
  { id: 15, name: 'The Devil', message: 'Shadow self, attachment, addiction, restriction.', img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg' },
  { id: 16, name: 'The Tower', message: 'Sudden change, upheaval, chaos, revelation.', img: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg' },
  { id: 17, name: 'The Star', message: 'Hope, faith, purpose, renewal, spirituality.', img: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg' },
  { id: 18, name: 'The Moon', message: 'Illusion, fear, anxiety, subconscious, intuition.', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg' },
  { id: 19, name: 'The Sun', message: 'Positivity, fun, warmth, success, vitality.', img: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg' },
  { id: 20, name: 'Judgement', message: 'Judgement, rebirth, inner calling, absolution.', img: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg' },
  { id: 21, name: 'The World', message: 'Completion, integration, accomplishment, travel.', img: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg' },
];

const SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];

const MINOR_ARCANA_DATA = [];
let idCounter = 22;

SUITS.forEach(suit => {
  RANKS.forEach(rank => {
    MINOR_ARCANA_DATA.push({
      id: idCounter++,
      name: `${rank} of ${suit}`,
      img: getMinorCardImage(suit, rank),
      message: `The energy of the ${rank} in the realm of ${suit}.`,
      suit: suit,
      rank: rank
    });
  });
});

export const TAROT_DECK = [...MAJOR_ARCANA_DATA, ...MINOR_ARCANA_DATA];

// -----------------------------------------------------------------------------
// 3. MOCK DATA & TOOLS (PROPRIETARY EQUITY ONLY)
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
  // --- ✨ MOONLIGHT MANA ORIGINAL FINE ART COLLECTION ✨ ---
  {
    id: 'art-the-unbecoming',
    name: 'The Unbecoming - Fine Art Print',
    category: 'Original Art',
    isFeatured: true, // ✨ This forces it to the front "Featured Release" tab!
    price: '$45.00', 
    description: 'A haunting exploration of identity in flux. This charcoal and soft-pastel rendering captures the "unbecoming"—where the past dissolves into the ethereal blue of the future. The blurred strokes evoke spiritual static, representing our surrender when aligning with our true cosmic North. Printed on 310gsm Hahnemühle German Etching paper.',
    images: [
      '/images/unbecoming-hero.jpg', 
      '/images/unbecoming-angle.jpg'
    ],
    variants: [
      { name: 'Altar (A4)', price: '$45.00', link: 'https://buy.stripe.com/4gM28t3GB2CA00pbhgcEw0f' }, 
      { name: 'Gallery (A3)', price: '$65.00', link: 'https://buy.stripe.com/cNicN7gtna52dRf998cEw0g' }, 
      { name: 'Statement (A2)', price: '$85.00', link: 'https://buy.stripe.com/28EcN7fpja524gFadccEw0h' } 
    ],
    isArtwork: true
  },
  {
    id: 'art-golden-light',
    name: 'Golden Light Petals - Fine Art Print',
    category: 'Original Art',
    price: '$45.00', 
    description: 'A radiant exploration of warm, golden light washing over delicate pink petals. Printed on museum-grade Hahnemühle German Etching paper to perfectly preserve the chalky, organic texture of the original pastel artwork.',
    images: [
      '/images/golden-hero.jpg',
      '/images/golden-angle.jpg'
    ],
    variants: [
      { name: 'Altar (A4)', price: '$45.00', link: 'https://buy.stripe.com/bJecN70up1ywcNb4SScEw06' },
      { name: 'Gallery (A3)', price: '$65.00', link: 'https://buy.stripe.com/28E9AVelfcda28xgBAcEw07' },
      { name: 'Statement (A2)', price: '$85.00', link: 'https://buy.stripe.com/dRmbJ3a4Z5OM3cB998cEw08' }
    ],
    isArtwork: true
  },
  {
    id: 'art-cosmic-lily',
    name: 'The Cosmic Lily - Fine Art Print',
    category: 'Original Art',
    price: '$45.00', 
    description: 'An ethereal pink star-lily glowing from the inside out, surrounded by soft celestial orbs. Museum-grade print on textured fine art paper to capture the profound depth of the original piece.',
    images: [
      '/images/lily-hero.jpg', 
      '/images/lily-angle.jpg'
    ],
    variants: [
      { name: 'Altar (A4)', price: '$45.00', link: 'https://buy.stripe.com/aFa5kF5OJ3GE6oN4SScEw09' }, 
      { name: 'Gallery (A3)', price: '$65.00', link: 'https://buy.stripe.com/dRm14p7WR0usbJ75WWcEw0a' }, 
      { name: 'Statement (A2)', price: '$85.00', link: 'https://buy.stripe.com/4gMbJ3cd7cda14t1GGcEw0b' } 
    ],
    isArtwork: true
  },
  {
    id: 'art-enchanted-garden',
    name: 'Enchanted Garden - Fine Art Print',
    category: 'Original Art',
    price: '$45.00', 
    description: 'Deep, moody teals and purples contrast with bioluminescent orange flora. This grounded yet highly mystical piece is printed on 310gsm Hahnemühle paper, looking identical to the original canvas.',
    images: [
      '/images/garden-hero.jpg', 
      '/images/garden-angle.jpg'
    ],
    variants: [
      { name: 'Altar (A4)', price: '$45.00', link: 'https://buy.stripe.com/cNibJ3cd7gtqfZnclkcEw0c' }, 
      { name: 'Gallery (A3)', price: '$65.00', link: 'https://buy.stripe.com/bJeeVf0upfpm00pdpocEw0e' }, 
      { name: 'Statement (A2)', price: '$85.00', link: 'https://buy.stripe.com/3cI6oJcd7gtq14tetscEw0d' } 
    ],
    isArtwork: true
  },

 // --- ✨ DIGITAL GRIMOIRES & GUIDES (100% MARGIN) ✨ ---
  {
    id: 'digital-tarot-journal',
    category: 'Digital Download',
    name: 'The Ultimate Digital Tarot Journal',
    price: 'FREE',
    link: 'https://drive.google.com/file/d/1RuzkY7lE7wte1osb_JI5xm9h2d5RIWCv/view?usp=drive_link', // 🔗 PASTE YOUR PAYHIP LINK HERE
    img: '/images/tarot-journal.png', // Ensure you have a square mockup image saved here
    ritualAdvice: 'Download this to your tablet to keep a seamless, searchable log of your daily pulls.',
    fullReview: 'A beautifully designed entry-level digital journal for the modern mystic. Perfect for tracking your daily cards, recognizing patterns in your pulls, and keeping your shadow work organized and accessible across your devices.',
    isArtwork: false
  },
  {
    id: 'digital-maramataka-journal',
    category: 'Digital Download',
    name: 'Ultimate 7-in-1 Maramataka & Hauora Lunar Journal',
    price: '$9.00',
    link: 'https://buy.stripe.com/3cI5kFa4Z7WU00p3OOcEw0k', // 🔗 PASTE YOUR PAYHIP LINK HERE
    img: '/images/lunar-journal.jpg', // Ensure you have a square mockup image saved here
    ritualAdvice: 'Use this comprehensive planner during your Sunday Reset to align your week with the lunar cycles.',
    fullReview: 'Stop fighting the current. This 7-in-1 digital planner merges the traditional Māori lunar calendar (Maramataka) with holistic wellness (Hauora) tracking. It is a complete system designed to help you map your energy levels to the moon phases, ensuring you know exactly when to push forward and when to rest.',
    isArtwork: false
  },
  {
    id: 'digital-mood-tarot-bundle',
    category: 'Digital Download',
    name: '7-in-1 Mood + Tarot Daily Reflection Bundle',
    price: '$9.00',
    link: 'https://buy.stripe.com/dRm6oJa4Zeli8wV1GGcEw0j', // 🔗 PASTE YOUR PAYHIP LINK HERE
    img: '/images/mood-bundle.jpg', // Ensure you have a square mockup image saved here
    ritualAdvice: 'Print these pages for your physical grimoire to track the direct correlation between your mood and your tarot pulls.',
    fullReview: 'A massive bundle designed for the deep feeler. This 7-in-1 toolkit bridges the gap between divination and mental health. By tracking your daily mood alongside your tarot reflections, you will quickly identify energetic drains and spiritual blockages. Includes printable templates and digital-friendly layouts.',
    isArtwork: false
  }
];

export const WHAKATAUKI = [
  { maori: 'Tama tū tama ora, tama noho tama mate.', english: 'He who stands lives, he who sits perishes.' },
  { maori: 'He oranga ngākau, he pikinga waiora.', english: 'Relief for the heart, progress for health.' },
  { maori: 'Mahia te mahi, hei painga mō te iwi.', english: 'Do the work for the good of the people.' },
  { maori: 'Mauria te pono.', english: 'Believe in yourself.' },
  { maori: 'Te toka tū moana.', english: 'The rock standing firm in the ocean.' },
  { maori: 'Ko te pae tawhiti whāia kia tata, ko te pae tata whakamaua kia tina.', english: 'Seek out distant horizons, and cherish those that you attain.' }
];

// --- PWA SERVICE WORKER REGISTRATION ---
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Moonlight Mana: Service Worker Active', reg.scope))
      .catch(err => console.log('Moonlight Mana: Service Worker Setup Error', err));
  });
}