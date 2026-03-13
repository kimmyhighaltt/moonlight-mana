import React, { useState, useEffect } from 'react';
import {
  Anchor,
  Wind,
  ExternalLink,
  Sparkles,
  Flame,
  Droplets,
  Moon,
  BookOpen,
  X // ✨ ADDED: X icon for our new modal
} from 'lucide-react';
import { getElementBySign, getShopRecommendations } from '../utils/affiliateLogic';
import { SACRED_TOOLS } from '../constants/index';

const Shop = ({ user, initialProductId }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [expandedId, setExpandedId] = useState(null);
  
  const [selectedVariants, setSelectedVariants] = useState({});
  // ✨ NEW: State to track which item is currently being viewed in the massive Gallery Modal
  const [viewingItem, setViewingItem] = useState(null);

  // --- START AUTO-OPEN LOGIC ---
  useEffect(() => {
    if (initialProductId) {
      const categoryKey = Object.keys(categories).find(key =>
        categories[key].items.some(item => item.id === initialProductId)
      );

      if (categoryKey) {
        setActiveTab(categoryKey);
        setExpandedId(initialProductId);

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
      items: SACRED_TOOLS.filter(t => t.category === 'Original Art')
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
    const displayImage = item.img || (item.images && item.images[0]);

    // CUSTOM VARIANT LOGIC
    const selectedVariantIndex = selectedVariants[item.id] || 0;
    const currentVariant = item.variants ? item.variants[selectedVariantIndex] : null;
    const displayPrice = currentVariant ? currentVariant.price : (item.priceRange || item.price);
    const checkoutLink = currentVariant ? currentVariant.link : item.link;

    return (
      <div key={item.id} id={`tool-${item.id}`} className="flex flex-col gap-2">
        <div
          className={`bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-white/10 transition-all group flex flex-col ${item.isArtwork ? '' : 'md:flex-row'} gap-5 items-start relative shadow-lg`}
        >
          {/* ✨ UI FIX: Added cursor-pointer, group-hover overlay, and onClick handler to trigger the Modal */}
          <div 
            onClick={() => setViewingItem(item)}
            className={`bg-black/40 rounded-2xl flex items-center justify-center text-amber-200 shrink-0 border border-white/5 overflow-hidden relative cursor-pointer group/img ${item.isArtwork ? 'w-full h-72 md:h-96' : 'w-full md:w-28 h-48 md:h-28'}`}
          >
            {displayImage ? (
              <>
                <img src={displayImage} alt={item.title || item.name} className={`w-full h-full object-cover transition-transform duration-700 ${item.isArtwork ? 'group-hover/img:scale-105' : 'group-hover/img:scale-110'}`} />
                {/* Magical Hover Button */}
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                   <div className="opacity-0 group-hover/img:opacity-100 transform translate-y-4 group-hover/img:translate-y-0 transition-all duration-300 bg-black/60 backdrop-blur-md text-amber-200 text-[10px] font-black tracking-widest uppercase px-5 py-2.5 rounded-full border border-amber-200/30 flex items-center gap-2">
                     <Sparkles size={12} /> View Gallery
                   </div>
                </div>
              </>
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 gap-4">
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-white font-mono text-lg font-bold">{displayPrice}</span>
                
                {item.variants && (
                  <select
                    value={selectedVariantIndex}
                    onChange={(e) => setSelectedVariants({...selectedVariants, [item.id]: parseInt(e.target.value)})}
                    className="bg-black/40 border border-white/20 text-amber-50 text-[11px] font-bold rounded-xl px-3 py-2 outline-none focus:border-amber-200 cursor-pointer appearance-none shadow-inner"
                  >
                    {item.variants.map((v, idx) => (
                      <option key={idx} value={idx} className="bg-slate-900">{v.name}</option>
                    ))}
                  </select>
                )}
              </div>
              
              {checkoutLink && (
                <a
                  href={checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all w-full sm:w-auto ${
                    item.isArtwork 
                      ? 'bg-amber-200 text-slate-900 hover:bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                      : 'bg-amber-200/10 text-amber-200 hover:bg-amber-200 hover:text-slate-900'
                  }`}
                >
                  {item.isArtwork ? 'Checkout' : 'View'} <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-2 duration-300 bg-slate-950/80 border border-amber-200/20 rounded-2xl p-6 mx-2 mt-2 shadow-2xl relative overflow-hidden">
            <Moon className="absolute -right-4 -bottom-4 text-white/5 rotate-12" size={100} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-4 bg-amber-200/50"></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200">The Alchemist's Log</h4>
              </div>
              <div className="text-white/70 text-sm leading-relaxed font-light mb-4">
                {item.fullReview || item.description || "I'm currently documenting my experience with this tool. A full tenacity report on its frequency and ritual impact is coming soon..."}
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
          {categories[activeTab]?.items?.map(renderCard)}
        </div>
      </section>

      {/* ✨ OUR GORGEOUS NEW FULL-SCREEN GALLERY MODAL ✨ */}
      {viewingItem && (() => {
        // We recalculate the selected variant specifically for the modal view so the dropdown works perfectly inside it!
        const selectedVariantIndex = selectedVariants[viewingItem.id] || 0;
        const currentVariant = viewingItem.variants ? viewingItem.variants[selectedVariantIndex] : null;
        const displayPrice = currentVariant ? currentVariant.price : (viewingItem.priceRange || viewingItem.price);
        const checkoutLink = currentVariant ? currentVariant.link : viewingItem.link;
        const displayImage = viewingItem.img || (viewingItem.images && viewingItem.images[0]);

        return (
          <div 
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-300" 
            onClick={() => setViewingItem(null)}
          >
            <div 
              className="bg-[#0f1423] border border-white/10 rounded-[2rem] w-full max-w-5xl max-h-[95vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl relative" 
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setViewingItem(null)} 
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Left Side: Massive Edge-to-Edge Image */}
              <div className="w-full md:w-1/2 min-h-[40vh] md:min-h-[60vh] bg-black/50 relative">
                <img src={displayImage} className="absolute inset-0 w-full h-full object-cover" alt={viewingItem.name} />
              </div>

              {/* Right Side: High-End Details & Checkout */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-widest text-amber-200/60 font-black mb-3">{viewingItem.category}</span>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">{viewingItem.title || viewingItem.name}</h3>
                
                <div className="w-12 h-px bg-amber-200/30 mb-6"></div>

                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-8">
                  {viewingItem.description || viewingItem.fullReview || "A curated piece to elevate your ritual space."}
                </p>

                {/* Modal Action Area */}
                <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono text-xl font-bold">{displayPrice}</span>
                    
                    {viewingItem.variants && (
                      <select
                        value={selectedVariantIndex}
                        onChange={(e) => setSelectedVariants({...selectedVariants, [viewingItem.id]: parseInt(e.target.value)})}
                        className="bg-black/40 border border-white/20 text-amber-50 text-xs font-bold rounded-xl px-4 py-2 outline-none focus:border-amber-200 cursor-pointer appearance-none shadow-inner"
                      >
                        {viewingItem.variants.map((v, idx) => (
                          <option key={idx} value={idx} className="bg-slate-900">{v.name}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {checkoutLink && (
                    <a
                      href={checkoutLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest px-6 py-4 rounded-xl transition-all w-full mt-2 ${
                        viewingItem.isArtwork 
                          ? 'bg-amber-200 text-slate-900 hover:bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                          : 'bg-amber-200/10 text-amber-200 hover:bg-amber-200 hover:text-slate-900'
                      }`}
                    >
                      {viewingItem.isArtwork ? 'Secure This Piece' : 'View Shop'} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Shop;