import React, { useState, useEffect } from 'react';

// 1. Data & Utils
import { THEME, PILLAR_INFO, TAROT_DECK, INITIAL_MOCK_ENTRIES } from './constants/index';
import { getMoonPhase } from './utils/lunarLogic';

// 2. Shared UI Components
import { Logo, GraphGrid, StatusHeader, BottomNav } from './components/UIComponents';

// 3. Views
import Splash from './views/Splash';
import Dashboard from './views/Dashboard';
import Reflection from './views/Reflection';
import Tracker from './views/Tracker';
import Vault from './views/Vault';
import Planner from './views/Planner';

/**
 * AI LOGIC: The Smart Interpreter
 * Automatically generates advice based on the user's lowest energy pillar.
 */
const getSmartReading = (card, pillars, userReflection) => {
  // 1. Find the lowest pillar (The "Problem Area")
  const lowestPillar = Object.entries(pillars).reduce((a, b) => a[1] < b[1] ? a : b);
  const [problemArea, score] = lowestPillar;

  // 2. If they wrote a custom reflection, use that.
  if (userReflection && userReflection.trim() !== "") return userReflection;

  // 3. Otherwise, generate "AI" advice based on the combo
  return `Your ${problemArea} energy is low (${score}%). The ${card.name} suggests you focus on ${card.message.toLowerCase()} to restore balance here.`;
};

/**
 * MOONLIGHT MANA - CONTROLLER
 */
const App = () => {
  // --- Global Settings ---
  const [view, setView] = useState('splash'); 
  const [hemisphere, setHemisphere] = useState('Southern'); 
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  // --- Persistence ---
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('moonlight_vault');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ENTRIES;
    } catch (e) {
      console.error("Failed to load journal:", e);
      return INITIAL_MOCK_ENTRIES;
    }
  });

  
  // --- Session State ---
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState(TAROT_DECK[0]);
  const [rituals, setRituals] = useState(['Deck Cleansed', 'Grounded', 'Mindful Breathing']);
  const [newRitualInput, setNewRitualInput] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [reflection, setReflection] = useState({ firstImpressions: '', theMessage: '', actionStep: '' });
  const [pillars, setPillars] = useState({ mind: 60, body: 60, heart: 60, soul: 60 });
  const [activeTags, setActiveTags] = useState({ 'Aotearoa (Nature)': 'charge' });
  const [isLogging, setIsLogging] = useState(false);

  // NEW: State for the custom time selection
  const [selectedHour, setSelectedHour] = useState(null);
  
  // --- View State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHighMana, setFilterHighMana] = useState(false);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);

  // --- Computed Data ---
  const moonData = getMoonPhase(currentTime);

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('moonlight_vault', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // ------------------------------------------------------------------
  // 🔗 URL & ROUTER FIX (Fixes Analytics & Back Button)
  // ------------------------------------------------------------------
  useEffect(() => {
    // 1. When the view changes, update the URL hash (e.g. /#reflection)
    if (view !== 'splash') {
      window.location.hash = view;
    }
  }, [view]);

  useEffect(() => {
    // 2. Handle the Browser "Back" Button
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== view) {
        setView(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [view]);

  // --- Timer & Online Status ---
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const init = setTimeout(() => setView('dashboard'), 3000);
    
    const handleConn = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleConn);
    window.addEventListener('offline', handleConn);
    
    return () => {
      clearInterval(timer);
      clearTimeout(init);
      window.removeEventListener('online', handleConn);
      window.removeEventListener('offline', handleConn);
    };
  }, []);

  // --- Handlers ---

  const toggleHemisphere = () => setHemisphere(prev => prev === 'Southern' ? 'Northern' : 'Southern');

  const toggleCheck = (id) => {
    if (window.navigator?.vibrate) window.navigator.vibrate(50); 
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardPull = () => {
    if (!isFlipped) {
      const randomIndex = Math.floor(Math.random() * TAROT_DECK.length);
      setSelectedCard(TAROT_DECK[randomIndex]);
      setIsFlipped(true);
      if (window.navigator?.vibrate) window.navigator.vibrate([100, 50, 100]); 
    } else {
      setIsFlipped(false);
    }
  };

  const addRitual = (e) => {
    if (e) e.preventDefault();
    if (!newRitualInput.trim()) return;
    setRituals([...rituals, newRitualInput.trim()]);
    setNewRitualInput('');
    if (window.navigator?.vibrate) window.navigator.vibrate([30, 50, 30]); 
  };

  const handleLogMana = () => {
    setIsLogging(true);
    setTimeout(() => {
      const averageMana = Math.round((pillars.mind + pillars.body + pillars.heart + pillars.soul) / 4);
      
      // LOGIC: Use selectedHour if it exists, otherwise use currentTime
      let entryDateObj = new Date(currentTime);
      if (selectedHour !== null) {
        entryDateObj.setHours(selectedHour);
        entryDateObj.setMinutes(0);
      }

      // Generate Smart Message using the AI logic
      const smartMessage = getSmartReading(selectedCard, pillars, reflection.theMessage);

      const newEntry = {
        id: Date.now(),
        date: entryDateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase(),
        time: entryDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), 
        moon: moonData.label,
        card: selectedCard.name,
        img: selectedCard.img,
        mana: averageMana,
        message: smartMessage, 
        pillars: { ...pillars },
        trend: averageMana > 65 ? 'up' : 'down',
        tags: { ...activeTags }
      };
      setJournalEntries([newEntry, ...journalEntries]);
      setIsLogging(false);
      setSelectedHour(null); 
      setView('vault');
      if (window.navigator?.vibrate) window.navigator.vibrate([100, 30, 100, 30, 200]); 
    }, 1800);
  };

  // 👇 NEW: Handle Delete Function
  const handleDeleteEntry = (idToDelete) => {
    setJournalEntries(prevEntries => prevEntries.filter(entry => entry.id !== idToDelete));
  };

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.card.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHighMana = filterHighMana ? entry.mana >= 85 : true;
    return matchesSearch && matchesHighMana;
  });
  

  // --- Render Views ---

  if (view === 'splash') return <Splash />;
  

  if (view === 'dashboard') {
    return (
      <Dashboard 
        hemisphere={hemisphere} 
        toggleHemisphere={toggleHemisphere} 
        setView={setView} 
        isOnline={isOnline}
        moonData={moonData}
      />
    );
  }

  if (view === 'reflection') {
    return (
      <Reflection 
        currentTime={currentTime}
        hemisphere={hemisphere}
        isFlipped={isFlipped}
        selectedCard={selectedCard}
        handleCardPull={handleCardPull}
        rituals={rituals}
        checkedItems={checkedItems}
        toggleCheck={toggleCheck}
        pillars={pillars}
        setPillars={setPillars}
        newRitualInput={newRitualInput}
        setNewRitualInput={setNewRitualInput}
        addRitual={addRitual}
        reflection={reflection}
        setReflection={setReflection}
        setView={setView}
        isOnline={isOnline}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        onBack={() => setView('dashboard')} 
      />
    );
  }

  if (view === 'tracker') {
    return (
      <Tracker 
        isLogging={isLogging}
        currentTime={currentTime}
        pillars={pillars}
        setPillars={setPillars}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
        handleLogMana={handleLogMana}
        isOnline={isOnline}
        setView={setView}
        onBack={() => setView('reflection')} 
      />
    );
  }

  if (view === 'vault') {
    return (
      <Vault 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterHighMana={filterHighMana}
        setFilterHighMana={setFilterHighMana}
        filteredEntries={filteredEntries}
        setView={setView}
        isOnline={isOnline}
        // 👇 PASSING THE DELETE FUNCTION TO VAULT
        onDelete={handleDeleteEntry}
      />
    );
  }

  if (view === 'planner') {
    return (
      <Planner 
        currentTime={currentTime}
        hemisphere={hemisphere}
        toggleHemisphere={toggleHemisphere}
        selectedCalendarDay={selectedCalendarDay}
        setSelectedCalendarDay={setSelectedCalendarDay}
        setView={setView}
      />
    );
  }

  return null;
};

export default App;