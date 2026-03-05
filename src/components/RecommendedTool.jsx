import React from 'react';
import { getRecommendationForCard } from '../utils/affiliateLogic';

// We add 'onNavigate' as a prop so we can tell App.js to switch views
const RecommendedTool = ({ cardName, onNavigate }) => {
  const tool = getRecommendationForCard(cardName);
  
  if (!tool) return null;

  return (
    <button 
      onClick={() => onNavigate(tool.id)} 
      className="w-full block mt-6 group animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500"
    >
      <div className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0">
          <img src={tool.img} alt={tool.name} className="w-full h-full object-contain p-1" />
        </div>
        <div className="flex-1 text-left">
          <div className="text-[9px] uppercase tracking-widest text-amber-200 mb-1">Ritual Tool</div>
          <h4 className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
            {tool.name}
          </h4>
        </div>
        <div className="px-3 py-1.5 bg-amber-200 text-slate-900 text-[9px] font-black uppercase rounded-full">
          View Ritual
        </div>
      </div>
    </button>
  );
};

export default RecommendedTool;