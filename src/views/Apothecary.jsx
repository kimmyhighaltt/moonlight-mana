import React from 'react';
import { StatusHeader, BottomNav } from '../components/UIComponents';
import CelestialBackground from '../components/CelestialBackground';

// Importing your brilliant tabbed interface
import Shop from './Shop'; 

const Apothecary = ({ setView, isOnline, userProfile }) => {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden animate-fade-in pb-32 text-white bg-[#020617]">
      <CelestialBackground />
      <div className="fixed inset-0 bg-slate-900/60 pointer-events-none" />

      {/* HEADER: Just the status bar, since Shop.jsx handles its own title */}
      <div className="relative z-20 w-full flex flex-col p-6 md:p-10 mt-4">
        <StatusHeader isOnline={isOnline} />
      </div>

      {/* MAIN CONTENT: Your focused, tabbed shop */}
      <div className="relative z-10 max-w-3xl mx-auto w-full px-4 md:px-10 mt-2">
        <Shop user={userProfile} />
      </div>

      {/* NAVIGATION */}
      <BottomNav view="apothecary" setView={setView} />
    </div>
  );
};

export default Apothecary;