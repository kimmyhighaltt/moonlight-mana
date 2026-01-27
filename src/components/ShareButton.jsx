import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import { Share2, Loader2 } from 'lucide-react';
import { THEME } from '../constants/index';

const ShareButton = ({ targetRef, fileName = 'moonlight-ritual.png' }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async (e) => {
    e.stopPropagation(); // Don't flip the card when clicking share
    if (!targetRef.current) return;

    setIsGenerating(true);

    try {
      // 1. Take the picture
      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        backgroundColor: THEME.bg, // Force the dark background
        style: {
          // This ensures the captured image looks exactly like the screen
          transform: 'scale(1)', 
        }
      });

      // 2. Create a fake download link
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
      
    } catch (err) {
      console.error('Failed to share ritual:', err);
      alert('Could not generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button 
      onClick={handleShare}
      disabled={isGenerating}
      className="mt-8 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[11px] border border-white/10 hover:bg-white/5 transition-all flex items-center gap-3 text-white shadow-2xl z-50 relative"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
    >
      {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
      {isGenerating ? 'Capturing...' : 'Share Ritual'}
    </button>
  );
};

export default ShareButton;