import React, { useState, useEffect } from 'react'; // UPDATED: Added useEffect
import {
  Anchor,
  Wind,
  ExternalLink,
  Sparkles,
  Flame,
  Droplets,
  Moon,
  BookOpen
} from 'lucide-react';
import { getElementBySign, getShopRecommendations } from '../utils/affiliateLogic';
import { SACRED_TOOLS } from '../constants/index.jsx';

const Shop = ({ user, initialProductId }) => { // UPDATED: Added initialProductId prop
  const [activeTab, setActiveTab] = useState('personal');
  const [expandedId, setExpandedId] = useState(null);

  // --- START AUTO-OPEN LOGIC ---
  useEffect(() => {
    if (initialProductId) {
      // 1. Find which category contains this tool
      const categoryKey = Object.keys(categories).find(key =>
        categories[key].items.some(item => item.id === initialProductId)
      );

      // 2. Switch to that tab and expand the tool
      if (categoryKey) {
        setActiveTab(categoryKey);
        setExpandedId(initialProductId);

        // 3. Optional: Scroll to it after a tiny delay to allow tab switch
        setTimeout(() => {
          const el = document.getElementById(`tool-${initialProductId}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [initialProductId]);
  // --- END AUTO-OPEN LOGIC ---

  const sign = user?.sign || "Seeker";
  const element = getElementBySign(sign);
  const personalizedTools = getShopRecommendations(element);

  const getElementIcon = () => {
    switch (element) {
      case 'Fire': return <Flame size={20} />;
      case 'Water': return <Droplets size={20} />;
      case 'Air': return <Wind size={20} />;
      case 'Earth': default: return <Anchor size={20} />;
    }
  };

  const toggleExpand = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };
  // Add this right above your categories object!
  const ascensionCollection = [
    {
      id: 'art-1',
      title: 'The Pink Bloom',
      category: 'Museum Grade Print',
      price: '$45.00',
      img: '/images/pink-bloom.jpg',
      fullReview: "The first piece of the Ascension Triptych. This museum-grade Giclée print serves as a physical anchor for your daily space, reminding you of the breakthrough after the void."
    },
    {
      id: 'art-2',
      title: 'The Orange Beacons',
      category: 'Museum Grade Print',
      price: '$45.00',
      img: '/images/orange-beacons.jpg',
      fullReview: "The second piece of the Ascension Triptych. A warm, tactile reminder that your energy is returning and your Mana is restoring."
    },
    {
      id: 'art-3',
      title: 'The Light',
      category: 'Museum Grade Print',
      price: '$45.00',
      img: '/images/the-light.jpg',
      fullReview: "The final piece of the Ascension Triptych. The ultimate physical anchor representing clarity, flow, and the integration of your shadow work."
    },
  ];

  const categories = {
    personal: {
      label: `Your ${element} Tools`,
      isSpecial: true,
      items: [
        {
          ...personalizedTools.crystal,
          id: `pers-crystal-${sign}`,
          category: `${element} Crystal`,
          icon: getElementIcon()
        },
        {
          ...personalizedTools.tea,
          id: `pers-tea-${sign}`,
          category: `${element} Ritual Tea`,
          icon: getElementIcon()
        }
      ]
    },
    art: {
      label: 'Fine Art',
      items: ascensionCollection
    },
    shielding: {
      label: 'Shielding',
      items: SACRED_TOOLS.filter(t => t.category === 'Energy Shielding' || t.category === 'Energy Cleansing')
    },
    altar: {
      label: 'The Altar',
      items: SACRED_TOOLS.filter(t => t.category === 'Sacred Altar')
    },
    shadow: {
      label: 'Shadow Work',
      items: SACRED_TOOLS.filter(t => t.category === 'Shadow Work' || t.category === 'Sunday Reset')
    }
  };

  const renderCard = (item) => {
    const isExpanded = expandedId === item.id;

    return (
      <div key={item.id} id={`tool-${item.id}`} className="flex flex-col gap-2"> {/* Added ID for scrolling */}
        <div
          className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-white/10 transition-all group flex flex-col md:flex-row gap-5 items-start relative shadow-lg"
        >
          {/* Image/Icon Block */}
          <div className="w-full md:w-28 h-48 md:h-28 bg-black/40 rounded-2xl flex items-center justify-center text-amber-200 shrink-0 border border-white/5 overflow-hidden">
            {item.img ? (
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
              item.icon || <Sparkles size={24} />
            )}
          </div>

          <div className="flex-1 w-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] uppercase tracking-widest text-amber-200/60 font-black">{item.category}</span>
              <div className="flex gap-2">
                <button
                  onClick={(e) => toggleExpand(e, item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${isExpanded
                    ? 'bg-amber-200 text-slate-900 border-amber-200'
                    : 'bg-white/5 text-amber-200 border-white/10 hover:border-amber-200/50'
                    }`}
                >
                  <BookOpen size={10} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Review</span>
                </button>
              </div>
            </div>

            <h3 className="text-xl font-serif text-white mb-1">{item.title || item.name}</h3>

            {item.ritualAdvice && (
              <div className="bg-amber-900/20 border-l-2 border-amber-400/50 p-2 rounded-r-lg my-3">
                <p className="text-[10px] text-amber-100/90 leading-relaxed italic">
                  <Sparkles size={8} className="inline mr-1 mb-0.5" /> {item.ritualAdvice}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="text-white font-mono text-sm font-bold">{item.price}</span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-amber-200 text-[10px] font-black uppercase tracking-widest bg-amber-200/10 px-4 py-2 rounded-xl hover:bg-amber-200 hover:text-slate-900 transition-all"
              >
                View <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-2 duration-300 bg-slate-950/80 border border-amber-200/20 rounded-2xl p-6 mx-2 shadow-2xl relative overflow-hidden">
            <Moon className="absolute -right-4 -bottom-4 text-white/5 rotate-12" size={100} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-4 bg-amber-200/50"></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200">The Alchemist's Log</h4>
              </div>
              <div className="text-white/70 text-sm leading-relaxed font-light mb-4">
                {item.fullReview || "I'm currently documenting my experience with this tool. A full tenacity report on its frequency and ritual impact is coming soon..."}
              </div>
              <button
                onClick={(e) => toggleExpand(e, item.id)}
                className="text-[9px] font-black uppercase tracking-widest text-amber-200/40 hover:text-amber-200"
              >
                Close Log
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 pb-32">
      <header className="px-2 mb-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">The Apothecary</h1>
        <p className="text-white/50 text-xs uppercase tracking-widest font-bold">Curated Ritual Tools & Expert Reviews</p>
      </header>

      {/* Tab Nav */}
      <div className="flex gap-3 overflow-x-auto pb-4 px-2 custom-scrollbar">
        {Object.keys(categories).map((key) => {
          const isSpecial = categories[key].isSpecial;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive
                ? 'bg-amber-200 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : isSpecial
                  ? 'bg-amber-500/10 text-amber-200 border border-amber-500/30'
                  : 'bg-white/5 text-white/60 border border-white/10'
                }`}
            >
              {isSpecial && <Sparkles size={12} />}
              {categories[key].label}
            </button>
          );
        })}
      </div>

      <section className="px-2">
        <div className="grid grid-cols-1 gap-6">
          {categories[activeTab].items.map(renderCard)}
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Shop;