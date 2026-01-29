// src/components/RecommendedTool.js
import React from 'react';
import { getRecommendationForCard } from '../utils/affiliateLogic';

const RecommendedTool = ({ cardName }) => {
  const tool = getRecommendationForCard(cardName);
  if (!tool) return null;

  return (
    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="block mt-6 group animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
      <div className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0">
          <img src={tool.img} alt={tool.name} className="w-full h-full object-contain p-1" />
        </div>
        <div className="flex-1 text-left">
          <div className="text-[9px] uppercase tracking-widest text-gold mb-1">Ritual Tool</div>
          <h4 className="text-xs font-bold text-white group-hover:text-gold transition-colors">{tool.name}</h4>
        </div>
        <div className="px-3 py-1.5 bg-gold text-slate-900 text-[9px] font-black uppercase rounded-full">
          Get
        </div>
      </div>
    </a>
  );
};

export default RecommendedTool;