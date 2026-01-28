import { Moon, Sun, Star, Cloud, Heart, Zap, Anchor, Feather } from 'lucide-react';


export const THEME = {
  primary: '#D4AF37',   // Gold
  secondary: '#E6E6FA', // Lavender
  bg: '#40566E',        // LIGHTER Slate Blue (Previously #2C3E50)
  gridColor: 'rgba(255, 255, 255, 0.1)', // Increased opacity for brightness
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
    desc: 'Wyspell Tarot Cards: Starlight Tarot Deck with Guide Book - Unique Tarot Card Deck for Beginners - Modern Fortune Telling Cards (Blue)',
    price: '$26.82',
    link: 'https://amzn.to/49IbDG3', // Replace with your affiliate link
    img: 'https://m.media-amazon.com/images/I/91i5jQ5mZYL._AC_SX679_.jpg' 
  },
  {
    id: 'sage-1',
    name: 'White Sage Bundle',
    desc: '6 Pack White Sage ~ Sage Smudge Sticks for Smudging & Cleansing Energy ~ Bulk/Wholesale ~ Sustainably Grown (6 Pack)',
    price: '$20.08',
    link: 'https://amzn.to/4q0SEvi', // Replace with your affiliate link
    img: 'https://m.media-amazon.com/images/I/81qkJ2mMSbL._AC_SX679_.jpg'
  },
  {
    id: 'crystal-1',
    name: 'Amethyst Cluster',
    desc: 'SUNYIK Natural Amethyst Quartz Crystal Cluster,Druzy Geode Specimen Gemstone Sculpture Sphere(0.2-0.3lb)',
    price: '$28.84',
    link: 'https://amzn.to/4r8PuX8', // Replace with your affiliate link
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

  // --- NEW ITEMS ---
  {
    id: 'deck-modern',
    name: 'Modern Witch Tarot',
    desc: 'A stylish, contemporary take on tarot.',
    price: '$56.26',
    link: 'https://amzn.to/3Z0xrGQ', // Search Amazon for "Modern Witch Tarot"
    img: 'https://m.media-amazon.com/images/I/81Ri5CeTklL._SY342_.jpg' // Right-click Amazon image to get real link
  },
  {
    id: 'oracle-light',
    name: 'Work Your Light Oracle',
    desc: 'Gentle guidance for your soul journey.',
    price: '$22.61',
    link: 'https://amzn.to/3O6zQ07', // Search "Work Your Light Oracle"
    img: 'https://m.media-amazon.com/images/I/71kWsJJY9fL._SY342_.jpg'
  },
  {
    id: 'decor-lamp',
    name: '3D Moon Lamp',
    desc: 'Bring the full moon into your room.',
    price: '$33.47',
    link: 'https://amzn.to/3YWVLcy', // Search "Moon Lamp"
    img: 'https://m.media-amazon.com/images/I/81Mdq0wkxqL._AC_SX679_.jpg'
  },
  {
    id: 'sound-bowl',
    name: 'Tibetan Singing Bowl',
    desc: 'Sound healing for deep meditation.',
    price: '$31.82',
    link: 'https://amzn.to/3LVAygb', // Search "Singing Bowl"
    img: 'https://m.media-amazon.com/images/I/61IRVh7WUpL._AC_SX679_.jpg'
  },
  {
    id: 'decor-salt',
    name: 'Himalayan Salt Lamp',
    desc: 'Purify the air and set the mood.',
    price: '$33.53',
    link: 'https://amzn.to/3NFzspk', // Search "Salt Lamp"
    img: 'https://m.media-amazon.com/images/I/71fKbPe9gML._AC_SX679_.jpg'
  },
  {
    id: 'crystal-set',
    name: 'Chakra Healing Crystals',
    desc: '7 stones for balancing your energy.',
    price: '$36.89',
    link: 'https://amzn.to/4t6Lc4A', // Search "Chakra Stones"
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