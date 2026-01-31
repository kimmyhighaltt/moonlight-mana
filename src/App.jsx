import React, { useState, useEffect } from 'react';

// --- Components ---
import OnboardingModal from './components/OnboardingModal';
import { Logo, GraphGrid, StatusHeader, BottomNav } from './components/UIComponents';
import Splash from './views/Splash';
import Dashboard from './views/Dashboard';
import Reflection from './views/Reflection';
import Tracker from './views/Tracker';
import Vault from './views/Vault';
import Planner from './views/Planner';

// --- Logic & Data ---
import { getZodiacSign, getLifePathNumber } from './utils/cosmicLogic';
import { getMoonPhase } from './utils/lunarLogic';
import { THEME, PILLAR_INFO, TAROT_DECK, INITIAL_MOCK_ENTRIES } from './constants/index';

/**
 * MOONLIGHT MANA - MAIN CONTROLLER
 */
const App = () => {
  
  // =========================================
  // 1. STATE MANAGEMENT
  // =========================================

  // --- System Settings ---
  const [view, setView] = useState('splash');
  const [hemisphere, setHemisphere] = useState('Southern');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  // --- User Data (Persisted) ---
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('moonlight_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('moonlight_vault');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ENTRIES;
    } catch (e) {
      console.error("Failed to load journal:", e);
      return INITIAL_MOCK_ENTRIES;
    }
  });

  const [streak, setStreak] = useState(0);

  // --- Session Interaction (Tarot & Rituals) ---
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState(TAROT_DECK[0]);
  const [rituals, setRituals] = useState(['Deck Cleansed', 'Grounded', 'Mindful Breathing']);
  const [newRitualInput, setNewRitualInput] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [reflection, setReflection] = useState({ firstImpressions: '', theMessage: '', actionStep: '' });

  // --- Tracker State ---
  const [pillars, setPillars] = useState({ mind: 60, body: 60, heart: 60, soul: 60 });
  const [activeTags, setActiveTags] = useState({ 'Aotearoa (Nature)': 'charge' });
  const [isLogging, setIsLogging] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  // --- UI Filters ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHighMana, setFilterHighMana] = useState(false);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);

  // =========================================
  // 2. COMPUTED DATA
  // =========================================
  
  const moonData = getMoonPhase(currentTime);

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.card.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHighMana = filterHighMana ? entry.mana >= 85 : true;
    return matchesSearch && matchesHighMana;
  });

  // =========================================
  // 3. EFFECTS (Side Effects & Lifecycle)
  // =========================================

  // Persistence: Save Journal on Change
  useEffect(() => {
    localStorage.setItem('moonlight_vault', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Routing: Handle Browser URL & Back Button
  useEffect(() => {
    if (view !== 'splash') window.location.hash = view;
  }, [view]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== view) setView(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [view]);

  // System: Timer & Online Status
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const splashTimer = setTimeout(() => setView('dashboard'), 3000);
    const handleConn = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleConn);
    window.addEventListener('offline', handleConn);

    return () => {
      clearInterval(timer);
      clearTimeout(splashTimer);
      window.removeEventListener('online', handleConn);
      window.removeEventListener('offline', handleConn);
    };
  }, []);

  // Gamification: Calculate Streak Logic
  useEffect(() => {
    const checkStreak = () => {
      const today = new Date().toDateString(); 
      const saved = JSON.parse(localStorage.getItem('moonlight_streak')) || { date: null, count: 0 };
      
      // 1. Visited Today? (No change)
      if (saved.date === today) {
        setStreak(saved.count);
        return;
      }

      // 2. Visited Yesterday? (Increment)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (saved.date === yesterday.toDateString()) {
        const newCount = saved.count + 1;
        setStreak(newCount);
        localStorage.setItem('moonlight_streak', JSON.stringify({ date: today, count: newCount }));
      } 
      // 3. Missed a day? (Reset)
      else {
        setStreak(1);
        localStorage.setItem('moonlight_streak', JSON.stringify({ date: today, count: 1 }));
      }
    };
    checkStreak();
  }, []);

  // =========================================
  // 4. ACTION HANDLERS
  // =========================================

  const handleOnboardingComplete = (data) => {
    const profile = {
      ...data,
      sign: getZodiacSign(data.dob),
      lifePath: getLifePathNumber(data.dob)
    };
    setUserProfile(profile);
    localStorage.setItem('moonlight_user', JSON.stringify(profile));
  };

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

  const handleDeleteEntry = (idToDelete) => {
    setJournalEntries(prevEntries => prevEntries.filter(entry => entry.id !== idToDelete));
  };

  const handleLogMana = () => {
    setIsLogging(true);
    
    // Fake "Processing" Delay for UX
    setTimeout(() => {
      const averageMana = Math.round((pillars.mind + pillars.body + pillars.heart + pillars.soul) / 4);

      let entryDateObj = new Date(currentTime);
      if (selectedHour !== null) {
        entryDateObj.setHours(selectedHour);
        entryDateObj.setMinutes(0);
      }

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

  // =========================================
  // 5. RENDER LOGIC
  // =========================================

  if (view === 'splash') return <Splash />;

  // Blocking Check: Onboarding
  if (!userProfile) {
    return <OnboardingModal onComplete={handleOnboardingComplete} />;
  }

  // View Routing
  switch (view) {
    case 'dashboard':
      return (
        <Dashboard
          hemisphere={hemisphere}
          toggleHemisphere={toggleHemisphere}
          setView={setView}
          isOnline={isOnline}
          moonData={moonData}
          userProfile={userProfile} 
          streak={streak}
        />
      );
    case 'reflection':
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
          userProfile={userProfile}
        />
      );
    case 'tracker':
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
    case 'vault':
      return (
        <Vault
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterHighMana={filterHighMana}
          setFilterHighMana={setFilterHighMana}
          filteredEntries={filteredEntries}
          setView={setView}
          isOnline={isOnline}
          onDelete={handleDeleteEntry}
        />
      );
    case 'planner':
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
    default:
      return null;
  }
};

/**
 * HELPER: Generates insight based on lowest energy pillar
 */
const getSmartReading = (card, pillars, userReflection) => {
  const lowestPillar = Object.entries(pillars).reduce((a, b) => a[1] < b[1] ? a : b);
  const [problemArea, score] = lowestPillar;

  if (userReflection && userReflection.trim() !== "") return userReflection;

  return `Your ${problemArea} energy is low (${score}%). The ${card.name} suggests you focus on ${card.message.toLowerCase()} to restore balance here.`;
};

export default App;