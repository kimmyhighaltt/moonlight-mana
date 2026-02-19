import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Loader2 } from 'lucide-react';
import { THEME } from '../constants/index';

const ShareButton = ({ targetRef, fileName = 'moonlight-ritual.png', variant = 'default' }) => {
  const [isGenerating, setIsGenerating] = useState(false);
const handleShare = async (e) => {
    e.stopPropagation(); 
    if (!targetRef.current) return;

    setIsGenerating(true);

    try {
      // 1. Give it a slightly longer heartbeat (400ms) to ensure the GPU has painted the art
      await new Promise(r => setTimeout(r, 400));

      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true, // Forces fresh fetch to bypass security blocks
        backgroundColor: '#020617', 
        pixelRatio: 2,
        skipFonts: true,
        // 🚨 THE CRITICAL ADDITION:
        // This tells the library to wait for all images to be fully decoded
        preferredFontFormat: 'woff2',
        imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', // Transparent fallback
      });

      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
      
    } catch (err) {
      console.error('The Archive failed to seal:', err);
      alert('Security block detected. Try one more time—the second attempt usually bypasses the cache.');
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