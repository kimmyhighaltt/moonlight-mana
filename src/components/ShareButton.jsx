import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Loader2 } from 'lucide-react';
import { THEME } from '../constants/index';

const ShareButton = ({ targetRef, fileName = 'moonlight-ritual.png', variant = 'default' }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async (e) => {
    // 🛡️ Prevent the ritual from progressing or cards flipping when clicking share
    e.stopPropagation(); 
    if (!targetRef.current) return;

    setIsGenerating(true);

    try {
      // 🕒 A tiny delay (200ms) allows the browser to finish any rendering 
      // or "painting" of the card art before the shutter clicks.
      await new Promise(r => setTimeout(r, 200));

      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true, // Forces the browser to fetch a fresh image, bypassing security blocks
        backgroundColor: '#020617', // Match your deep space theme
        pixelRatio: 2, // High-fidelity for social sharing
        skipFonts: true, // Prevents timeouts caused by loading custom font files
        style: {
          transform: 'scale(1)', // Ensures the image isn't "warped" by CSS 3D transforms
        },
      });

      // 📥 Trigger the download
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
      
    } catch (err) {
      console.error('Failed to seal the ritual image:', err);
      alert('The archive could not capture the image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Minimal variant for the Vault, Default for the Reflection page
  const buttonStyles = variant === 'minimal' 
    ? "p-3 bg-white/5 hover:bg-amber-200/20 text-white/40 hover:text-amber-200 rounded-full border border-white/10 transition-all z-30 relative"
    : "mt-8 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[11px] border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 text-white shadow-2xl z-50 relative";

  return (
    <button 
      onClick={handleShare}
      disabled={isGenerating}
      className={`${buttonStyles} pointer-events-auto`}
      style={variant !== 'minimal' ? { backgroundColor: 'rgba(0,0,0,0.3)' } : {}}
    >
      {isGenerating ? (
        <Loader2 size={variant === 'minimal' ? 14 : 16} className="animate-spin" />
      ) : (
        <Share2 size={variant === 'minimal' ? 14 : 16} />
      )}
      
      {variant !== 'minimal' && (isGenerating ? 'Capturing...' : 'Share Ritual')}
    </button>
  );
};

export default ShareButton;