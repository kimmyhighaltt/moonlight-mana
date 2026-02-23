import React, { useState, useEffect } from 'react';

// --- Components ---
import OnboardingModal from './components/OnboardingModal';
import { Logo, GraphGrid, StatusHeader, BottomNav } from './components/UIComponents';
import CelestialBackground from './components/CelestialBackground';

// --- Views ---
import Splash from './views/Splash';
import ValuePage from './views/ValuePage'; 
import Dashboard from './views/Dashboard';
import Reflection from './views/Reflection';
import Tracker from './views/Tracker';
import Vault from './views/Vault';
import Planner from './views/Planner';

// --- Logic & Data ---
import { getZodiacSign, getLifePathNumber } from './utils/cosmicLogic';
import { getMoonPhase } from './utils/lunarLogic';
import { THEME, PILLAR_INFO, TAROT_DECK, INITIAL_MOCK_ENTRIES } from './constants/index';

const App = () => {
  
  // =========================================
  // 1. STATE MANAGEMENT
  // =========================================

  const [view, setView] = useState('splash');
  const [hemisphere, setHemisphere] = useState('Southern');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  const [hasSeenValue, setHasSeenValue] = useState(() => {
    return localStorage.getItem('moonlight_mana_welcome') === 'true';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('moonlight_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('moonlight_vault');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ENTRIES;
    } catch (e) {
      return INITIAL_MOCK_ENTRIES;
    }
  });

  const [streak, setStreak] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState(TAROT_DECK[0]);
  const [rituals, setRituals] = useState(['Deck Cleansed', 'Grounded', 'Mindful Breathing']);
  const [newRitualInput, setNewRitualInput] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [reflection, setReflection] = useState({ firstImpressions: '', theMessage: '', actionStep: '' });
  const [pillars, setPillars] = useState({ mind: 60, body: 60, heart: 60, soul: 60 });
  const [activeTags, setActiveTags] = useState({ 'Aotearoa (Nature)': 'charge' });
  const [isLogging, setIsLogging] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHighMana, setFilterHighMana] = useState(false);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);

  // =========================================
  // 2. COMPUTED DATA
  // =========================================
 
  const moonData = getMoonPhase(currentTime);
  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.card.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.message && entry.message.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesHighMana = filterHighMana ? entry.mana >= 85 : true;
    return matchesSearch && matchesHighMana;
  });

  // =========================================
  // 3. EFFECTS (Persistence & Logic)
  // =========================================

  useEffect(() => {
    localStorage.setItem('moonlight_vault', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // System: Timer & Online Status
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const splashTimer = setTimeout(() => {
      if (!hasSeenValue) setView('value');
      else if (!userProfile) setView('onboarding');
      else setView('dashboard');
    }, 1200);

    const handleConn = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleConn);
    window.addEventListener('offline', handleConn);

    return () => {
      clearInterval(timer);
      clearTimeout(splashTimer);
      window.removeEventListener('online', handleConn);
      window.removeEventListener('offline', handleConn);
    };
  }, [hasSeenValue, userProfile]);

  // ⚡ STREAK CALCULATION
  useEffect(() => {
    const checkStreak = () => {
      const today = new Date().toDateString();
      const saved = JSON.parse(localStorage.getItem('moonlight_streak')) || { date: null, count: 0 };
      
      if (saved.date === today) {
        setStreak(saved.count);
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (saved.date === yesterday.toDateString()) {
        const newCount = saved.count + 1;
        setStreak(newCount);
        localStorage.setItem('moonlight_streak', JSON.stringify({ date: today, count: newCount }));
      } else {
        setStreak(1);
        localStorage.setItem('moonlight_streak', JSON.stringify({ date: today, count: 1 }));
      }
    };

    if (userProfile) checkStreak();
  }, [userProfile]);

  // =========================================
  // 4. ACTION HANDLERS
  // =========================================

  const handleValueComplete = () => {
    localStorage.setItem('moonlight_mana_welcome', 'true');
    setHasSeenValue(true);
    setView(userProfile ? 'dashboard' : 'onboarding');
  };

  const handleOnboardingComplete = (data) => {
    const profile = { ...data, sign: getZodiacSign(data.dob), lifePath: getLifePathNumber(data.dob) };
    setUserProfile(profile);
    localStorage.setItem('moonlight_user', JSON.stringify(profile));
    setView('dashboard');
  };

  const toggleHemisphere = () => setHemisphere(prev => prev === 'Southern' ? 'Northern' : 'Southern');
  
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
  };

  const toggleCheck = (id) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  const handleDeleteEntry = (id) => setJournalEntries(prev => prev.filter(e => e.id !== id));

  const handleLogMana = () => {
    setIsLogging(true);
    setTimeout(() => {
      const averageMana = Math.round((pillars.mind + pillars.body + pillars.heart + pillars.soul) / 4);
      let entryDateObj = new Date(currentTime);
      
      const newEntry = {
        id: Date.now(),
        date: entryDateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase(),
        time: entryDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        moon: moonData.label,
        card: selectedCard.name,
        img: selectedCard.img,
        mana: averageMana,
        message: reflection.theMessage || `A session focusing on ${selectedCard.name}.`,
        pillars: { ...pillars },
        trend: averageMana > 65 ? 'up' : 'down',
        tags: { ...activeTags }
      };

      setJournalEntries([newEntry, ...journalEntries]);
      setIsLogging(false);
      setView('vault');
    }, 1800);
  };

  // =========================================
  // 5. RENDER LOGIC
  // =========================================

  return (
    <div className="relative min-h-screen w-full bg-[#020617] overflow-x-hidden">
      <CelestialBackground />

      <div className="relative z-10 w-full h-full">
        {view === 'splash' && <Splash />}
        
        {view === 'value' && <ValuePage onContinue={handleValueComplete} />}

        {(!userProfile || view === 'onboarding') && view !== 'splash' && view !== 'value' && (
          <OnboardingModal onComplete={handleOnboardingComplete} />
        )}

        {userProfile && (
          <>
            {view === 'dashboard' && (
              <Dashboard hemisphere={hemisphere} toggleHemisphere={toggleHemisphere} setView={setView} isOnline={isOnline} moonData={moonData} userProfile={userProfile} streak={streak} currentTime={currentTime} />
            )}
            {view === 'reflection' && (
              <Reflection 
                currentTime={currentTime} hemisphere={hemisphere} isFlipped={isFlipped} 
                selectedCard={selectedCard} handleCardPull={handleCardPull} rituals={rituals} 
                checkedItems={checkedItems} toggleCheck={toggleCheck} pillars={pillars} 
                setPillars={setPillars} newRitualInput={newRitualInput} 
                setNewRitualInput={setNewRitualInput} addRitual={addRitual} 
                reflection={reflection} setReflection={setReflection} setView={setView} 
                isOnline={isOnline} onBack={() => setView('dashboard')} userProfile={userProfile} 
              />
            )}
            {view === 'tracker' && (
              <Tracker 
                isLogging={isLogging} currentTime={currentTime} pillars={pillars} 
                setPillars={setPillars} activeTags={activeTags} setActiveTags={setActiveTags} 
                handleLogMana={handleLogMana} isOnline={isOnline} setView={setView} 
                onBack={() => setView('reflection')} 
              />
            )}
            {view === 'vault' && (
              <Vault currentTime={currentTime} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterHighMana={filterHighMana} setFilterHighMana={setFilterHighMana} filteredEntries={filteredEntries} setView={setView} isOnline={isOnline} onDelete={handleDeleteEntry} onBack={() => setView('dashboard')} />
            )}
            {view === 'planner' && (
              <Planner currentTime={currentTime} hemisphere={hemisphere} toggleHemisphere={toggleHemisphere} selectedCalendarDay={selectedCalendarDay} setSelectedCalendarDay={setSelectedCalendarDay} setView={setView} isOnline={isOnline} onBack={() => setView('dashboard')} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;