import React, { useState, useEffect } from 'react';
// Add 'collection' and 'addDoc' to your firestore imports at the top if they aren't there
import { doc, setDoc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
// 👇 ADDED THIS IMPORT
import { db, auth } from './firebase';

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
import Apothecary from './views/Apothecary';
import Login from './components/Login';


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

    // 1. First, we turn the string from localStorage back into an object
    const parsed = saved ? JSON.parse(saved) : null;

    // 2. NOW we can check if it exists and force Pro mode
    if (parsed) {
      parsed.isPro = true;
    }

    return parsed;
  });

  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('moonlight_vault');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ENTRIES;
    } catch (e) {
      return INITIAL_MOCK_ENTRIES;
    }
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
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
  const [initializing, setInitializing] = useState(true);

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
    // 1. Keep your existing clock timer
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // 2. ⏱️ Steiner Tracking: Note exactly when the component mounted
    const startTime = Date.now(); 

    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Determine where the user SHOULD go after the splash
      let targetView = 'login';
      if (user) {
        const saved = JSON.parse(localStorage.getItem('moonlight_user'));
        targetView = saved?.setupComplete ? 'dashboard' : 'onboarding';
      }

      // 🧘 THE SACRED DELAY CALCULATION
      // We want a minimum of 6000ms (one full breathing cycle)
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 6000 - elapsedTime);

      // We wait for the remaining time before switching views
      setTimeout(() => {
        setView(targetView);
        setInitializing(false); // This finally removes the Splash screen
      }, remainingTime);
    });

    // Keep your connection listeners
    const handleConn = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleConn);
    window.addEventListener('offline', handleConn);

    return () => {
      clearInterval(timer);
      unsubscribe();
      window.removeEventListener('online', handleConn);
      window.removeEventListener('offline', handleConn);
    };
  }, []);

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

  useEffect(() => {
    let unsubscribe;

    if (userProfile && auth.currentUser) {
      const entriesRef = collection(db, 'users', auth.currentUser.uid, 'vault');
      const q = query(entriesRef, orderBy('timestamp', 'desc'));

      // 🎧 Listen for real-time updates from the cloud
      unsubscribe = onSnapshot(q, (snapshot) => {
        const cloudEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJournalEntries(cloudEntries);
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [userProfile]); // Runs whenever the user logs in

  // =========================================
  // 4. ACTION HANDLERS
  // =========================================

  const handleOnboardingComplete = async (data) => {
    const profile = {
      ...userProfile, // 👈 Keep existing data (like email and isPro)
      ...data,
      sign: getZodiacSign(data.dob),
      lifePath: getLifePathNumber(data.dob),
      setupComplete: true,
      joinedAt: new Date().toISOString()
    };
    // ... rest of the function

    try {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, profile, { merge: true });
        console.log("Soul Profile synced to the cloud.");
      }

      setUserProfile(profile);
      localStorage.setItem('moonlight_user', JSON.stringify(profile));

      setTimeout(() => {
        setView('dashboard');
      }, 800);

    } catch (error) {
      console.error("Error saving cosmic profile:", error);
      setView('dashboard');
    }
  };

  const handleValueComplete = () => {
    localStorage.setItem('moonlight_mana_welcome', 'true');
    setHasSeenValue(true);
    setView(userProfile ? 'dashboard' : 'onboarding');
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

const handleLogMana = async () => {
    setIsLogging(true);

    const averageMana = Math.round((pillars.mind + pillars.body + pillars.heart + pillars.soul) / 4);
    let entryDateObj = new Date(currentTime);
    
    // Create the standardized date string (YYYY-MM-DD) for the Compass to read
    const localDateString = `${entryDateObj.getFullYear()}-${String(entryDateObj.getMonth() + 1).padStart(2, '0')}-${String(entryDateObj.getDate()).padStart(2, '0')}`;
    const isoString = new Date().toISOString();

    const newEntry = {
      userId: auth.currentUser.uid, 
      
      // 👇 THE DATE FIXES
      date: localDateString, // e.g., "2026-05-20" (For the Compass)
      displayDate: entryDateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase(), // e.g., "MAY 20" (For the Vault UI)
      time: entryDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: isoString, 
      createdAt: isoString, // Added because the Compass checks for this
      moon: moonData.label,
      
      // 👇 THE CARD FIXES
      drawnCard: selectedCard, // The Compass needs the full object here!
      card: selectedCard.name, // Kept so your Vault search still works
      img: selectedCard.img,   // Kept so your Vault images still load
      
      mana: averageMana,
      message: reflection.theMessage || `A session focusing on ${selectedCard.name}.`,
      pillars: { ...pillars },
      trend: averageMana > 65 ? 'up' : 'down',
      tags: { ...activeTags }
    };

    try {
      // ☁️ Save to Firebase
      if (auth.currentUser) {
        const entriesRef = collection(db, 'users', auth.currentUser.uid, 'vault');
        await addDoc(entriesRef, newEntry);
        console.log("Reflection safely stored in the cloud.");
      }

      // 📱 Keep local state updated for speed
      setJournalEntries([newEntry, ...journalEntries]);
      setIsLogging(false);
      setView('vault');
    } catch (error) {
      console.error("The vault failed to open:", error);
      setIsLogging(false);
    }
  };

  const handleNavigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setView('dashboard');
  };

  // =========================================
  // 5. RENDER LOGIC
  // =========================================

  return (
    <div className="relative min-h-screen w-full bg-[#020617] overflow-x-hidden">
      <CelestialBackground />


      <div className="relative z-10 w-full h-full">
        {/* ✨ FIX: If initializing, stay on splash regardless of 'view' state */}
        {initializing ? <Splash /> : (
          <>
            {view === 'splash' && <Splash />}
            {view === 'value' && <ValuePage onContinue={handleValueComplete} />}
            {/* In App.jsx return block */}
            {view === 'onboarding' && (
              <div className="relative z-[100]">
                <OnboardingModal
                  onComplete={handleOnboardingComplete}
                  // Add a prop to tell the modal if the app is still "busy" saving
                  isLoading={isLogging}
                />
              </div>
            )}


            {view === 'login' && (
              <Login
                onLoginSuccess={(user) => {
                  console.log("Welcome to the Sanctuary:", user.email);
                  const tempProfile = { name: user.displayName || 'Seeker', email: user.email };
                  setUserProfile(tempProfile);
                  setView('onboarding');
                }}
              />
            )}


            {(userProfile || view === 'onboarding') && (
              <>
                {view === 'dashboard' && (
                  <Dashboard
                    hemisphere={hemisphere}
                    toggleHemisphere={toggleHemisphere}
                    setView={setView}
                    isOnline={isOnline}
                    moonData={moonData}
                    userProfile={userProfile}
                    streak={streak}
                    currentTime={currentTime}
                    autoOpenProductId={selectedProductId}
                    clearAutoOpen={() => setSelectedProductId(null)}
                    journalEntries={journalEntries}
                  />
                )}
                {view === 'reflection' && (
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
                    onBack={() => setView('dashboard')}
                    userProfile={userProfile}
                    onNavigateToProduct={handleNavigateToProduct}
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
                  <Planner
                    currentTime={currentTime}
                    hemisphere={hemisphere}
                    toggleHemisphere={toggleHemisphere}
                    selectedCalendarDay={selectedCalendarDay}
                    setSelectedCalendarDay={setSelectedCalendarDay}
                    setView={setView}
                    isOnline={isOnline}
                    onBack={() => setView('dashboard')}
                    autoOpenProductId={selectedProductId}
                    clearAutoOpen={() => setSelectedProductId(null)}
                  />
                )}
                {view === 'apothecary' && (
                  <Apothecary
                    setView={setView}
                    isOnline={isOnline}
                    userProfile={userProfile}
                  />
                )}
              </>
            )}


          </>
        )}
      </div>
    </div>
  );
};

export default App;