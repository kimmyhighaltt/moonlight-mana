// src/utils/tarotLogic.js

export const MAJOR_ARCANA = {
  "The Fool": "The soul stands at the threshold of incarnation. Trust the spiritual void and step forward without the weight of past karma.",
  "The Magician": "Your Will is the conduit between the cosmos and the earth. Manifestation is the act of anchoring astral truth into physical form.",
  "The High Priestess": "The veil is thin. The wisdom you seek resides entirely within the silent, receptive pole of your inner temple.",
  "The Empress": "The ultimate frequency of earthly incarnation. Connect deeply with the natural rhythms of life to nurture your creative force.",
  "The Emperor": "The energetic architecture of order. Erect strong boundaries so that your spiritual light has a physical container to inhabit.",
  "The Hierophant": "Seek the esoteric thread hidden within tradition. True spiritual authority requires an initiation through discipline.",
  "The Lovers": "The soul faces the tension of duality. True union is not just connection, but the conscious alignment of the lower will with the higher self.",
  "The Chariot": "The ego is being tested. Mastery is found not in suppressing opposing forces, but in steering them toward your true north.",
  "Strength": "The taming of the astral body. You must conquer your lower animal impulses not with force, but with the radiant grace of the heart.",
  "The Hermit": "The inward retreat into the Sentient Soul. Withdraw the senses from the physical world so the inner light can illuminate your path.",
  "Wheel of Fortune": "The inescapable rhythm of cosmic law. Do not fight the turning cycle; find your absolute center where the axis is still.",
  "Justice": "Karmic equilibrium. Every thought and action is being weighed on the scales of your spiritual evolution. Proceed with radical honesty.",
  "The Hanged Man": "A sacred pause for ego-reversal. The physical world must be turned upside down so the spiritual world can be clearly seen.",
  "Death": "The necessary excarnation of an old form. Willingly compost the past so your soul can take on its next, higher shape.",
  "Temperance": "The alchemical blending of the astral and etheric bodies. You are synthesizing opposing extremes into a harmonious Middle Path.",
  "The Devil": "The confrontation with Ahrimanic density. Recognize where the material world and rigid thinking have bound your spiritual freedom.",
  "The Tower": "A divine dismantling. The false ego-structures must be shattered by cosmic lightning to make room for pure, unmediated truth.",
  "The Star": "The etheric waters are renewed. You are directly tapped into the cosmic stream, offering profound hope and celestial healing.",
  "The Moon": "The descent into the subconscious shadow. Navigate this hallucinatory astral landscape using only the compass of your deepest intuition.",
  "The Sun": "The pure, radiating force of the Ego. All shadows are burned away by the conscious realization of your own divine sovereignty.",
  "Judgement": "The call of the higher self. You are awakening to a new biographical epoch. Absolve the past and rise to your new frequency.",
  "The World": "The complete incarnation of the soul's current mission. A cycle closes in total synthesis. Prepare the vessel for a new octave of existence."
};

export const getMinorArcanaMeaning = (cardName) => {
  // Steiner mapped the elements to the four bodies/temperaments
  const suits = {
    'Wands': 'Active Will and spiritual fire', // Choleric / Ego
    'Cups': 'astral fluidity and the rhythmic heart', // Phlegmatic / Astral
    'Swords': 'intellectual clarity and the nerve-sense system', // Sanguine / Mental
    'Pentacles': 'physical incarnation and earthly foundations' // Melancholic / Etheric
  };

  // Re-framing ranks as phases of spiritual and karmic development
  const ranks = {
    'Ace': 'a pure, unmanifested seed of',
    'Two': 'a polarizing tension within',
    'Three': 'the dynamic expansion of',
    'Four': 'a rigid, earthly crystallization of',
    'Five': 'a necessary friction and breaking point for',
    'Six': 'a harmonious restoration of',
    'Seven': 'an inward, esoteric evaluation of',
    'Eight': 'a rapid, rhythmic acceleration in',
    'Nine': 'the solitary maturation of',
    'Ten': 'the ultimate karmic saturation of',
    'Page': 'a youthful, curious initiation into',
    'Knight': 'a swift, concentrated projection of',
    'Queen': 'an internalized, resonant mastery over',
    'King': 'a commanding, outward sovereignty over'
  };

  let foundSuit = Object.keys(suits).find(s => cardName.includes(s));
  let foundRank = Object.keys(ranks).find(r => cardName.includes(r));

  if (foundSuit && foundRank) {
    return `This frequency signals ${ranks[foundRank]} ${suits[foundSuit]}.`;
  }
  
  return "A unique cosmic signature surrounds you. Trust your internal rhythm to decode it.";
};