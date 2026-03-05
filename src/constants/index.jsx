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
  // CATEGORY 1: ELEMENTAL SIGNS 
  // ==========================================

  {
    id: 'element-fire-crystal',
    category: 'Fire Element',
    name: 'Raw Carnelian Flame',
    desc: 'Ignites passion and restores vitality.',
    price: '$28.99',
    link: 'https://amzn.to/3ZraBIA',
    img: 'https://m.media-amazon.com/images/I/616CDvG6BTL._AC_SL1500_.jpg',
    ritualAdvice: 'Hold this during your morning ritual to spark the creative energy needed for your daily goals.',
    fullReview: (
      <div className="space-y-5 mt-2">
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
          <p className="opacity-90">Fire signs are fueled by action and inspiration. The intent of Carnelian is to provide a steady burn of motivation, preventing the "burnout" that often follows a period of high intensity. It’s about sustaining your inner flame so you can manifest without exhaustion.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
          <p className="opacity-90">This stone looks like a flickering coal. It’s warm, vibrant, and carries a high-vibrational frequency that matches the bold spirit of Aries, Leo, and Sagittarius. It doesn’t feel heavy; it feels like pure, kinetic energy trapped in glass.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
          <p className="opacity-90">Keep this in your workspace or wherever you do your most passionate 'Work.' Before starting a project, hold the Carnelian and visualize a warm light spreading from your solar plexus to your hands. Use that fire to fuel your focus.</p>
        </div>
        <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
          <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
          <p className="opacity-90">The ultimate 'get-it-done' stone. If you’ve been feeling stagnant, this is the match you need to strike to get your momentum back.</p>
        </div>
      </div>
    )
  },

  {
    id: 'element-fire-tea',
    category: 'Fire Element',
    name: 'Ceylon Cinnamon Capsules',
    desc: 'Warming herbs to fuel your inner fire.',
    price: '$15.95',
    link: 'https://amzn.to/4c3AmpZ',
    img: 'https://m.media-amazon.com/images/I/816P+7NySIL._AC_SL1500_.jpg',
    ritualAdvice: 'Take these during your morning routine to kickstart your metabolism and mental drive.',
    fullReview: (
      <div className="space-y-5 mt-2">
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
          <p className="opacity-90">Fire signs (Aries, Leo, Sag) often have a high 'idle' speed. The intent here is to provide a clean, warming fuel source that supports blood sugar and circulation, ensuring your physical energy can keep up with your fast-moving ideas.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
          <p className="opacity-90">Cinnamon is a 'Solar' herb. It’s spicy, warming, and invigorating. It doesn't give you the jitters of caffeine; instead, it provides a steady, glowing warmth from the inside out.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
          <p className="opacity-90">I call this 'Feeding the Flame.' Before a big workout or a high-stakes meeting, use this to ground your fire into your physical body so you can lead with confidence and steady energy.</p>
        </div>
        <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
          <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
          <p className="opacity-90">Essential for Fire signs who tend to go 100mph and then crash. It’s the regulator for your internal engine.</p>
        </div>
      </div>
    )
  },

  {
    id: 'element-air-crystal',
    category: 'Air Element',
    name: 'Clear Quartz Wand',
    desc: 'Amplifies thought and mental clarity.',
    price: '$13.99',
    link: 'https://amzn.to/4bLjy6P',
    img: 'https://m.media-amazon.com/images/I/71t5kM59-2L._AC_SL1400_.jpg',
    ritualAdvice: 'Use this wand to direct your focus during meditation to clear mental fog.',
    fullReview: (
      <div className="space-y-5 mt-2">
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
          <p className="opacity-90">The Air element governs the Hinengaro (Mind). The intent of this Clear Quartz wand is to act as a prism—taking your scattered thoughts and focusing them into a single, sharp point of clarity. It is the ultimate tool for decision-making and mental organization.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
          <p className="opacity-90">It’s crisp, cool, and sharp. It has a high-tech feel for a natural stone, fitting the intellectual and forward-thinking nature of Gemini, Libra, and Aquarius. It feels 'light,' as if it’s helping you float above your problems rather than being weighed down by them.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
          <p className="opacity-90">When your mind is racing, use the wand to 'draw' a circle around your tarot cards or journal. This acts as a mental barrier, keeping distractions out while you tap into your intuition. It’s like clearing the static on a radio so you can hear the message.</p>
        </div>
        <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
          <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
          <p className="opacity-90">The "Master Healer" for the overactive mind. Every Air sign needs a quartz anchor to turn chaos into communication.</p>
        </div>
      </div>
    )
  },
  {
    id: 'element-air-tea',
    category: 'Air Element',
    name: 'Neuro Energy Mints',
    desc: 'Bright herbs to clear the mental fog.',
    price: '$21.99',
    link: 'https://amzn.to/46HBprR',
    img: 'https://m.media-amazon.com/images/I/71kcJRYBEIL._AC_SL1500_.jpg',
    ritualAdvice: 'Pop a mint before a deep study session or a long tarot reading to sharpen your focus.',
    fullReview: (
      <div className="space-y-5 mt-2">
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
          <p className="opacity-90">Air signs (Gemini, Libra, Aquarius) live in their heads. The intent here is to provide a quick, sensory 'snap' that clears away mental fatigue and sharpens focus when you're feeling scattered by too many ideas.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
          <p className="opacity-90">Sharp, refreshing, and immediate. The peppermint and caffeine/L-theanine combo acts like a fresh breeze blowing through a dusty room, leaving your mind clear and your thoughts organized.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
          <p className="opacity-90">Whenever you feel 'brain fog' creeping in during your shadow work, take a mint. Use the sharp coldness to pull your energy back into the present moment. It’s a physical reset for your mental state.</p>
        </div>
        <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
          <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
          <p className="opacity-90">A modern tool for a modern Air sign. It’s the fastest way to get back into 'The Flow' when your mind starts to wander.</p>
        </div>
      </div>
    )
  },

  {
    id: 'element-water-crystal',
    category: 'Water Element',
    name: 'Rainbow Moonstone',
    desc: 'Enhances intuition and emotional flow.',
    price: '$19.99',
    link: 'https://amzn.to/4tyxbNh',
    img: 'https://m.media-amazon.com/images/I/61O98XE8tIL._AC_SL1500_.jpg',
    ritualAdvice: 'Place this under your pillow to enhance your dream work and emotional processing.',
    fullReview: (
      <div className="space-y-5 mt-2">
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
          <p className="opacity-90">Water signs navigate the deep currents of Whatumanawa (Heart). The intent of Moonstone is to provide a safe emotional container. It helps you flow with your feelings rather than being drowned by them, making it the perfect companion for deep shadow work.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
          <p className="opacity-90">There is a hidden blue glow (adularescence) inside this stone that only shows up when the light hits it right. It’s mysterious, feminine, and deeply soothing. It matches the soulful, intuitive depths of Cancer, Scorpio, and Pisces perfectly.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
          <p className="opacity-90">Use this during your Full Moon release ritual. Hold the stone over your heart and allow yourself to feel whatever emotions are surfacing. The moonstone acts as a gentle guide, helping you process and release those feelings into the 'Water' of your subconscious.</p>
        </div>
        <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
          <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
          <p className="opacity-90">The ultimate stone for the 'Feelers' of the zodiac. It protects your heart while opening your third eye, ensuring you stay soft but strong.</p>
        </div>
      </div>
    )
  },
  {
    id: 'element-water-tea',
    category: 'Water Element',
    name: 'Organic Chamomile Tea',
    desc: 'Soothing flowers for deep emotional rest.',
    price: '$19.99',
    link: 'https://amzn.to/3O3QwFL',
    img: 'https://m.media-amazon.com/images/I/71SFHFgKwVL._SL1500_.jpg',
    ritualAdvice: 'Drink this while sitting near a window at night to process the day’s emotions.',
    fullReview: (
      <div className="space-y-5 mt-2">
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
          <p className="opacity-90">Water signs (Cancer, Scorpio, Pisces) absorb the emotions of everyone around them. The intent of this ritual tea is to soothe the nervous system and help you 'drain' the emotional weight of the day so you can sleep deeply.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
          <p className="opacity-90">Gentle, floral, and deeply comforting. It feels like an emotional hug. The scent alone signals to the brain that the 'Work' is done and it’s safe to let go of the day's burdens.</p>
        </div>
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
          <p className="opacity-90">Brew this as your final act of the day. As the steam rises, visualize your emotional boundaries becoming strong and clear. With every sip, feel yourself returning to your own center, independent of others' energy.</p>
        </div>
        <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
          <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
          <p className="opacity-90">The ultimate 'Heart-Space' medicine. A necessary staple for anyone who feels 'too much' and needs a way to settle the tide.</p>
        </div>
      </div>
    )
  },

  {
    id: 'element-earth-crystal',
    category: 'Earth Element',
    name: 'Green Moss Agate',
    desc: 'For grounding and new beginnings.',
    price: '$26.99',
    link: 'https://amzn.to/4qvwpxM',
    img: 'https://m.media-amazon.com/images/I/81sQJ53nBxL._AC_SL1500_.jpg',
    ritualAdvice: 'Hold this stone while barefoot on the earth to discharge stress and recalibrate your internal compass.',
    fullReview: (
      <div className="space-y-5 mt-2">
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
          <p className="opacity-90">For Earth signs, stability isn't just a preference—it's a requirement. The intent of Moss Agate is to bridge the gap between your Tinana (Body) and the natural world. It’s known as the 'Gardener's Stone,' meant to encourage new growth while keeping your roots firmly planted in reality.</p>
        </div>
        
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
          <p className="opacity-90">Looking into a piece of Moss Agate is like looking at a forest floor through clear water. It has a deep, organic energy that doesn't feel 'flighty' like quartz. It's cool to the touch and carries a quiet, persistent strength that Earth signs naturally resonate with.</p>
        </div>
        
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
          <p className="opacity-90">I recommend Earth signs keep this on their desk. When your 'To-Do' list starts to feel overwhelming, hold the agate and take three deep breaths. Visualize your stress draining out of your feet and into the ground. It’s the perfect 'reset stone' for a busy Virgo or an ambitious Capricorn.</p>
        </div>
        
        <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
          <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
          <p className="opacity-90">If you’re feeling 'uprooted' or scattered, this is your anchor. It’s a subtle, beautiful reminder that all great things take time to grow.</p>
        </div>
      </div>
    )
  },
  {
    id: 'element-earth-tea',
    category: 'Earth Element',
    name: 'Dandelion Herbal Tea',
    desc: 'Deeply rooting herbs for stability.',
    price: '$18.99',
    link: 'https://amzn.to/3O1TAlP',
    img: 'https://m.media-amazon.com/images/I/81rPe-3SltL._SL1500_.jpg',
    ritualAdvice: 'Brew this during a "Sunday Reset" to nourish your physical body and ground your energy for the week ahead.',
    fullReview: (
      <div className="space-y-5 mt-2">
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
          <p className="opacity-90">Earth signs often carry the weight of their world in their physical bodies. The intent of this Dandelion tea is to support the body's natural detoxification. It is a 'root' tea, designed to help you shed what no longer serves you while fortifying your physical endurance.</p>
        </div>
        
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
          <p className="opacity-90">This isn't a delicate, flowery tea. It is bold, roasty, and earthy. It has a 'grounding' bitterness that feels honest and substantial. It’s the kind of tea that makes you feel like you've actually consumed something of substance, providing a sense of internal sturdiness.</p>
        </div>
        
        <div>
          <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
          <p className="opacity-90">I love this for a 'Sunday Reset.' Brew it in your Cast Iron Teapot and drink it while barefoot, if possible. As an Earth sign, physically touching the ground while consuming a root-based tea creates a powerful 'Closed Circuit' of grounding energy that resets your entire system.</p>
        </div>
        
        <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
          <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
          <p className="opacity-90">The ultimate 'Internal Earth' ritual. It’s simple, effective, and deeply aligned with the Taurus, Virgo, and Capricorn frequency.</p>
        </div>
      </div>
    )
  },
  // ==========================================
  // CATEGORY 2: ENERGY SHIELDING & CLEANSING
  // ==========================================
  {
    id: 'obsidian-kit',
    category: 'Energy Shielding',
    name: 'Raw Obsidian Shielding Kit',
    desc: 'Tourmaline & Obsidian for ultimate energy protection.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Anima-Premium-Protection-Crystals-Shielding/dp/B0F6CTMCBB?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/814z9E8cMUL._AC_SL1500_.jpg',
    ritualAdvice: 'Keep this near your entryway to absorb heavy static and protect your Hinengaro (Mind) from draining external forces.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Obsidian is the ultimate 'psychic vacuum cleaner.' The intent here is to provide a heavy-duty anchor for your home. These stones don't just sit there; they actively work to absorb the 'energetic smog' that we bring home from work, social media, or high-traffic public spaces.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">This isn't your typical polished, 'pretty' crystal set. These are raw, jagged, and jet-black. They look like pieces of volcanic glass because that’s exactly what they are. Having them in your space feels like having a literal shield—they carry a weight and presence that says 'no entry' to negative frequencies.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I place these at the four corners of my main living area or right by the front door. Every New Moon, I cleanse them under running water to 'reset' their capacity. If I’ve had a particularly draining day, I’ll hold one in each hand for five minutes to let the obsidian pull the excess 'static' out of my Hinengaro (Mind).</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">If you feel constantly drained by other people's 'stuff,' you need a physical boundary. This kit is the most effective way to claim your space as a sanctuary. It’s the heavy hitter of shielding.</p>
    </div>
  </div>
)
  },
  {
    id: 'smokeless-smudge',
    category: 'Energy Cleansing',
    name: 'Smokeless Palo Santo Spray',
    desc: 'Clear stagnant energy without the smoke.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Essential-Aromatherapy-fresheners-Meditation-Accessories/dp/B0D5LZM1MR?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/51Ixm0ESfPL._AC_SL1080_.jpg', 
    ritualAdvice: 'Mist this around your aura right before hitting the "Seal This Entry" button to clear any lingering negativity.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Sometimes you need to clear a room's energy, but you can't (or don't want to) deal with smoke. The intent here is to provide an 'instant reset' button for your atmosphere. It allows for the high-vibration clearing of Palo Santo without the fire hazard or the lingering scent of smoke in your fabrics.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">This spray is crisp, woody, and incredibly refreshing. It feels like a breath of fresh air in a room that’s felt 'heavy' or stagnant. Because it’s an essential oil blend, it carries the actual frequency of the plant in a way that feels modern, clean, and respectful.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I keep this on my desk. Whenever I finish a long block of work or a difficult phone call, I mist the air around my aura. I also use it to 'seal' my space right after I finish my daily tarot entry in the app. It marks a clear energetic end to one task and a fresh start for the next.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">Perfect for apartments, offices, or travel. It’s the most portable way to maintain your energetic hygiene. If you’re sensitive to smoke but love a clear space, this is your new best friend.</p>
    </div>
  </div>
)
  },
  {
    id: 'crystal-amulet',
    category: 'Energy Shielding',
    name: '7 Chakra Crystal Amulet',
    desc: 'Wearable daily energy shielding.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Jovivi-Gemstone-Wrapped-Natural-Necklace/dp/B078185CLY?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/61A5x1gQ02L._AC_SY535_.jpg', 
    ritualAdvice: 'Wear this on high-stress days to keep your personal mana contained and protected from energetic vampires.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Shielding shouldn't stop when you leave your altar. The intent here is to provide a 'wearable anchor' that keeps your chakras aligned and protected while you move through the world. It acts as a filter, ensuring your own energy stays contained while preventing external chaos from throwing you off-center.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">This amulet has a beautiful, raw-meets-refined look. The wire-wrapping gives it a handcrafted, 'talisman' feel, while the variety of stones adds a pop of color to a dark outfit. It’s a piece that invites curiosity but feels like a secret weapon hidden in plain sight.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I wear this on days when I know I have to be in 'the thick of it'—social events, errands, or meetings. Before I put it on, I hold it for a second and set a simple intention: 'My energy is mine, and I am protected.' Throughout the day, if I feel stressed, I just touch the stones to ground myself back into my body.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">Think of this as your personal 'mana shield.' It’s the easiest way to stay mindful of your energy levels without having to stop what you're doing. A beautiful, functional piece for the on-the-go mystic.</p>
    </div>
  </div>
)
  },
  {
    id: 'witch-bells',
    category: 'Energy Cleansing',
    name: 'Altar Cleansing Bells',
    desc: 'Handmade bells for home protection.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Protection-Handmade-Doorknob-Witchcraft-Decorations/dp/B09H78SC8Y?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71kzpPVH0SL._AC_SL1500_.jpg', 
    ritualAdvice: 'Hang these on your door to sonically cleanse the energy entering your sacred space.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Sound is one of the fastest ways to break up stagnant energy. While smoke takes time to drift, a bell's frequency cuts through a room instantly. The intent here is to provide a 'sonic shield' for your entryway, using high-vibration metal to shatter any heavy energy before it can cross the threshold into your sanctuary.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">These bells have a rustic, ancient feel—braided twine, raw metal, and protective charms. They don't just sound beautiful; they look like a traditional talisman. When the wind catches them or the door opens, the chime is sharp and clear, instantly shifting the 'mood' of the room from heavy to alert.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I hang these on the inside of my front door handle. It’s a passive ritual: every time I come home, the bells ring, 'shaking off' the stress of the outside world. On New Moons, I take them off the door and walk through every room of the house, ringing them in the corners to ensure no stagnant energy is hiding in the shadows.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">If your home feels 'muffled' or heavy, you need a sonic reset. These bells are a beautiful, low-maintenance way to keep your home’s frequency high and your Wairua (Spirit) protected.</p>
    </div>
  </div>
)
  },
  {
    id: 'sage-1',
    category: 'Energy Cleansing',
    name: 'White Sage Bundle',
    desc: '6 Pack White Sage ~ Clear negative energy instantly.',
    price: '$11.97',
    link: 'https://amzn.to/4t5yOl8', 
    img: 'https://m.media-amazon.com/images/I/81qkJ2mMSbL._AC_SX679_.jpg',
    ritualAdvice: 'Light this during the Waning Moon to banish blockages in your Wairua (Spirit).',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">This is the 'heavy duty' cleanser. The intent with a traditional sage bundle is a deep, thorough purification. It is meant for moments of major transition—moving into a new home, after an illness, or when you feel a significant block in your manifestation work that lighter tools just can't touch.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">There is nothing quite like the scent of burning white sage. It is thick, earthy, and unmistakable. Using a physical bundle connects you to centuries of tradition. It’s a sensory-heavy experience that demands your full attention; you can't rush a sage clearing, and that’s exactly the point.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I save these for the Waning Moon—the time of letting go. I light the bundle, wait for the thick smoke to billow, and then use a feather (or my hand) to waft the smoke over my body and my tools. As the smoke rises, I visualize it carrying away any self-doubt or lingering 'gunk' in my aura. It’s a total energetic scrub.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">A staple for a reason. While spray and bells are great for daily maintenance, a sage bundle is your go-to for serious clearing. Every practitioner should have at least one in their apothecary for those moments that require a clean slate.</p>
    </div>
  </div>
)
  },

  // ==========================================
  // CATEGORY 3: THE SACRED ALTAR
  // ==========================================
  {
  id: 'lunar-salt-lamp',
  category: 'Sacred Altar',
  name: 'Lunar Aura Salt Lamp',
  desc: 'Natural white salt for a soft, moonlight glow.',
  price: 'View Collection',
  link: 'https://www.amazon.com/Himalayan-Glow-1041-Natural-Listed/dp/B07CH2KDSG?tag=moonlightmana-20',
  img: 'https://m.media-amazon.com/images/I/61fnifPLOFL._AC_SL1500_.jpg', 
  ritualAdvice: 'Turn this on before your evening tarot pull to bathe your altar in calming, ethereal moonlight.',
  fullReview: (
    <div className="space-y-5 mt-2">
      <div>
        <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
        <p className="opacity-90">While orange salt lamps are common, they can sometimes feel too 'warm' for a lunar-focused practice. The intent here was to find a natural purifier that emits a cool, white glow—mirroring the light of the full moon to help the mind settle into a high-frequency, meditative state.</p>
      </div>
      
      <div>
        <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
        <p className="opacity-90">This is raw, hand-carved white Himalayan salt. When lit, it doesn't glow orange; it radiates a soft, ethereal white light that looks like captured moonlight. It’s the perfect aesthetic bridge between the 'dark mode' of our app and the physical light in your room.</p>
      </div>
      
      <div>
        <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
        <p className="opacity-90">I use this as my primary light source during 'The Work.' It clears the air of positive ions (the 'electronic smog' from our phones) while providing just enough light to see your cards or journal without breaking the moody atmosphere of your sacred space.</p>
      </div>
      
      <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
        <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
        <p className="opacity-90">If you want the air-purifying benefits of a salt lamp but want to keep your altar aesthetic strictly 'Lunar' and sophisticated, this is the piece. It’s the ultimate vibe-setter for the Moonlight Mana practitioner.</p>
      </div>
    </div>
  )
},
  {
    id: 'candle-warmer',
    category: 'Sacred Altar',
    name: 'Lotus Wax Warmer Lamp',
    desc: 'Melt ritual candles slowly and safely.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Dimmable-Electric-Birthday-Christmas-Aromatic/dp/B0C27FG8L9?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71l9egP7MWL._AC_SL1500_.jpg',
    ritualAdvice: 'The amber light doubles as a calming visual anchor during your guided journaling sessions.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">We've all been there: you want the scent of your favorite ritual candle, but you're heading to bed or leaving the house and don't want to leave an open flame. The intent here is to enjoy the aromatic benefits of your candles safely and efficiently, while preserving the wax for 3x longer than a standard burn.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">This Lotus lamp is a piece of 'functional art.' The top-down warming bulb creates a soft, amber glow that is much more relaxing than a standard overhead light. It looks incredible on a nightstand, casting long, moody shadows that fit the Moonlight Mana vibe perfectly.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I use this during my 'Sunday Reset'—it fills the room with scent instantly while providing the perfect low-light environment for meditation or reading. It’s ideal for when you want the 'vibe' of a candle without the active management of a wick and flame.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">Safe, stunning, and cost-effective. It's the most sophisticated way to enjoy your sacred scents without the anxiety of a burning flame. A must-have for the cautious practitioner.</p>
    </div>
  </div>
)
  },
  {
    id: 'brass-holders',
    category: 'Sacred Altar',
    name: 'Vintage Brass Candle Holders',
    desc: 'Set of 6 taper holders for spellwork.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Nuptio-Candlestick-Decorative-Centerpiece-Housewarming/dp/B08MLGXSPH?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/61yjFs5uUfL._AC_SX679_.jpg',
    ritualAdvice: 'Use these to hold your intention candles during New Moon rituals.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Candle magic is one of the oldest forms of manifestation, but it requires stability. The intent here was to find a set of holders that offer varying heights, creating a 'visual altar' that draws the eye upward and makes your workspace feel layered and professional rather than cluttered.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">There is something timeless about matte brass. These holders have a vintage, 'found' aesthetic—as if they were pulled from an old library or a hidden temple. They catch the flickering light of a flame beautifully, adding a warm, golden glow to your space that complements the Moonlight Mana dark-mode UI perfectly.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I use these to create a 'triad of intention.' I'll place three different colored taper candles in these holders—one for protection, one for clarity, and one for manifestation. Placing them at different heights helps me focus on the hierarchy of my goals. They are sturdy enough to handle long-burn rituals without the worry of tipping.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">A true altar staple. These aren't just for 'special occasions'; they transform a Tuesday night tarot pull into a sacred event. If you’re building your first altar, start with these—they are the skeleton of a beautiful sacred space.</p>
    </div>
  </div>
)
  },
  {
    id: 'match-cloche',
    category: 'Sacred Altar',
    name: 'Aesthetic Match Cloche',
    desc: 'Glass display dome for ritual matches.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Cinnvoice-Matches-Decorative-Fireplace-Display/dp/B0DNFPWZYC?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71w7u+WIjlL._AC_SL1500_.jpg',
    ritualAdvice: 'Elevate the simple act of lighting your altar candle into a mindful, deliberate action.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Every ritual begins with friction. But usually, that friction involves fumbling with a crushed cardboard box or a neon plastic lighter. The intent here is to elevate the very first step of your practice, turning the act of lighting a flame into a deliberate, beautiful moment of transition.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">This hand-blown glass cloche is the definition of 'moody luxury.' It houses your matches in a clear, protected dome that feels substantial in your hand. The strike-on-glass strip is discreet but effective, turning a utility item into a piece of sculpture for your altar.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I keep mine right next to my incense waterfall. There is something deeply satisfying about the sound of the glass lifting and the strike of the match. It forces you to slow down and acknowledge that your sacred time has officially begun. It's about respecting the fire you're about to call in.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">It’s a small detail, but it’s the detail that bridges the gap between 'lighting a candle' and 'performing a ritual.' If you value the atmosphere of your space, this cloche is a non-negotiable upgrade.</p>
    </div>
  </div>
)
  },
  {
    id: 'incense-waterfall',
    category: 'Sacred Altar',
    name: 'Moon Backflow Incense',
    desc: 'Mesmerizing smoke waterfall for meditation.',
    price: 'View Collection',
    link: 'https://www.amazon.com/XINGZUAN-Backflow-Incense-Waterfall-Fountain/dp/B0CYPNN5J4?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71f8OfVVjmL._AC_SL1500_.jpg',
    ritualAdvice: 'Watch the smoke flow downward to visually practice grounding your erratic thoughts.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Standard incense smoke rises and disappears, but backflow incense 'pours.' The intent here is to provide a visual anchor for grounding. By watching the smoke flow downward like water, you can visually train your mind to pull its erratic, 'airy' thoughts back down into the earth.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">The moon-shaped ceramic design is a direct nod to our app's aesthetic. It’s dark, sleek, and mesmerizing. When the smoke starts to pool in the lunar basins, it creates a misty, dream-like effect that feels like you've brought a piece of the night sky onto your desk.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I use this during high-stress moments. I light a cone, hit the 'Tarot' button in the app, and just watch the smoke flow for 60 seconds before I look at my cards. It’s the perfect 'breath-work' companion—if the smoke is flowing smoothly, you know your environment is settled.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">This is 50% ritual tool, 50% kinetic sculpture. If you struggle with traditional meditation, having this 'smoke waterfall' to focus on makes staying present significantly easier.</p>
    </div>
  </div>
)
  },

  // ==========================================
  // CATEGORY 4: SHADOW WORK & RESET
  // ==========================================
  {
    id: 'leather-journal',
    category: 'Shadow Work',
    name: 'Vintage Leather Grimoire',
    desc: 'Blank pages for deep shadow work.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Journals-Notebooks-Refillable-Notebook-Sketchbook/dp/B088R5S5TG?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71+7PU8VyEL._AC_SL1500_.jpg', 
    ritualAdvice: 'Use this physical journal to free-flow your raw thoughts before logging your finalized reflections into the app.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">There is a massive disconnect that happens when you light your expensive candles, cleanse your space, pull a profound tarot card... and then write it all down in a neon spiral notebook or on the back of a grocery receipt. The environment matters. The vessel holding your shadow work needs to carry the same weight as the work itself.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">This isn't just a notebook; it feels like an artifact. The leather is heavy and raw, grounding your space the second you set it on your altar. Inside, the pages feature a thick, vintage deckle-edge (that rough, torn-paper look). It completely absorbs ink without bleeding through, meaning your heavy-handed midnight journaling stays exactly where you put it.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">Because of the tactile nature of this grimoire, opening it becomes a ritual in itself. I use this exclusively for deep shadow work and lunar phase tracking. The thick pages feel safe enough to hold the heavy, unpolished thoughts that come out during a new moon release. It practically begs you to slow down and write with intention.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">If you are serious about your daily practice, upgrade your vessel. This journal transitions your notes from a fleeting thought into a permanent digital grimoire. It is, without a doubt, a mandatory anchor for the Moonlight Mana altar.</p>
    </div>
  </div>
)
  },
  {
    id: 'cast-iron-teapot',
    category: 'Sunday Reset',
    name: 'Cast Iron Tetsubin Teapot',
    desc: 'Heavy iron pot for herbal grounding blends.',
    price: 'View Collection',
    link: 'https://www.amazon.com/Workshop-Japanese-Tetsubin-Stainless-Infuser/dp/B01N5JTAAD?tag=moonlightmana-20',
    img: 'https://m.media-amazon.com/images/I/71oSXJ-IhFL._AC_SL1500_.jpg', 
    ritualAdvice: 'Brew a loose-leaf blend in this heavy pot to ground your Tinana (Body) after a high-energy day.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">When we talk about 'grounding,' we usually mean reconnecting with the earth. A plastic electric kettle is fast, but it’s loud and industrial. The intent here is to slow down the process of nourishment, using heavy iron and heat to anchor your energy into your Tinana (Body) before you begin your day.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">This Tetsubin teapot is heavy—literally. The weight of the cast iron feels substantial and permanent. It retains heat far longer than ceramic, and the dark, textured finish looks stunning sitting on a wooden tray during a 'Sunday Reset.' It’s a piece of hardware that feels like it will last a lifetime.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I use this specifically for herbal grounding blends. The ritual of measuring out loose leaves, pouring the water, and feeling the heat slowly radiate through the iron is a meditation in itself. It turns a quick caffeine fix into a deliberate moment of presence and gratitude for the physical body.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">If your morning feels rushed and chaotic, this is the tool to slow it down. It is the ultimate anchor for any kitchen-witch or anyone needing to pull their energy back into their physical form.</p>
    </div>
  </div>
)
  },
  {
    id: 'deck-modern',
    category: 'Shadow Work',
    name: 'Modern Witch Tarot',
    desc: 'A stylish, contemporary take on tarot.',
    price: '$18.45', 
    link: 'https://amzn.to/4as2qBQ',
    img: 'https://m.media-amazon.com/images/I/81bvT2YcWiL._SY342_.jpg',
    ritualAdvice: 'A highly intuitive deck perfect for translating your daily pulls into actionable modern advice.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">While tradition is important, the imagery of ancient decks can sometimes feel disconnected from our actual lives. The intent here was to find a deck that speaks our language—vibrant, inclusive, and modern—making it significantly easier to translate your daily pulls into actionable advice without needing a thick guidebook by your side.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">The card stock is thick and 'snappy,' which makes shuffling feel like a luxury. The illustrations by Lisa Sterle are fashion-forward and incredibly expressive; you can feel the energy of the cards just by looking at the characters' faces. It’s a deck that feels like your coolest, most intuitive friend is giving you a straight-talk reading.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I use this deck for my deep morning sessions. I shuffle the physical cards while looking at the digital Moon Phase in the app, then I pull three cards. I use the 'Ritual Advice' in Moonlight Mana to set the tone, but I look at these physical cards to see the details of the shadow work I need to do that day. The synergy between the two is where the magic really happens.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">This is the 'Essential Modern Classic.' If you find the Rider-Waite-Smith deck a bit dusty and hard to read, this deck will open up your intuition in a way you didn't think possible. It is the perfect physical pairing for the Moonlight Mana journey.</p>
    </div>
  </div>
)
  },
  {
    id: 'journal-moon',
    category: 'Shadow Work',
    name: 'Moonology Diary 2026',
    desc: 'Align your life with the lunar cycles.',
    price: '$16.10',
    link: 'https://amzn.to/4tfyMao',
    img: 'https://m.media-amazon.com/images/I/71djIm0c9DL._SL1500_.jpg',
    ritualAdvice: 'Pair this with our digital lunar tracker to master your manifestation timing.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Living in sync with the moon isn't just about knowing the phase; it’s about planning your life around the energy shifts. The intent with this diary is to take the digital data from your Moonlight Mana app and ground it into a physical roadmap, ensuring you never miss a New Moon manifestation window or a Full Moon release.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">Designed by Yasmin Boland, this diary is packed with astrological insights but remains incredibly easy to navigate. It doesn't feel like a textbook; it feels like a cosmic planner. The layout is clean, giving you enough space to write your 'Alchemist's Reflections' while providing the exact planetary shifts happening that week.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">Every Sunday during my 'Sunday Reset,' I check the upcoming moon phases in the app and then open this diary to map out my week. If there is a void-of-course moon coming up, I mark it in here so I know when to rest. It’s how I move from being a victim of my schedule to being a co-creator with the cosmos.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">If you struggle with consistency in your practice, this is the anchor you need. Using it alongside the app creates a double-layered accountability system that keeps you aligned with your Wairua (Spirit) all year long.</p>
    </div>
  </div>
)
  },
  {
    id: 'free-audible-trial',
    category: 'Sunday Reset',
    name: 'Free Audiobook (Audible)',
    desc: 'Listen to any spiritual book for free.',
    price: 'FREE',
    link: 'https://amzn.to/4a5lJ2E', 
    img: 'https://m.media-amazon.com/images/I/516kmKfROhL._SX342_.jpg',
    ritualAdvice: 'If your eyes are tired from screens, rest your body and absorb spiritual wisdom through audio instead.',
    fullReview: (
  <div className="space-y-5 mt-2">
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Intent</h4>
      <p className="opacity-90">Spiritual growth shouldn't always require more screen time or a heavy book in your lap. The intent here is to leverage 'passive learning'—allowing you to absorb complex esoteric concepts or calming guided meditations while your hands are busy with a ritual bath, cleaning your space, or simply resting your eyes after a long day of 'The Work.'</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Vibe</h4>
      <p className="opacity-90">This is the ultimate 'low-effort, high-reward' tool. The vibe is sheer accessibility. There is something deeply primal and soothing about being told a story or taught a lesson through the human voice; it taps into an oral tradition that goes back centuries. Plus, being a free trial, it’s a zero-risk way to expand your library.</p>
    </div>
    
    <div>
      <h4 className="font-serif text-amber-200 text-base mb-1">The Ritual</h4>
      <p className="opacity-90">I use this during my 'Sunday Reset' while I’m brewing tea in the cast iron pot. Instead of scrolling, I’ll put on a book like 'The Untethered Soul' or a deep-dive into Astrology. It transforms mundane chores into a sacred classroom. Pro-tip: download a title on Shadow Work to listen to while you journal in your Leather Grimoire to spark deeper reflections.</p>
    </div>
    
    <div className="bg-amber-900/10 border-l-2 border-amber-500/30 p-3 rounded-r">
      <h4 className="font-serif text-amber-200 text-base mb-1">Final Notes</h4>
      <p className="opacity-90">A completely free way to grab a $30+ spiritual text and keep it forever. If your Hinengaro (Mind) is feeling over-stimulated by visuals, switch to audio. It’s the smartest 'hack' for the modern mystic’s busy schedule.</p>
    </div>
  </div>
)
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
// --- PWA SERVICE WORKER REGISTRATION ---
// This allows the "Add to Home Screen" / Install option to appear on mobile.
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Moonlight Mana: Service Worker Active', reg.scope))
      .catch(err => console.log('Moonlight Mana: Service Worker Setup Error', err));
  });
}