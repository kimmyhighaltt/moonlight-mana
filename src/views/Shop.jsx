import React from 'react';
import { 
  Moon, 
  BookOpen, 
  Anchor, 
  Wind, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { getElementBySign, getShopRecommendations } from '../utils/affiliateLogic';

const Shop = ({ user }) => {
  const sign = user?.sign || "Seeker";
  const lifePath = user?.lifePath || "1";

  // 1. Get Dynamic Data from your affiliateLogic file
  const element = getElementBySign(sign);
  const tools = getShopRecommendations(element);

  // 2. Build the Product List
  const essentials = [
    {
      id: 1,
      title: "The Moon Journal: A journey of self-reflection",
      category: "Sacred Writing",
      price: "$10.36",
      description: "This beautiful journal uses the moon's movement to connect readers with nature and encourage reflection on dreams, goals, and manifesting.",
      img: "https://m.media-amazon.com/images/I/814CSfaNzXL._SL1500_.jpg", 
      link: "https://amzn.to/4rG7VCX", 
      icon: <Moon size={20} />,
      badge: "Essential"
    },
    {
      id: 2,
      title: `The Ultimate Numerology ${lifePath} Audiobook`,
      category: "Free with Audible", 
      price: "Free Trial",
      description: `Unlock the hidden vibrations of Life Path ${lifePath} with this masterclass audio guide.`,
      img: "https://m.media-amazon.com/images/I/81Sqhh8LZfL._SL1500_.jpg", 
      link: "https://amzn.to/3O4FmAx", 
      icon: <BookOpen size={20} />,
      badge: "Masterclass"
    },
    {
      id: 3,
      title: tools.crystal.name, 
      category: `${element} Energy Tool`,
      price: tools.crystal.price,
      description: tools.crystal.desc,
      img: tools.crystal.img,      
      link: tools.crystal.link,    
      icon: <Anchor size={20} />,  
      badge: "Bestseller"
    },
    {
      id: 4,
      title: tools.tea.name,       
      category: "Ritual Care",
      price: tools.tea.price,
      description: tools.tea.desc,
      img: tools.tea.img,          
      link: tools.tea.link,        
      icon: <Wind size={20} />,    
      badge: "New Arrival"
    }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 pb-32">
      
      {/* Header */}
      <header className="px-2">
        <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-amber-200 animate-pulse" />
            <p className="text-amber-200 text-xs font-bold uppercase tracking-widest">
                The Apothecary
            </p>
        </div>
        <h1 className="text-3xl font-serif text-white mb-2">Soul Essentials</h1>
        <p className="text-white/40 text-sm">
            Curated tools for your <strong>{sign}</strong> ({element}) journey.
        </p>
      </header>

      {/* Product List */}
      <div className="grid grid-cols-1 gap-4">
        {essentials.map((item) => (
          <a 
            key={item.id} 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            // 👇 THIS LINE FIXES THE "CLOSE MODAL" BUG
            onClick={(e) => e.stopPropagation()} 
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-amber-200/40 transition-all group flex gap-5 items-start cursor-pointer"
          >
            {/* Image or Icon */}
            <div className="w-20 h-20 bg-black/20 rounded-xl flex items-center justify-center text-amber-200 shrink-0 border border-white/5 overflow-hidden">
                {/* Logic: Use Image if available (and not placeholder), otherwise Icon */}
                {item.img && !item.img.includes('PASTE') ? (
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                    item.icon
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] uppercase tracking-widest text-amber-200/60 font-bold">{item.category}</span>
                {item.badge && (
                  <span className="bg-amber-500/10 text-amber-200 text-[8px] px-2 py-0.5 rounded-full uppercase tracking-widest border border-amber-500/20">
                    {item.badge}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-serif text-white leading-tight mb-1 group-hover:text-amber-100 transition-colors">
                  {item.title}
              </h3>
              
              <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-3">
                  {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-white font-mono text-sm">{item.price}</span>
                <div className="flex items-center gap-2 text-amber-200 text-[10px] font-bold uppercase tracking-widest bg-amber-200/10 px-3 py-2 rounded-lg group-hover:bg-amber-200 group-hover:text-slate-900 transition-all">
                  View <ExternalLink size={10} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Amazon Disclaimer */}
      <div className="text-center px-6">
        <p className="text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">
            Moonlight Mana is a participant in the Amazon Services LLC Associates Program. We earn from qualifying purchases.
        </p>
      </div>
    </div>
  );
};

export default Shop;