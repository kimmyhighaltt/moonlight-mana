// src/utils/tarotLogic.js

export const MAJOR_ARCANA = {
  "The Fool": "New beginnings call to you. A leap of faith is required now—trust that the universe will catch you.",
  "The Magician": "You have all the tools you need. Manifestation is not about asking, but realizing your own power.",
  "The High Priestess": "Look inward. The answers you seek are not in the world, but in the silence of your intuition.",
  "The Empress": "Abundance is flowing. Connect with nature and your own creativity to unlock this energy.",
  "The Emperor": "Structure and discipline are your allies today. Stand firm in your authority.",
  "The Hierophant": "Tradition holds wisdom. Seek a mentor or spiritual system to guide your next steps.",
  "The Lovers": "A choice must be made. Align your decisions with your true values, not just your desires.",
  "The Chariot": "Victory comes through willpower. Do not let the opposing forces tear you apart; hold the reins tight.",
  "Strength": "True strength is gentle. You do not need to force the outcome, simply endure with compassion.",
  "The Hermit": "Withdraw to find your light. Solitude is not loneliness; it is a sanctuary for truth.",
  "Wheel of Fortune": "The cycles turn. What is down will go up. Surrender to the rhythm of change.",
  "Justice": "Truth will out. Act with integrity, for every action now carries a heavy weight of consequence.",
  "The Hanged Man": "Pause and surrender. You must see the world from a new angle to untie this knot.",
  "Death": "Transformation is inevitable. Let go of the old skin so the new self can breathe.",
  "Temperance": "Balance is key. Blend the opposites in your life to find the golden middle path.",
  "The Devil": "Break your chains. You are only trapped by the illusions you have agreed to believe.",
  "The Tower": "Let it fall. The foundation was shaky; the destruction is clearing space for truth.",
  "The Star": "Hope returns. You are being guided by a distant but steady light. Have faith.",
  "The Moon": "Illusions abound. Trust your instincts, not your eyes. Things are not what they seem.",
  "The Sun": "Joy and clarity! The shadows disperse. Bask in the warmth of your success and vitality.",
  "Judgement": "A call to awakening. Rise up and claim your higher purpose; the past is forgiven.",
  "The World": "Completion. A cycle ends, and you stand whole. Prepare for a new level of existence."
};

export const getMinorArcanaMeaning = (cardName) => {
  const suits = {
    'Wands': 'passion, creativity, and action',
    'Cups': 'emotions, relationships, and intuition',
    'Swords': 'intellect, truth, and decisive thought',
    'Pentacles': 'career, wealth, and physical health'
  };

  const ranks = {
    'Ace': 'a powerful new beginning',
    'Two': 'partnership and balance',
    'Three': 'collaboration and growth',
    'Four': 'stability and foundations',
    'Five': 'change and challenge',
    'Six': 'harmony and restoration',
    'Seven': 'reflection and assessment',
    'Eight': 'movement and progress',
    'Nine': 'fulfillment and nearing completion',
    'Ten': 'absolute completion and endings',
    'Page': 'a message of youthful curiosity',
    'Knight': 'fast-paced action and pursuit',
    'Queen': 'mastery and nurturing energy',
    'King': 'authority and control'
  };

  let foundSuit = Object.keys(suits).find(s => cardName.includes(s));
  let foundRank = Object.keys(ranks).find(r => cardName.includes(r));

  if (foundSuit && foundRank) {
    return `This card brings ${ranks[foundRank]} in the realm of ${suits[foundSuit]}.`;
  }
  return "A unique energy surrounds you. Trust your intuition to decode it.";
};